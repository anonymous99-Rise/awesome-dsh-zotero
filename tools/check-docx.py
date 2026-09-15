import glob
import re
import sys

d = sys.argv[1]
x = open(d + '/word/document.xml', encoding='utf-8').read()

print('paragraphs      :', len(re.findall(r'<w:p[ >]', x)))
print('tables          :', len(re.findall(r'<w:tbl>', x)))
print('heading1 paras  :', len(re.findall(r'Heading1', x)))
print('heading2 paras  :', len(re.findall(r'Heading2', x)))
print('heading3 paras  :', len(re.findall(r'Heading3', x)))
print('page-break-bef  :', len(re.findall(r'w:pageBreakBefore', x)))
print('page fields     :', len(re.findall(r'PAGE', x)))

checks = {
    'cover title': 'DSH 科研工具手册',
    'part1': 'Zotero 插件',
    'part2': 'DSH Desktop 安装',
    'part3': 'DSH 插件区',
    'part4': '科研实战',
    'plugin dsh-literature': 'dsh-literature',
    'plugin dsh-zotero': 'dsh-zotero',
    'plugin harvest': 'zotero-harvest',
    'appendix A': '学术 Skill 榜单',
    'appendix C': '质检清单',
}
for k, v in checks.items():
    print(f'  {k:24s}:', 'OK' if v in x else 'MISSING')

print()
print('fixed table layout :', x.count('<w:tblLayout w:type="fixed"'))
print('rows cantSplit     :', x.count('<w:cantSplit'))
print('titlePg (首页不同) :', x.count('<w:titlePg'))
print('A4 page size       :', 'w:w="11906"' in x and 'w:h="16838"' in x)
print('page fields        :', x.count('PAGE'))

grids = re.findall(r'<w:tblGrid>.*?</w:tblGrid>', x, re.S)
print('table grids        :', len(grids))
for i, g in enumerate(grids):
    cols = [int(c) for c in re.findall(r'w:w="(\d+)"', g)]
    if len(cols) >= 3:
        total = sum(cols)
        share = [round(c / total * 100) for c in cols]
        if any(s >= 30 for s in share) and len(cols) <= 4 and total < 9700:
            print(f'  grid#{i}: {cols} -> {share}%  total={total}')

