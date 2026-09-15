# 项目约定 · awesome-dsh-zotero

> 本文件只写**这个项目特有**的事。模型路由 / 省 token 策略在用户级 `~/.dsh/AGENTS.md`，不要在这里重复。

## 这是什么

面向生物信息学方向研究生的科研工具手册：**Zotero 插件 + DSH Desktop + DSH 插件精选 + 科研实战**。
产出三个形态：Word 版、GitHub 仓库、GitHub Pages 在线手册。

- 在线手册：<https://anonymous99-rise.github.io/awesome-dsh-zotero/>
- 仓库：<https://github.com/anonymous99-Rise/awesome-dsh-zotero>

## 唯一内容源原则

**只改 `awesome_zotero_plugins.md`**，DOCX 和站点都由它自动生成：

```bash
npm install                 # DOCX 工具链（docx + marked + adm-zip + mammoth）
npm --prefix web install    # 站点依赖

npm run build:docx          # → docx/DSH科研工具手册.docx
npm run dev                 # 本地预览站点 → http://localhost:3000
npm run build               # 两边一起构建 → docx/*.docx + web/out/
```

推送到 `main` 后 CI 会重新生成 DOCX + 重建站点 + 发布 Pages。**不要手改生成物**
（`docx/*.docx`、`web/content/`、`web/public/downloads/`、`web/out/`）。

## 改完必跑的自检

```bash
node tools/verify-docx.mjs                 # 结构（mammoth）+ 规范（officecli）双检
cd web && python scripts/check-links.py    # 站内链接/锚点，必须 0 断链
cd web && python scripts/qa-out.py         # 页面关键元素
```

改排版时另跑：`python tools/detect-orphan-rules.py <pdf>` 扫孤立分隔线（应为 0）。

## 这个项目的坑

| 坑 | 说明 |
| --- | --- |
| **DOCX 排版回归** | 改 `tools/build-docx.mjs` 后必须渲染成 PDF 逐页看；只验证 XML 合法会漏掉"能打开但难看" |
| **表格列宽** | 列宽要按「渲染后的可见文字」估算；`<https://…>` 自动链接会被 `plain()` 当 HTML 标签删掉 |
| **有序列表** | 每个列表要独立的 numbering `instance`，否则全文连号（会出现「14.」） |
| **悬空样式** | docx-js 不输出 `Normal` / `DefaultParagraphFont`，需在 zip 后处理里补写（officecli 会报） |
| **自定义域名** | 站点按项目路径构建（资源带 `/awesome-dsh-zotero/`）；换域名后**必须重跑 workflow**，否则 CSS/JS 全 404 |
| **officecli 路径** | 用 `%LOCALAPPDATA%\OfficeCli\officecli.exe`；npm 全局那个是 0.2.121 启动器，非 TTY 会报错 |
| **PowerShell 引号** | 别写内联 `python -c "…"`，用脚本文件；含中文的路径加 `-LiteralPath` |

## 提交风格

中文提交信息：一行标题 + 要点式正文，说明「改了什么 / 为什么 / 怎么验证的」。
