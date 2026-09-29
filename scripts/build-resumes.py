"""Build the English and Russian resume sources with python-docx.

Run with any Python that has python-docx, optionally passing an output folder
for a preview (default: public/resume). Render each .docx to PDF with
`soffice --headless --convert-to pdf`, check that both stay on one page, then
copy the .docx and .pdf files to public/resume.
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
        'summary': 'Product designer for consumer apps with a software-engineering background. I start with interviews and observation, then design flows that make time, cost and the next step clear. At SuperGood I redesigned ordering and rebuilt the app alone: repeating a usual order fell from about a minute to 5 seconds, and the store rating rose from 3.1 to 3.7.',
        'experience': 'PRODUCT DESIGN EXPERIENCE',
        'supergood': ('PizzaSushiWok (SuperGood)', 'Product Designer / Mobile Engineer, sole designer and engineer, food delivery | Aug 2023 - Jul 2024', [
            'Reviews doubted the app and whether the food was worth its price. I owned ordering end to end, working directly with the business. Review analysis and observation showed hidden time and total, people losing their place in the menu, and usual orders rebuilt dish by dish.',
            'Added a pinned bar with delivery time, item count and total, weight, ingredients and nutrition on every dish, and reordering from history: one tap brings back a past order or a single dish.',
            'Rebuilt separate iOS and Android apps as one Flutter app in 11 months, with no handoff: menu, basket, payment with 3DS, maps and tracking, loyalty.',
            'Comparative usability test with 10 colleagues: reordering took 5 s instead of 60 s, success rose from 2 to 10 of 10, ease from 3 to 6 of 7. The store rating rose from 3.1 to 3.7; new reviews praised the app.',
        ]),
        'projects_title': 'SELECTED PROJECTS',
        'projects': [
            ('Observatory', 'Personal macOS app, built with AI coding agents from my specs, released on GitHub | Jul - Aug 2026', 'observatory', [
                'Five interviews defined two needs: see a whole app at once, and record runs to compare. Grouped processes by app, so Brave Browser reads as one row instead of 17.',
                'Iterated the prototype into a scannable list with app-first tests. Three developer colleagues have used it for two months to compare app versions.',
            ]),
            ('Instagram Saves redesign', 'Independent concept, coded prototype | 2026', 'instagram-saves-redesign', [
                'Eight interviews: six said finding a saved post was their main problem, so search came first.',
                'Designed AI search by subject, place or note, and suggestions that make saving to a new collection one tap. Interactive React prototype, live on my site.',
            ]),
            ('Two Sticks', 'Telegram product for learning Chinese, built on a university diploma’s research | 2024', 'two-sticks', [
                'One chat for search, flashcards and handwriting instead of three tools; designed and built the bot, API and Web App. Students missed pronunciation practice, the next step.',
            ]),
        ],
        'additional_title': 'OTHER EXPERIENCE',
        'additional': [
            ('Paycos', 'Software Developer, contract | Jul 2024 - Dec 2025', 'Built payment and order-processing services. Cut PDF receipt processing from 6-10 s to 650 ms by extracting text directly, keeping OCR for images.'),
            ('22bytes', 'Mobile Game Designer / Prototype Developer | Apr 2023 - Aug 2023', 'Designed and built playable Android game prototypes in short cycles: interaction, player feedback, scope.'),
        ],
        'skills_title': 'SKILLS',
        'skills': 'Research: user interviews, customer development, contextual inquiry, comparative usability testing, review analysis, synthesis, competitor analysis, CJM, JTBD.\nDesign: UX/UI, information architecture, user flows, wireframes, interaction design, prototyping, design systems, adaptive layouts, motion. Figma, Material Design, Apple HIG.\nAI: designing AI-assisted features (suggestions, semantic search, error states); building with AI coding agents (Claude Code, Codex).\nCode: React, Flutter, HTML/CSS/JS, SwiftUI; Go, Python.',
        'education_title': 'EDUCATION AND LANGUAGES',
        'education': 'Programming in Computer Systems, MFUA College | 2019 - 2023',
        'languages': 'Russian native, English B2',
    },
    'ru': {
        'name': 'ИГОРЬ КУПЧИНЕНКО', 'role': 'ПРОДУКТОВЫЙ ДИЗАЙНЕР · B2C · ИССЛЕДОВАНИЯ И ПРОЕКТИРОВАНИЕ ИНТЕРФЕЙСОВ',
        'portfolio_label': 'Портфолио: ', 'location': 'Москва · офис, гибрид или удалённо',
        'summary': 'Продуктовый дизайнер B2C-приложений с опытом разработки. Начинаю с интервью и наблюдения, затем проектирую сценарии, в которых понятны сроки, цена и следующий шаг. В SuperGood переделал заказ и в одиночку пересобрал приложение: повтор привычного заказа сократился примерно с минуты до 5 секунд, рейтинг в магазинах вырос с 3,1 до 3,7.',
        'experience': 'ОПЫТ В ПРОДУКТОВОМ ДИЗАЙНЕ',
        'supergood': ('PizzaSushiWok (SuperGood)', 'Продуктовый дизайнер / мобильный разработчик, один в команде, доставка еды | август 2023 - июль 2024', [
            'В отзывах сомневались и в приложении, и в цене еды. Отвечая за заказ целиком и работая напрямую с бизнесом, разобрал отзывы и понаблюдал за заказом: срок и сумма были не видны, в меню терялись, привычный заказ собирали по одному блюду.',
            'Добавил закреплённую панель со сроком, числом позиций и суммой, вес, состав и КБЖУ в карточку блюда и повтор из истории: одно касание возвращает прошлый заказ или отдельное блюдо.',
            'Пересобрал отдельные приложения для iOS и Android в одно на Flutter за 11 месяцев, без передачи макетов: меню, корзина, оплата с 3DS, карты и отслеживание, лояльность.',
            'Сравнительный юзабилити-тест на 10 коллегах: повтор заказа за 5 с вместо 60 с, успешность с 2 до 10 из 10, лёгкость с 3 до 6 из 7. Рейтинг вырос с 3,1 до 3,7, отзывы хвалили приложение.',
        ]),
        'projects_title': 'ИЗБРАННЫЕ ПРОЕКТЫ',
        'projects': [
            ('Observatory', 'Личный проект на macOS, собран с AI-агентами по моим спецификациям, релиз на GitHub | июль - август 2026', 'observatory', [
                'Пять интервью выявили две потребности: видеть приложение целиком и записывать прогоны для сравнения. Сгруппировал процессы: Brave Browser занимает одну строку вместо 17.',
                'Доработал прототип: список вместо карточек, тест начинается с выбора приложения. Три коллеги-разработчика два месяца сравнивают в нём версии приложений.',
            ]),
            ('Поиск сохранённых публикаций Instagram', 'Самостоятельный концепт, прототип в коде | 2026', 'instagram-saves-redesign', [
                'Восемь интервью: для шести главной проблемой был поиск сохранённого, поэтому начал с поиска.',
                'Спроектировал AI-поиск по теме, месту или заметке и подсказки, с которыми сохранение в новую коллекцию занимает одно касание. Прототип на React работает на моём сайте.',
            ]),
            ('Две палочки', 'Продукт в Telegram для изучения китайского по исследованию дипломной работы | 2024', 'two-sticks', [
                'Один чат для поиска, карточек и письма от руки вместо трёх инструментов; спроектировал и собрал бота, API и Web App. Студентам не хватало практики произношения, это следующий шаг.',
            ]),
        ],
        'additional_title': 'ДРУГОЙ ОПЫТ РАБОТЫ',
        'additional': [
            ('Paycos', 'Разработчик ПО, контракт | июль 2024 - декабрь 2025', 'Разрабатывал сервисы оплаты и обработки заказов. Сократил обработку PDF-чеков с 6-10 с до 650 мс: извлекал текст напрямую, оставив OCR для изображений.'),
            ('22bytes', 'Гейм-дизайнер / разработчик прототипов | апрель 2023 - август 2023', 'Быстро собирал игровые Android-прототипы: взаимодействие, фидбек игроку, объём.'),
        ],
        'skills_title': 'НАВЫКИ',
        'skills': 'Исследования: CustDev и глубинные интервью, контекстное исследование, сравнительное юзабилити-тестирование, анализ отзывов, синтез, конкурентный анализ, CJM, JTBD.\nДизайн: UX/UI, информационная архитектура, сценарии, вайрфреймы, прототипирование, дизайн-система, адаптив, моушн. Figma, Material Design, Apple HIG.\nAI: проектирование AI-функций (подсказки, семантический поиск, ошибки), разработка с AI-агентами (Claude Code, Codex).\nКод: React, Flutter, HTML/CSS/JS, SwiftUI; Go, Python.',
        'education_title': 'ОБРАЗОВАНИЕ И ЯЗЫКИ',
        'education': 'МФЮА, «Программирование в компьютерных системах» | 2019 - 2023',
        'languages': 'английский B2',
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


def build(lang, out_dir):
    c=CONTENT[lang]; d=Document(); sec=d.sections[0]
    # Each resume links to the portfolio in its own language.
    site=BASE+('ru/' if lang=='ru' else '')
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
    plain(p,c['portfolio_label']); link(p,'kidpudel.github.io/personal-website',site,10)
    plain(p,'  |  '); link(p,'i.kupchinenko@gmail.com','mailto:i.kupchinenko@gmail.com',10)
    p=d.add_paragraph(); p.paragraph_format.space_after=Pt(6)
    plain(p,c['location']+'  |  ')
    link(p,'linkedin.com/in/iggydev','https://www.linkedin.com/in/iggydev',10)
    plain(p,'  |  '); link(p,'github.com/KidPudel','https://github.com/KidPudel',10)
    d.add_paragraph(c['summary'])

    def entry(title,context,body,slug=None):
        p=d.add_paragraph(style='Heading 2')
        if slug: link(p,title,site+'case-studies/'+slug+'/',bold=True)
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
    for title,ctx,body in c['additional']:
        # Company, role and dates share one line to keep the page to one sheet.
        p=d.add_paragraph(style='Heading 2'); p.add_run(title)
        r=p.add_run('  |  '+ctx); r.bold=False; r.font.size=Pt(9.5); r.font.name='Arial'
        r._element.rPr.rFonts.set(qn('w:cs'), 'Arial')
        p=d.add_paragraph('\u2022\t'+body,'List Bullet'); p.paragraph_format.keep_together=True
    d.add_paragraph(c['skills_title'],'Heading 1'); d.add_paragraph(c['skills'])
    d.add_paragraph(c['education_title'],'Heading 1')
    d.add_paragraph(c['education']+'  ·  '+c['languages'])
    name='igor-kupchinenko-product-designer-resume.docx' if lang=='en' else 'igor-kupchinenko-product-designer-resume-ru.docx'
    target=out_dir/name; d.save(target); print(target)


if __name__ == '__main__':
    import sys
    out_dir=Path(sys.argv[1]) if len(sys.argv)>1 else ROOT/'public'/'resume'
    for lang in CONTENT: build(lang, out_dir)
