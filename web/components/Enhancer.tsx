'use client';

import { useEffect } from 'react';

/**
 * 渐进增强：
 *  1. 代码块「复制」按钮
 *  2. 侧边栏小节链接的滚动高亮（scroll spy）
 *  3. 页内锚点平滑跳转 + 地址栏同步
 */
export default function Enhancer() {
  useEffect(() => {
    const toast = (msg: string) =>
      window.dispatchEvent(new CustomEvent('dsh-toast', { detail: msg }));

    /* ── 1. 复制代码 ── */
    const onClick = async (e: MouseEvent) => {
      const btn = (e.target as HTMLElement)?.closest<HTMLButtonElement>('[data-copy]');
      if (!btn) return;
      const box = btn.closest('.cb');
      const code = box?.querySelector('code');
      if (!code) return;
      const text = code.textContent ?? '';
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
      }
      btn.classList.add('is-done');
      const old = btn.textContent;
      btn.textContent = '已复制 ✓';
      toast('代码已复制到剪贴板');
      setTimeout(() => {
        btn.classList.remove('is-done');
        btn.textContent = old ?? '复制';
      }, 1500);
    };
    document.addEventListener('click', onClick);

    /* ── 2. 滚动高亮 ── */
    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('[data-section-link]'),
    );
    const map = new Map<string, HTMLAnchorElement>();
    links.forEach((a) => {
      const id = a.dataset.sectionLink;
      if (id) map.set(id, a);
    });

    const targets = Array.from(map.keys())
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    let ticking = false;
    const spy = () => {
      ticking = false;
      const y = window.scrollY + 140;
      let current: HTMLElement | null = null;
      for (const el of targets) {
        if (el.offsetTop <= y) current = el;
        else break;
      }
      map.forEach((a) => a.classList.remove('is-active'));
      if (current && map.has(current.id)) {
        map.get(current.id)!.classList.add('is-active');
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(spy);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    spy();

    return () => {
      document.removeEventListener('click', onClick);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return null;
}
