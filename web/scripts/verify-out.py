import io
import re
import sys

base = sys.argv[1] if len(sys.argv) > 1 else 'out'

c = io.open(base + '/handbook/dsh-plugins/index.html', encoding='utf-8').read()
print('p3- anchors      :', sorted(set(re.findall(r'p3-\d', c))))
print('anchor-target    :', c.count('anchor-target'))
print('id="p3-0"        :', 'id="p3-0"' in c)
print('handbook links   :', len(re.findall(r'href="[^"]*/handbook/', c)))
print('download hrefs   :', sorted(set(re.findall(r'href="[^"]*downloads[^"]*"', c))))
print('hanchor count    :', c.count('hanchor'))
print('tablewrap count  :', c.count('tablewrap'))
print('codeblock count  :', c.count('class="cb"'))

h = io.open(base + '/index.html', encoding='utf-8').read()
print('home 小节        :', '小节' in h)
print('home dl hrefs    :', sorted(set(re.findall(r'href="[^"]*downloads[^"]*"', h))))

# 检查正文里的跨页锚点是否被改写
m = re.findall(r'href="(/awesome-dsh-zotero/handbook/[^"]+#[^"]*)"', c)
print('rewritten cross  :', sorted(set(m))[:8])
