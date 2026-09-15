#!/usr/bin/env node
/**
 * build-content.mjs — 把 Markdown 手册编译成站点数据。
 *
 * 产物：
 *   web/content/handbook.json   站点渲染数据（分部分 / 分小节 / HTML）
 *   web/public/search.json      客户端全文检索索引
 *   web/public/downloads/*      随站点发布的 DOCX / Markdown 下载
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';
import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import powershell from 'highlight.js/lib/languages/powershell';
import python from 'highlight.js/lib/languages/python';
import yaml from 'highlight.js/lib/languages/yaml';
import json from 'highlight.js/lib/languages/json';
import ini from 'highlight.js/lib/languages/ini';
import plaintext from 'highlight.js/lib/languages/plaintext';

hljs.registerLanguage('bash', bash);
hljs.registerLanguage('shell', bash);
hljs.registerLanguage('sh', bash);
hljs.registerLanguage('powershell', powershell);
hljs.registerLanguage('ps1', powershell);
hljs.registerLanguage('python', python);
hljs.registerLanguage('yaml', yaml);
hljs.registerLanguage('yml', yaml);
hljs.registerLanguage('json', json);
hljs.registerLanguage('ini', ini);
hljs.registerLanguage('text', plaintext);
hljs.registerLanguage('plaintext', plaintext);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WEB = path.resolve(__dirname, '..');
const ROOT = path.resolve(WEB, '..');
const SRC = path.join(ROOT, 'awesome_zotero_plugins.md');
const DOCX = path.join(ROOT, 'docx', 'DSH科研工具手册.docx');
const CONTENT_DIR = path.join(WEB, 'content');
const PUBLIC_DIR = path.join(WEB, 'public');
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/* ────────────────────────── 工具 ────────────────────────── */

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const stripTags = (s) => String(s).replace(/<[^>]+>/g, '');
const plainify = (s) =>
  stripTags(s)
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();

function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s_-]/gu, '')
    .trim()
    .replace(/\s+/g, '-');
}

const PART_SLUGS = [
  'zotero-plugins',
  'dsh-desktop',
  'dsh-plugins',
  'research-workflow',
  'appendix-a',
  'appendix-b',
  'appendix-c',
];

const PART_META = {
  'zotero-plugins': { icon: '📚', blurb: '把文献管起来：中文文献、笔记、引用、进度、影响因子' },
  'dsh-desktop': { icon: '🖥️', blurb: '从下载安装到配置模型，手把手把 AI 装进电脑' },
  'dsh-plugins': { icon: '🧩', blurb: '文献三件套 + 精选插件 + 安装顺序清单' },
  'research-workflow': { icon: '🧬', blurb: '技能怎么装、流水线怎么走、10 个可直接抄的场景' },
  'appendix-a': { icon: '🏆', blurb: '学术 Skill 榜单 Top 50 速查' },
  'appendix-b': { icon: '🧰', blurb: '生信技能工具箱：单细胞、基因组、蛋白药物、统计可视化' },
  'appendix-c': { icon: '✅', blurb: '故障排查表 + 投稿前质检清单' },
};

/* ────────────────────────── 行内渲染 ────────────────────────── */

function inline(tokens) {
  let out = '';
  for (const t of tokens ?? []) {
    switch (t.type) {
      case 'text':
      case 'escape':
        out += esc(t.text);
        break;
      case 'strong':
        out += `<strong>${inline(t.tokens)}</strong>`;
        break;
      case 'em':
        out += `<em>${inline(t.tokens)}</em>`;
        break;
      case 'del':
        out += `<del>${inline(t.tokens)}</del>`;
        break;
      case 'codespan':
        out += `<code class="inline">${esc(t.text)}</code>`;
        break;
      case 'link': {
        const label = t.tokens?.length ? inline(t.tokens) : esc(t.text);
        const href = rewriteHref(t.href);
        const external = /^https?:/i.test(t.href);
        out += `<a href="${esc(href)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${label}</a>`;
        break;
      }
      case 'image':
        out += `<img src="${esc(t.href)}" alt="${esc(t.text)}" loading="lazy" />`;
        break;
      case 'br':
        out += '<br />';
        break;
      case 'html':
        out += t.text;
        break;
      default:
        if (t.tokens?.length) out += inline(t.tokens);
        else if (t.text) out += esc(t.text);
    }
  }
  return out;
}

