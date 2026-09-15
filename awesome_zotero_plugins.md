# 🧬 科研工具手册：Zotero 插件 + DSH 上手（小白版）

> **写给妹妹的** 👧
> 这份文件分四块：
> **① Zotero 插件**（管文献）→ **② DSH Desktop 安装**（把 AI 装进电脑）
> → **③ DSH 插件区**（我的精选推荐 + 安装方法）→ **④ 科研实战**（生信版的用法 + 能直接抄的提示词）
>
> 不懂技术没关系，**每一步都写了"点哪里、打什么字"**。遇到看不懂的词，直接跳过继续往下做，做完再回头看。

| 项 | 值 |
| --- | --- |
| 文档版本 | v3.1（小白版 · 生物信息学向 · 含 DSH 插件区） |
| 适合谁 | 生物信息学 / 生命科学 方向的本科/研究生 |
| 电脑要求 | **Windows 10/11 x64** 或 **macOS**（Intel / Apple 芯片都可以）；⚠️ 暂不支持 Linux |
| 预计上手时间 | 装完 DSH 约 **15 分钟**；跑通第一个科研任务约 **30 分钟** |
| 花钱吗 | 软件**完全免费**（开源）。只有调用 AI 模型会按用量计费，见 [2-6 节](#2-6-配置模型最重要的一步) |

---

## 目录

**① Zotero 插件**
- [1. Jasminum 茉莉花](#1-jasminum-茉莉花--中文文献)
- [2. Zotero Style](#2-zotero-style--论文进度可视化)
- [3. Zotcard](#3-zotcard--卡片笔记模板)
- [4. Better Notes](#4-better-notes--笔记中枢)
- [5. zotero-reference](#5-zotero-reference--一键抓参考文献)
- [6. scite](#6-scite--判断论文靠不靠谱)
- [7. Sci-Hub](#7-sci-hub--英文全文)
- [8. Actions & Tags](#8-actions--tags--快捷键打标签)
- [9. Linter](#9-linter-for-zotero--元数据自动清洗)
- [10. Green Frog](#10-green-frog--影响因子与分区)
- [11. 补充推荐插件](#11-补充推荐插件我替你挑的)

**② DSH Desktop 安装（手把手）**
- [2-1. 先搞清楚：DSH 是什么](#2-1-先搞清楚dsh-到底是什么)
- [2-2. 下载](#2-2-下载认准这两个入口)
- [2-3. Windows 安装](#2-3-windows-安装图解)
- [2-4. macOS 安装](#2-4-macos-安装图解)
- [2-5. 首次启动向导](#2-5-首次启动跟着向导点)
- [2-6. 配置模型（最重要的一步）](#2-6-配置模型最重要的一步)
- [2-7. 五个基础操作](#2-7-五个基础操作必须会)
- [2-8. 装插件 / 更新 / 出问题怎么办](#2-8-装插件更新出问题了怎么办)

**③ DSH 插件区（重点推荐）**
- [3-0. 装插件的通用方法](#p3-0)
- [3-1. ⭐ 文献工作三件套（你点名的）](#p3-1)
- [3-2. ⭐⭐ dsh-literature 文献侧窗](#p3-2)
- [3-3. 🔧 必装基础件](#p3-3)
- [3-4. 🎓 学术科研专项插件](#p3-4)
- [3-5. 🎨 让界面好用的插件](#p3-5)
- [3-6. ⚠️ 装插件的四条纪律](#p3-6)
- [3-7. 给她的安装顺序清单](#p3-7)

**④ 科研实战（生信版）**
- [4-1. 什么是"技能"，为什么它是核心](#4-1-什么是技能为什么它是核心)
- [4-2. 技能怎么装（三种方法）](#4-2-技能怎么装三种方法)
- [4-3. 怎么用 awesome-academic-research-skills 榜单](#4-3-怎么用-awesome-academic-research-skills-榜单)
- [4-4. 给她的工作目录长这样](#4-4-给她的工作目录长这样)
- [4-5. 科研流水线 10 站](#4-5-科研流水线-10-站)
- [4-6. 十个可以直接抄的场景](#4-6-十个可以直接抄的场景)
- [4-7. 把 Zotero 和 DSH 连起来](#4-7-把-zotero-和-dsh-连起来)
- [4-8. 七条铁律](#4-8-七条铁律别踩坑)

**附录**
- [附录 A · 学术 Skill 榜单 Top 50](#附录-a--学术-skill-榜单-top-50)
- [附录 B · 生信技能工具箱](#附录-b--生信技能工具箱)
- [附录 C · 排查表 + 质检清单](#附录-c--排查表--质检清单)

---

# ① Zotero 插件

> Zotero 是**管文献**的工具：存 PDF、记笔记、自动生成参考文献。
> 下面每个插件解决一个具体痛点，**先装 ⭐ 的，其他按需再装**。

## 1. Jasminum 茉莉花 — 中文文献

中文文献必备。没有它，知网条目只能一条条手动录。

| 能力 | 说明 |
| --- | --- |
| 📥 知网数据抓取 | 添加中文 PDF/CAJ 时自动抓引用次数、作者、年份 |
| 👤 姓名拆分/合并 | 把"张三"规范成 姓=张、名=三 |
| 🏷️ 自动拉知网元数据 | ⚠️ **默认关闭**，要去设置里打开；按**文件名**匹配，**文件名必须含中文**，纯英文名无效 |
| 🔄 译者信息更新 | 定期更新中文 translators 库 |

**建议顺序**：先装茉莉花 → 打开"自动拉取知网元数据" → 再用 Linter 清洗字段。

## 2. Zotero Style — 论文进度可视化

- 也叫 **Ethereal Style**（梅花标注插件）
- 下载：<https://github.com/MuiseDestiny/zotero-style/releases/tag/3.2.3>

**配套 emoji 网站**（复制 emoji 用）：<https://www.emojiall.com/en/copy#google_vignette> · <https://emojipedia.org/>

**设置评级/标签的 5 步**（照做）：

| 步骤 | 点哪里 |
| --- | --- |
| 1 | 点击 **评级** |
| 2 | 点击 **列设置** |
| 3 | 选喜欢的图案和颜色 |
| 4 | **保存** |
| 5 | 选中论文 → 应用设置 |

> 💡 建议把「进度 / 评级 / 标签」摆成三列并排，扫一眼就知道今天该读哪篇。

## 3. Zotcard — 卡片笔记模板

- 下载：<https://github.com/018/zotcard/releases>
- 模板库：<https://github.com/018/zotcard/discussions/2>

固定字段记笔记：**研究问题 / 方法 / 数据 / 结论 / 可复用点 / 我的质疑**。几十篇笔记结构一致，后面写综述才好对比。

## 4. Better Notes — 笔记中枢

- 下载：<https://github.com/windingwind/zotero-better-notes/releases>

把"阅读时的零散高亮"变成"结构化、能导出、能复用"的笔记。可导出 **Markdown / Word / PDF / 思维导图**（配合 Zotcard 一键转脑图）。

**两种笔记，分工完全不同（重要）：**

| 类型 | 挂在哪 | 回答什么问题 |
| --- | --- | --- |
| **条目笔记** | 挂在某篇文献下面 | 「**这篇论文讲了什么**」 |
| **独立笔记** | 不挂文献，像主题本子 | 「**这个方向我怎么理解、怎么串起来**」 |

> 🧠 只写条目笔记 = 一堆剪报；只写独立笔记 = 无法溯源。**两个都要写。**

## 5. zotero-reference — 一键抓参考文献

- 下载：<https://github.com/MuiseDestiny/zotero-reference/releases/tag/0.5.8>

1. 打开论文，右侧栏自动列出**这篇引用的所有文献**
2. 单击某条 → 直接看摘要，判断值不值得读
3. 点 **➕** → 加入 Zotero，并**自动关联**到当前论文

> 效果：边读边织一张"文献网"，顺着引用往下走。

## 6. scite — 判断论文靠不靠谱

- 下载：<https://github.com/scitedotai/scite-zotero-plugin/releases>

自动统计这篇论文被后续研究**支持支持 / 反驳 / 提及**的次数和原句。

> 写综述时用它区分：「被反复验证的结论」vs「已经被推翻的结论」。

## 7. Sci-Hub — 英文全文

- 下载：<https://github.com/ethanwillis/zotero-scihub/releases>

按 DOI 自动下载 PDF。

> ⚠️ 合规和可用性因地区/机构而异。**优先走学校图书馆订阅、arXiv/bioRxiv 预印本、[Unpaywall](https://unpaywall.org/)**，这个插件当最后兜底。

## 8. Actions & Tags — 快捷键打标签

- 下载：<https://github.com/windingwind/zotero-actions-tags>

**快捷键速查：**

| 快捷键 | 标签 | 含义 |
| --- | --- | --- |
| `Ctrl+Shift+@` | 📖 | 正在读 |
| `Ctrl+Shift+!` | ✅ | 已读 |
| `Ctrl+Shift+#` | ❌ | 不需要读 |
| `Ctrl+Shift+~` | 😀 | 对当前的我有用 |
| `Ctrl+Shift+$` | 🚀 | 未来可以做 |
| `Ctrl+Shift+Backspace` | — | 移除当前所有标签 |

**配置模板**（已修好缩进，可直接导入；原笔记那版缩进错了，导入会失败）：

```yaml
# tags_templates.yml
type: ActionsTagsBackup
author: mapengsen
platformVersion: 7.0.3
pluginVersion: 2.0.0
timestamp: '2024-09-03T13:27:07.522Z'
actions:

  1725368316262-n32ukLqm:            # 移除当前所有标签
    event: 0
    operation: 4
    data: >-
      // Remove tags from parent items
      // @author Yang1824, windingwind
      // @link https://github.com/windingwind/zotero-actions-tags/discussions/127
      // @usage Shortcut

      if (!item) return;

      let parentItem = Zotero.Items.getTopLevel([item])[0];

      parentItem.getTags().map((tag) => tag.tag).forEach((tag) =>
      { parentItem.removeTag(tag) })
    shortcut: Shift,Ctrl,Backspace
    enabled: true
    menu: ''
    name: 移除当前所有标签
    showInMenu:
      item: false
      collection: false
      tools: false
      reader: false
      readerAnnotation: false

  1725369688225-n32ukLqm:            # 未来可以做
    event: 0
    operation: 1
    data: 🚀
    shortcut: Shift,Ctrl,$
    enabled: true
    menu: ''
    name: 未来可以做
    showInMenu:
      item: false
      collection: false
      tools: false
      reader: false
      readerAnnotation: false

  1725367249413-n32ukLqm:            # 对当前的我有用
    event: 0
    operation: 1
    data: 😀
    shortcut: Shift,Ctrl,~
    enabled: true
    menu: ''
    name: 对当前的我有用
    showInMenu:
      item: false
      collection: false
      tools: false
      reader: false
      readerAnnotation: false

  1725366893716-n32ukLqm:            # 不需要读
    event: 0
    operation: 1
    data: ❌
    shortcut: Shift,Ctrl,#
    enabled: true
    menu: ''
    name: 不需要读
    showInMenu:
      item: false
      collection: false
      tools: false
      reader: false
      readerAnnotation: false

  1725367048305-n32ukLqm:            # 正在读
    event: 0
    operation: 1
    data: 📖
    shortcut: Shift,Ctrl,@
    enabled: true
    menu: ''
    name: 正在读
    showInMenu:
      item: false
      collection: false
      tools: false
      reader: false
      readerAnnotation: false

  1725365699457-n32ukLqm:            # 已读
    event: 0
    operation: 1
    data: ✅
    shortcut: Shift,Ctrl,!
    enabled: true
    menu: ''
    name: 已读
    showInMenu:
      item: false
      collection: false
      tools: false
      reader: false
      readerAnnotation: false
```

## 9. Linter for Zotero — 元数据自动清洗

- 下载：<https://github.com/northword/zotero-format-metadata>

| # | 能力 |
| --- | --- |
| 1 | 标题修改工具栏 |
| 2 | 加重复文献时自动检查 |
| 3 | 期刊全名 → 自动转标准缩写 |
| 4 | 按 DOI 自动补日期、卷、期、页码 |
| 5 | 按标题自动判断条目语言 |
| 6 | 批量统一条目展示样式 |

## 10. Green Frog — 影响因子与分区

- 下载：<https://github.com/redleafnew/zotero-updateifsE>

自动写入：JCR 分区、中科院分区（基础版/升级版）、影响因子 / 5 年影响因子、EI、预警名单；中文期刊还会补 **CSCD、北大核心、南大核心、科技核心**。

> 📚 更多插件：<https://zotero-chinese.com/plugins/>

## 11. 补充推荐插件（我替你挑的）

> ⭐ = 装了基本不会卸；按「先补管道 → 再补体验 → 最后补智能」排序。

### 🧱 基础设施（建议先装这三个）

| 插件 | 干什么用的 | 下载 |
| --- | --- | --- |
| ⭐ **Zotero Add-on Market** | **插件商店**：在 Zotero 里搜索、一键安装和更新，不用手动拖文件 | <https://github.com/syt2/zotero-addons> |
| ⭐ **Better BibTeX** | 固定引用键（citekey），一键导出 `.bib` 给 LaTeX / Overleaf / Word 用 | <https://github.com/retorquere/zotero-better-bibtex> |
| ⭐ **Attanger** 或 **ZotMoov** | 附件自动重命名 + 自动归档到指定文件夹，附件永不"丢失" | <https://github.com/MuiseDestiny/zotero-attanger> · <https://github.com/wileyyugioh/zotmoov> |

> **Better BibTeX 为什么重要**：写论文时的引用键一旦变了，全文 `\cite{}` 全废。它保证引用键永远不动。

### 👀 阅读体验

| 插件 | 用途 | 下载 |
| --- | --- | --- |
| ⭐ **Translate for Zotero** | 划词翻译 + 双语对照，支持 DeepL/Google/自备 AI 接口 | <https://github.com/windingwind/zotero-pdf-translate> |
| ⭐ **PDF2zh** | **整篇 PDF 双语重排**，版式和图表都保留，长文精读神器 | <https://github.com/guaguastandup/zotero-pdf2zh> |
| **Zotero OCR** | 扫描版 PDF 做 OCR，之后才能检索/翻译/高亮 | <https://github.com/UB-Mannheim/zotero-ocr> |
| **Night for Zotero** | 夜间模式 | <https://github.com/windingwind/zotero-night> |
| **Zotero PDF Preview** | 列表里直接预览 PDF 首页 | <https://github.com/windingwind/zotero-pdf-preview> |
| **Zotero Reading List** | 未读/在读/已读完 三态管理阅读队列 | <https://github.com/Dominic-DallOsto/zotero-reading-list> |

### 🧹 数据整理

| 插件 | 用途 | 下载 |
| --- | --- | --- |
| ⭐ **Zotero Storage Scanner** | 找出孤立附件/缺失附件，给硬盘瘦身 | <https://github.com/retorquere/zotero-storage-scanner> |
| **Zotero Duplicates Merger** | 批量合并重复条目 | <https://github.com/frangoud/ZoteroDuplicatesMerger> |
| **Journal Abbr** | 批量抓期刊标准缩写 | <https://github.com/redleafnew/zotero-journalabbr> |
| **Zotero DOI Manager** | 校验/补全 DOI，专治脏数据 | <https://github.com/bwiernik/zotero-shortdoi> |
| **Zotero Citation Counts** | 自动拉引用次数 | <https://github.com/eschnett/zotero-citationcounts> |

### 🔍 研究洞察

| 插件 | 用途 | 下载 |
| --- | --- | --- |
| ⭐ **Zotero Cita** | 把引用/被引/共引画成关系图，一眼看到领域枢纽论文和空白点 | <https://github.com/MuiseDestiny/zotero-cita> |
| **Zotero GPT** | 在 Zotero 里直接问 AI（需自备接口） | <https://github.com/MuiseDestiny/zotero-gpt> |
| **mdnotes** | 高亮/笔记导出 Markdown，喂给写作工作目录 | <https://github.com/argenos/zotero-mdnotes> |

**按预算选组合：**

| 档位 | 装这些 | 效果 |
| --- | --- | --- |
| 🥉 基础 | Add-on Market + Better BibTeX + Attanger + Translate | 装得上、引得出、附件不乱、看得懂 |
| 🥈 主力 | ＋茉莉花 + Better Notes + Linter + Green Frog + PDF2zh + Storage Scanner | 中英文通吃、笔记结构化、数据干净 |
| 🥇 全栈 | ＋Zotero Cita + scite + mdnotes | 能看领域结构，笔记能直接进写作流程 |

---

# ② DSH Desktop 安装（手把手）

## 2-1 先搞清楚：DSH 到底是什么

用一句话说：

> **Zotero 帮你"存"文献，DSH 帮你"干活"。**
> 读文献、跑生信分析、画图、写论文、改稿、做组会 PPT —— 这些都能让 DSH 里的 AI 帮你做，而且它是在**你自己电脑的文件夹里**干活，产出的是**真实文件**。

几个你会反复看到的词：

| 词 | 大白话 |
| --- | --- |
| **DSH Desktop** | 装在电脑上的一个 App（有窗口、有托盘图标），打开就能用 |
| **DeepSeek Harness (DSH)** | 真正在后台干活的"AI 引擎"，DSH Desktop 是它的桌面外壳 |
| **Agent（智能体）** | 就是那个会跟你对话、能读写你文件、能跑命令的 AI 助手 |
| **工作区（Workspace）** | 你授权给 AI 的文件夹。**只在这个文件夹里它能动文件** |
| **会话（Session）** | 一次聊天记录。换项目就新建一个会话 |
| **技能（Skill）** | 一份"操作说明书"，告诉 AI 遇到某类任务该怎么专业地做（比如"怎么做差异表达分析"） |
| **插件（Plugin）** | 给 DSH 加功能的小扩展包，像手机装 App |

> ⚠️ **DSH Desktop 是社区开源项目**（MIT 许可），不是 DeepSeek 官方出品，但底层用的是官方 DeepSeek Harness。**完全免费，如果有人让你付钱买这个软件，直接拒绝。**

## 2-2 下载（认准这两个入口）

网上有两个同源的社区桌面版，**都免费、都开源、随便选一个就行**。我建议用第一个（功能更全，内置插件市场）：

| 推荐度 | 入口 | 说明 |
| --- | --- | --- |
| ⭐ **首选** | **<https://www.dshdesktop.cn/>** <br> GitHub：<https://github.com/anywhere-labs/deepseek-harness-desktop> | 就是你发的 `anywhere-labs/dsh-desktop`（会跳转到这个仓库）。支持 Windows x64 + macOS（Intel/Apple 芯片通用），内置插件市场和设置向导 |
| 🔁 备选 | **<https://www.dshdesktop.com/zh/>** <br> GitHub：<https://github.com/dataelement/dsh-desktop> | 同生态的另一条线，多一个「PPT 生成」特色功能（16 套模板） |

**下载时选哪个文件：**

| 你的电脑 | 下载这个 |
| --- | --- |
| Windows 10/11（绝大多数笔记本） | `DSH Desktop Setup ... .exe`（Windows x64） |
| Mac（M1/M2/M3/M4 芯片） | `... arm64.dmg` 或标着 **Universal** 的 dmg |
| Mac（Intel 芯片，2019 年前的老机型） | `... x64.dmg` |
| Linux | ❌ **暂时没有 Linux 版**（下面[有说明](#linux-用户怎么办)） |

> 💾 安装包有几百 MB 是正常的 —— 它把运行环境都打包进去了，**你不需要另外装 Node.js、Python 环境之类的东西**。
> ⏳ 官网下载如果很慢，就用 GitHub 的 `Releases` 页面下（找带 **Latest** 标记的正式版）。

## 2-3 Windows 安装图解

**第 1 步 · 下载安装包**
点官网的下载按钮 → 文件一般会存到 `下载 (Downloads)` 文件夹 → 文件名类似 `DSH-Desktop-Setup-2.0.10.exe`。

**第 2 步 · 双击运行**

如果出现蓝色的 **"Windows 已保护你的电脑"**（SmartScreen 提示）：

1. 点左边的小字 **「更多信息」**
2. 再点右下角 **「仍要运行」**

> 为什么会有这个提示？因为这是个新发布的开源项目，微软的"发布者信誉"还在积累中。**这是正常现象，不是病毒提示**（官方 README 里也专门说明了）。

**第 3 步 · 跟着安装向导点**

| 向导页面 | 你会看到什么 | 怎么选 |
| --- | --- | --- |
| 欢迎 | "欢迎使用 DSH Desktop 安装向导" | 点 **下一步** |
| 安装位置 | 默认 `C:\Users\你的用户名\AppData\Local\Programs\DSH Desktop` | **直接下一步**（不用改） |
| 附加任务 | 创建桌面快捷方式 | 都勾上 → **下一步** |
| 准备安装 | 摘要 | 点 **安装** |
| 完成 | "安装完成" | 点 **完成**，程序会自动打开 |

**第 4 步 · 第一次启动会比较慢**
要初始化运行环境，**等 10~60 秒**，然后会弹出设置向导。**此时先别急着关窗口。**

## 2-4 macOS 安装图解

**第 1 步 · 下载 `.dmg` 文件**

**第 2 步 · 双击打开 DMG**
会弹出一个窗口，里面是 `DSH Desktop` 图标和 `Applications` 文件夹。

**第 3 步 · 把图标拖进 Applications**
用鼠标把左边的 App 图标**拖到右边的 Applications 文件夹**上，然后关掉这个窗口。

**第 4 步 · 从"启动台"打开 DSH Desktop**

如果弹窗说 **"无法打开，因为 Apple 无法验证开发者"**：

- **方法 A**：右键（或 Control + 点击）App 图标 → 选 **打开** → 再点 **打开**
- **方法 B**：`系统设置 → 隐私与安全性` → 往下找到那条提示 → 点 **仍要打开**

**第 5 步 · 等待初始化，弹出设置向导**

## 2-5 首次启动：跟着向导点

第一次打开会有一个 **设置向导（Setup Wizard）**，它会问你几个偏好。**照着下表选就行：**

| 向导选项 | 建议选择 | 为什么 |
| --- | --- | --- |
| **窗口模式** | **扩展窗口** | 界面最完整、最好看 |
| **系统材质** | Windows 11 → **Mica**；Mac → **透明** | 好看；老系统会自动关闭，不影响使用 |
| **插件市场** | **开启** | 以后一键装插件要用 |
| **通知** | **开启** | 长任务跑完会弹通知，你可以去干别的 |
| **用系统默认浏览器自动打开** | **关闭** | 直接在 App 窗口里用就好，不用多开一个浏览器 |
| **Web 访问范围** | **仅本机（127.0.0.1）** | 🔒 重要！别开"局域网访问"，开了之后同一个 WiFi 下任何人都能操作你的电脑 |
| 不想选 | 也可以直接 **跳过** | 之后随时能在设置里改 |

> 向导没走完之前，主界面不会启动 —— 所以**它让你点几步，就点几步**。

## 2-6 配置模型（最重要的一步）

AI 的"大脑"不在软件里，要连接一个模型服务。**没有这一步，App 打开了也用不了。**

**操作路径：**
`设置（⚙️）→ 模型 → 添加提供方 / 自定义提供方`

**最省事的方案：用 DeepSeek 官方**

1. 浏览器打开 <https://platform.deepseek.com/> → 注册账号
2. 进「API Keys」→ 创建一个 Key → **复制**（一串 `sk-` 开头的字）
3. 回到 DSH → 在 **「输入 API 密钥」** 框里粘贴 → 点 **「获取可用模型」**
4. 在模型列表里勾一个（见下表）→ **保存并继续**

| 场景 | 推荐模型 | 说明 |
| --- | --- | --- |
| 日常问答、跑脚本、看图 | **DeepSeek V4 Flash** | 便宜、快，够用 |
| 写长论文、长文献综述 | DeepSeek V4 **Pro** | 更聪明但更贵，重要场合再切 |
| 看图片/图表 | Flash **Vision** 版 | 需要选带视觉能力的模型 |

> 💰 **关于花钱**：模型是**按用量计费**的（按字数/长度算），不是包月。日常读写文献一个月一般几十块以内。**想省钱就：**
> - 默认用便宜模型，只在关键环节切贵的
> - 不要让 AI 反复"重跑一遍"整个分析
> - 分析代码本地跑，别把几十 MB 的数据丢给 AI 看（数据用脚本处理，AI 只看结果）
>
> 如果现在不方便申请，向导里有 **「稍后配置」**，以后再回来填。

**如果用的是其他模型服务**：选「自定义提供方」，填 **模型 ID** 和 **baseUrl**（服务商官网会给出），再填 API Key。

## 2-7 五个基础操作（必须会）

### ① 添加工作区（告诉 AI 能在哪个文件夹干活）

1. 点左侧/顶部的 **添加工作区**
2. 会弹出系统的文件夹选择框
3. **新建一个专属文件夹**，比如：
   - Windows：`D:\科研\我的第一个项目`
   - Mac：`~/科研/我的第一个项目`
4. 选中它 → 确认

> 🔒 **安全边界**：AI 只被允许在你添加的工作区里读写文件。别把整个 C 盘或桌面根目录加进去。

### ② 新建会话

点 **新建会话** → 选刚才那个工作区 → 开始打字。

> 一个项目一个会话，聊天记录会一直在。**换课题就新建一个**，不要一个会话用一年。

### ③ 先做一个"体检"

新会话里打这句话，测试模型通不通：

```text
你好，请用一句话介绍你自己，并告诉我你现在的工作目录是什么。
```

能正常回话 = 模型通了。

### ④ 打开终端（后面装技能要用）

- **方式 A**：右键点击系统托盘的 DSH Desktop 图标 → 选 **Open DSH Terminal**
- **方式 B**：设置里也有入口

Windows 上会优先打开 **Windows Terminal**（没有的话回退到 PowerShell）。

> 这个终端里可以用 `dsh` 命令管理插件。**它不会修改你的系统环境变量**，很安全。

### ⑤ 关窗口 ≠ 退出

点窗口的 ❌ **只是把窗口收进托盘**，AI 还在后台待着。

- **左键点托盘图标** → 重新打开窗口
- **右键点托盘图标** → 菜单：切换 Profile、打开终端、检查更新、退出
- **真正退出** → 菜单里选 **退出**

## 2-8 装插件 / 更新 / 出问题了怎么办

### 装插件

**方法一（推荐）**：App 里打开 **插件市场**（DSH Community Market，已内置）→ 搜索 → 点安装 → **重启 App**。

**方法二**：托盘 → Open DSH Terminal → 打命令：

```sh
dsh plugin add 插件名      # 安装
dsh plugin remove 插件名   # 卸载
dsh plugin update          # 更新全部
```

> ⚠️ 插件装完**必须重启 App**才生效。
> 📌 **具体装哪些插件？我在 [③ DSH 插件区](#p3-0) 里已经按"先装什么、后装什么"排好了，直接照着 3-7 的清单走。**

### 更新软件

托盘图标 → **检查更新（Check for Updates…）** → 确认后它会下载 → 你选"重新启动并安装"。
（后台每 6 小时也会自动检查一次，但**不会偷偷装**，会先问你。）

### 出问题了

| 症状 | 怎么办 |
| --- | --- |
| 窗口不见了 | 看系统托盘（右下角小图标区），点一下图标就回来了 |
| 插件装完没反应 | 确认是不是装到了当前 Profile，然后**重启 App** |
| 终端命令找不到 | 从托盘重新打开 DSH Terminal（它不改系统 PATH，只在那个终端里生效） |
| 界面打不开/一直闪退 | 用**安全模式**启动：它会临时屏蔽所有第三方插件。启动参数加 `--safe-mode` |
| 想给开发者报 bug | 托盘右键 → **导出诊断信息…**，会生成一个 `diagnostics-*.zip` |
| 完全卡死进不了托盘 | 在 PowerShell 里运行：<br>`& "$env:LOCALAPPDATA\Programs\DSH Desktop\DSH Desktop.exe" --export-diagnostics` |

### Profile 是什么（简单了解就行）

DSH 有 `default / desktop / web` 几套 **Profile**（可以理解为"不同的配置抽屉"）。托盘 → **Profile** 菜单可以切换。

> ✅ 对你的建议：**日常科研就用默认的那个**，不要来回切。切换时插件**不会**自动搬过去。

### <a id="linux-用户怎么办"></a>Linux 用户怎么办

目前**没有 Linux 桌面版**。如果你平时在 Linux 服务器上跑生信流程：

- ✅ **正确姿势**：DSH Desktop 装在**你的 Windows/Mac 笔记本**上，需要操作服务器时，在会话里让 AI 给你写命令，你复制到服务器的终端里跑；或者让 AI 帮你写 `ssh` / `scp` / `sbatch` 脚本。
- ✅ 服务器上装 `nextflow` / `conda` / `snakemake` 这些流程，AI 可以帮你**写 YAML 和脚本**，本地编辑、服务器执行。
- ❌ 不要指望把 DSH Desktop 装到服务器上当 GUI 用。

---

<a id="p3-0"></a>

# ③ DSH 插件区（重点推荐）

> **插件 = 给 DSH 装"外挂"。** 技能（④）是"说明书"，插件是"新器官"——它能让 AI 多出一些**真正能用的工具**，比如直接翻你的 Zotero 文库、解析 PDF、跑 Python、看图片。
>
> ⚠️ **先看 3-0 的通用方法，再挑插件；不知道装什么就直接跳到 [3-7 清单](#p3-7)。**

## 3-0 装插件的通用方法（先看这个）

### 三种装法

| 方法 | 怎么做 | 适合 |
| --- | --- | --- |
| **① 插件市场** ⭐ | 打开 DSH → **插件市场**页面 → 搜索插件名 → 点安装 → **重启 App** | 小白首选 |
| **② 终端命令** ⭐ | 托盘 → **Open DSH Terminal** → 打 `dsh plugin add <插件名>` → **重启 App** | 市场里搜不到的 |
| **③ 从 GitHub 装** | `dsh plugin add github:作者/仓库名` | 作者没发到 npm 的 |

**常用命令（在 DSH 终端里打）：**

```sh
dsh plugin add <插件名>       # 安装（默认装到当前用的 profile）
dsh plugin remove <插件名>    # 卸载
dsh plugin update            # 更新已装的全部插件
dsh plugin --profile web add <插件名>   # 指定装到某个 profile
```

> 💡 **先确认插件到底叫什么名字**：去它的 GitHub 页面看 README 的第一段，那里一定写了安装命令。**直接抄作者给的命令最稳。**
> 💡 **DBH Desktop 的终端已经绑定你当前用的 profile**，所以不用每次写 `--profile`。

### 装完必做三件事

1. **重启 App**（托盘右键 → 退出，再打开）—— 90% 的"装了没反应"都是忘了这步
2. **开一个新会话**（旧会话可能没加载到新工具）
3. **验证**：在会话里问一句「你现在有哪些工具？」或「列出你所有的工具」，看新插件在不在

### ⚠️ 三个坑，先记住

| 坑 | 说明 |
| --- | --- |
| **工具名冲突** | 同类插件可能注册**同名工具**（比如好几个插件都有 `zotero_search`），同时装会互相打架 → **同类只装一个** |
| **依赖要求** | 有的插件要 Zotero 开着、有的要 Node 20+、有的要 Docker/Linux → **装之前先扫一眼 README 的"前置条件"** |
| **没写版本号 = 随时会变** | 尽量选 README 里给了明确安装命令、最近有更新的插件 |

### 装之前可以先"体检"（可选但推荐）

| 插件 | 作用 |
| --- | --- |
| [dsh-plugin-doctor](https://github.com/lin-cheng-lab/dsh-plugin-doctor) | 装任何插件前检查：仓库能不能访问、bundle 声明、peer 依赖、和你本地 DSH 版本是否兼容 |
| [dsh-plugin-check](https://github.com/omdsh-dev/dsh-plugin-check) | 扫描插件仓库的清单协议 / patch 格式 / 常见踩坑 |

---

<a id="p3-1"></a>

## 3-1 ⭐ 文献工作三件套（你点名的）

> 这三个都是**把 Zotero 接进 DSH**，但**定位完全不同**。我先说结论：
> **日常读文献用第一个，写 LaTeX 论文用第二个，做大综述/批量采集用第三个。**

### 🔧 三者的共同前置条件（很重要）

1. 本机装 **Zotero 7 及以上**（推荐 Zotero 8/9），并且**保持运行**
2. 打开 Zotero → `设置 → 高级 → 通用` → 勾选 **「允许本机上的其他应用程序与 Zotero 通信」**
3. Zotero 默认监听 `http://127.0.0.1:23119`，**不需要 API Key**

> 检查有没有通：浏览器打开 <http://127.0.0.1:23119/api/users/0/items?limit=2>，能出 JSON 就是通了。
> 打不开 = Zotero 没开，或者上面那个勾没勾。

---

### 📚 ① dsh-zotero —— 让 AI 直接读你的 Zotero 文库

- **仓库**：<https://github.com/Hongcheng-LI/dsh-zotero>
- **一句话**：搜索文库、读元数据/摘要/全文、列附件、把 PDF 下载到会话工作区、读写笔记

**安装：**

```sh
dsh plugin add dsh-zotero
```

（或从 GitHub：`dsh plugin add github:Hongcheng-LI/dsh-zotero`，装完重启 App）

**它给你的 9 个工具：**

| 工具 | 干什么 |
| --- | --- |
| `zotero_collections` | 列出所有分类（含每个分类的条目数），用来限定检索范围 |
| `zotero_search` | 关键词检索（标题/作者/年份），可按类型、分类、标签、年份区间筛选、排序、分页 |
| `zotero_recent` | 列出最近导入的条目（"我刚加的文献"场景） |
| `zotero_item` | 按 key 读一条的完整元数据：作者、期刊、DOI、摘要、标签、附件 |
| `zotero_fulltext` | 读全文纯文本：优先用 Zotero 自己的全文缓存（**零下载**），没有再现场解析本地 PDF |
| `zotero_attachment_path` | 直接返回附件在硬盘上的绝对路径，让 AI 零拷贝直读 |
| `zotero_download` | 把条目的 PDF 下载到你的会话工作区 |
| `zotero_notes` | 列出某条目的子笔记，或全库搜笔记正文 |
| `zotero_note` | 笔记写入（⚠️ 见下方"注意"） |

**可以这样用（直接抄）：**

```text
在我的 Zotero 里搜一下 "single cell" 相关的论文，挑 2020 年以后的，
把第一篇的全文读一遍，给我写一份结构化摘要，存成笔记。
```

**⚠️ 注意**：
- **笔记写入多数版本用不了** —— Zotero 本地 API 一般是只读的（POST/PATCH/DELETE 没开放），插件会明确提示，不会静默失败。**要写笔记还是手动在 Zotero 里写。**
- 附件下载默认存到**会话工作区**，想固定目录可以在配置里改。

**可选配置**（在 profile 的 `cordis.patch.yml` 里改 `tool-zotero` 行）：`baseUrl`、`library`（user 或 group:群组ID）、`downloadDir`、`maxAttachmentBytes`（默认 64MB）、`maxFulltextChars`（默认 80000）、`maxLimit`（默认 50）。

---

### 🔗 ② zotero-mcp-dsh —— 专为写论文 / LaTeX

- **仓库**：<https://github.com/LiJunfeng000000000000/zotero-mcp-dsh>
- **一句话**：把 Zotero 库变成 **MCP 工具**，重点是**导出 BibTeX + 生成 `\cite{}`** —— 写论文/毕业设计时最有用

**安装：**

```sh
dsh plugin add github:LiJunfeng000000000000/zotero-mcp-dsh
```

装完**重启 DSH**，工具列表里会出现 `mcp__zotero__*`。

**它给的 5 个工具（都带 `mcp__zotero__` 前缀，不会和别的插件撞名）：**

| 工具 | 干什么 |
| --- | --- |
| `zotero_search` | 按关键词/集合/年份搜，返回 itemKey、**citekey**、标题、作者、年份、期刊、DOI |
| `zotero_get_item` | 按 itemKey 取单条完整元数据（摘要、关键词、附件） |
| `zotero_get_fulltext` | 读 PDF 全文（用 Zotero 的全文索引），`maxChars` 控制长度 |
| `zotero_export_bibtex` | 按查询/集合/条目导出 **Better BibTeX 风格**的 BibTeX 文本（含 citekey） |
| `zotero_list_collections` | 列出全部集合 |

**写作工作流（作者给的 4 步）：**

```text
① 找文献 → ② 用全文核对内容 → ③ 生成 .bib 写进 references.bib → ④ 正文写 \cite{citekey}
```

**⚠️ 注意**：
- 这个插件是**只读**的，**不会**改你的 Zotero 库
- 强烈建议同时装 Zotero 的 [**Better BibTeX**](https://github.com/retorquere/zotero-better-bibtex) 插件，citekey 才稳定
- PDF 全文靠 Zotero 的全文索引；没索引的文献要去 Zotero 里右键「重新索引」

---

### 🌾 ③ zotero-harvest —— 自动"检索 → 判断够不够 → 入库"

- **仓库**：<https://github.com/Fisfzy/zotero-harvest>
- **一句话**：把「找文献 → 判断文献够不够 → 存进 Zotero → 能立刻被检索到」这条链路做成 **6 个确定性工具**。**做系统性综述时的"采集机"**

**它检索的免费数据源（都不需要 Key）：**

| 来源 | 用途 |
| --- | --- |
| OpenAlex | 主检索 + 开放获取状态 + 最佳 OA PDF |
| **Europe PMC** | **生物医学文献**（生信很对口）+ PDF 直链 |
| arXiv | 预印本 + 全文 PDF |
| Crossref | DOI 元数据 |
| Unpaywall | DOI → 免费全文链接 |
| Semantic Scholar | 默认源之一 |
| Google Scholar | 可选源（要走代理，容易失败） |

**6 个工具：**

| 工具 | 干什么 |
| --- | --- |
| `lit_fetch` | 多源检索 + 去重排序 + **解析每篇的免费下载链接**（传 DOI 或 arXiv ID 可精确定位） |
| `lit_paper_detail` | 下载 PDF → 抽全文 → 提取摘要/关键词/章节 → 生成"证据卡" |
| `lit_save` | 入库 Zotero（自动去重 + 挂 PDF 附件） |
| `lit_sufficiency_check` | **配额 + 子主题覆盖审计** → 告诉你"够不够、缺什么、下一轮搜什么" |
| `lit_download_links` | 批量解析免费下载链接 |
| `lit_review_run` | **一键跑完整循环**：检索 → 审计 → 不够就按缺口继续 → 达标后保存 |

**可用的对话：**

```text
用 lit_review_run 帮我做「肝癌 单细胞 免疫微环境」这个主题的文献采集：
至少 5 篇核心 + 10 篇总共，最多跑 3 轮，采完存进 Zotero 的「综述-肝癌」分类。
跑之前先告诉我你打算用哪些检索词。
```

**⚠️ 注意**：这个插件作者的安装方式是开发者式的（`dshx install zotero-harvest <插件目录>`），比前两个麻烦一点。
**如果你只是想用，先跳过它**，等前面的用熟了再回来折腾（README 写得很清楚，照着做）。

---

### 🌊 ④ 延伸：zotero-wave-rag —— 让检索"懂关系"

- **仓库**：<https://github.com/Fisfzy/zotero-wave-rag>
- **一句话**：面向 Zotero 库的 **RAG 检索系统**，直读 `zotero.sqlite`，能用上"标签关系网 + 全文 BM25 + 中英桥"
- **为什么值得知道**：普通检索只能找到"字面像"的论文；它还能顺着**共享标签/作者**往外跳，找到"语义不像但其实相关"的论文
- **工具**：`zotero_status`、`zotero_search`、`zotero_paper_detail`、`zotero_compare`（多篇并排对比）、`zotero_embedder`（切换嵌入模型）
- **嵌入模型可选**：`hash`（**免费离线**，开箱即用）/ `bge-m3`（推荐，需 API Key）/ Qwen 系列

**⚠️ 重要提醒：`dsh-zotero` 和 `zotero-wave-rag` 都注册了 `zotero_search` 这个工具名，别同时装，二选一。**
（`zotero-mcp-dsh` 的工具名带 `mcp__zotero__` 前缀，可以和它们共存。）

### 🧭 三件套怎么分工（一张表看懂）

| 你要干的事 | 装哪个 |
| --- | --- |
| 日常读文献、让 AI 翻我的库、读全文 | **dsh-zotero** |
| 写论文 / LaTeX / 需要 BibTeX 和 citekey | **zotero-mcp-dsh** |
| 做综述，要批量检索+判断+自动入库 | **zotero-harvest**（+ wave-rag 做检索） |
| 检索要"顺藤摸瓜"找相关文献 | **zotero-wave-rag**（换掉 dsh-zotero） |

---

<a id="p3-2"></a>

## 3-2 ⭐⭐ dsh-literature —— 文献侧窗（我最推荐先装这个）

- **仓库**：<https://github.com/Aik358/dsh-literature> ｜ **npm**：`@a9i5k4/dsh-literature`
- **一句话**：**一个插件顶四个**——文献库 + PDF 阅读器 + 划词翻译 + 引用格式生成器，而且**不装 Zotero 也能单独用**

**安装（一行命令）：**

```sh
dsh plugin add @a9i5k4/dsh-literature
```

装完重启 App，侧边栏会出现「**文献**」入口。

**它能干什么：**

| 能力 | 说明 |
| --- | --- |
| 🔍 **自动识别** | 从 AI 的回复或你粘贴的文字里认出 **DOI / arXiv / PMID / ISBN / 标题**，自动去重 |
| 📋 **元数据抓取** | 从 Crossref / arXiv / OpenAlex 自动补全标题、作者、期刊、年份、摘要 |
| ⬇️ **全文下载** | 多个免费源依次尝试（arXiv → OpenAlex → Unpaywall → DOI → 出版商），失败会**明确告诉你为什么** |
| 📖 **内置 PDF 阅读器** | 缩放、翻页、目录、全文搜索、**多色高亮 + 笔记（支持简单 Markdown）**、阅读位置记忆、夜读模式、一键导出全部高亮为 Markdown |
| ✍️ **引用生成器** | **APA 7 / GB/T 7714-2015（中文学位论文就用它）/ MLA 9 / Chicago 17 / BibTeX**，参考文献 + 文内引用 + 带页码的直接引用，一键复制 |
| 🤖 **划词 AI** | 选中文字 → **翻译 / 解释 / 总结**；也能对全文提问或一键总结全文，结果**直接发到当前对话**继续追问 |
| 🗂 **库管理** | 扫描导入文件夹（自动识别文件名里的 DOI/标题）、标签、状态过滤、排序、多选批量导出 RIS/BibTeX/CSL-JSON |
| 🌐 **全网入口** | 每条文献直达 Google Scholar / 百度学术 / 知网 |
| 🔒 **完全本地** | 只监听 `127.0.0.1`，无遥测、无云端中转、**不需要账号** |

**为什么强烈建议她先装这个：**

- 门槛最低：**不依赖 Zotero**（保存方式可选"内置文献库"），装上就能用
- 覆盖了她 80% 的日常动作：**看 PDF、翻译、记高亮、生成中文参考文献格式**
- 中文学位论文要的 **GB/T 7714-2015** 格式直接内置，不用自己拼
- 有 QQ 交流群，出问题好问人

**`zotero_lookup` 是什么**：它同时提供让 AI 调用的 `zotero_lookup` 工具，所以你可以直接在对话里说：

```text
帮我找一下 DOI 10.1038/xxxxx 这篇，下载全文，然后总结它的方法部分。
```

**和 Zotero 的关系**：它是 Zotero 生态的**独立兼容实现**，和 Zotero 官方无隶属关系。装上 Zotero 后也能把条目**导出**到 Zotero（走官方 Connector 协议）。

**兼容性要求**：DSH ≥ 0.1.1-rc.2、Node ≥ 20；本地 Zotero 可选（8.x）。

---

<a id="p3-3"></a>

## 3-3 🔧 必装基础件（装上就离不开）

> 这一组不是"科研专用"，但**没有它们你会很痛苦**。按优先级从上到下装。

### 🧠 管理技能和 MCP（管好你的"工具箱"）

| 插件 | 干什么 | 链接 |
| --- | --- | --- |
| ⭐ **dsh-skill-manager** | **在设置里管技能**：图形界面查看/启停/删除技能，不用手翻文件夹 | <https://github.com/bitterSmilezzz/dsh-skill-manager> |
| ⭐ **dsh-find-skill** | 从 `vercel-labs/skills` 生态里**搜索并安装技能**（让 AI 帮你找技能） | <https://github.com/Moximxxx/dsh-find-skill> |
| **dsh-skillport** | 让你已有的 **Claude Code / Codex / Cursor 技能**也能在 DSH 里用 | <https://github.com/Jesse-njx/dsh-skillport> |
| ⭐ **dsh-mcp-manager** | 管理 MCP 服务器（**装 Zotero MCP 类插件要用**），支持 OAuth/stdio、工作区隔离 | <https://github.com/hyqhyq3/dsh-mcp-manager> |
| **dsh-mcp-proxy** | 省 token 的 MCP 访问方式（不一次性塞进所有工具的 schema） | <https://github.com/ben7am1n/dsh-mcp-proxy> |

### 🐍 跑代码 / 处理数据（生信必需）

| 插件 | 干什么 | 链接 |
| --- | --- | --- |
| ⭐⭐ **dsh-plugin-interpreters** | 提供 `run_python` / `run_node` 工具，**可配置解释器路径** → 让 AI 直接跑你的 Python 脚本 | <https://github.com/HuanLinOTO/dsh-plugin-interpreters> |
| ⭐ **dsh-tool-csv** | 零依赖 CSV 解析/查询/统计（读表达矩阵、样本表） | <https://github.com/omdsh-dev/dsh-tool-csv> |
| ⭐ **dsh-tool-stat** | 描述统计 / 分位数 / 频数 / 相关系数 | <https://github.com/omdsh-dev/dsh-tool-stat> |
| **dsh-tool-diff** | 文本/JSON/CSV/Markdown 结构化对比 | <https://github.com/omdsh-dev/dsh-tool-diff> |
| **dsh-tool-markdown** | HTML→Markdown、表格规范化、自动生成目录 | <https://github.com/omdsh-dev/dsh-tool-markdown> |
| **dsh-batch-regression** | 同一条命令跑 N 轮，**用中位数/分布判断结果**（而不是单次结果）—— 跑生物实验重复时很有用 | <https://github.com/PangYiMing/dsh-batch-regression> |
| **dsh-automation** | **定时任务**：晚上挂着跑分析，早上看结果 | <https://github.com/titanwings/dsh-automation> |

### 👁 让 AI"看得见"（读图、OCR、扫描件）

| 插件 | 干什么 | 链接 |
| --- | --- | --- |
| ⭐ **dsh-tool-describe-image** | 贴图即理解（接任意兼容 OpenAI 的视觉接口） | <https://github.com/sala003/dsh-tool-describe-image> |
| ⭐ **dsh-paddle-ocr** | **PaddleOCR 文档版面解析**：扫描版论文、图表、表格转文字 | <https://github.com/omdsh-dev/dsh-paddle-ocr> |
| **dsh-multimodal** | 视觉转写 + OCR + 文生图 | <https://github.com/MC5lan/dsh-multimodal> |
| **dsh-vision-sidecar** | 给"纯文本模型"外挂一个视觉能力（不换主模型） | <https://github.com/121103qwq/dsh-vision-sidecar> |
| **modlens** | OCR + 版面 + 语义识别（市场里搜 `modlens`） | 市场内 |
| **dsh-plugin-mineru** | **MinerU 文档解析**（PDF → Markdown，公式表格都能保） | 市场内 |

> 💡 为什么这几个对生信重要：**论文里的通路图、热图、电泳图、表格，AI 默认"看不见"**。装上视觉/OCR 插件后，你就能直接问「这张图说明了什么」。

### 📄 Office / 报告 / 笔记

| 插件 | 干什么 | 链接 |
| --- | --- | --- |
| ⭐ **dsh-report-html** | 把 Markdown + 表格 + 图表数据生成**自带交互的 HTML 报告**（组会汇报神器） | <https://github.com/hccccc01333/dsh-report-html> |
| **dsh-office-tools** / **dsh-univer-office** | Office 文档处理（市场里搜名字） | 市场内 |
| **dsh-md-notes** / **notes** | Markdown 笔记管理 | 市场内 |
| **dsh-read-url** | 读取网页内容 | 市场内 |

### 💰 看花销（学生党必装）

| 插件 | 干什么 | 链接 |
| --- | --- | --- |
| ⭐ **dsh-plugin-cost-tracker** | Token 用量与成本追踪 + **预算告警** | <https://github.com/YYTbit/dsh-plugin-cost-tracker> |
| **dsh-token-usage** | 用量统计卡片 + 3 个月热力图 | <https://github.com/hashdiana/dsh-token-usage> |
| **dsh-usage-cost** | 每步 API 用量的时间线 + 高峰/低谷价格 | <https://github.com/Dino6021/dsh-usage-cost> |
| **dsh-balance-display** | 侧边栏直接显示**账户余额**，余额低会提醒 | <https://github.com/Liu-ty/dsh-balance-display> |

### ↩️ 后悔药（防手抖）

| 插件 | 干什么 | 链接 |
| --- | --- | --- |
| ⭐ **dsh-undo** | `/undo` 命令：把对话回退到上一条消息之前 | <https://github.com/LingLambda/dsh-undo> |
| **dsh-archive-manager** | 已归档会话管理，找回来 | <https://github.com/zimixvx/dsh-archive-manager> |
| **dsh-session-index** | **跨会话全文搜索**（"我上个月是不是查过这个"） | <https://github.com/longyu065/dsh-session-index> |
| **dsh-turn-index** | 右侧列出每一轮提问，点击跳转 | <https://github.com/Simon314620/dsh-turn-index> |
| **dsh-backup** | 备份配置与会话（市场里搜） | 市场内 |

---

<a id="p3-4"></a>

## 3-4 🎓 学术科研专项插件

### 🔬 重量级：DSH Scholar（科研操作系统）

- **仓库**：<https://github.com/lzszq/dsh-scholar>
- **一句话**：把「项目对话 + 研究材料 + 代码数据 + 受控实验 + 证据 + TeX 论文」全部放进一个可追溯的项目里。流程是：

```text
建项目 → Grill Me 追问 → 定 Scope → 文献综述 → 出 Idea → 基线 → 定 Contract
→ 受控实验 → 结果分类与综合 → 证据与结论 → TeX 写作与评审 → 人工放行
```

- **它特别"学术"的地方**：`gate-only` 是默认模式 —— **AI 不能伪造"已通过的证据"，也不能绕过研究节点的确认**；每次实验必须绑定不可变的代码和数据快照
- **明确说了面向**：机器学习、数据科学、**生物信息学** 等计算型研究

> ⚠️ **但门槛很高**：要求 **Linux + Node.js 24 + pnpm + Docker**，还要自己 build 源码。**DSH Desktop 在 Windows/Mac 上目前跑不了它的完整形态。**
> 👉 **结论：这个是"以后进阶"的目标，现在别装。** 先把 3-1/3-2/3-3 用熟。

### 📖 其他学术向（都在插件市场里，搜名字即可）

| 插件名 | 干什么 |
| --- | --- |
| **dsh-ai4scholar** | 学术文献检索 |
| **dsh-fund-research** | 基金项目检索 |
| **dsh-science-workbench** | 科研工作台 |
| **dsh-reference-checker** | **参考文献检查**（投稿前必用，防幻觉引用）|
| **dsh-deep-research** | 深度研究编排（自适应多轮检索） |
| **dsh-book2skill** | 把一本书变成一套技能（5 阶段，含 3 个人工确认点） |
| **dsh-ultramath** | 数学/公式相关 |
| **dsh-diagram** | 生成图表/示意图 |
| **dsh-data-agent** | 数据处理智能体 |
| **dsh-data-cleaning-agent** | **数据清洗智能体**（处理乱表格） |
| **Perplexity 学术与科技检索** | 用 Perplexity 做学术检索 |
| **dsh-web-search-multi** / **dsh-web-search-exa** | 多引擎搜索 / Exa 语义搜索 |

### 🧠 记忆与上下文（长项目必备）

| 插件 | 干什么 | 链接 |
| --- | --- | --- |
| **dsh-memento** | 分层的、需审批的**跨会话记忆** | <https://github.com/PerryLink/dsh-memento> |
| **dsh-mnemon** | 三层记忆控制平面（运行时上下文 + 可搜索项目文档） | <https://github.com/omdsh-dev/dsh-mnemon> |
| **dsh-memory** | 本地 SQLite 全文检索的持久记忆 | <https://github.com/ben7am1n/dsh-memory> |
| **dsh-plugin-rag** | 本地知识库 RAG：索引项目文件并检索 | <https://github.com/YYTbit/dsh-plugin-rag> |

> 💡 一个课题做半年，最痛的就是"AI 忘了我们之前干了什么"。**记忆类插件在她进入第二个学期时价值最大。**

---

<a id="p3-5"></a>

## 3-5 🎨 让界面好用的插件

| 插件 | 干什么 | 链接 |
| --- | --- | --- |
| **dsh-web-skins** | 第三方换肤仓库 | <https://github.com/Moeblack/dsh-skins> |
| **dsh-custom-css** | 自定义 CSS（自己调样式） | <https://github.com/AnacondaKC/dsh-custom-css> |
| **dsh-skin** | 背景图片设置 | 市场内 |
| **dsh-notification** | 桌面 + webhook 通知（跑完提醒你） | <https://github.com/omdsh-dev/dsh-notification> |
| **dsh-conversation-share** | 把对话选段导出成**长图**（做组会截图、发给导师） | <https://github.com/bill9109/dsh-conversation-share> |
| **dsh-learn-everything** | **费曼学习模式**：结构化课程卡片，适合啃新领域 | <https://github.com/cendaifeng/dsh-learn-everything> |
| **dsh-emoji** / **dsh-pixel-whale** | 好玩的（表情、像素鲸鱼） | [dsh-pixel-whale](https://github.com/yoke233/dsh-pixel-whale) |

---

<a id="p3-6"></a>

## 3-6 ⚠️ 装插件的四条纪律（别跳过）

| # | 纪律 | 为什么 |
| --- | --- | --- |
| 1 | **一次只装一个，装完就重启 + 验证** | 出问题才知道是谁的锅。一次装五个，崩了只能全部卸掉重来 |
| 2 | **同类插件只留一个** | 工具名会冲突（比如两个插件都叫 `zotero_search`），冲突时表现是"工具莫名其妙消失" |
| 3 | **装之前看两件事**：README 的"前置条件" + 最近更新时间 | 半年没更新的插件很可能和你现在的 DSH 版本不兼容 |
| 4 | **数据安全底线**：任何要"把数据上传到某服务器"的插件，先想清楚 | 未发表数据、病例信息、测序原始数据 → **本地处理，不外传**。插件市场里有很多好东西，但也有粗制滥造的，**只看名字看不出安不安全** |

**万一装崩了怎么办（记住这一招）：**

- 从托盘的 `Harness` 菜单 → **以安全模式重启（Safe Mode）** → 它会**临时屏蔽所有第三方插件**，让你能进去把坏插件卸掉
- 完全进不去界面：用命令行启动并加参数 `--safe-mode`
- 报 bug 用：托盘右键 → **导出诊断信息…**

---

<a id="p3-7"></a>

## 3-7 给她的安装顺序清单（照着装就行）

> 不用一次全装！**按下面的顺序，一步一步来。**

### 📅 第 1 天（只装这 3 个）

| 顺序 | 插件 | 为什么先装它 |
| --- | --- | --- |
| 1 | **dsh-literature** | 一个顶四个（文献库+PDF阅读器+翻译+引用格式），**不依赖 Zotero**，当天就能看文献 |
| 2 | **dsh-skill-manager** | 以后装技能时会感谢自己（图形界面管理，不用手翻文件夹） |
| 3 | **dsh-plugin-interpreters** | 让 AI 能跑 Python —— **生信的核心动作** |

```sh
dsh plugin add @a9i5k4/dsh-literature
dsh plugin add dsh-skill-manager
dsh plugin add @huanlin/dsh-plugin-interpreters
```

> 上面第二、三个如果名字搜不到，就打开**插件市场**搜关键词（"skill manager"、"interpreter"），或按各自 README 给的命令装。

### 📅 第 1 周（再补 4 个）

| 插件 | 为什么 |
| --- | --- |
| **dsh-zotero** | 让 AI 翻你的 Zotero 库（前提：Zotero 7+ 且开着） |
| **dsh-tool-describe-image** 或 **dsh-paddle-ocr** | 让 AI 看懂论文里的图和扫描件 |
| **dsh-plugin-cost-tracker** 或 **dsh-balance-display** | 看着点花销，别月底才发现账单 |
| **dsh-undo** | 后悔药，放在手边安心 |

### 📅 写论文的时候

| 插件 | 为什么 |
| --- | --- |
| **zotero-mcp-dsh** | 一键导出 BibTeX + citekey，LaTeX 引用不头疼 |
| **dsh-reference-checker** | 投稿前查引用，**专治 AI 编造文献** |

### 📅 做综述的时候

| 插件 | 为什么 |
| --- | --- |
| **zotero-harvest** | 自动检索 + 判断够不够 + 入库（Europe PMC 对生信友好） |
| **zotero-wave-rag** | 检索"顺藤摸瓜"找关系文献（⚠️ 与 dsh-zotero 二选一） |
| **dsh-deep-research** | 多轮深度检索编排 |

### 📅 以后进阶（现在别碰）

| 插件 | 为什么先别碰 |
| --- | --- |
| **dsh-scholar** | 要求 Linux + Docker + 从源码构建 |
| **dsh-plugin-rag** / **dsh-memento** | 长项目才有价值，先积累几个课题再说 |
| **dsh-report-html** | 等你第一次要做组会汇报时再装 |

---

# ④ 科研实战（生信版）

## 4-1 什么是"技能"，为什么它是核心

**技能（Skill）= 一包写好的专业说明书。**

举例：你在会话里打一句

```text
帮我看看这批单细胞数据，做完 QC 和聚类，然后画个 UMAP。
```

AI 会自己去"技能书柜"里翻，找到 `scanpy` 这个技能（里面写着 Scanpy 的标准流程和参数建议），然后照着做。

**这解决了小白最大的问题**：你不用知道该用哪个包、参数怎么设、图怎么画得能发表 —— 技能里已经写好了。

**技能长什么样：**

```text
技能文件夹/               ← 文件夹名 = 技能名
└── SKILL.md             ← 说明书本体（前面有一段"什么时候用我"的说明）
```

**技能放在哪（记住这个路径）：**

| 系统 | 技能目录 |
| --- | --- |
| Windows | `C:\Users\你的用户名\.agents\skills\` |
| macOS | `~/.agents/skills/` |

> 每个技能是里面的一个**子文件夹**，子文件夹里必须有 `SKILL.md`。
> 装完**新开一个会话**，AI 才能看到新技能。

## 4-2 技能怎么装（三种方法）

### 方法 A：让 AI 帮你装（最推荐 👍 最适合小白）

在 DSH 里新建会话，把 GitHub 链接丢给它，然后打这段话：

```text
这个 GitHub 仓库里有很多科研技能：<把链接粘在这里>
请帮我把它里面的技能（含 SKILL.md 的文件夹）安装到我的技能目录
（Windows 是 C:\Users\<我的用户名>\.agents\skills\，Mac 是 ~/.agents/skills/）。
安装前先列出你准备装哪些、有多少个，等我确认后再动手。
装完告诉我怎么验证。
```

AI 会：克隆仓库 → 找到所有 `SKILL.md` → 复制到技能目录 → 给你一份清单。
**你只需要在它问"确认吗"的时候回答"确认"。**

### 方法 B：手动装（自己动手，最可控）

打开终端（托盘 → Open DSH Terminal），Windows 用这几行：

```powershell
# ① 把仓库下载到临时目录
$REPO = "https://github.com/K-Dense-AI/scientific-agent-skills.git"
git clone --depth 1 $REPO "$env:TEMP\skills-repo"

# ② 把每个含 SKILL.md 的文件夹复制到技能目录
$DST = "$env:USERPROFILE\.agents\skills"
New-Item -ItemType Directory -Force -Path $DST | Out-Null
Get-ChildItem "$env:TEMP\skills-repo" -Recurse -Filter SKILL.md |
  ForEach-Object {
    $dir = $_.Directory
    Copy-Item $dir.FullName (Join-Path $DST $dir.Name) -Recurse -Force
  }

# ③ 数一数装了多少个
(Get-ChildItem $DST -Directory).Count
```

macOS / Linux 用这几行：

```bash
git clone --depth 1 https://github.com/K-Dense-AI/scientific-agent-skills.git /tmp/skills-repo
mkdir -p ~/.agents/skills
find /tmp/skills-repo -name SKILL.md -print0 | while IFS= read -r -d '' f; do
  d=$(dirname "$f"); cp -R "$d" ~/.agents/skills/
done
ls ~/.agents/skills | wc -l
```

> 没有 `git`？Windows 在 <https://git-scm.com/download/win> 装一个；Mac 在终端打 `xcode-select --install`。

### 方法 C：插件市场装**插件**（注意：插件 ≠ 技能）

插件市场里装的是"给 DSH 加功能的扩展"（比如某个数据库的连接器、某个界面优化）。**技能和插件是两回事**，但市场里也有帮你管理技能的工具（例如 `dsh-any-skills`、`dsh-plug-skills`、`dsh-skillhub`）。

**建议**：一开始先用方法 A 装几个核心技能，熟悉了再逛市场。

## 4-3 怎么用 awesome-academic-research-skills 榜单

**网址：<https://kael-odin.github.io/awesome-academic-research-skills/>**

它是什么：一个**每天自动更新**的排行榜，专门收录"服务科研的 AI 技能仓库"。它用两个关键词做精准过滤：必须有 **学术/研究/论文** 信号 + 必须有 **skill/agent/workflow** 信号。

**页面怎么用：**

| 操作 | 作用 |
| --- | --- |
| 按 `/` | 聚焦到搜索框（搜关键词，比如 `single cell`、`zotero`、`figure`） |
| 按 `t` | 切换深色/浅色主题 |
| 按 `l` | 中英文切换 |
| 按 `v` | 表格视图 / 卡片视图切换 |
| 按 `f` | 收藏（收藏的会单独标出） |
| 按 `Esc` | 关闭弹窗 |
| 点任意一行 | 看这个仓库的详情 |
| 「下载 JSON / CSV」 | 把榜单导出成表格，方便自己筛选 |

**怎么挑（三步法）：**

1. **看分类**：`文献综述` / `深度研究` / `论文写作` / `实验复现` / `学科专项` / `综合研究` —— 先按你现在要干的事筛。
2. **看 7 天趋势，别只看总星数**：标着「热门上升」的是近期真在被人用的。
3. **看更新时间**：超过 **6 个月**没更新的，先别装（可能和现在的 DSH 不兼容了）。

### 给你（生信方向）的三个"先装这些"

| 优先 | 仓库 | 为什么 |
| --- | --- | --- |
| 🥇 | [K-Dense-AI/scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills) | **学科专项**，160+ 科研技能 + 100+ 科学数据库，覆盖基因组/单细胞/蛋白/药物发现 —— 对生信最对口 |
| 🥈 | [Imbad0202/academic-research-skills](https://github.com/Imbad0202/academic-research-skills) | **全流程**：research → write → review → revise → finalize，写论文/改稿/回审稿意见一条龙 |
| 🥉 | [Yuan1z0825/nature-skills](https://github.com/Yuan1z0825/nature-skills) 或 [Boom5426/Nature-Paper-Skills](https://github.com/Boom5426/Nature-Paper-Skills) | **投稿规格**：对标 Nature 的表达风格和科研绘图 |

> ⚠️ **一句提醒**：榜单收录 ≠ 质量担保。看到主打「**一句话出论文**」「**降 AI 率**」「**降重**」的仓库，只当**格式参考**用，别当学术工具用 —— 论文的结论和署名责任永远是你自己的。
> 完整 Top 50 见 [附录 A](#附录-a--学术-skill-榜单-top-50)。

## 4-4 给她的工作目录长这样

DSH 是**按文件夹记会话**的。所以一开始就把目录建规范，以后会感谢自己：

```text
科研/
└── 2026-单细胞-肝癌免疫微环境/          ← 一个课题一个文件夹
    ├── 00-说明/                        # 课题背景、时间线、老板的要求
    ├── 10-文献/                        # library.bib、检索记录、纳入排除表
    ├── 20-笔记/                        # 每篇文献一张卡 + 主题综述笔记
    ├── 30-数据/                        # 原始数据（只读！不要改）
    ├── 40-分析/                        # 脚本 + 中间结果 + 图
    │   ├── scripts/                    # 所有 .py / .R / .sh
    │   ├── results/                    # 表格、h5ad、rds
    │   └── figures/                    # 图（矢量图优先：pdf/svg）
    ├── 50-论文/                        # 各章节、参考文献
    └── 90-复盘/                        # 审稿意见、修改记录、AI 使用说明
```

**三条硬规矩：**
1. `30-数据/` 永远**只读**，分析产物一律写到 `40-分析/`。
2. 所有**脚本必须落盘**（哪怕只跑了一次）—— 这是"可复现"的唯一保障。
3. 每张图都要有一个生成它的脚本。

## 4-5 科研流水线 10 站

> 把整条链路记成 10 站。**不需要一次做完**，从你现在卡住的那一站开始。

| 站 | 干什么 | 用哪个技能/工具 | 你可以这样说 |
| --- | --- | --- | --- |
| 1 | **选题** | 提问假设类技能 | 「帮我把'肝癌免疫微环境'缩成 3 个可做的研究问题，各写出假设和验证方法」 |
| 2 | **查文献** | `literature-review`、`deep-research`、`paper-lookup` | 「检索近 5 年 XXX 的单细胞研究，列出检索式并去重，存成表格」 |
| 3 | **入库整理** | Zotero + Linter + Better BibTeX | 「帮我把这 30 个 DOI 生成 BibTeX，检查有没有查不到的」 |
| 4 | **精读做笔记** | Zotcard + Better Notes + PDF2zh | 「按我的卡片模板，给这篇 PDF 出结构化笔记」 |
| 5 | **综述成型** | `literature-review`、Zotero Cita | 「把这 20 篇笔记汇总成一份 3000 字综述，带对比表」 |
| 6 | **数据分析** | `scanpy`、`pydeseq2`、`pathway-enrichment`、`biopython`、`nextflow` | 「reads 在这里，帮我写完整分析脚本，跑之前先给我看计划」 |
| 7 | **画图** | `scientific-visualization`、`scientific-schematics` | 「把 results 里的表画成投稿级图，配色对色盲友好」 |
| 8 | **写作** | `academic-paper`、`scientific-writing`、`venue-templates` | 「按目标期刊的模板写 Methods」 |
| 9 | **评审改稿** | `academic-paper-reviewer`、`peer-review` | 「假装你是 3 位审稿人，各写一份审稿意见」 |
| 10 | **交付** | `docx`、`pptx`、`pdf`、`latex-posters` | 「把结果做成组会 PPT，15 分钟，中文」 |

**整条线的总调度**：如果你想把第 2 到第 10 站串起来自动跑，直接说

```text
用 academic-pipeline 技能，把我的「XXX 课题」从文献检索一路做到论文初稿，
每一站的产出按我的目录规范落盘，中间需要我决定的停下来问我。
```

## 4-6 十个可以直接抄的场景

> 直接复制粘贴，把 `<>` 里的内容换成你自己的。

### 场景 1 · 读一篇论文，出结构化的"笔记卡"

```text
把 20-笔记/ 里这篇 PDF 读完，按下面的结构写一张笔记卡，存成 20-笔记/<第一作者>-<年份>.md：
研究问题 / 用了什么数据 / 方法 / 主要结论 / 局限 / 我能用上的点 / 我的质疑。
要求：所有数字和结论都要标出在原文哪一页，不要自己编。
```

### 场景 2 · 下载公共数据（**先要计划，别让它直接跑**）

```text
我想用 GEO 上 <GSE 编号> 这个数据集。
先别下载，先给我一个完整的下载和分析计划：下载哪些文件、多大、存哪、
用哪个技能（建议用哪套技能）、预计多长时间。
我确认后你再执行。下载请用命令行工具，不要用浏览器。
```

> 💡 **为什么要这样问**：公共数据动辄几十 GB，先看计划能避免把硬盘塞满，也能避免"下了半天发现下错版本"。

### 场景 3 · 单细胞：从 counts 到聚类出图

```text
30-数据/ 里是 10x 的 counts 矩阵。请用 scanpy 技能做标准流程：
QC（画出线粒体基因比例、UMAP 前后对比）→ 过滤 → 归一化 → 高变基因 → PCA → 邻接图 → 聚类 → UMAP → 用 marker 基因做初步注释。
产出：脚本放 40-分析/scripts/，图放 40-分析/figures/（pdf 格式），结果放 40-分析/results/。
每一步的参数都写清楚，并告诉我为什么选这个参数。
```

### 场景 4 · 差异表达 + 通路富集

```text
用 40-分析/results/counts.csv 做差异表达分析（bulk RNA-seq，两组对照）。
用 pydeseq2，做完之后把差异基因表按 log2FC 和 padj 排好存成 csv；
再用 pathway-enrichment 做 GO/KEGG 富集，输出富集表和气泡图。
脚本和结果按目录规范存放，最后写一个 README 说明怎么重跑。
```

### 场景 5 · 复现某篇论文的某张图

```text
我想复现 <作者年份> 这篇论文的 Figure 2。
数据在 30-数据/，论文原文在 20-笔记/ 里。
先告诉我：要复现这张图需要哪些数据、缺什么、能不能做；
然后再动手。做不到的部分明确告诉我，不要编一个"看起来像"的图。
```

### 场景 6 · 写 Methods 章节

```text
按 40-分析/scripts/ 里的实际脚本，写论文的 Methods 章节。
要求：写清楚软件版本、参数、统计检验方法；不确定的地方标 [待确认] 而不是猜。
参考 50-论文/ 里目标期刊的格式要求。
```

### 场景 7 · 组会 PPT

```text
读 40-分析/ 和 50-论文/ 里的内容，做一个 15 分钟的组会 PPT（中文）：
背景 2 页 / 数据与方法 3 页 / 结果 6 页（每页配一张图）/ 下一步 2 页 / 致谢 1 页。
每页备注里写清楚我要讲什么。产出 pptx 文件。
```

### 场景 8 · 开题 / 综述初稿

```text
基于 20-笔记/ 里的 25 篇文献，写一份主题综述初稿：
按"研究背景 → 目前主流方法 → 争议点 → 空白 → 我的切入点"组织。
每句话如果来自某篇文献，用 [作者 年份] 标注，并在文末给出完整参考文献。
没有文献支撑的推断，明确标成"（推测）"。
```

### 场景 9 · 表格清洗 + 统计

```text
30-数据/raw.csv 是我实验记录的表，有很多不规范的地方。
先给我一份数据质量报告（缺失值、异常值、重复、单位不一致），
然后给一个清洗方案让我确认，再执行。
统计学问题请用 statistical-analysis 技能，并告诉我每个检验的前提假设。
```

### 场景 10 · 代码报错 / 环境问题

```text
我运行这个脚本报错了，错误信息如下：

<paste 错误信息>

请先解释这个错误在说什么，再给出修复方案，
最后告诉我怎么验证修好了。不要一次改很多地方，一次改一处。
```

## 4-7 把 Zotero 和 DSH 连起来

连上之后，AI 就能**直接读你的文献库**，不用你一篇篇复制粘贴。

### 方式一：BibTeX 中转（最稳，小白推荐）

1. Zotero 里装 **Better BibTeX**
2. 给你的项目文件夹设一个**自动导出**：导出到 `科研/<课题>/10-文献/library.bib`
3. 在 DSH 会话里说：

```text
我 Zotero 的文献库导出在 10-文献/library.bib。
请先统计有多少条、年份分布，然后告诉我里面有哪些主题。
```

### 方式二：Zotero 本地接口（不用 API Key，但要 Zotero 开着）

Zotero 开着的时候，本机有个只读接口：

```text
http://127.0.0.1:23119/api/users/0/items          ← 所有条目
http://127.0.0.1:23119/api/users/0/collections    ← 所有分类
```

在 DSH 里可以直接说：

```text
用 Zotero 的本地接口（127.0.0.1:23119）看看我"XXX"这个分类里有多少篇文献，
列出标题和年份。
```

> 如果连不上：**确认 Zotero 是打开的**；另外默认是**只读**的，如果要让 AI 往 Zotero 写东西，需要去 `Zotero 设置 → 高级` 里勾选允许本机其他程序通信。

### 方式三：给 AI 装一个 Zotero 连接器

在 DSH 的插件市场 / MCP 面板里注册 `zotero-mcp`（社区有多个实现）。这条路适合以后玩熟了再折腾。

## 4-8 七条铁律（别踩坑）

> 这一节比前面所有内容都重要。**收藏起来，每次交稿前看一遍。**

| # | 铁律 | 具体怎么做 |
| --- | --- | --- |
| 1 | **引用必须能查证** | 让 AI 写参考文献后，一律要求它给出 **DOI 或 PMID**，然后你抽查。凡是"查无此文"的一律删掉 |
| 2 | **不要交出原始数据** | 未发表数据、病人信息、测序原始数据**不要**上传到任何云端服务。分析在本地跑，AI 只看结果摘要 |
| 3 | **删除操作必须你亲自确认** | 在提示词里明确写：「任何删除/覆盖/重命名的操作，先列出来等我确认」 |
| 4 | **每一张图都要有脚本** | 图能重现，论文才站得住。禁止"手工调一调"的图 |
| 5 | **样本量和统计方法不要听 AI 的直觉** | 用 `statistical-analysis` / `experimental-design` 技能，并自己核对前提假设 |
| 6 | **AI 不能当作者** | 按目标期刊要求写"AI 使用声明"。**结论的正确性、数据的真实性，责任在你** |
| 7 | **不确定就问"你为什么这么说"** | 习惯性追问：「这个结论的依据是什么？如果错了，最可能错在哪？」—— 这一问能筛掉一大半幻觉 |

---

# 附录 A · 学术 Skill 榜单 Top 50

> 数据快照：**2026-09-14**（来源：榜单 `data/rankings.json`，按 Stars 排序）
> 分类：`写作`=论文写作 · `综述`=文献综述 · `深研`=深度研究 · `综合`=综合研究 · `学科`=学科专项 · `复现`=实验复现

| # | 仓库 | ★ | 分类 | 一句话 |
| --- | --- | ---: | --- | --- |
| 1 | [Imbad0202/academic-research-skills](https://github.com/Imbad0202/academic-research-skills) | 47.9k | 写作 | 研究→写作→评审→修改→定稿 全流程 |
| 2 | [K-Dense-AI/scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills) | 44.8k | 学科 | **165+ 科研技能 + 100+ 科学数据库**（生物/化学/医学/药物发现） |
| 3 | [Yuan1z0825/nature-skills](https://github.com/Yuan1z0825/nature-skills) | 41.4k | 深研 | 对标 Nature 的学术表达与科研绘图 |
| 4 | [wanshuiyin/Auto-claude-code-research-in-sleep](https://github.com/wanshuiyin/Auto-claude-code-research-in-sleep) | 16.1k | 学科 | 纯 Markdown 的自主 ML 研究（跨模型评审循环 + 实验自动化） |
| 5 | [Orchestra-Research/AI-Research-SKILLs](https://github.com/Orchestra-Research/AI-Research-SKILLs) | 12.6k | 深研 | AI 研究与工程技能库（训练/推理/评测） |
| 6 | [Imbad0202/academic-research-skills-codex](https://github.com/Imbad0202/academic-research-skills-codex) | 10.8k | 综合 | 第 1 名的 Codex 原生版本 |
| 7 | [hoochanlon/hamuleite](https://github.com/hoochanlon/hamuleite) | 9.7k | 学科 | 学术/金融/教育资源聚合导航 |
| 8 | [HKUSTDial/Supervisor-Skills](https://github.com/HKUSTDial/Supervisor-Skills) | 7.0k | 学科 | 「AI 科研副导师」：Idea 构思 → 投稿全链路 |
| 9 | [Master-cai/Research-Paper-Writing-Skills](https://github.com/Master-cai/Research-Paper-Writing-Skills) | 6.8k | 学科 | ML/CV/NLP 论文写作包（彭思达老师笔记改编） |
| 10 | [jihe520/MathModelAgent](https://github.com/jihe520/MathModelAgent) | 5.5k | 学科 | 数学建模 Agent，生成可提交论文 |
| 11 | [WUBING2023/PaperSpine](https://github.com/WUBING2023/PaperSpine) | 5.2k | 写作 | 论证主轴 + 修订矩阵 + LaTeX 安全检查 |
| 12 | [zLanqing/codex-claude-academic-skills](https://github.com/zLanqing/codex-claude-academic-skills) | 3.8k | 综合 | 文献阅读报告 / 论文润色 / MATLAB·Python 计算（中文向） |
| 13 | [brycewang-stanford/Auto-Empirical-Research-Skills](https://github.com/brycewang-stanford/Auto-Empirical-Research-Skills) | 3.8k | 学科 | 社科 8 学科 23,000+ 实证研究技能 |
| 14 | [Norman-bury/research-writing-skill](https://github.com/Norman-bury/research-writing-skill) | 3.2k | 写作 | 科研写作助手 |
| 15 | [OpenNSWM-Lab/FAROS](https://github.com/OpenNSWM-Lab/FAROS) | 3.0k | 综合 | blueprint 驱动的 AutoResearch 运行时 |
| 16 | [huangwb8/ChineseResearchLaTeX](https://github.com/huangwb8/ChineseResearchLaTeX) | 2.7k | 写作 | 中国科研常用 LaTeX 模板集（含学位论文/基金） |
| 17 | [HughYau/AcademicForge](https://github.com/HughYau/AcademicForge) | 2.5k | 综合 | 一站式学术 skill 平台 |
| 18 | [LigphiDonk/academic-figure-generator](https://github.com/LigphiDonk/academic-figure-generator) | 2.3k | 综合 | 论文配图：AI 生成 Prompt → 科研级插图 |
| 19 | [Weizhena/Deep-Research-skills](https://github.com/Weizhena/Deep-Research-skills) | 2.2k | 深研 | 结构化深度研究 + 人在环路 |
| 20 | [bohyy/academic-ai-prompt](https://github.com/bohyy/academic-ai-prompt) | 1.9k | 综合 | 40+ 选题/查文献/综述 Prompt + 评估表 |
| 21 | [aipoch/medical-research-skills](https://github.com/aipoch/medical-research-skills) | 1.9k | 综合 | 医学研究：方案设计、数据分析、证据洞察 |
| 22 | [VoltAgent/awesome-ai-agent-papers](https://github.com/VoltAgent/awesome-ai-agent-papers) | 1.8k | 复现 | 2026 年 AI Agent 论文合集 |
| 23 | [pedrohcgs/claude-code-my-workflow](https://github.com/pedrohcgs/claude-code-my-workflow) | 1.6k | 写作 | 经济学者的 LaTeX/Beamer + R 模板：多智能体评审 + 质量门 |
| 24 | [XiaoMaColtAI/math-modeling-skill](https://github.com/XiaoMaColtAI/math-modeling-skill) | 1.5k | 学科 | 数模竞赛三阶段工作流 |
| 25 | [lishix520/academic-paper-skills](https://github.com/lishix520/academic-paper-skills) | 1.3k | 综合 | 规划（strategist）+ 写作（composer）双技能 |
| 26 | [brycewang-stanford/Awesome-Journal-Skills](https://github.com/brycewang-stanford/Awesome-Journal-Skills) | 1.1k | 综合 | 面向具体期刊的投稿技能合集 |
| 27 | [199-biotechnologies/claude-deep-research-skill](https://github.com/199-biotechnologies/claude-deep-research-skill) | 1.0k | 深研 | 8 阶段深研 + 来源可信度评分 + 自动校验 |
| 28 | [LigphiDonk/Oh-my--paper](https://github.com/LigphiDonk/Oh-my--paper) | 729 | 写作 | 终端变自主研究实验室：综述→实验→成文 |
| 29 | [Ar9av/PaperOrchestra](https://github.com/Ar9av/PaperOrchestra) | 656 | 写作 | 复现 Google PaperOrchestra（基准 + 自动评分器） |
| 30 | [hanlulong/econ-writing-skill](https://github.com/hanlulong/econ-writing-skill) | 602 | 写作 | 经济学论文写作（综合 50+ 写作指南） |
| 31 | [jimmc414/Kosmos](https://github.com/jimmc414/Kosmos) | 585 | 深研 | AI Scientist 自主发现（Kosmos 论文实现） |
| 32 | [ganzhi-black/humanities-thesis-skill](https://github.com/ganzhi-black/humanities-thesis-skill) | 557 | 写作 | 人文社科：8 数据库 + 21 条评审规则 + 反幻觉护栏 |
| 33 | [Boom5426/Nature-Paper-Skills](https://github.com/Boom5426/Nature-Paper-Skills) | 492 | 写作 | Nature 风格稿件的起草/修订/审计/重投 |
| 34 | [claesbackman/AI-research-feedback](https://github.com/claesbackman/AI-research-feedback) | 478 | 综合 | 学术研究评审技能集 |
| 35 | [hkcanan/katmer-code](https://github.com/hkcanan/katmer-code) | 475 | 综合 | Obsidian 多模型侧栏（含学术技能） |
| 36 | [alfonso0512/research-writing-skill](https://github.com/alfonso0512/research-writing-skill) | 433 | 综合 | 30 个 Prompt 模板覆盖写作全流程 |
| 37 | [modelscope/Awesome-Vibe-Research](https://github.com/modelscope/Awesome-Vibe-Research) | 427 | 综合 | AI 辅助科研的开放共建仓库 |
| 38 | [LimHyungTae/awesome-claudecode-paper-proofreading](https://github.com/LimHyungTae/awesome-claudecode-paper-proofreading) | 421 | 写作 | 论文校对提示词 |
| 39 | [fcakyon/phd-skills](https://github.com/fcakyon/phd-skills) | 394 | 综合 | 论文复现、实验设计、结果对比、评审 |
| 40 | [Lupynow/math-modeling-skills](https://github.com/Lupynow/math-modeling-skills) | 381 | 写作 | 国赛 CUMCM 与美赛 MCM/ICM 全题型 |
| 41 | [fakerqwq/social-science-paper-writing-skill](https://github.com/fakerqwq/social-science-paper-writing-skill) | 305 | 综合 | 社科论文 + CNKI/Scholar → Zotero 工作流 |
| 42 | [yipng05-max/-skills](https://github.com/yipng05-max/-skills) | 285 | 深研 | 选题/综述/研究设计/数据分析/写作/学术阅读 |
| 43 | [yanlin-cheng/skill-thesis-writer](https://github.com/yanlin-cheng/skill-thesis-writer) | 200 | 深研 | 本硕论文 + GB/T 7714-2015 参考文献规范 |
| 44 | [ShZhao27208/Aut_Sci_Write](https://github.com/ShZhao27208/Aut_Sci_Write) | 196 | 学科 | 文献检索下载 + PDF 提取 + 截图 + 综述 + Zotero 同步 |
| 45 | [congcongwang0122/zotero-skill](https://github.com/congcongwang0122/zotero-skill) | 187 | 综述 | 「把 Zotero 某分类的文献整理成一万字综述」 |
| 46 | [brycewang-stanford/Auto-Research-Skills](https://github.com/brycewang-stanford/Auto-Research-Skills) | 157 | 综合 | 自主科研技能hub：灵感到论文全文 |
| 47 | [stephenlzc/AI-Powered-Literature-Review-Skills](https://github.com/stephenlzc/AI-Powered-Literature-Review-Skills) | 144 | 综述 | 8 阶段 + Agent Swarm 系统性文献回顾 |
| 48 | [Jesseovo/PaperCash](https://github.com/Jesseovo/PaperCash) | 137 | 深研 | 2 亿+论文检索、综述生成、润色、查重预检 |
| 49 | [ThisIsLittleSky/WaterPaper](https://github.com/ThisIsLittleSky/WaterPaper) | 112 | 写作 | 一句话出论文（⚠️ 仅作格式参考） |
| 50 | [csmar432/finai-research](https://github.com/csmar432/finai-research) | 100 | 综合 | 证据优先的经金研究：43 数据源 / 58 方法模块 |

---

# 附录 B · 生信技能工具箱

> 装好 DSH、按 [4-2 节](#4-2-技能怎么装三种方法) 装技能后，下面这些就是你**以后能直接喊名字用的工具**。
> 用法：在会话里直接说「用 **`技能名`** 做 XXX」，AI 就会去调用。

### 🧬 单细胞 / 转录组

| 技能 | 干什么 | 典型一句话 |
| --- | --- | --- |
| `scanpy` | 单细胞标准流程（QC→聚类→UMAP→差异表达） | 「用 scanpy 处理这批 10x 数据」 |
| `anndata` | `.h5ad` 数据格式的读写与合并 | 「把这两个 h5ad 合并成一个大对象」 |
| `scvi-tools` | 深度学习的批次校正、整合、差异表达 | 「用 scVI 做批次校正后再看 UMAP」 |
| `scvelo` | RNA 速率 / 轨迹推断 | 「估计细胞状态转换方向」 |
| `bulk-rnaseq` | bulk RNA-seq 全流程（QC→比对→定量→差异） | 「从 FASTQ 一路做到 counts 矩阵」 |
| `pydeseq2` | 差异表达分析（DESeq2 的 Python 版） | 「做两组差异表达，出火山图」 |
| `pathway-enrichment` | GO/KEGG/GSVA 富集分析与作图 | 「差异基因做 KEGG 富集并画气泡图」 |
| `cellxgene-census` | 查公共单细胞图谱（人群规模） | 「看看这个基因在肺组织里哪些细胞高表达」 |

### 🧫 基因组 / 序列

| 技能 | 干什么 | 典型一句话 |
| --- | --- | --- |
| `biopython` | 序列读写、比对、系统发育、NCBI 批量下载 | 「批量下载这批基因的序列并比对」 |
| `pysam` | SAM/BAM/CRAM、VCF 读写与统计 | 「统计这个 BAM 的覆盖度并画图」 |
| `polars-bio` | 超快的区间运算（BED/VCF/GFF） | 「求这批 peak 和基因的重叠区域」 |
| `genomic-coordinates` | 坐标换算（0/1-based、BED/GFF/VCF） | 「帮我把这个区间在 BED 和 VCF 之间转换」 |
| `gget` | 20+ 数据库快速查询（基因信息、BLAST、AlphaFold） | 「查这个基因的功能注释和结构」 |
| `bioservices` | 跨数据库统一接口（UniProt/KEGG/ChEMBL） | 「把这批基因 ID 批量映射到 UniProt」 |
| `phylogenetics` | MAFFT 比对 + IQ-TREE 建树 + 可视化 | 「给这 50 条序列建进化树」 |
| `etetoolkit` | 树的编辑、比较与出版级渲染 | 「把这棵树画成发表级图」 |
| `onekgpd` | 1000 Genomes 个体级查询 | 「查这个变异在 1000G 里的携带者」 |
| `tiledbvcf` | 大规模 VCF 存储与并行查询 | 「把几万个样本的 VCF 建成可查库」 |

### 🧪 蛋白 / 药物 / 分子

| 技能 | 干什么 |
| --- | --- |
| `rdkit` / `datamol` / `molfeat` / `medchem` | 化学信息学：分子描述符、指纹、相似性、成药性筛选 |
| `diffdock` | 蛋白-小分子对接（结合pose预测） |
| `molecular-dynamics` | OpenMM/MDAnalysis 分子动力学模拟 |
| `esm` | ESM3/ESMC 蛋白质语言模型 |
| `tamarind` / `rowan` / `adaptyv` | 云端蛋白设计、对接、结合亲和力预测 |
| `deepchem` / `torchdrug` / `pytdc` | 分子机器学习与基准数据集 |
| `glycoengineering` | 糖基化位点扫描与工程改造 |

### 📊 通用分析 / 统计 / 可视化

| 技能 | 干什么 |
| --- | --- |
| `statistical-analysis` | 检验选择、假设检查、效应量、APA 格式报告 |
| `experimental-design` | 实验设计、随机化、区组、样本量 |
| `statistical-power` | 功效分析与样本量估算（写基金/伦理必需） |
| `exploratory-data-analysis` | 数据概览、缺失/异常值审计 |
| `scientific-visualization` | 出版级图表（配色对色盲友好、多面板排版） |
| `scientific-schematics` | 机制图/流程图/通路图 |
| `pymc` / `statsmodels` / `scikit-learn` | 贝叶斯建模 / 统计模型 / 机器学习 |
| `polars` / `dask` / `vaex` | 大数据表格处理（超内存也能算） |
| `zarr-python` | 云上大数组存储 |

### 🔁 流程与平台

| 技能 | 干什么 |
| --- | --- |
| `nextflow` | Nextflow / nf-core 流程（本地 / HPC / 云） |
| `snakemake` 类流程技能 | 流程编排 |
| `dnanexus-integration` / `latchbio-integration` / `modal` | 云端生信平台与按需 GPU |
| `optimize-for-gpu` | 把 NumPy/pandas 代码 GPU 加速 |
| `omero-integration` / `benchling-integration` / `labarchive-integration` / `protocolsio-integration` | 实验室数据与 ELN 系统对接 |
| `imaging-data-commons` / `histolab` / `pathml` / `pydicom` | 病理与医学影像 |

### 📚 文献与写作

| 技能 | 干什么 |
| --- | --- |
| `literature-review` | 多数据库系统性文献综述（产出 Markdown/PDF） |
| `deep-research` | 13 个智能体的深度研究流水线 |
| `paper-lookup` | 11 个学术 API 检索（PubMed/arXiv/OpenAlex…） |
| `citation-management` | DOI→BibTeX、引用准确性核查 |
| `pyzotero` | 用代码读写你的 Zotero 库 |
| `academic-paper` | 论文写作 12 智能体流水线（含格式转换、引用核查） |
| `academic-pipeline` | 从研究到定稿的总调度 |
| `academic-paper-reviewer` | 5 席评审团模拟审稿 |
| `scientific-writing` / `peer-review` / `venue-templates` | 写作、审稿、期刊模板 |
| `docx` / `pptx` / `xlsx` / `pdf` / `latex-posters` | 输出 Word / PPT / Excel / PDF / 海报 |

> 📌 **重要**：这些技能**不一定会全部自动出现** —— 取决于你装了几个技能仓库。装完可以在会话里问：
> 「请列出我现在可用的所有技能，按类别整理」—— 它会把实际技能目录给你看。

---

# 附录 C · 排查表 + 质检清单

## C.1 Zotero 插件安装（三种方式）

| 方式 | 步骤 | 什么时候用 |
| --- | --- | --- |
| 商店 ⭐ | 装 **Add-on Market** → 搜索 → 一键安装 | 首选 |
| 拖拽 | 下载 `.xpi` → Zotero `工具 → 插件` → 齿轮 → `Install Add-on From File` | 商店没有的 |
| 手动 | `工具 → 插件` 直接拖入 xpi | 兜底 |

## C.2 常见故障速查

| 症状 | 原因 | 处理 |
| --- | --- | --- |
| 插件装了没效果 | Zotero 版本不匹配（7 vs 6） | 升级 Zotero 或找对应分支 |
| 条目加了元数据空白 | 茉莉花抓取默认关闭 / 文件名非中文 | 开启设置；把文件名改成带中文再抓 |
| citekey 每次导出都变 | 没开 Better BibTeX 的固定功能 | 在 BBT 设置里固定格式 |
| 附件"找不到文件" | 手动挪过 storage | 用 Attanger/ZotMoov 统一管，**别手动移动** |
| 扫描版 PDF 搜不到字 | 没有文字层 | 先跑 Zotero OCR |
| 磁盘爆满 | 孤立/重复附件 | Storage Scanner + Duplicates Merger |
| DSH 看不到新装的技能 | 会话已经加载过技能目录 | **新开一个会话** |
| DSH 连不上 Zotero | Zotero 没开 / 本地接口只读 | 打开 Zotero；写操作要另外开权限 |
| DSH 插件装了没反应 | 装错 Profile / 没重启 | 重启 App |
| DSH 界面打不开 | 插件冲突 | 用 `--safe-mode` 启动 |

## C.3 投稿前质检清单（逐项打勾）

- [ ] **引用可溯源**：正文每条引用都能在 Zotero 找到条目，DOI/PMID 有效
- [ ] **无幻觉引用**：让 AI 做过引用核查，"查无此文"的已全部删除
- [ ] **数据可复现**：每个分析都有脚本 + 数据 + 环境说明（含随机种子）
- [ ] **图可重现**：每张图都有生成脚本，图号与正文一致
- [ ] **期刊合规**：字数、图数、匿名要求、参考文献样式都对过
- [ ] **统计前提**：每个检验的假设都检查过，样本量有依据
- [ ] **对抗评审**：至少让 AI 扮过一轮审稿人，意见逐条回应过
- [ ] **AI 使用声明**：按期刊要求写了披露段落
- [ ] **隐私边界**：未发表数据 / 病人信息没有上传到外部服务
- [ ] **归档完整**：文本 + `library.bib` + 脚本 + 复盘目录都提交到版本库
- [ ] **作者责任**：所有结论我本人复核过 —— **署名就是责任**

---

## 🎁 最后三句话，写给妹妹

1. **先把工具装好，再谈用它做什么。** 第一天只要完成三件事：装好 DSH、填好模型 Key、新建一个工作区。
2. **技能是别人的经验，不是你的判断。** 它帮你省掉查文档的时间，但结果的正确性永远要你自己确认 —— 尤其是统计和生物学解释。
3. **先从一个最小的任务开始。** 不要一上来就"帮我写完整篇论文"。先让它帮你**读一篇文献、画一张图、跑一次差异表达**，跑通了再往下走。

> **Zotero 保证「文献是真的、引用是对的、附件不丢」；DSH 保证「读得快、记得住、跑得动、写得成」。**
> 剩下的判断力，是你自己的 —— 那也正是读研最值钱的部分。💪
