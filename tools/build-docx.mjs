#!/usr/bin/env node
/**
 * build-docx.mjs — 把 awesome_zotero_plugins.md 渲染成一份排版精良的 Word 文档。
 *
 * 用法：npm run build:docx
 * 输出：docx/DSH科研工具手册.docx
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import AdmZip from 'adm-zip';
import { marked } from 'marked';
import {
  AlignmentType,
  BorderStyle,
  Document,
  Footer,
  Header,
  HeadingLevel,
  HeightRule,
  LevelFormat,
  PageNumber,
  PageOrientation,
  Packer,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  VerticalAlign,
  WidthType,
} from 'docx';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'awesome_zotero_plugins.md');
const OUT_DIR = path.join(ROOT, 'docx');
const OUT = path.join(OUT_DIR, 'DSH科研工具手册.docx');

/* ────────────────────────── 设计令牌 ────────────────────────── */

const FONT = '微软雅黑';
const FONT_MONO = 'Consolas';

const C = {
  accent: '0F766E',
  accentSoft: 'E8F4F2',
  accentDeep: '0B4F4A',
  amber: 'B45309',
  amberSoft: 'FDF6EC',
  ink: '1C1B19',
  body: '3A3733',
  muted: '6B675F',
  rule: 'D9D4C8',
  zebra: 'F7F5F0',
  codeBg: 'F4F2ED',
  white: 'FFFFFF',
};

const PAGE_W = 11906; // A4 宽（twips）
const PAGE_H = 16838; // A4 高
const MARGIN = 1134; // 2cm
const CONTENT_W = PAGE_W - MARGIN * 2;

const NONE_BORDER = { style: BorderStyle.NONE, size: 0, color: 'auto' };

/* ────────────────────────── 小工具 ────────────────────────── */

