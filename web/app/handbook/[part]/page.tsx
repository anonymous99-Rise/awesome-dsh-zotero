import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getHandbook, getPart, neighbours } from '@/lib/content';

export const dynamicParams = false;

export function generateStaticParams() {
  return getHandbook().parts.map((p) => ({ part: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ part: string }>;
}): Promise<Metadata> {
  const { part } = await params;
  const p = getPart(part);
  if (!p) return {};
  return {
    title: p.title,
    description: p.blurb,
  };
}

export default async function PartPage({ params }: { params: Promise<{ part: string }> }) {
  const { part } = await params;
  const p = getPart(part);
  if (!p) notFound();

  const handbook = getHandbook();
  const index = handbook.parts.findIndex((x) => x.id === part) + 1;
  const { prev, next } = neighbours(part);

  return (
    <main className="main">
      <div>
        <header className="pagehead">
          <span className="pagehead__eyebrow">
            {p.icon} 第 {index} 部分 · 共 {handbook.parts.length} 部分
          </span>
          <h1>{p.title}</h1>
          <p>
            {p.blurb} · 本部分 {p.sections.length} 小节
          </p>
        </header>

        <article className="prose">
          {p.intro ? <div className="part-intro" dangerouslySetInnerHTML={{ __html: p.intro }} /> : null}
          {p.sections.map((s) => (
            <section key={s.id} id={s.id}>
              <h2>{s.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: s.html }} />
            </section>
          ))}
        </article>

        <nav className="pager" aria-label="上下部分">
          {prev ? (
            <Link className="pager__item" href={`/handbook/${prev.id}/`}>
              <div className="pager__k">← 上一部分</div>
              <div className="pager__t">
                {prev.icon} {prev.title}
              </div>
            </Link>
          ) : (
            <Link className="pager__item" href="/">
              <div className="pager__k">← 返回</div>
              <div className="pager__t">🏠 手册总览</div>
            </Link>
          )}
          {next ? (
            <Link className="pager__item pager__item--next" href={`/handbook/${next.id}/`}>
              <div className="pager__k">下一部分 →</div>
              <div className="pager__t">
                {next.icon} {next.title}
              </div>
            </Link>
          ) : (
            <Link className="pager__item pager__item--next" href="/">
              <div className="pager__k">读完了 →</div>
              <div className="pager__t">🏠 回到首页</div>
            </Link>
          )}
        </nav>
      </div>

      <nav className="rail" aria-label="本部分目录">
        <div className="rail__label">本部分目录</div>
        {p.sections.map((s) => (
          <div key={s.id} style={{ marginBottom: 10 }}>
            <a href={`#${s.id}`}>{s.title}</a>
            {s.headings?.length > 0 && (
              <div style={{ paddingLeft: 10, marginTop: 2 }}>
                {s.headings.slice(0, 8).map((hh) => (
                  <a key={hh.id} href={`#${hh.id}`} style={{ fontSize: 12.4 }}>
                    {hh.title}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </main>
  );
}
