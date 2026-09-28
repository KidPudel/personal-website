"""Build the English and Russian resume sources with python-docx.

Use the Codex bundled Python runtime. Render with the documents skill's
render_docx.py --emit_pdf, inspect both pages, then copy PDFs to public/resume.
"""
from pathlib import Path
from docx import Document
from docx.shared import Pt, Mm, RGBColor
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.opc.constants import RELATIONSHIP_TYPE as RT

ROOT = Path(__file__).resolve().parents[1]
BASE = 'https://kidpudel.github.io/personal-website/'

CONTENT = {
    'en': {
        'name': 'IGOR KUPCHINENKO', 'role': 'PRODUCT DESIGNER · CONSUMER APPS · RESEARCH AND INTERACTION DESIGN',
        'portfolio_label': 'Portfolio: ', 'location': 'Moscow · office, hybrid or remote',
        'summary': 'Product designer for consumer apps. I start with interviews and watching people use a product, then design the flows and information that show them what is happening, what comes next and what it costs. Shipped a food-ordering app on iOS and Android; since then, research-led projects, including AI-assisted features. A software-engineering background lets me prototype in code and ship apps by directing AI coding agents.',
        'experience': 'PRODUCT DESIGN EXPERIENCE',
        'supergood': ('PizzaSushiWok (SuperGood)', 'Product Designer / Mobile Engineer, food delivery app | Aug 2023 - Jul 2024', [
            'Public reviews questioned both the app and whether the food was worth the price. Customer conversations, observed orders and prototype tasks showed people could not judge a dish, delivery time or total before paying.',
            'Added weight, ingredients, nutrition and cooking time to the dish sheet, and a persistent bar with delivery time, item count and total. Brought address, time, payment, bonuses and total into one checkout, each editable in place.',
            'Weekday orders often repeated, so I turned order history into reordering: add single dishes or a whole past order back to the basket.',
            'Designed and built the app in Flutter, replacing separate iOS and Android apps with no handoff: menu, basket, payment and 3DS, maps and tracking, loyalty, on a design system of Material Design components. Shipped on both platforms.',
        ]),
        'projects_title': 'SELECTED PROJECTS',
        'projects': [
            ('Instagram Saves redesign', 'Independent concept, coded prototype | 2026', 'instagram-saves-redesign', [
                'Interviewed eight people about saving and finding posts. Synthesis showed the work of organising was left to their future selves: too much to file, too little to remember, too easy to leave.',
                'Designed AI-assisted collection suggestions and search by subject, place or note. The full list stays one tap away, so a wrong suggestion never takes the choice away. Built as an interactive React prototype, live on my site.',
            ]),
            ('Observatory', 'Personal macOS app, built with AI coding agents from my specs, released on GitHub | Jul 2026 - Aug 2026', 'observatory', [
                'Five interviews about recent performance checks defined two needs: see a whole application at once, and keep a recording to compare later. Grouped processes under their application, with detail one level below.',
                'Reviewed the first prototype against those tasks and made three changes: cards became a scannable list with a live plot, test setup starts from the app, saved results moved into the recording flow.',
            ]),
        ],
        'additional_title': 'OTHER EXPERIENCE',
        'additional': [
            ('Paycos', 'Software Developer, contract | Jul 2024 - Dec 2025', 'Built payment and order-processing services. Cut PDF receipt processing from 6-10 s to 650 ms by extracting text directly, keeping OCR for images.'),
            ('22bytes', 'Mobile Game Designer / Prototype Developer | Apr 2023 - Aug 2023', 'Designed and built playable Android game prototypes in short cycles: interaction, player feedback, scope.'),
        ],
        'skills_title': 'SKILLS',
        'skills': 'Research: user interviews, customer development, usability testing, observation, synthesis, competitor analysis, CJM, JTBD, hypothesis framing.\nDesign: UX/UI, information architecture, user flows, wireframes, interaction design, prototyping, design systems, adaptive layouts, motion. Figma, Material Design, Apple HIG.\nAI: designing AI-assisted features (suggestions, semantic search, error states); building with AI coding agents (Claude Code, Codex).\nCode: React, Flutter, HTML/CSS/JS, SwiftUI; Go, Python.',
        'education_title': 'EDUCATION AND LANGUAGES',
        'education': 'Diploma in Programming in Computer Systems, MFUA College | 2019 - 2023',
        'languages': 'Russian: native | English: B2 (upper-intermediate)',
    },
    'ru': {
        'name': 'ИГОРЬ КУПЧИНЕНКО', 'role': 'ПРОДУКТОВЫЙ ДИЗАЙНЕР · B2C · ИССЛЕДОВАНИЯ И ПРОЕКТИРОВАНИЕ ИНТЕРФЕЙСОВ',
        'portfolio_label': 'Портфолио: ', 'location': 'Москва · офис, гибрид или удалённо',
        'summary': 'Продуктовый дизайнер B2C-приложений. Начинаю с интервью и наблюдения за использованием, затем проектирую сценарии и подачу информации, чтобы человеку было понятно, что происходит, что дальше и сколько это стоит. Выпустил приложение заказа еды на iOS и Android, затем делал исследовательские проекты, включая AI-функции. Прототипирую в коде и довожу приложения до релиза с AI-агентами.',
        'experience': 'ОПЫТ В ПРОДУКТОВОМ ДИЗАЙНЕ',
        'supergood': ('PizzaSushiWok (SuperGood)', 'Продуктовый дизайнер / мобильный разработчик, доставка еды | август 2023 - июль 2024', [
            'В отзывах критиковали и приложение, и то, стоит ли еда своих денег. CustDev-интервью, наблюдение за заказом и задания на прототипе показали: до оплаты людям не хватало понимания блюда, срока доставки и суммы.',
            'Добавил в карточку блюда вес, состав, КБЖУ и время приготовления, а в закреплённую панель срок доставки и сумму. Адрес, время, оплата, бонусы и итог собраны на одном экране оформления.',
            'Будничные заказы часто повторялись, поэтому превратил историю в повторный заказ: можно вернуть в корзину отдельные блюда или весь прошлый заказ.',
            'Спроектировал и собрал на Flutter одно приложение вместо двух, без передачи макетов: от меню и оплаты с 3DS до карты и лояльности, на своей дизайн-системе. Выпустил на iOS и Android.',
        ]),
        'projects_title': 'ИЗБРАННЫЕ ПРОЕКТЫ',
        'projects': [
            ('Поиск сохранённых публикаций Instagram', 'Самостоятельный концепт, прототип в коде | 2026', 'instagram-saves-redesign', [
                'Провёл восемь интервью о том, как люди сохраняют и находят посты. Общий паттерн: разбор сохранённого откладывают на «потом», и найти нужное со временем всё сложнее.',
                'Спроектировал AI-подсказки коллекций и поиск по теме, месту или заметке. Полный список остаётся под рукой, чтобы ошибка подсказки не отнимала выбор. Прототип на React работает на моём сайте.',
            ]),
            ('Observatory', 'Личный проект на macOS, разработка с AI-агентами по моим спецификациям | июль 2026 - август 2026', 'observatory', [
                'Пять интервью о проверках производительности выявили две потребности: видеть приложение целиком и сохранять запись для сравнения. Сгруппировал процессы по приложениям.',
                'Проверил первый прототип на тех же задачах и внёс три изменения: карточки заменил списком с живым графиком, тест начинается с выбора приложения, результаты перенёс в сценарий записи.',
            ]),
        ],
        'additional_title': 'ДРУГОЙ ОПЫТ РАБОТЫ',
        'additional': [
            ('Paycos', 'Разработчик ПО, контракт | июль 2024 - декабрь 2025', 'Разрабатывал сервисы оплаты и обработки заказов. Сократил обработку PDF-чеков с 6-10 с до 650 мс: извлекал текст напрямую, оставив OCR для изображений.'),
            ('22bytes', 'Гейм-дизайнер / разработчик прототипов | апрель 2023 - август 2023', 'Быстро собирал игровые Android-прототипы: взаимодействие, фидбек игроку, объём.'),
        ],
        'skills_title': 'НАВЫКИ',
        'skills': 'Исследования: CustDev и глубинные интервью, юзабилити-тесты, наблюдение, синтез, конкурентный анализ, CJM, JTBD, продуктовые гипотезы.\nДизайн: UX/UI, информационная архитектура, пользовательские сценарии, вайрфреймы, проектирование взаимодействия, прототипирование, дизайн-система, адаптив, моушн. Figma, Material Design, Apple HIG.\nAI: проектирование AI-функций (подсказки, семантический поиск, ошибки), разработка с AI-агентами (Claude Code, Codex).\nКод: React, Flutter, HTML/CSS/JS, SwiftUI; Go, Python.',
        'education_title': 'ОБРАЗОВАНИЕ И ЯЗЫКИ',
        'education': 'Колледж МФЮА, «Программирование в компьютерных системах» (СПО) | 2019 - 2023',
        'languages': 'Русский: родной | Английский: B2 (Upper-Intermediate)',
    },
}