const plain = (s) =>
  String(s)
    .replace(/<[^>]+>/g, '')
    .replace(/[*_`~]/g, '')
    .trim();

function textWidth(s) {
  let w = 0;
  for (const ch of plain(s)) w += /[\u2E80-\uFFFD]/.test(ch) ? 2 : 1;
  return w;
}

function slug(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s_-]/gu, '')
    .trim()
    .replace(/\s+/g, '-');
}

function distributeWidths(header, rows) {
  // 逐列估算：能折行的长文本按「平均长度」估，不可折的长 token（URL / 路径）按真实宽度估，
  // 否则所有长列都被同等封顶，URL 列会被压到只能逐字符换行。
  const cols = header.map((h, i) => {
    const texts = [
      h,
      ...rows.map((r) => {
        const cell = r[i];
        if (cell === undefined) return '';
        return typeof cell === 'string' ? cell : (cell.text ?? '');
      }),
    ];
    let maxTok = 0;
    let sum = 0;
    for (const t of texts) {
      const s = plain(t);
      sum += textWidth(s);
      for (const tok of s.split(/\s+/)) maxTok = Math.max(maxTok, textWidth(tok));
    }
    const avg = sum / Math.max(1, texts.length);
    return Math.min(58, Math.max(Math.min(avg + 2, 34), maxTok + 3, 8));
  });

  const total = cols.reduce((a, b) => a + b, 0) || 1;
  const MIN = 900;
  const widths = cols.map((c) => Math.max(MIN, Math.round((c / total) * CONTENT_W)));
  const sum = widths.reduce((a, b) => a + b, 0);
  widths[widths.indexOf(Math.max(...widths))] += CONTENT_W - sum;
  return widths;
}

/** Word 里长 URL 不好看：去掉协议头，缩短视觉宽度 */
function linkLabel(text) {
  const s = String(text).trim();
  if (/^https?:\/\//i.test(s)) return s.replace(/^https?:\/\//i, '').replace(/\/$/, '');
  return s;
}

/* ────────────────────────── 行内渲染 ────────────────────────── */

function inlineRuns(tokens, base = {}) {
  if (typeof tokens === 'string') return [new TextRun({ text: tokens, ...base })];
  const runs = [];
  for (const t of tokens ?? []) {
    switch (t.type) {
      case 'text':
      case 'escape':
        if (t.tokens?.length) runs.push(...inlineRuns(t.tokens, base));
        else runs.push(new TextRun({ text: base.shortenUrls ? linkLabel(t.text) : t.text, ...base }));
        break;
      case 'strong':
        runs.push(...inlineRuns(t.tokens, { ...base, bold: true }));
        break;
      case 'em':
        runs.push(...inlineRuns(t.tokens, { ...base, italics: true }));
        break;
      case 'del':
        runs.push(...inlineRuns(t.tokens, { ...base, strike: true }));
        break;
      case 'codespan':
        runs.push(
          new TextRun({
            text: t.text,
            font: FONT_MONO,
            size: Math.max(15, (base.size ?? 21) - 3),
            color: C.amber,
            shading: { type: ShadingType.CLEAR, fill: C.amberSoft, color: 'auto' },
            ...(base.bold ? { bold: true } : {}),
          }),
        );
        break;
      case 'link': {
        const label = t.tokens?.length ? t.tokens : [{ type: 'text', text: t.text }];
        runs.push(
          ...inlineRuns(label, {
            ...base,
            color: C.accent,
            underline: { color: C.accent },
            shortenUrls: true,
          }),
        );
        break;
      }
      case 'br':
        runs.push(new TextRun({ break: 1 }));
        break;
      case 'html':
        if (/^<br\s*\/?>$/i.test(t.text.trim())) runs.push(new TextRun({ break: 1 }));
        break;
      default:
        if (t.tokens?.length) runs.push(...inlineRuns(t.tokens, base));
        else if (t.text) runs.push(new TextRun({ text: t.text, ...base }));
    }
  }
  return runs.length ? runs : [new TextRun({ text: '', ...base })];
}

/* ────────────────────────── 块级渲染 ────────────────────────── */

function codeBlock(text, lang) {
  const lines = String(text).replace(/\t/g, '  ').split('\n');
  const out = [];
  // ```text / ```plaintext 只是"不指定语言"，不该在块里印出 "text" 标签
  const showLang = lang && !/^(text|plaintext|txt|none)$/i.test(lang);
  if (showLang) {
    out.push(
      new Paragraph({
        spacing: { before: 180, after: 0 },
        indent: { left: 140, right: 140 },
        shading: { type: ShadingType.CLEAR, fill: 'E4E1D9', color: 'auto' },
        children: [
          new TextRun({ text: `  ${lang}  `, font: FONT_MONO, size: 15, color: C.muted, bold: true }),
        ],
      }),
    );
  }
  lines.forEach((ln, i) => {
    out.push(
      new Paragraph({
        spacing: {
          before: i === 0 && !showLang ? 180 : 0,
          after: i === lines.length - 1 ? 180 : 0,
          line: 252,
          lineRule: 'auto',
        },
        indent: { left: 140, right: 140 },
        shading: { type: ShadingType.CLEAR, fill: C.codeBg, color: 'auto' },
        children: [new TextRun({ text: ln.length ? ln : ' ', font: FONT_MONO, size: 17, color: '2F2C28' })],
      }),
    );
  });
  return out;
}

function callout(children, { fill, bar }) {
  return [
    new Table({
      width: { size: CONTENT_W, type: WidthType.DXA },
      columnWidths: [CONTENT_W - 140],
      borders: {
        top: NONE_BORDER,
        bottom: NONE_BORDER,
        right: NONE_BORDER,
        left: { style: BorderStyle.SINGLE, size: 18, color: bar },
        insideHorizontal: NONE_BORDER,
        insideVertical: NONE_BORDER,
      },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: { size: CONTENT_W - 140, type: WidthType.DXA },
              shading: { type: ShadingType.CLEAR, fill, color: 'auto' },
              margins: { top: 150, bottom: 150, left: 220, right: 180 },
              children,
            }),
          ],
        }),
      ],
    }),
    new Paragraph({ spacing: { after: 140 }, children: [] }),
  ];
}

function tableFromToken(token) {
  const header = token.header;
  const rows = token.rows;
  const widths = distributeWidths(
    header.map((c) => c.text ?? ''),
    rows.map((r) => r.map((c) => c.text ?? '')),
  );
  const border = { style: BorderStyle.SINGLE, size: 4, color: C.rule };

  const headerRow = new TableRow({
    tableHeader: true,
    cantSplit: true,
    children: header.map(
      (c, i) =>
        new TableCell({
          width: { size: widths[i], type: WidthType.DXA },
          shading: { type: ShadingType.CLEAR, fill: C.accent, color: 'auto' },
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
          verticalAlign: VerticalAlign.CENTER,
          children: [
            new Paragraph({
              spacing: { before: 20, after: 20, line: 260, lineRule: 'auto' },
              children: inlineRuns(c.tokens ?? [{ type: 'text', text: c.text ?? '' }], {
                bold: true,
                color: C.white,
                size: 18,
              }),
            }),
          ],
        }),
    ),
  });

  const bodyRows = rows.map(
    (r, ri) =>
      new TableRow({
        cantSplit: true,
        children: r.map(
          (c, ci) =>
            new TableCell({
              width: { size: widths[ci], type: WidthType.DXA },
              shading: {
                type: ShadingType.CLEAR,
                fill: ri % 2 === 1 ? C.zebra : C.white,
                color: 'auto',
              },
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              verticalAlign: VerticalAlign.CENTER,
              children: [
                new Paragraph({
                  spacing: { before: 20, after: 20, line: 260, lineRule: 'auto' },
                  children: inlineRuns(c.tokens ?? [{ type: 'text', text: c.text ?? '' }], {
                    size: 18,
                    color: C.ink,
                  }),
                }),
              ],
            }),
        ),
      }),
  );

  return [
    new Table({
      width: { size: CONTENT_W, type: WidthType.DXA },
      columnWidths: widths,
      borders: {
        top: border,
        bottom: border,
        left: border,
        right: border,
        insideHorizontal: border,
        insideVertical: border,
      },
      rows: [headerRow, ...bodyRows],
    }),
    new Paragraph({ spacing: { after: 220 }, children: [] }),
  ];
}

function listItems(token, depth = 0) {
  const out = [];
  const ordered = Boolean(token.ordered);
  for (const item of token.items ?? []) {
    const parts = [...(item.tokens ?? [])];
    const first = parts[0];
    const checkbox = item.task ? (item.checked ? '☑  ' : '☐  ') : '';

    let body;
    if (first?.type === 'text') {
      body = [
        ...(checkbox
          ? [new TextRun({ text: checkbox, size: 21, color: item.checked ? C.accent : C.muted })]
          : []),
        ...inlineRuns(first.tokens ?? [{ type: 'text', text: first.text }], {
          size: 21,
          color: C.ink,
        }),
      ];
    } else if (first?.type === 'paragraph') {
      body = [
        ...(checkbox
          ? [new TextRun({ text: checkbox, size: 21, color: item.checked ? C.accent : C.muted })]
          : []),
        ...inlineRuns(first.tokens, { size: 21, color: C.ink }),
      ];
    } else {
      body = [new TextRun({ text: checkbox || ' ', size: 21, color: C.ink })];
    }

    out.push(
      new Paragraph({
        numbering: ordered
          ? { reference: 'ordered-list', level: Math.min(depth, 4) }
          : { reference: 'bullet-list', level: Math.min(depth, 4) },
        spacing: { before: 50, after: 50, line: 300, lineRule: 'auto' },
        children: body,
      }),
    );

    for (const rest of parts.slice(1)) {
      if (rest.type === 'list') out.push(...listItems(rest, depth + 1));
      else if (rest.type === 'blockquote') out.push(...blockquoteBlocks(rest, depth));
      else if (rest.type === 'code') out.push(...codeBlock(rest.text, rest.lang));
      else if (rest.type === 'table') out.push(...tableFromToken(rest));
      else if (rest.type === 'text' || rest.type === 'paragraph')
        out.push(
          new Paragraph({
            indent: { left: 460 + depth * 260 },
            spacing: { before: 20, after: 50, line: 300, lineRule: 'auto' },
            children: inlineRuns(
              rest.tokens ?? [{ type: 'text', text: rest.text ?? '' }],
              { size: 21, color: C.ink },
            ),
          }),
        );
    }
  }
  return out;
}

function blockquoteBlocks(token, depth = 0) {
  const inner = [];
  for (const t of token.tokens ?? []) {
    if (t.type === 'paragraph')
      inner.push(
        new Paragraph({
          spacing: { before: 40, after: 40, line: 300, lineRule: 'auto' },
          children: inlineRuns(t.tokens, { size: 20, color: C.body }),
        }),
      );
    else if (t.type === 'list') inner.push(...listItems(t, depth));
    else if (t.type === 'blockquote') inner.push(...blockquoteBlocks(t, depth + 1));
    else if (t.type === 'code') inner.push(...codeBlock(t.text, t.lang));
    else if (t.type === 'table') inner.push(...tableFromToken(t));
    else if (t.type === 'text')
      inner.push(
        new Paragraph({
          spacing: { before: 40, after: 40, line: 300, lineRule: 'auto' },
          children: inlineRuns(t.tokens ?? [{ type: 'text', text: t.text }], {
            size: 20,
            color: C.body,
          }),
        }),
      );
  }
  if (!inner.length) inner.push(new Paragraph({ children: [new TextRun({ text: '', size: 20 })] }));
  const warn = /⚠|注意|危险|别跳过|铁律|坑/.test(token.text ?? '');
  return callout(inner, {
    fill: warn ? C.amberSoft : C.accentSoft,
    bar: warn ? C.amber : C.accent,
  });
}

function headingParagraph(token) {
  const level = token.depth;
  const text = plain(token.text);

  if (level === 1) {
    // 色条与版心左右对齐；靠行高把文字在色条里垂直居中，用一个全角空格做左内边距
    return new Paragraph({
      heading: HeadingLevel.HEADING_1,
      pageBreakBefore: true,
      spacing: { before: 0, after: 300, line: 500, lineRule: 'auto' },
      shading: { type: ShadingType.CLEAR, fill: C.accentDeep, color: 'auto' },
      indent: { left: 0, right: 0 },
      children: [
        new TextRun({ text: `\u2003 ${text}`, bold: true, size: 32, color: C.white, font: FONT }),
      ],
    });
  }
  if (level === 2) {
    return new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 360, after: 170, line: 320, lineRule: 'auto' },
      border: { bottom: { style: BorderStyle.SINGLE, size: 10, color: C.accent } },
      children: [new TextRun({ text, bold: true, size: 26, color: C.accent, font: FONT })],
    });
  }
  if (level === 3) {
    // 三级标题用细下划线，避免与"左侧色条"的提示框混淆
    return new Paragraph({
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 280, after: 140, line: 300, lineRule: 'auto' },
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: C.rule } },
      children: [new TextRun({ text, bold: true, size: 22, color: '2F2C28', font: FONT })],
    });
  }
  return new Paragraph({
    heading: HeadingLevel.HEADING_4,
    spacing: { before: 200, after: 100 },
    children: [new TextRun({ text, bold: true, size: 21, color: '4A4640', font: FONT })],
  });
}

function tokenToBlocks(token, depth = 0) {
  switch (token.type) {
    case 'heading':
      return [headingParagraph(token)];
    case 'paragraph':
    case 'text':
      return [
        new Paragraph({
          spacing: { before: 60, after: 130, line: 320, lineRule: 'auto' },
          children: inlineRuns(
            token.tokens ?? [{ type: 'text', text: token.text ?? '' }],
            { size: 21, color: C.ink },
          ),
        }),
      ];
    case 'code':
      return codeBlock(token.text, token.lang);
    case 'table':
      return tableFromToken(token);
    case 'blockquote':
      return blockquoteBlocks(token, depth);
    case 'list':
      return [...listItems(token, depth), new Paragraph({ spacing: { after: 90 }, children: [] })];
    case 'hr':
      return [
        new Paragraph({
          spacing: { before: 220, after: 220 },
          border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: C.rule } },
          children: [],
        }),
      ];
    case 'html':
    case 'space':
      return [];
    default:
      if (token.tokens)
        return tokenToBlocks({ type: 'paragraph', tokens: token.tokens }, depth);
      if (token.text)
        return tokenToBlocks({ type: 'paragraph', tokens: [{ type: 'text', text: token.text }] }, depth);
      return [];
  }
}

/* ────────────────────────── 封面 / 页眉页脚 ────────────────────────── */

function band(fill, height) {
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [CONTENT_W],
    borders: {
      top: NONE_BORDER,
      bottom: NONE_BORDER,
      left: NONE_BORDER,
      right: NONE_BORDER,
      insideHorizontal: NONE_BORDER,
      insideVertical: NONE_BORDER,
    },
    rows: [
      new TableRow({
        height: { value: height, rule: HeightRule.EXACT },
        children: [
          new TableCell({
            width: { size: CONTENT_W, type: WidthType.DXA },
            shading: { type: ShadingType.CLEAR, fill, color: 'auto' },
            margins: { top: 0, bottom: 0, left: 0, right: 0 },
            children: [new Paragraph({ spacing: { before: 0, after: 0 }, children: [] })],
          }),
        ],
      }),
    ],
  });
}

function coverPage() {
  const metaRows = [
    ['文档版本', 'v3.1（小白版 · 生物信息学向 · 含 DSH 插件区）'],
    ['适用读者', '生物信息学 / 生命科学方向的本科 · 研究生'],
    ['系统要求', 'Windows 10/11 x64 或 macOS（Intel / Apple 芯片）'],
    ['内容规模', '四大部分 + 三个附录；约 90 个插件与技能条目'],
    ['阅读建议', '① 管文献 → ② 装工具 → ③ 挑插件 → ④ 上手科研'],
  ];
  const keyCol = 2000;

  return [
    band(C.accent, 300),
    new Paragraph({ spacing: { before: 620 }, children: [] }),
    new Paragraph({
      spacing: { before: 0, after: 140 },
      children: [
        new TextRun({ text: 'DSH 科研工具手册', bold: true, size: 60, color: C.accentDeep }),
      ],
    }),
    new Paragraph({
      spacing: { before: 0, after: 100 },
      children: [
        new TextRun({
          text: 'Zotero 插件  ×  DSH Desktop  ×  生物信息学科研工作流',
          size: 26,
          color: C.accent,
        }),
      ],
    }),
    new Paragraph({
      spacing: { before: 0, after: 460 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 14, color: C.amber } },
      children: [new TextRun({ text: ' ', size: 6 })],
    }),
    new Paragraph({
      spacing: { before: 0, after: 560 },
      children: [
        new TextRun({
          text: '把 Zotero 从「文献仓库」升级为「可被 AI 直接调用、可复现、可交付」的研究基础设施。',
          size: 22,
          italics: true,
          color: C.muted,
        }),
      ],
    }),
    new Table({
      width: { size: CONTENT_W, type: WidthType.DXA },
      columnWidths: [keyCol, CONTENT_W - keyCol],
      borders: {
        top: NONE_BORDER,
        bottom: NONE_BORDER,
        left: NONE_BORDER,
        right: NONE_BORDER,
        insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: C.rule },
        insideVertical: NONE_BORDER,
      },
      rows: metaRows.map(
        ([k, v], i) =>
          new TableRow({
            children: [
              new TableCell({
                width: { size: keyCol, type: WidthType.DXA },
                shading: {
                  type: ShadingType.CLEAR,
                  fill: i % 2 ? C.zebra : C.accentSoft,
                  color: 'auto',
                },
                margins: { top: 100, bottom: 100, left: 140, right: 120 },
                children: [
                  new Paragraph({
                    children: [new TextRun({ text: k, bold: true, size: 20, color: C.accentDeep })],
                  }),
                ],
              }),
              new TableCell({
                width: { size: CONTENT_W - keyCol, type: WidthType.DXA },
                shading: {
                  type: ShadingType.CLEAR,
                  fill: i % 2 ? C.zebra : C.accentSoft,
                  color: 'auto',
                },
                margins: { top: 100, bottom: 100, left: 140, right: 120 },
                children: [new Paragraph({ children: [new TextRun({ text: v, size: 20 })] })],
              }),
            ],
          }),
      ),
    }),
    new Paragraph({ spacing: { before: 520 }, children: [] }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 40 },
      children: [
        new TextRun({
          text: '在线阅读：anonymous99-rise.github.io/awesome-dsh-zotero',
          size: 18,
          color: C.muted,
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 360 },
      children: [
        new TextRun({ text: 'Markdown 源文件为本手册唯一内容源，Word 版与网页版均自动生成', size: 18, color: C.faint }),
      ],
    }),
    band(C.rule, 44),
  ];
}

/* ────────────────────────── 解析 Markdown ────────────────────────── */

const md = fs.readFileSync(SRC, 'utf8');
const tokens = marked.lexer(md);

const tocIdx = tokens.findIndex(
  (t) => t.type === 'heading' && t.depth === 2 && /目录/.test(plain(t.text ?? '')),
);
// 正文起点 = 目录之后的第一个一级标题（文档大标题已上封面，不重复渲染）
const bodyStart = tokens.findIndex(
  (t, i) => i > Math.max(tocIdx, 0) && t.type === 'heading' && t.depth === 1,
);

const introTokens = tokens
  .slice(0, tocIdx === -1 ? bodyStart : tocIdx)
  .filter((t) => !(t.type === 'heading' && t.depth === 1)); // 标题已上封面
const bodyTokens = tokens.slice(bodyStart);

/* ────────────────────────── 装配 ────────────────────────── */

const children = [];

// 封面
children.push(...coverPage());

// 导航页
children.push(
  new Paragraph({
    pageBreakBefore: true,
    spacing: { before: 0, after: 120 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: C.accent } },
    children: [new TextRun({ text: '内容导航', bold: true, size: 34, color: C.accentDeep })],
  }),
);
children.push(new Paragraph({ spacing: { before: 120 }, children: [] }));
children.push(
  ...callout(
    [
      new Paragraph({
        spacing: { after: 70 },
        children: [
          new TextRun({
            text: '本手册共四大部分 + 三个附录。建议按顺序阅读；急着上手可直接跳到「② DSH Desktop 安装」与「④ 科研实战」。',
            size: 20,
            color: C.body,
          }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: '文中所有命令都可以直接复制到 DSH 的终端里执行；标记 ⚠️ 的段落是踩坑提醒，别跳过。',
            size: 20,
            color: C.body,
          }),
        ],
      }),
    ],
    { fill: C.accentSoft, bar: C.accent },
  ),
);

for (const t of tokens.slice(bodyStart)) {
  if (t.type !== 'heading') continue;
  if (t.depth === 1) {
    children.push(
      new Paragraph({
        spacing: { before: 220, after: 90 },
        children: [
          new TextRun({ text: plain(t.text), bold: true, size: 24, color: C.accentDeep, font: FONT }),
        ],
      }),
    );
  } else if (t.depth === 2) {
    children.push(
      new Paragraph({
        indent: { left: 300, hanging: 0 },
        spacing: { before: 20, after: 20 },
        children: [new TextRun({ text: plain(t.text), size: 20, color: C.body })],
      }),
    );
  }
}

// 导读页 + 正文
const body = [];
body.push(
  new Paragraph({
    pageBreakBefore: true,
    spacing: { before: 0, after: 200 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 10, color: C.accent } },
    children: [new TextRun({ text: '导读 · 这份文件怎么用', bold: true, size: 28, color: C.accentDeep })],
  }),
);
for (const t of introTokens) body.push(...tokenToBlocks(t));
body.push(
  new Paragraph({
    spacing: { before: 300, after: 200 },
    shading: { type: ShadingType.CLEAR, fill: C.amberSoft, color: 'auto' },
    indent: { left: 200, right: 200 },
    children: [
      new TextRun({
        text: '下面正文每一部分都会另起一页，方便打印和分次阅读。',
        size: 20,
        color: C.amber,
        bold: true,
      }),
    ],
  }),
);
for (const t of bodyTokens) body.push(...tokenToBlocks(t));

const doc = new Document({
  creator: 'DSH 科研工具手册',
  title: 'DSH 科研工具手册 · Zotero 插件 × DSH Desktop × 生物信息学科研工作流',
  description: '面向生物信息学方向研究生的 Zotero + DSH 科研工具手册',
  styles: {
    default: {
      document: {
        run: { font: FONT, size: 21, color: C.ink },
        paragraph: { spacing: { line: 320, lineRule: 'auto' } },
      },
      heading1: {
        run: { font: FONT, size: 32, bold: true, color: C.accentDeep },
        paragraph: { spacing: { before: 0, after: 300 } },
      },
      heading2: {
        run: { font: FONT, size: 26, bold: true, color: C.accent },
        paragraph: { spacing: { before: 360, after: 170 } },
      },
      heading3: {
        run: { font: FONT, size: 22, bold: true, color: '33302C' },
        paragraph: { spacing: { before: 280, after: 130 } },
      },
      heading4: {
        run: { font: FONT, size: 21, bold: true, color: '4A4640' },
        paragraph: { spacing: { before: 200, after: 100 } },
      },
    },
  },
  numbering: {
    config: [
      {
        reference: 'bullet-list',
        levels: [
          { level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 440, hanging: 250 } } } },
          { level: 1, format: LevelFormat.BULLET, text: '◦', alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 800, hanging: 250 } } } },
          { level: 2, format: LevelFormat.BULLET, text: '▪', alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 1160, hanging: 250 } } } },
          { level: 3, format: LevelFormat.BULLET, text: '·', alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 1520, hanging: 250 } } } },
          { level: 4, format: LevelFormat.BULLET, text: '·', alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 1880, hanging: 250 } } } },
        ],
      },
      {
        reference: 'ordered-list',
        levels: [0, 1, 2, 3, 4].map((level) => ({
          level,
          format: LevelFormat.DECIMAL,
          text: `%${level + 1}.`,
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 440 + level * 360, hanging: 280 } } },
        })),
      },
    ],
  },
  sections: [
    {
      properties: {
        titlePage: true,
        page: {
          size: { width: PAGE_W, height: PAGE_H, orientation: PageOrientation.PORTRAIT },
          margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN },
        },
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: C.rule } },
              children: [
                new TextRun({
                  text: 'DSH 科研工具手册 · Zotero × DSH Desktop',
                  size: 16,
                  color: C.muted,
                }),
              ],
            }),
          ],
        }),
        first: new Header({ children: [new Paragraph({ children: [] })] }),
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              border: { top: { style: BorderStyle.SINGLE, size: 4, color: C.rule } },
              children: [
                new TextRun({ text: '第 ', size: 16, color: C.muted }),
                new TextRun({ children: [PageNumber.CURRENT], size: 16, color: C.accent, bold: true }),
                new TextRun({ text: ' 页 / 共 ', size: 16, color: C.muted }),
                new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 16, color: C.muted }),
                new TextRun({ text: ' 页', size: 16, color: C.muted }),
              ],
            }),
          ],
        }),
        first: new Footer({
          children: [new Paragraph({ children: [new TextRun({ text: '', size: 16 })] })],
        }),
      },
      children: [...children, ...body],
    },
  ],
});

/* ────────────────────────── 输出 + 东亚字体修正 ────────────────────────── */

fs.mkdirSync(OUT_DIR, { recursive: true });
const buffer = await Packer.toBuffer(doc);
fs.writeFileSync(OUT, buffer);

// docx-js 只写 ascii/hAnsi/cs，中文会落到主题字体；补 w:eastAsia 保证中文字形一致。
const zip = new AdmZip(OUT);
let patched = 0;
for (const rel of ['word/styles.xml', 'word/document.xml']) {
  const entry = zip.getEntry(rel);
  if (!entry) continue;
  const xml = entry.getData().toString('utf8');
  const fixed = xml.replace(/<w:rFonts\b([^>]*?)\/>/g, (full, attrs) => {
    if (/w:eastAsia=/.test(attrs)) return full;
    const m = attrs.match(/w:ascii="([^"]+)"/);
    patched++;
    return `<w:rFonts${attrs} w:eastAsia="${m ? m[1] : FONT}"/>`;
  });
  zip.updateFile(rel, Buffer.from(fixed, 'utf8'));
}
zip.writeZip(OUT);

const size = fs.statSync(OUT).size;
console.log(`✔ DOCX 已生成：${OUT}`);
console.log(`  文件大小：${(size / 1024).toFixed(1)} KB`);
console.log(`  渲染块：${body.length} 个（含表格/代码/提示框）`);
console.log(`  东亚字体修正：${patched} 处`);
console.log(`  目录条目：${tokens.slice(bodyStart).filter((t) => t.type === 'heading' && t.depth <= 2).length} 条`);
