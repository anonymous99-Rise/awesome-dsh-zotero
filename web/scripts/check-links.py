"""站点链接自检：检查所有导出页面里的站内链接与锚点是否都能落地。"""

import io
import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

OUT = 'out'
BASE = '/awesome-dsh-zotero'

pages = {}
for root, _dirs, files in os.walk(OUT):
    for f in files:
        if f == 'index.html':
            p = os.path.join(root, f)
            rel = '/' + os.path.relpath(p, OUT).replace('\\', '/')
            rel = rel.replace('/index.html', '/')
            pages[rel] = io.open(p, encoding='utf-8').read()

anchors = {}
for rel, html in pages.items():
    ids = set(re.findall(r'id="([^"]+)"', html))
    anchors[rel] = ids

bad_links = []
bad_anchors = []
checked_links = 0
checked_anchors = 0

for rel, html in pages.items():
    for href in set(re.findall(r'href="([^"]+)"', html)):
        if href.startswith('mailto:') or href.startswith('http'):
            continue
        if href.startswith('#'):
            # 同页锚点（侧栏小节链接 / 标题锚点 / 提示块锚点）
            frag = href[1:]
            if frag:
                checked_anchors += 1
                if frag not in anchors[rel]:
                    bad_anchors.append((rel, href))
            continue
        if not href.startswith(BASE):
            continue
        checked_links += 1
        path, _, frag = href.partition('#')
        target = path[len(BASE):] or '/'
        if not target.endswith('/'):
            target = target + '/'
        if target not in pages:
            # 允许指向真实文件（如 downloads/*.docx）
            if not os.path.exists(OUT + target.rstrip('/')):
                bad_links.append((rel, href))
            continue
        if frag:
            checked_anchors += 1
            if frag not in anchors[target]:
                bad_anchors.append((rel, href))

print('pages           :', len(pages))
print('internal links  :', checked_links)
print('anchor targets  :', checked_anchors)
print('broken links    :', len(bad_links))
for r, h in bad_links[:15]:
    print('   ', r, '->', h)
print('broken anchors  :', len(bad_anchors))
for r, h in bad_anchors[:15]:
    print('   ', r, '->', h)
