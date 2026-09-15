# 🧬 DSH 科研工具手册

> **Zotero 插件 × DSH Desktop × 生物信息学科研工作流**
> 一本写给生物信息学方向研究生的工具手册：文献怎么管、AI 怎么装、插件怎么挑、科研怎么跑。

🌐 **在线阅读**：<https://anonymous99-rise.github.io/awesome-dsh-zotero/>
📄 **Word 版**：[`docx/DSH科研工具手册.docx`](./docx/DSH科研工具手册.docx)

---

## 这份手册解决什么问题

用一句话说：

> **Zotero 保证「文献是真的、引用是对的、附件不丢」；DSH 保证「读得快、记得住、跑得动、写得成」。**

手册分四大部分：

| 部分 | 内容 |
| --- | --- |
| ① Zotero 插件 | 茉莉花、Better Notes、zotero-reference、scite、Linter、Green Frog… + 我补充的 20 个精选插件 |
| ② DSH Desktop 安装 | 从官网下载、Windows/macOS 图文安装、首次向导、配置模型 API Key、五个基础操作、故障排查 |
| ③ DSH 插件区 | 文献三件套（dsh-zotero / zotero-mcp-dsh / zotero-harvest）+ dsh-literature + 必装基础件 + 学术专项 + 安装顺序清单 |
| ④ 科研实战 | 技能安装三种方法、学术 Skill 榜单用法、工作目录规范、10 站流水线、10 个可直接抄的场景、七条铁律 |
| 附录 A/B/C | 学术 Skill 榜单 Top 50 · 生信技能工具箱 · 排查表与质检清单 |

---

## 在线手册有什么

| 功能 | 说明 |
| --- | --- |
| 🗂 侧栏导航 | 按「部分 → 小节」逐级展开，当前小节自动高亮（滚动联动） |
| 🔍 全文搜索 | `Ctrl / ⌘ + K` 打开，搜插件名、命令、章节名，直接跳转 |
| 🌗 明暗主题 | 跟随系统 / 手动切换，正文字号与行距按长文阅读调优 |
| 📄 一键复制 | 每段命令右上角「复制」，粘贴即用 |
| 📊 速查表 | 55 张表格，表头吸顶、斑马纹、横向滚动 |
| 📈 阅读进度 | 顶部进度条 + 上下部分翻页 |
| 📱 移动端 | 侧栏变抽屉，单手可用 |
| 🖨 打印友好 | `Ctrl+P` 直接出干净的纸质版 |
| ⬇️ 离线下载 | DOCX（Word）与 Markdown 源文件随站点发布 |

---

## 仓库结构

```text
.
├── awesome_zotero_plugins.md      # ✍️ 唯一内容源（Markdown）
├── docx/
│   └── DSH科研工具手册.docx        # 由 Markdown 自动生成的 Word 版本
├── tools/
│   ├── build-docx.mjs             # Markdown → DOCX（docx-js 渲染器）
│   └── check-docx.py              # DOCX 结构自检
├── web/                           # Next.js 静态站点
│   ├── scripts/build-content.mjs  # Markdown → 站点数据（分部分/分小节/HTML/检索索引）
│   ├── app/                       # App Router 页面
│   ├── components/                # Shell（侧栏/顶栏/搜索）与渐进增强
│   └── content/handbook.json      # 构建产物
└── .github/workflows/deploy-pages.yml
```

**只维护一份 Markdown**：改完 `awesome_zotero_plugins.md` 后重新构建，Word 版与网页版会一起更新。

---

## 本地构建

```bash
# 0) 准备（Node ≥ 20）
npm install                 # DOCX 工具链
npm --prefix web install    # 站点依赖

# 1) 生成 Word 版
npm run build:docx          # → docx/DSH科研工具手册.docx

# 2) 本地预览站点（http://localhost:3000）
npm run dev

# 3) 一次性构建两边
npm run build               # → docx/*.docx + web/out/
```

> 站点是 `output: 'export'` 的纯静态产物，`web/out/` 可直接丢到任何静态托管。

### 自检脚本

```bash
python tools/check-docx.py <解包后的目录>        # DOCX 结构与样式自检
cd web && python scripts/check-links.py          # 站内链接 / 锚点自检（应为 0 断链）
cd web && python scripts/qa-out.py               # 导出产物关键元素自检
```

---

## 部署

推送到 `main` 后，GitHub Actions 会：

1. `npm ci` → `npm run build:docx`：重新生成 Word 版
2. `web` 目录 `npm ci` → `NEXT_PUBLIC_BASE_PATH=${{ steps.pages.outputs.base_path }}` → `npm run build`
3. 把 `web/out` 上传为 Pages artifact 并发布

**首次使用需要在仓库设置里开启**：`Settings → Pages → Build and deployment → Source: GitHub Actions`。

---

## 内容说明与免责

- 手册中列出的第三方插件、技能仓库均为**社区开源项目**，版权归各自作者所有；收录不代表质量或安全背书。
- 涉及科学文献下载的插件，请优先使用**机构订阅、预印本、Unpaywall** 等合规途径。
- 论文的结论、数据与署名责任始终在作者本人；AI 是工具，不是作者。

## 许可

本仓库内容采用 [MIT License](./LICENSE)。

---

<div align="center">
Made for 生物信息学的妹妹 💚
</div>