def link(p, text, url, size=10.5, bold=False):
    h = OxmlElement('w:hyperlink')
    h.set(qn('r:id'), p.part.relate_to(url, RT.HYPERLINK, is_external=True))
    r = OxmlElement('w:r'); pr = OxmlElement('w:rPr')
    for tag, val in [('w:rFonts', None), ('w:color', '222222'), ('w:sz', str(int(size*2))), ('w:u', 'single')]:
        x = OxmlElement(tag)
        if val is not None: x.set(qn('w:val'), val)
        else:
            for attr in ['ascii','hAnsi','cs']: x.set(qn('w:'+attr), 'Arial')
        pr.append(x)
    if bold: pr.append(OxmlElement('w:b'))
    r.append(pr); t=OxmlElement('w:t'); t.text=text; r.append(t); h.append(r); p._p.append(h)


def build(lang):
    c=CONTENT[lang]; d=Document(); sec=d.sections[0]
    sec.page_width=Mm(210); sec.page_height=Mm(297)
    sec.top_margin=Mm(11); sec.bottom_margin=Mm(11)
    sec.left_margin=Mm(16); sec.right_margin=Mm(16)
    normal=d.styles['Normal']; normal.font.name='Arial'; normal.font.size=Pt(10.5)
    normal.font.color.rgb=RGBColor.from_string('222222')
    normal.paragraph_format.line_spacing=1.04
    normal.paragraph_format.space_after=Pt(3)
    for style in d.styles:
        for border in list(style.element.iter(qn('w:pBdr'))):
            border.getparent().remove(border)
    for name in ['Title','Subtitle','Heading 1','Heading 2','List Bullet']:
        s=d.styles[name]; s.font.name='Arial'; s.font.color.rgb=RGBColor(0,0,0)
    d.styles['Title'].font.size=Pt(23); d.styles['Title'].font.bold=True
    d.styles['Title'].paragraph_format.space_after=Pt(1)
    d.styles['Subtitle'].font.size=Pt(11); d.styles['Subtitle'].font.bold=True
    d.styles['Subtitle'].font.italic=False
    d.styles['Subtitle'].paragraph_format.space_after=Pt(5)
    h=d.styles['Heading 1']; h.font.size=Pt(10.5); h.font.bold=True
    h.paragraph_format.space_before=Pt(4); h.paragraph_format.space_after=Pt(2)
    h.paragraph_format.keep_with_next=True
    h2=d.styles['Heading 2']; h2.font.size=Pt(10.5); h2.font.bold=True
    h2.paragraph_format.space_before=Pt(4); h2.paragraph_format.space_after=Pt(1)
    h2.paragraph_format.keep_with_next=True
    bullet=d.styles['List Bullet']; bullet.font.size=Pt(10.5)
    bullet.paragraph_format.left_indent=Mm(3); bullet.paragraph_format.first_line_indent=Mm(-3)
    bullet.paragraph_format.space_after=Pt(2)
    bullet.paragraph_format.tab_stops.add_tab_stop(Mm(3))
    ppr=bullet.element.get_or_add_pPr()
    for num in ppr.findall(qn('w:numPr')): ppr.remove(num)
    d.core_properties.author=c['name']; d.core_properties.title=c['name']+' '+c['role']
    d.core_properties.language='ru-RU' if lang=='ru' else 'en-US'
    settings=d.settings.element; default=settings.find(qn('w:themeFontLang'))
    if default is not None: default.set(qn('w:val'), 'ru-RU' if lang=='ru' else 'en-US')
    d.add_paragraph(c['name'],'Title'); d.add_paragraph(c['role'],'Subtitle')
    def plain(p,text): p.add_run(text).font.size=Pt(10)
    p=d.add_paragraph(); p.paragraph_format.space_after=Pt(2)
    plain(p,c['portfolio_label']); link(p,'kidpudel.github.io/personal-website',BASE,10)
    plain(p,'  |  '); link(p,'i.kupchinenko@gmail.com','mailto:i.kupchinenko@gmail.com',10)
    p=d.add_paragraph(); p.paragraph_format.space_after=Pt(6)
    plain(p,c['location']+'  |  ')
    link(p,'linkedin.com/in/iggydev','https://www.linkedin.com/in/iggydev',10)
    plain(p,'  |  '); link(p,'github.com/KidPudel','https://github.com/KidPudel',10)
    d.add_paragraph(c['summary'])

    def entry(title,context,body,slug=None):
        p=d.add_paragraph(style='Heading 2')
        if slug: link(p,title,BASE+'case-studies/'+slug+'/',bold=True)
        else: p.add_run(title)
        p=d.add_paragraph(context); p.paragraph_format.keep_with_next=True
        p.paragraph_format.space_after=Pt(2)
        for r in p.runs: r.font.size=Pt(9.5)
        for s in body:
            p=d.add_paragraph('\u2022\t'+s,'List Bullet'); p.paragraph_format.keep_together=True

    d.add_paragraph(c['experience'],'Heading 1')
    title,ctx,bullets=c['supergood']; entry(title,ctx,bullets,'supergood')
    d.add_paragraph(c['projects_title'],'Heading 1')
    for title,ctx,slug,bullets in c['projects']: entry(title,ctx,bullets,slug)
    d.add_paragraph(c['additional_title'],'Heading 1')
    for title,ctx,body in c['additional']: entry(title,ctx,[body])
    d.add_paragraph(c['skills_title'],'Heading 1'); d.add_paragraph(c['skills'])
    d.add_paragraph(c['education_title'],'Heading 1')
    p=d.add_paragraph(c['education']); p.paragraph_format.space_after=Pt(1)
    d.add_paragraph(c['languages'])
    name='igor-kupchinenko-product-designer-resume-2026.docx' if lang=='en' else 'igor-kupchinenko-product-designer-resume-ru.docx'
    target=ROOT/'public'/'resume'/name; d.save(target); print(target)


if __name__ == '__main__':
    for lang in CONTENT: build(lang)
