import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import Shell, { type NavPart } from '@/components/Shell';
import Enhancer from '@/components/Enhancer';
import { getHandbook } from '@/lib/content';

export const metadata: Metadata = {
  title: {
    default: 'DSH 科研工具手册 · Zotero × DSH Desktop × 生物信息学',
    template: '%s · DSH 科研工具手册',
  },
  description:
    '面向生物信息学方向研究生的科研工具手册：Zotero 插件精选、DSH Desktop 安装配置、DSH 插件推荐、科研流水线与可直接使用的提示词。',
  keywords: [
    'Zotero',
    'DSH',
    'DeepSeek Harness',
    '生物信息学',
    '科研工具',
    '文献管理',
    '插件',
  ],
  authors: [{ name: 'anonymous99-Rise' }],
  openGraph: {
    title: 'DSH 科研工具手册',
    description: 'Zotero 插件 × DSH Desktop × 生物信息学科研工作流',
    type: 'website',
  },
};

const THEME_BOOT = `(function(){try{var q=new URLSearchParams(location.search).get('theme');var t=(q==='dark'||q==='light')?q:(localStorage.getItem('dsh-theme')||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'));document.documentElement.dataset.theme=t;}catch(e){}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  const handbook = getHandbook();
  const parts: NavPart[] = handbook.parts.map((p) => ({
    id: p.id,
    title: p.title,
    icon: p.icon,
    sections: p.sections.map((s) => ({ id: s.id, title: s.title })),
  }));

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body>
        <Shell parts={parts}>
          {children}
          <footer className="footer">
            <span>📘 DSH 科研工具手册 {handbook.version}</span>
            <span>共 {handbook.stats.parts} 部分 · {handbook.stats.sections} 小节</span>
            <span>更新于 {new Date(handbook.generatedAt).toLocaleDateString('zh-CN')}</span>
            <a
              href="https://github.com/anonymous99-Rise/awesome-dsh-zotero"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub 仓库
            </a>
            <a
              href="https://github.com/anonymous99-Rise/awesome-dsh-zotero/edit/main/awesome_zotero_plugins.md"
              target="_blank"
              rel="noopener noreferrer"
            >
              补充 / 纠错
            </a>
            <a
              href="https://kael-odin.github.io/awesome-academic-research-skills/"
              target="_blank"
              rel="noopener noreferrer"
            >
              学术 Skill 榜单
            </a>
            <span>Made for 生物信息学的妹妹 💚</span>
          </footer>
        </Shell>
        <Enhancer />
      </body>
    </html>
  );
}
