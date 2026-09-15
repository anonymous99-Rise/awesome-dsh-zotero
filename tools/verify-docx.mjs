/**
 * DOCX 出厂自检：
 *   1) mammoth 转换 —— 验证 ZIP 重写后文档结构依然完好（结构级）
 *   2) officecli 体检 —— 独立工具做 OpenXML 校验 + 悬空引用/格式问题扫描（规范级）
 *
 * 用法：node tools/verify-docx.mjs [path]
 *
 * officecli 是可选的：没装就跳过第 2 步，不影响第 1 步。
 * 注意本机有两条命令路径，npm 全局那个是启动器（非 TTY 会报错），
 * 真正能用的是 %LOCALAPPDATA%\OfficeCli\officecli.exe（1.x）。
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import mammoth from 'mammoth';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file =
  process.argv[2] ?? path.resolve(__dirname, '..', 'docx', 'DSH科研工具手册.docx');

if (!fs.existsSync(file)) {
  console.error(`✖ 找不到文件：${file}`);
  process.exit(1);
}

let problems = 0;

/* ─────────────── 1) mammoth：结构完整性 ─────────────── */

const { value: html, messages } = await mammoth.convertToHtml({ path: file });
const count = (re) => (html.match(re) ?? []).length;

console.log('【结构自检 · mammoth】');
console.log('  来源文件     :', path.basename(file));
console.log('  转换警告     :', messages.length);
for (const m of messages.slice(0, 5)) console.log('     -', m.message);
if (messages.length) problems++;
console.log('  HTML 长度    :', html.length, '字符');
console.log('  h1 / h2 / h3 :', count(/<h1>/g), '/', count(/<h2>/g), '/', count(/<h3>/g));
console.log('  表格 / 段落  :', count(/<table>/g), '/', count(/<p>/g));

const probes = ['DSH 科研工具手册', 'dsh-literature', 'zotero-harvest', 'scanpy', '质检清单'];
const missing = probes.filter((p) => !html.includes(p));
for (const p of probes) console.log(`  包含「${p}」:`, html.includes(p) ? 'OK' : 'MISSING');
if (missing.length) problems++;

/* ─────────────── 2) officecli：OpenXML 规范级 ─────────────── */

function resolveOfficeCli() {
  const candidates = [
    process.env.LOCALAPPDATA && path.join(process.env.LOCALAPPDATA, 'OfficeCli', 'officecli.exe'),
    'officecli',
  ].filter(Boolean);
  for (const c of candidates) {
    try {
      execFileSync(c, ['--version'], { stdio: 'pipe', timeout: 20000 });
      return c;
    } catch {
      /* 试下一个 */
    }
  }
  return null;
}

const officecli = resolveOfficeCli();
console.log();
console.log('【规范自检 · officecli】');

if (!officecli) {
  console.log('  未检测到可用的 officecli，跳过（不影响上面的结构自检）');
} else {
  while (true) {
    const version = execFileSync(officecli, ['--version'], { encoding: 'utf8' }).trim();
    console.log('  可执行文件   :', officecli);
    console.log('  版本         :', version);

    const validate = execFileSync(officecli, ['validate', file], {
      encoding: 'utf8',
      timeout: 120000,
    }).trim();
    const validateOk = /passed|no errors/i.test(validate);
    console.log('  validate     :', validateOk ? '✔ 通过' : '✖ ' + validate);
    if (!validateOk) problems++;

    const issues = execFileSync(officecli, ['view', file, 'issues', '--limit', '60'], {
      encoding: 'utf8',
      timeout: 180000,
    });
    const dangling = (issues.match(/Dangling/g) ?? []).length;
    const emptyParas = (issues.match(/Empty paragraph/g) ?? []).length;
    const indent = (issues.match(/missing first-line indent/g) ?? []).length;
    const total = Number((issues.match(/Found (\d+) issue/) ?? [])[1] ?? 0);
    console.log('  问题总数     :', total);
    console.log('    悬空样式引用 :', dangling, dangling ? '← 必须修（会破坏样式继承）' : '✔');
    console.log('    空段落       :', emptyParas, '（本手册用于表格/提示框间距，属预期）');
    console.log('    首行缩进建议 :', indent, '（技术手册不做中文公文式缩进，属有意取舍）');
    if (dangling) problems++;
    break;
  }
}

console.log();
if (problems) {
  console.log(`✖ 自检发现 ${problems} 类问题`);
  process.exit(1);
}
console.log('✔ 自检通过');
