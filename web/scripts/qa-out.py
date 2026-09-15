import io
import re
import sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

home = io.open('out/index.html', encoding='utf-8').read()
part = io.open('out/handbook/dsh-desktop/index.html', encoding='utf-8').read()
css = io.open('out/_next/static/css/' + __import__('os').listdir('out/_next/static/css')[0], encoding='utf-8').read()

checks = [
    ('home: hero badge', '写给生物信息学' in home),
    ('home: gradient title', 'class="grad"' in home),
    ('home: stat numbers', home.count('class="stat__v"') == 5),
    ('home: 7 part cards', home.count('class="card"') >= 9),
    ('home: quickstart 4', home.count('class="qs"') == 4),
    ('home: docx link', 'dsh-research-handbook.docx' in home),
    ('home: theme boot script', 'dsh-theme' in home),
    ('part: pagehead', 'pagehead__eyebrow' in part),
    ('part: rail', 'rail__label' in part),
    ('part: pager', 'class="pager"' in part),
    ('part: 模型配置小节', '2-6' in part and 'API' in part),
    ('part: code block', 'class="cb"' in part),
    ('part: table', 'tablewrap' in part),
    ('part: callout', 'callout' in part),
    ('css: accent token', '--accent: #0f766e' in css),
    ('css: dark theme', "[data-theme='dark']" in css),
    ('css: print rules', '@media print' in css),
    ('css: table sticky', 'position: sticky' in css),
]
for k, v in checks:
    print(('  OK  ' if v else ' FAIL '), k)

print()
print('home size', len(home), '| part size', len(part), '| css size', len(css))
print('sections on dsh-desktop page:', part.count('<section id='))
