import Link from 'next/link';
import { getHandbook } from '@/lib/content';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const QUICK = [
  {
    t: '装好工具',
    d: '按「② DSH Desktop 安装」把 AI 装进电脑，填一次模型 API Key 就行。',
  },
  {
    t: '装 3 个插件',
    d: '照「③ DSH 插件区」的顺序清单走：第 1 天只装 3 个，别贪多。',
  },
  {
    t: '装学术技能',
    d: '把榜单里的技能仓库丢给 AI，让它自动装进技能目录（有现成提示词）。',
  },
  {
    t: '跑第一个任务',
    d: '从「④ 科研实战」抄一个提示词，比如让 AI 读完一篇 PDF 出一张笔记卡。',
  },
];

export default function HomePage() {
  const h = getHandbook();
  const first = h.parts[0];

  return (
    <main className="main main--solo">
      <div>
        <section className="hero">
          <span className="hero__badge">
            🧬 {h.version} · 写给生物信息学方向的你
          </span>
          <h1>
            把文献和 AI
            <br />
            变成你的<span className="grad">科研流水线</span>
          </h1>
          <p className="lead">
            这份手册从「Zotero 怎么管文献」讲到「用 DSH 把 AI 接进科研工作流」——
            插件怎么挑、软件怎么装、命令怎么敲、提示词怎么抄，全部写好了。
          </p>
          <div className="hero__cta">
            <Link className="btn btn--primary" href={`/handbook/${first.id}/`}>
              开始阅读 →
            </Link>
            <a className="btn" href={`${BASE}/downloads/dsh-research-handbook.docx`} download>
              📄 下载 Word 版
            </a>
            <Link className="btn" href="/handbook/dsh-plugins/">
              🧩 直接看插件推荐
            </Link>
          </div>
          <div className="stats">
            <div className="stat">
              <div className="stat__v">{h.stats.parts}</div>
              <div className="stat__k">大部分</div>
            </div>
            <div className="stat">
              <div className="stat__v">{h.stats.sections}</div>
              <div className="stat__k">个小节</div>
            </div>
            <div className="stat">
              <div className="stat__v">{h.stats.tables}</div>
              <div className="stat__k">张速查表</div>
            </div>
            <div className="stat">
              <div className="stat__v">{h.stats.codeBlocks}</div>
              <div className="stat__k">段可复制命令</div>
            </div>
            <div className="stat">
              <div className="stat__v">{h.stats.readMinutes}</div>
              <div className="stat__k">分钟读完</div>
            </div>
          </div>
        </section>

        <div className="section-title">
          <h2>手册包含什么</h2>
          <span>点卡片进入对应部分</span>
        </div>
        <div className="cards">
          {h.parts.map((p) => (
            <Link key={p.id} className="card" href={`/handbook/${p.id}/`}>
              <div className="card__top">
                <span className="card__icon">{p.icon}</span>
                <h3>{p.title}</h3>
              </div>
              <p className="card__blurb">{p.blurb}</p>
              <ul className="card__list">
                {p.sections.slice(0, 4).map((s) => (
                  <li key={s.id}>{s.title}</li>
                ))}
              </ul>
              <span className="card__more">
                进入阅读 · {p.sections.length} 小节 →
              </span>
            </Link>
          ))}
        </div>

        <div className="section-title">
          <h2>30 秒上手</h2>
          <span>不知道怎么开始就按这四步走</span>
        </div>
        <div className="quickstart">
          {QUICK.map((q, i) => (
            <div className="qs" key={q.t}>
              <span className="qs__n">{i + 1}</span>
              <h4>{q.t}</h4>
              <p>{q.d}</p>
            </div>
          ))}
        </div>

        <div className="section-title">
          <h2>下载</h2>
          <span>离线看 / 打印 / 发给同学</span>
        </div>
        <div className="cards">
          <a className="card" href={`${BASE}/downloads/dsh-research-handbook.docx`} download>
            <div className="card__top">
              <span className="card__icon">📄</span>
              <h3>Word 版（DOCX）</h3>
            </div>
            <p className="card__blurb">
              带封面、目录导航、彩色表格与代码块，可直接打印或批注。约 100 页 A4。
            </p>
            <span className="card__more">下载 .docx →</span>
          </a>
          <a className="card" href={`${BASE}/downloads/dsh-research-handbook.md`} download>
            <div className="card__top">
              <span className="card__icon">📝</span>
              <h3>Markdown 源文件</h3>
            </div>
            <p className="card__blurb">
              纯文本版本，方便你丢进自己的笔记软件，或让 AI 直接读它来回答问题。
            </p>
            <span className="card__more">下载 .md →</span>
          </a>
          <a
            className="card"
            href="https://github.com/anonymous99-Rise/awesome-dsh-zotero"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="card__top">
              <span className="card__icon">🐙</span>
              <h3>GitHub 仓库</h3>
            </div>
            <p className="card__blurb">
              源码、构建脚本与更新记录。发现新的好插件可以提 Issue 一起补进来。
            </p>
            <span className="card__more">打开仓库 →</span>
          </a>
        </div>

        <div className="section-title">
          <h2>导读</h2>
          <span>这份文件怎么用</span>
        </div>
        <article
          className="prose"
          dangerouslySetInnerHTML={{ __html: h.front.html }}
        />
      </div>
    </main>
  );
}
