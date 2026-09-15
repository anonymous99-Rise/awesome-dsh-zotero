"""检测 PDF 渲染页面里的「孤立分隔线」：一条横贯版心的浅灰细线，上下 45px 内没有文字。

分隔线通常是 #DED9CF 这类浅灰（亮度 ~222），所以判定要看 195–240 区间，而不是深色。

用法: python tools/detect-orphan-rules.py <pdf> [起页] [止页]
"""
import sys

import pypdfium2 as pdfium

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

pdf_path = sys.argv[1]
start = int(sys.argv[2]) if len(sys.argv) > 2 else 1
end = int(sys.argv[3]) if len(sys.argv) > 3 else 9999

doc = pdfium.PdfDocument(pdf_path)
page_count = len(doc)
end = min(end, page_count)

found = 0
for i in range(start - 1, end):
    page = doc[i]
    bitmap = page.render(scale=1.6)
    img = bitmap.to_pil().convert('L')
    pw, ph = img.size
    px = img.load()
    cols = range(0, pw, 2)
    n = len(list(cols))

    rule_rows = []
    for y in range(60, ph - 60):
        gray = sum(1 for x in cols if 195 <= px[x, y] <= 243)
        dark = sum(1 for x in cols if px[x, y] < 160)
        if gray > 0.60 * n and dark < 0.02 * n:
            rule_rows.append(y)

    if not rule_rows:
        continue
    groups = []
    cur = [rule_rows[0]]
    for y in rule_rows[1:]:
        if y - cur[-1] <= 3:
            cur.append(y)
        else:
            groups.append(cur)
            cur = [y]
    groups.append(cur)

    for ln in groups:
        def has_text(y0, y1):
            a, b = max(0, y0), min(ph, y1)
            return any(
                sum(1 for x in cols if px[x, yy] < 170) > 8 for yy in range(a, b)
            )

        above = has_text(ln[0] - 46, ln[0] - 3)
        below = has_text(ln[-1] + 4, ln[-1] + 46)
        if not above and not below:
            found += 1
            print(f'第 {i + 1} 页: 孤立分隔线 y={ln[0]}-{ln[-1]}（上下 46px 内无文字）')

print(f'—— 共 {found} 处 ——')