let anchorMap = new Map();

function rewriteHref(href) {
  if (!href) return '#';
  if (!href.startsWith('#')) return href;
  const key = decodeURIComponent(href.slice(1));
  const target = anchorMap.get(key);
  if (!target) return href;
  // 保留原始锚点，才能精确落到标题/提示块，而不是整个小节的开头
  return `${BASE}/handbook/${target.part}/#${key}`;
}

/* ────────────────────────── 块级渲染 ────────────────────────── */

function codeBlockHtml(token) {
  const lang = (token.lang || 'text').split(/\s+/)[0].toLowerCase();
  let html;
  try {
    if (hljs.getLanguage(lang)) {
      html = hljs.highlight(token.text, { language: lang }).value;
    } else {
      html = esc(token.text);
    }
  } catch {
    html = esc(token.text);
  }
  const label = lang === 'text' || lang === 'plaintext' ? '' : lang;
  return `
<div class="cb">
  <div class="cb__bar"><span class="cb__lang">${esc(label || 'code')}</span><button type="button" class="cb__copy" data-copy>复制</button></div>
  <pre><code class="hljs language-${esc(lang)}">${html}</code></pre>
</div>`;
}

function tableHtml(token) {
  const align = token.align ?? [];
  const cell = (c, tag) =>
    `<${tag}${align[c.i] ? ` class="ta-${align[c.i]}"` : ''}>${inline(c.tokens ?? [{ type: 'text', text: c.text ?? '' }])}</${tag}>`;
  const head = token.header
    .map((c, i) => cell({ ...c, i }, 'th'))
    .join('');
  const body = token.rows
    .map(
      (r) =>
        `<tr>${r.map((c, i) => cell({ ...c, i }, 'td')).join('')}</tr>`,
    )
    .join('');
  return `<div class="tablewrap"><table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>`;
}

function listHtml(token, depth = 0) {
  const tag = token.ordered ? 'ol' : 'ul';
  const items = (token.items ?? [])
    .map((item) => {
      const parts = [...(item.tokens ?? [])];
      const first = parts.shift();
      let inner = '';
      if (first?.type === 'text') inner += inline(first.tokens ?? [{ type: 'text', text: first.text }]);
      else if (first?.type === 'paragraph') inner += inline(first.tokens);
      else if (first) inner += blockHtml([first], depth + 1);
      const rest = parts.map((t) => blockHtml([t], depth + 1)).join('');
      const box = item.task
        ? `<span class="taskbox${item.checked ? ' is-done' : ''}" aria-hidden="true">${item.checked ? '✓' : ''}</span>`
        : '';
      return `<li${item.task ? ' class="is-task"' : ''}>${box}<span>${inner}</span>${rest}</li>`;
    })
    .join('');
  return `<${tag}>${items}</${tag}>`;
}

function blockHtml(tokens, depth = 0) {
  let out = '';
  for (const t of tokens ?? []) {
    switch (t.type) {
      case 'heading': {
        const lvl = Math.min(Math.max(t.depth + 0, 3), 4);
        out += `<h${lvl} id="${t.__id}"><a class="hanchor" href="#${t.__id}" aria-label="锚点">#</a>${inline(t.tokens)}</h${lvl}>`;
        break;
      }
      case 'paragraph':
        out += `<p>${inline(t.tokens)}</p>`;
        break;
      case 'text':
        out += `<p>${inline(t.tokens ?? [{ type: 'text', text: t.text }])}</p>`;
        break;
      case 'code':
        out += codeBlockHtml(t);
        break;
      case 'table':
        out += tableHtml(t);
        break;
      case 'blockquote': {
        const raw = t.text ?? '';
        const warn = /⚠|注意|危险|别跳过|铁律|坑/.test(raw);
        out += `<div class="callout${warn ? ' callout--warn' : ''}">${blockHtml(t.tokens, depth)}</div>`;
        break;
      }
      case 'list':
        out += listHtml(t, depth);
        break;
      case 'hr':
        out += '<hr />';
        break;
      case 'html': {
        const ids = [...String(t.text).matchAll(/id="([^"]+)"/g)].map((m) => m[1]);
        out += ids.map((id) => `<span class="anchor-target" id="${esc(id)}"></span>`).join('');
        break;
      }
      default:
        if (t.tokens?.length) out += blockHtml(t.tokens, depth);
        else if (t.text) out += `<p>${esc(t.text)}</p>`;
    }
  }
  return out;
}

