# 模型路由策略（省钱优先）

> 本文件由 AI 维护。目标：**机械活交给便宜的 MiniMax，需要判断的活留给 DeepSeek**，在不牺牲正确性的前提下把 token 账单压下来。
> 修改前请先读 `~/.dsh/settings.yaml` 的 `subagent-model-selection.allowedModels` 确认白名单。

## 可用路由

| provider / model | 用途 | 大致价格（输入/输出，每 1M token） |
| --- | --- | --- |
| `minimax-cn / MiniMax-M2.7` | **默认外包档**：批量、机械、可并行的活 | 0.3 / 1.2（缓存读 0.06） |
| `minimax-cn / MiniMax-M3` | 便宜 + **支持图片** + 1M 上下文 | 0.3 / 1.2 |
| `deepseek-official / deepseek-v4-flash` | 主会话默认，复杂任务主力 | — |
| `deepseek-official / deepseek-v4-pro` | 只在关键推理/验收时用（贵） | — |
| `deepseek-official / deepseek-v4-flash-vision-exp` | 看图 | — |

## 分诊规则（每次收到任务先做，再动手）

**A. 交给 `minimax-cn / MiniMax-M2.7`（用 `subagent` 工具带 `provider`/`model`）**

- 批量读文件 / 批量摘要 / 批量提取字段
- 格式转换、清单整理、正则替换、重命名
- 抓取解析、日志筛选、结果合并
- 写样板代码、补测试、跑重复脚本
- 多文件扫描、大规模对比（"有多少个 X"这类计数题）

**B. 自己做（当前会话模型），不要外包**

- 架构与方案取舍、跨文件推理、根因分析
- 需要权衡"哪个更好/为什么坏"的判断
- 验收与对外交付定稿（报告、文档、提交信息、给用户的结论）
- 涉及删除/写入/推送等有副作用的操作（必须由主线把关）

**C. 图片或超长上下文** → `minimax-cn / MiniMax-M3`（支持图片 + 1M 上下文）

## 硬性约束

1. **子代理看不到本会话**：给它的 prompt 必须自包含（贴全需要的信息，别写"上面那个文件"）。
2. **子代理的结论必须复核**再采用——省钱不能靠牺牲正确性。关键结论至少用一条独立证据验证。
3. **失败即升级**：MiniMax 跑失败或结论可疑 → 换 DeepSeek 重做，不要反复重试省钱。
4. **并行**：多个独立子任务一次性发多个 `subagent`（同一批），别串行等。
5. **不外包副作用**：删除、覆盖、push、改配置由主线做。

## 省 token 的行为约定

- 先 `grep`/`glob` 定位，再定点 `read`；**不要重复读大文件**。
- 不做无谓的"再验证一遍"；一个检查能说明问题就够。
- 输出精简：结论 + 证据；不复述背景、不复述上一轮。
- 长任务用 goal / subagent 分片，别把所有过程堆在主线上下文里。
- 大范围改动：先改一处验证通，再批量套用。
- 一次性工具脚本放 `tools/`，别把临时分析代码留在对话里。

## 已知坑

- **白名单是会话级快照**：改完 `~/.dsh/settings.yaml` 后，**必须新开会话或重启 DSH** 才生效（代码注释：*Selection authority captured for this Session*）。
- MiniMax 走 `anthropic-messages` 协议，密钥存在 DSH 凭据库（`MINIMAX_CN_API_KEY`），不在系统环境变量里。
- 本机 `officecli` 有两条命令路径：npm 全局是 0.2.121 启动器（非 TTy 会报错），真本事在 `%LOCALAPPDATA%\OfficeCli\officecli.exe`（1.0.148），用它请写全路径。
