"""检查暗色页面里是否还存在「亮青表头」的颜色。"""
import sys

from PIL import Image

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

path = sys.argv[1]
im = Image.open(path).convert('RGB')
W, H = im.size
px = im.load()


def near(c, target, tol=26):
    return all(abs(c[i] - target[i]) <= tol for i in range(3))


TARGETS = {
    'old bright header #34d3c0': (0x34, 0xD3, 0xC0),
    'new dark header  #115e59': (0x11, 0x5E, 0x59),
    'card surface     #1a1e23': (0x1A, 0x1E, 0x23),
}

for name, t in TARGETS.items():
    n = 0
    for y in range(0, H, 2):
        for x in range(0, W, 2):
            if near(px[x, y], t):
                n += 1
    print(f'{name:28s} pixels≈{n * 4:>7d}')
