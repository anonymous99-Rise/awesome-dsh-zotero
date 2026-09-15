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