/* ────────────────────────── 解析结构 ────────────────────────── */

const md = fs.readFileSync(SRC, 'utf8');
const tokens = marked.lexer(md);

const tocIdx = tokens.findIndex(
  (t) => t.type === 'heading' && t.depth === 2 && /目录/.test(plainify(t.text ?? '')),
);
const bodyStart = tokens.findIndex(
  (t, i) => i > Math.max(tocIdx, 0) && t.type === 'heading' && t.depth === 1,
);

const frontTokens = tokens.slice(0, tocIdx === -1 ? bodyStart : tocIdx);

// 拆分 part / section
const parts = [];
let current = null;
for (const t of tokens.slice(bodyStart)) {
  if (t.type === 'heading' && t.depth === 1) {
    current = { title: plainify(t.text), tokens: [], sections: [] };
    parts.push(current);
    continue;
  }
  if (!current) continue;
  if (t.type === 'heading' && t.depth === 2) {
    current.sections.push({ title: plainify(t.text), tokens: [] });
  } else if (current.sections.length) {
    current.sections.at(-1).tokens.push(t);
  } else {
    current.preamble ??= [];
    current.preamble.push(t);
  }
}

parts.forEach((p, i) => {
  p.id = PART_SLUGS[i] ?? `part-${i + 1}`;
  const meta = PART_META[p.id] ?? {};
  p.icon = meta.icon ?? '📄';
  p.blurb = meta.blurb ?? '';
  // 没有二级标题的部分，把前言当成唯一小节，避免内容丢失
  if (!p.sections.length) {
    p.sections.push({ title: p.title, tokens: p.preamble ?? [] });
    p.preamble = [];
  }
  const seen = new Map();
  p.sections.forEach((s, si) => {
    let id = slugify(s.title) || `section-${si + 1}`;
    if (seen.has(id)) id = `${id}-${seen.get(id) + 1}`;
    else seen.set(id, 0);
    s.id = id;
    s.part = p.id;
  });
});

// 预扫描：给所有标题分配 id，并建立 #锚点 → 页面 的映射
const taken = new Map();
const assign = (rawText) => {
  let id = slugify(rawText) || 'section';
  if (taken.has(id)) {
    const n = taken.get(id) + 1;
    taken.set(id, n);
    id = `${id}-${n}`;
  } else {
    taken.set(id, 0);
  }
  return id;
};

for (const p of parts) {
  for (const s of p.sections) {
    s.headings = [];
    anchorMap.set(s.id, { part: p.id, section: s.id });
    const here = { part: p.id, section: s.id };

    const record = (tok) => {
      tok.__id = assign(plainify(tok.text));
      anchorMap.set(tok.__id, here);
      s.headings.push({ id: tok.__id, title: plainify(tok.text), level: tok.depth });
    };

    // 递归扫描：标题（含引用块/列表内的）+ 任意 HTML 锚点（`<a id="p3-0"></a>` 是行内 HTML，
    // 会被 marked 解析成 paragraph 里的 inline html token，必须一并登记，
    // 否则正文里的 `#p3-7` 这类跨页链接无法改写成 `/handbook/<part>/#p3-7`）。
    const seen = new Set();
    const scan = (node) => {
      if (!node || typeof node !== 'object') return;
      if (Array.isArray(node)) {
        node.forEach(scan);
        return;
      }
      if (node.type === 'heading' && !node.__scanned) {
        node.__scanned = true;
        record(node);
      }
      if (node.type === 'html' && typeof node.text === 'string') {
        for (const m of node.text.matchAll(/id="([^"]+)"/g)) {
          if (!seen.has(m[1])) {
            seen.add(m[1]);
            anchorMap.set(m[1], here);
          }
        }
      }
      if (node.header) scan(node.header);
      if (node.rows) scan(node.rows);
      if (node.tokens) scan(node.tokens);
      if (node.items) {
        for (const it of node.items) scan(it.tokens);
      }
    };

    scan(s.tokens);
  }
}

