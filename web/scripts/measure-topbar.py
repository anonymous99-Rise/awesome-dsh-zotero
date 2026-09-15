"""精确测量移动端顶栏：以顶栏自身底色为基准，找最右内容像素与各按钮的位置。"""
import sys

from PIL import Image

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

path = sys.argv[1]
im = Image.open(path).convert('RGB')
W, H = im.size
px = im.load()

# 顶栏底色 = 顶栏区域出现次数最多的颜色
counts = {}
for y in range(0, 60, 2):
    for x in range(0, W, 2):
        counts[px[x, y]] = counts.get(px[x, y], 0) + 1
bar_bg = max(counts.items(), key=lambda kv: kv[1])[0]


def far(c):
    return max(abs(c[i] - bar_bg[i]) for i in range(3))


# 逐列判断该列是否有明显不同于顶栏底色的像素
cols = []
for x in range(W):
    hit = False
    for y in range(4, 58):
        if far(px[x, y]) > 18:
            hit = True
            break
    cols.append(hit)

runs = []
start = None
for x, v in enumerate(cols):
    if v and start is None:
        start = x
    elif not v and start is not None:
        runs.append((start, x - 1))
        start = None
if start is not None:
    runs.append((start, W - 1))

print(f'{path}  {W}x{H}  顶栏底色={bar_bg}')
print('顶栏内容块（x 区间，宽）:')
for a, b in runs:
    if b - a >= 2:
        print(f'   x={a:4d}-{b:4d}  (宽 {b - a + 1:3d})')
print(f'最右内容像素 x = {max((b for _a, b in runs), default=-1)}  右侧留白 = {W - 1 - max((b for _a, b in runs), default=-1)}px')
