"""把 PDF 的指定页渲染成 PNG，用于人工检查排版。"""
import sys
import pypdfium2 as pdfium

pdf_path = sys.argv[1]
out_prefix = sys.argv[2]
pages = [int(x) for x in sys.argv[3].split(',')]

doc = pdfium.PdfDocument(pdf_path)
print('total pages:', len(doc))
for p in pages:
    if p < 1 or p > len(doc):
        continue
    page = doc[p - 1]
    bitmap = page.render(scale=1.55)  # ≈111 DPI
    img = bitmap.to_pil()
    out = f'{out_prefix}-{p:02d}.png'
    img.save(out)
    print('wrote', out, img.size)
