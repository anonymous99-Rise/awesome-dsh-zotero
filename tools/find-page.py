"""在 PDF 里按关键词定位页码。"""
import sys

import pypdfium2 as pdfium

pdf_path = sys.argv[1]
needles = sys.argv[2:]

doc = pdfium.PdfDocument(pdf_path)
texts = []
for i in range(len(doc)):
    page = doc[i]
    tp = page.get_textpage()
    texts.append(tp.get_text_range())

for n in needles:
    hits = [i + 1 for i, t in enumerate(texts) if n in t]
    print(f'{n}: pages {hits}')
