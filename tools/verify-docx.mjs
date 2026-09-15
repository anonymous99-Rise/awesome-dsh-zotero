/**
 * 用 mammoth 把 DOCX 转成 HTML，验证 ZIP 重写后文档结构依然完好。
 * 用法：node tools/verify-docx.mjs [path]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import mammoth from 'mammoth';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file =
  process.argv[2] ?? path.resolve(__dirname, '..', 'docx', 'DSH科研工具手册.docx');

const { value: html, messages } = await mammoth.convertToHtml({ path: file });

const count = (re) => (html.match(re) ?? []).length;
console.log('来源文件      :', path.basename(file));
console.log('mammoth 警告  :', messages.length);
for (const m of messages.slice(0, 5)) console.log('   -', m.message);
console.log('HTML 长度     :', html.length, '字符');
console.log('<h1>          :', count(/<h1>/g));
console.log('<h2>          :', count(/<h2>/g));
console.log('<h3>          :', count(/<h3>/g));
console.log('<table>       :', count(/<table>/g));
console.log('<p>           :', count(/<p>/g));

const probes = ['DSH 科研工具手册', 'dsh-literature', 'zotero-harvest', 'scanpy', '质检清单'];
for (const p of probes) console.log(`  包含「${p}」:`, html.includes(p) ? 'OK' : 'MISSING');
