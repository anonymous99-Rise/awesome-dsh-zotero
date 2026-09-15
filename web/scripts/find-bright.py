"""在暗色截图里找出「亮色块」，定位未被主题化的元素。"""
import sys

from PIL import Image

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

path = sys.argv[1]
im = Image.open(path).convert('RGB')
W, H = im.size
px = im.load()

# 按行统计「亮像素」（亮度 > 170）占比
rows = []
for y in range(H):
    n = 0
    for x in range(0, W, 3):
        r, g, b = px[x, y]
        if 0.299 * r + 0.587 * g + 0.114 * b > 170:
            n += 1
    rows.append(n / (W / 3))

# 找出连续的高占比行段
runs = []
start = None
for y, v in enumerate(rows):
    if v > 0.20 and start is None:
        start = y
    elif v <= 0.20 and start is not None:
        if y - start > 8:
            runs.append((start, y))
        start = None
if start is not None and H - start > 8:
    runs.append((start, H))

print(f'{path}  {W}x{H}')
print('亮色带（>20% 宽度的亮像素）:')
for a, b in runs[:12]:
    # 取该带中间行的颜色样本
    y = (a + b) // 2
    samples = {}
    for x in range(0, W, 5):
        c = px[x, y]
        samples[c] = samples.get(c, 0) + 1
    top = sorted(samples.items(), key=lambda kv: -kv[1])[:3]
    print(f'  y={a:4d}-{b:4d} (高{b - a:3d})  主色: ' + ', '.join(f'#{r:02x}{g:02x}{b_:02x} x{n}' for (r, g, b_), n in top))
