'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent, ReactNode } from 'react';

export type NavPart = {
  id: string;
  title: string;
  icon: string;
  sections: { id: string; title: string }[];
};
export type Hit = { p: string; pt: string; s: string; st: string; t: string };

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

function excerpt(text: string, key: string, len = 110) {
  const i = text.toLowerCase().indexOf(key.toLowerCase());
  if (i < 0) return text.slice(0, len);
  const start = Math.max(0, i - 34);
  return (start > 0 ? '…' : '') + text.slice(start, start + len);
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
}

function highlight(text: string, key: string) {
  if (!key) return escapeHtml(text);
  const safe = escapeHtml(text);
  const re = new RegExp(`(${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return safe.replace(re, '<mark>$1</mark>');
}

export default function Shell({
  parts,
  children,
}: {
  parts: NavPart[];
  children: ReactNode;
}) {
  const pathname = usePathname() ?? '';
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [drawer, setDrawer] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  /* ── 主题 ── */
  useEffect(() => {
    const saved = localStorage.getItem('dsh-theme') as 'light' | 'dark' | null;
    const initial =
      saved ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
  }, []);
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem('dsh-theme', next);
  };

  /* ── 阅读进度 ── */
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? Math.min(100, (window.scrollY / h) * 100) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pathname]);

  /* ── toast ── */
  const [toast, setToast] = useState('');
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const on = (e: Event) => {
      setToast((e as CustomEvent<string>).detail);
      clearTimeout(timer);
      timer = setTimeout(() => setToast(''), 1700);
    };
    window.addEventListener('dsh-toast', on as EventListener);
    return () => window.removeEventListener('dsh-toast', on as EventListener);
  }, []);

  /* ── 快捷键 ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setDrawer(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    setDrawer(false);
  }, [pathname]);

  const activePart = useMemo(
    () => parts.find((p) => pathname.includes(`/handbook/${p.id}`)),
    [parts, pathname],
  );

  return (
    <>
      <div className="progress" style={{ width: `${progress}%` }} />

      <header className="topbar">
        <button
          className="btn btn--ghost btn--icon topbar__menu"
          onClick={() => setDrawer((v) => !v)}
          aria-label="打开目录"
        >
          ☰
        </button>
        <Link href="/" className="topbar__brand">
          <span className="topbar__mark">🧬</span>
          <span>
            <span className="topbar__title">DSH 科研工具手册</span>
            <br />
            <span className="topbar__sub">Zotero × DSH Desktop × 生物信息学</span>
          </span>
        </Link>
        <span className="topbar__spacer" />
        <div className="topbar__actions">
          <button className="btn" onClick={() => setSearchOpen(true)} aria-label="搜索全文">
            🔍 <span style={{ display: 'inline' }}>搜索</span>
            <kbd className="btn__kbd">Ctrl K</kbd>
          </button>
          <a
            className="btn btn--ghost btn--icon"
            href={`${BASE}/downloads/dsh-research-handbook.docx`}
            download
            title="下载 Word 版"
            aria-label="下载 Word 版"
          >
            📄
          </a>
          <a
            className="btn btn--ghost btn--icon"
            href="https://github.com/anonymous99-Rise/awesome-dsh-zotero"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub 仓库"
            aria-label="GitHub 仓库"
          >
            🐙
          </a>
          <button
            className="btn btn--ghost btn--icon"
            onClick={toggleTheme}
            title="切换深浅色"
            aria-label="切换深浅色"
          >
            {theme === 'dark' ? '🌞' : '🌙'}
          </button>
        </div>
      </header>

      <div className="drawer-bg" data-open={drawer} onClick={() => setDrawer(false)} />
      <div className="shell">
        <aside className="sidebar" data-open={drawer} onClick={() => setDrawer(false)}>
          <div className="sidebar__group">
            <div className="sidebar__label">开始</div>
            <Link className="navlink" href="/">
              <span className="navlink__icon">🏠</span>
              <span>首页 · 手册总览</span>
            </Link>
          </div>
          <div className="sidebar__group">
            <div className="sidebar__label">目录</div>
            {parts.map((p) => (
              <div key={p.id} style={{ marginBottom: 6 }}>
                <Link
                  className={`navlink${p.id === activePart?.id ? ' is-active' : ''}`}
                  href={`/handbook/${p.id}/`}
                >
                  <span className="navlink__icon">{p.icon}</span>
                  <span>{p.title}</span>
                  <span className="navlink__count">{p.sections.length}</span>
                </Link>
                {p.id === activePart?.id && (
                  <div style={{ marginTop: 4 }}>
                    {p.sections.map((s) => (
                      <a
                        key={s.id}
                        className="navlink navlink--sub"
                        href={`#${s.id}`}
                        data-section-link={s.id}
                      >
                        <span>{s.title}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="sidebar__group">
            <div className="sidebar__label">下载</div>
            <a className="navlink" href={`${BASE}/downloads/dsh-research-handbook.docx`} download>
              <span className="navlink__icon">📄</span>
              <span>Word 版（DOCX）</span>
            </a>
            <a className="navlink" href={`${BASE}/downloads/dsh-research-handbook.md`} download>
              <span className="navlink__icon">📝</span>
              <span>Markdown 源文件</span>
            </a>
          </div>
        </aside>

        <div className="shell__body" data-shell-body>
          {children}
        </div>
      </div>

      {searchOpen && (
        <SearchOverlay
          parts={parts}
          onClose={() => setSearchOpen(false)}
        />
      )}

      <div className={`toast${toast ? ' is-on' : ''}`} role="status">
        {toast}
      </div>
    </>
  );
}