// 前言里也可能藏着锚点，一并登记（指向该部分第一小节）
for (const p of parts) {
  if (!p.preamble?.length) continue;
  const here = { part: p.id, section: p.sections[0]?.id ?? '' };
  for (const m of JSON.stringify(p.preamble).matchAll(/id=\\"([^"\\]+)\\"/g)) {
    if (!anchorMap.has(m[1])) anchorMap.set(m[1], here);
  }
}

// 正式渲染
const handbook = {
  title: 'DSH 科研工具手册',
  subtitle: 'Zotero 插件 × DSH Desktop × 生物信息学科研工作流',
  version: 'v3.1',
  generatedAt: new Date().toISOString(),
  front: {
    html: blockHtml(frontTokens),
    text: plainify(blockHtml(frontTokens)),
  },
  parts: [],
};

const searchIndex = [];
let tableCount = 0;
let codeCount = 0;
let headingCount = 0;

for (const p of parts) {
  const partOut = {
    id: p.id,
    title: p.title,
    icon: p.icon,
    blurb: p.blurb,
    intro: p.preamble?.length ? blockHtml(p.preamble) : '',
    sections: [],
  };
  for (const s of p.sections) {
    const html = blockHtml(s.tokens);
    const text = plainify(html);
    const plainTokens = JSON.stringify(s.tokens);
    tableCount += (plainTokens.match(/"type":"table"/g) ?? []).length;
    codeCount += (plainTokens.match(/"type":"code"/g) ?? []).length;
    headingCount += 1;
    partOut.sections.push({
      id: s.id,
      title: s.title,
      html,
      text: text.slice(0, 240),
      headings: (s.headings ?? []).filter((h) => h.level >= 3).slice(0, 14),
    });
    searchIndex.push({
      p: p.id,
      pt: p.title,
      s: s.id,
      st: s.title,
      t: text.length > 8000 ? text.slice(0, 8000) : text,
    });
  }
  handbook.parts.push(partOut);
}

handbook.stats = {
  parts: handbook.parts.length,
  sections: headingCount,
  tables: tableCount,
  codeBlocks: codeCount,
  chars: plainify(md).length,
  readMinutes: Math.round(plainify(md).length / 480),
};

/* ────────────────────────── 输出 ────────────────────────── */

fs.mkdirSync(CONTENT_DIR, { recursive: true });
fs.mkdirSync(path.join(PUBLIC_DIR, 'downloads'), { recursive: true });

fs.writeFileSync(path.join(CONTENT_DIR, 'handbook.json'), JSON.stringify(handbook), 'utf8');
fs.writeFileSync(path.join(PUBLIC_DIR, 'search.json'), JSON.stringify(searchIndex), 'utf8');
fs.writeFileSync(
  path.join(PUBLIC_DIR, 'downloads', 'handbook.md'),
  md,
  'utf8',
);

if (!fs.existsSync(DOCX)) {
  console.error(`✖ 找不到 DOCX：${DOCX}`);
  console.error('  请先在仓库根目录运行：npm run build:docx');
  process.exit(1);
}
fs.copyFileSync(DOCX, path.join(PUBLIC_DIR, 'downloads', 'DSH科研工具手册.docx'));
fs.copyFileSync(DOCX, path.join(PUBLIC_DIR, 'downloads', 'dsh-research-handbook.docx'));
fs.writeFileSync(path.join(PUBLIC_DIR, 'downloads', 'dsh-research-handbook.md'), md, 'utf8');

const dataKb = (fs.statSync(path.join(CONTENT_DIR, 'handbook.json')).size / 1024).toFixed(0);
console.log('✔ 站点内容已生成');
console.log(`  部分：${handbook.stats.parts}  小节：${handbook.stats.sections}`);
console.log(`  表格：${tableCount}  代码块：${codeCount}`);
console.log(`  正文字数：${handbook.stats.chars}  预计阅读：${handbook.stats.readMinutes} 分钟`);
console.log(`  数据体积：${dataKb} KB`);
console.log(`  锚点索引：${anchorMap.size} 个`);
