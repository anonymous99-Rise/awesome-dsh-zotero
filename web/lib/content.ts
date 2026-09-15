import fs from 'node:fs';
import path from 'node:path';

export type Heading = { id: string; title: string; level: number };
export type Section = {
  id: string;
  title: string;
  html: string;
  text: string;
  headings: Heading[];
};
export type Part = {
  id: string;
  title: string;
  icon: string;
  blurb: string;
  intro: string;
  sections: Section[];
};
export type Handbook = {
  title: string;
  subtitle: string;
  version: string;
  generatedAt: string;
  front: { html: string; text: string };
  parts: Part[];
  stats: {
    parts: number;
    sections: number;
    tables: number;
    codeBlocks: number;
    chars: number;
    readMinutes: number;
  };
};

const DATA = path.join(process.cwd(), 'content', 'handbook.json');

let cached: Handbook | null = null;

export function getHandbook(): Handbook {
  if (cached) return cached;
  if (!fs.existsSync(DATA)) {
    throw new Error(
      `缺少内容数据 ${DATA} —— 请先运行 \`npm run content\`（或 \`npm run build\`）。`,
    );
  }
  cached = JSON.parse(fs.readFileSync(DATA, 'utf8')) as Handbook;
  return cached;
}

export function getPart(id: string): Part | undefined {
  return getHandbook().parts.find((p) => p.id === id);
}

export function neighbours(partId: string) {
  const parts = getHandbook().parts;
  const i = parts.findIndex((p) => p.id === partId);
  return {
    prev: i > 0 ? parts[i - 1] : undefined,
    next: i >= 0 && i < parts.length - 1 ? parts[i + 1] : undefined,
  };
}
