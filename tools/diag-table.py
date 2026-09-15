"""诊断 DOCX 表格：tblPr 子元素顺序 + 指定表格的列宽。"""
import io
import re
import sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

d = sys.argv[1]
x = io.open(d + '/word/document.xml', encoding='utf-8').read()

tables = re.findall(r'<w:tbl>.*?</w:tbl>', x, re.S)
print('tables:', len(tables))

# 1) tblPr 子元素顺序（前 3 个表的第一个 tblPr）
for i, t in enumerate(tables[:3]):
    m = re.search(r'<w:tblPr>(.*?)</w:tblPr>', t, re.S)
    if m:
        kids = re.findall(r'<w:(\w+)', m.group(1))
        print(f'  table#{i} tblPr children:', kids)

# 2) 找出含 URL 的表格，打印它的 grid 与首行单元格宽度
needle = sys.argv[2] if len(sys.argv) > 2 else 'dshdesktop'
for i, t in enumerate(tables):
    if needle not in t:
        continue
    grid = re.search(r'<w:tblGrid>(.*?)</w:tblGrid>', t, re.S)
    cols = [int(c) for c in re.findall(r'w:w="(\d+)"', grid.group(1))] if grid else []
    first_row = re.search(r'<w:tr[ >].*?</w:tr>', t, re.S)
    tcw = [int(c) for c in re.findall(r'<w:tcW w:w="(\d+)"', first_row.group(0))] if first_row else []
    print(f'  table#{i}: grid={cols} sum={sum(cols)}')
    print(f'            first row tcW={tcw}')
    print(f'            tblW={re.search(r"<w:tblW[^/]*/>", t).group(0) if re.search(r"<w:tblW[^/]*/>", t) else None}')
    print(f'            layout={re.search(r"<w:tblLayout[^/]*/>", t).group(0) if re.search(r"<w:tblLayout[^/]*/>", t) else None}')