/* ────────────────────────── 搜索浮层 ────────────────────────── */

function SearchOverlay({ parts, onClose }: { parts: NavPart[]; onClose: () => void }) {
  const [idx, setIdx] = useState<Hit[] | null>(null);
  const [q, setQ] = useState('');
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    fetch(`${BASE}/search.json`)
      .then((r) => r.json())
      .then((d: Hit[]) => setIdx(d))
      .catch(() => setIdx([]));
  }, []);

  const results = useMemo(() => {
    const key = q.trim().toLowerCase();
    if (!key || !idx) return [];
    return idx
      .filter((h) => `${h.st} ${h.pt} ${h.t}`.toLowerCase().includes(key))
      .slice(0, 60);
  }, [q, idx]);

  useEffect(() => setCursor(0), [q]);

  const go = useCallback(
    (h: Hit) => {
      onClose();
      window.location.href = `${BASE}/handbook/${h.p}/#${h.s}`;
    },
    [onClose],
  );

  const onKeyDown = (e: ReactKeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (e.key === 'Enter' && results[cursor]) {
      go(results[cursor]);
    }
  };

  const key = q.trim();

  return (
    <div className="overlay" onClick={onClose}>
      <div className="searchbox" onClick={(e) => e.stopPropagation()}>
        <div className="searchbox__input">
          <span aria-hidden="true">🔍</span>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="搜索插件名、命令、技能、章节…（例如 dsh-zotero / scanpy / 安装）"
            aria-label="搜索"
          />
          <span className="searchbox__hint">Esc 关闭</span>
        </div>
        <div className="searchbox__results">
          {!key && (
            <div className="searchbox__empty">
              输入关键词开始搜索 · 共 {idx ? idx.length : '…'} 个小节被索引
              <br />
              <span style={{ fontSize: 12 }}>试试：dsh-zotero、zotero-harvest、单细胞、BibTeX</span>
            </div>
          )}
          {key && !results.length && idx && (
            <div className="searchbox__empty">没有找到「{key}」，换个说法试试？</div>
          )}
          {results.map((h, i) => (
            <a
              key={`${h.p}-${h.s}`}
              className={`hit${i === cursor ? ' is-cursor' : ''}`}
              href={`${BASE}/handbook/${h.p}/#${h.s}`}
              onClick={(e) => {
                e.preventDefault();
                go(h);
              }}
              onMouseEnter={() => setCursor(i)}
            >
              <div className="hit__top">
                <span>{h.pt}</span>
                <span>·</span>
                <span>{parts.find((p) => p.id === h.p)?.icon}</span>
              </div>
              <div
                className="hit__title"
                dangerouslySetInnerHTML={{ __html: highlight(h.st, key) }}
              />
              <div
                className="hit__snip"
                dangerouslySetInnerHTML={{ __html: highlight(excerpt(h.t, key), key) }}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
