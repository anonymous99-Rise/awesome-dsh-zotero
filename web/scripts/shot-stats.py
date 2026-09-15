"""检查截图是否真的有内容，并对比明暗主题的亮度差。"""
import glob
import os
import sys

from PIL import Image

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

for path in sorted(glob.glob(os.path.join(sys.argv[1], '*.png'))):
    im = Image.open(path).convert('L')
    px = list(im.getdata())
    n = len(px)
    mean = sum(px) / n
    uniq = len(set(px))
    dark_ratio = sum(1 for p in px if p < 60) / n
    print(
        f'{os.path.basename(path):24s} {im.size[0]}x{im.size[1]}  '
        f'mean={mean:6.1f}  shades={uniq:4d}  dark%={dark_ratio * 100:5.1f}'
    )
