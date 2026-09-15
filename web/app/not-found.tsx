import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="main main--solo">
      <div>
        <header className="pagehead">
          <span className="pagehead__eyebrow">404</span>
          <h1>这个页面不存在</h1>
          <p>可能是链接过期了，或者地址打错了一个字。</p>
        </header>
        <Link className="btn btn--primary" href="/">
          🏠 回到手册首页
        </Link>
      </div>
    </main>
  );
}
