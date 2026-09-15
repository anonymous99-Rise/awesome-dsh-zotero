"""检查移动端顶栏右侧是否真的贴边 / 被裁切，以及侧栏 active 状态。"""
import io
import re
import sys

from PIL import Image

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

shot = sys.argv[1]
im = Image.open(shot).convert('RGB')
W, H = im.size
px = im.load()
bg = px[2, H // 2]  # 页面背景色


def is_bg(c, tol=10):
    return all(abs(c[i] - bg[i]) <= tol for i in range(3))


# 顶栏区域右侧：找最右侧的「非背景」像素
right = 0
for y in range(0, 62):
    for x in range(W - 1, W - 25, -1):
        if not is_bg(px[x, y]):
            right = max(right, x)
            break
print(f'{shot}  {W}x{H}  bg={bg}')
print(f'顶栏最右非背景像素 x = {right}  (视口宽 {W})  右侧留白 = {W - 1 - right}px')

# 侧栏 active：从导出的 HTML 里看
page = sys.argv[2] if len(sys.argv) > 2 else None
if page:
    html = io.open(page, encoding='utf-8').read()
    links = re.findall(r'<a class="navlink([^"]*)" href="([^"]+)"', html)
    print('\\nnavlink active 状态（服务端渲染结果）:')
    for cls, href in links[:14]:
        flag = ' *ACTIVE*' if 'is-active' in cls else ''
        print(f'   {href:52s}{flag}')
