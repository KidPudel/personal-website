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
# Body size in points; every other size follows it so the page can be fitted to one sheet.
BODY = 10

CONTENT = {
    'en': {
        'name': 'IGOR KUPCHINENKO', 'role': 'JUNIOR PRODUCT DESIGNER · CONSUMER APPS · USER RESEARCH AND INTERACTION DESIGN',
        'portfolio_label': 'Portfolio: ', 'location': 'Moscow, open to office, remote, or relocation', 'linkedin': True, 'phone': None,
        'summary': 'Product designer for consumer apps. Through interviews and observation I find where products don’t fit how people actually behave, and design interactions around how people think. I test decisions on working prototypes: an engineering background and AI tools get me fast feedback from real people. At SuperGood, reordering a usual meal fell from about a minute to 5 seconds and the store rating rose from 3.1 to 3.7.',
        'experience': 'EXPERIENCE',
        'experience_entries': [
            ('PizzaSushiWok (SuperGood)', 'Product Designer / Mobile Engineer, food delivery app | Aug 2023 - Jul 2024', 'supergood', [
                'The only designer and engineer, working directly with business stakeholders. Analysed about **150 reviews** and watched **10 people** order food at work to see where they hesitated.',
                'Made reordering one tap from order history: a usual meal now takes **5 s instead of 60**. In a usability test with 10 colleagues, success rose from **2 to 10 of 10** and ease from **3 to 6 of 7**.',
                'Made time and cost visible before paying: a pinned bar with delivery time and total, and weight, ingredients and nutrition on every dish.',
                'Designed every screen in Figma (components, variables, auto layout) on my own design system with light and dark themes, then rebuilt iOS and Android as **one Flutter app** in 11 months. Store rating rose from **3.1\u00a0to\u00a03.7**.',
            ]),
            ('22bytes', 'Game Designer / Prototype Developer, casual and hyper-casual mobile games | Apr 2023 - Aug 2023', None, [
                'Designed core loops for **7 small games** (puzzles, light strategy, short RPGs): fast nested loops inside longer ones, and chains that unlock step by step.',
                'Playtested every build: 2-5 minute sessions, day-1 retention **27-30%**, day-7 **4-10%**. **2 of 7** were greenlit.',
            ]),
        ],
        'projects_title': 'SELECTED PROJECTS',
        'projects': [
            ('Instagram Saves redesign', 'Independent concept, designed in Figma, prototype built with Claude Code | 2026', 'instagram-saves-redesign', [
                'Nine interviews and a journey map: **6 of 9** couldn’t find a specific save, and **7 of 9** moved what mattered to Notes, Notion or Maps. So search in Saved came before more filing.',
                'Finding a half-remembered post took **about 10 s instead of 90** in a timed test with 3 people. Collection suggestions make a new collection **1 tap instead of 2 taps and typing a name**.',
            ]),
            ('Observatory', 'Personal macOS app, designed in Figma, built with Codex and ChatGPT from my specs, released on GitHub | Jul - Aug 2026', 'observatory', [
                '**5 interviews**: people started from an app, never a process, so processes group under their app. Brave Browser reads as **1 row, not 17**.',
                'Cut top-level sections from **3 to 2**: saved recordings of an app’s resource use now sit where the recording ends. **3\u00a0developer colleagues** have used it for two months. Also made its identity, artwork and launch film.',
            ]),
            ('Two Sticks', 'Telegram product for learning Chinese, built on three university students’ diploma research | 2024', 'two-sticks', [
                'Chose Telegram over a new app, so there’s **nothing to install**, with handwriting as a Telegram Web App. Designed and built the bot, API and Web App.',
                'One saved word list feeds flashcards, notebook sheets and handwriting. Shipped the learner loop before the teacher tools in the brief; students missed pronunciation practice, the next step.',
            ]),
        ],
        'additional_title': 'OTHER EXPERIENCE',
        'additional': [
            ('Paycos', 'Software Developer, contract | Jul 2024 - Dec 2025', 'Built payment and order services; cut PDF receipt processing from **6-10 s to 650 ms**.'),
        ],
        'skills_title': 'SKILLS',
        'skills': 'Research: user interviews, customer development, contextual inquiry, comparative usability testing, review analysis, playtesting, job stories (JTBD), customer journey maps, competitor analysis.\nDesign: UX/UI, interaction design, information architecture, user flows, wireframes, prototyping, design systems, mobile (iOS, Android); visual design, motion, identity, illustration. Figma, FigJam, Material Design, Apple HIG.\nAI and prototyping: designing AI features (semantic search, AI suggestions); prototyping in code (Flutter, React, SwiftUI) with Claude Code, Codex and ChatGPT.',
        'education_title': 'EDUCATION AND LANGUAGES',
        'education': 'MFUA College, vocational diploma in Programming in Computer Systems | 2019 - 2023',
        'languages': 'Russian native, English\u00a0B2',
    },
    'ru': {
        'name': 'ИГОРЬ КУПЧИНЕНКО', 'role': 'ПРОДУКТОВЫЙ ДИЗАЙНЕР (JUNIOR) · B2C · ИССЛЕДОВАНИЯ И ДИЗАЙН ВЗАИМОДЕЙСТВИЙ',
        'portfolio_label': 'Портфолио: ', 'location': 'Москва, открыт к офису, удалёнке и переезду', 'linkedin': False, 'phone': ('+7 985 640-21-97', 'tel:+79856402197'),
        'summary': 'Продуктовый дизайнер B2C-приложений. Через интервью и наблюдение нахожу, где продукт расходится с тем, как люди на самом деле себя ведут, и проектирую взаимодействия под то, как они думают. Проверяю решения на работающих прототипах: опыт в разработке и AI-инструменты дают мне быструю обратную связь от реальных людей. В SuperGood повтор привычного заказа сократился с минуты до 5 секунд, рейтинг вырос с 3,1 до 3,7.',
        'experience': 'ОПЫТ РАБОТЫ',
        'experience_entries': [
            ('PizzaSushiWok (SuperGood)', 'Продуктовый дизайнер / мобильный разработчик, приложение доставки еды | август 2023 - июль 2024', 'supergood', [
                'Единственный дизайнер и разработчик, работал напрямую со стейкхолдерами бизнеса. Разобрал около **150 отзывов** и понаблюдал, как **10 человек** заказывают еду на работе и где сомневаются.',
                'Сделал повтор заказа в одно касание из истории: привычный заказ занимает **5 с вместо 60**. В юзабилити-тесте на 10 коллегах успешность выросла с **2 до 10 из 10**, оценка лёгкости с **3 до 6 из 7**.',
                'Сделал время и цену видимыми до оплаты: закреплённая панель со временем доставки и суммой, а в карточке блюда вес, состав и КБЖУ.',
                'Спроектировал все экраны в Figma (компоненты, варианты, переменные, auto layout) на своей дизайн-системе (светлая и тёмная темы) и пересобрал iOS и Android в **одно Flutter-приложение** за 11 месяцев. Рейтинг вырос с **3,1 до 3,7**.',
            ]),
            ('22bytes', 'Гейм-дизайнер / разработчик прототипов, казуальные мобильные игры | апрель 2023 - август 2023', None, [
                'Спроектировал игровые циклы для **7 небольших игр** (головоломки, лёгкие стратегии, короткие RPG): быстрые вложенные циклы внутри длинных и цепочки, которые открываются шаг за шагом.',
                'Плейтестил все сборки: сессии 2-5 минут, удержание D1 **27-30%**, D7 **4-10%**. Одобрили **2 прототипа из 7**.',
            ]),
        ],
        'projects_title': 'ИЗБРАННЫЕ ПРОЕКТЫ',
        'projects': [
            ('Поиск сохранённых публикаций Instagram', 'Свой концепт, дизайн в Figma, прототип на Claude Code | 2026', 'instagram-saves-redesign', [
                'Девять интервью и CJM: **6 из 9** не могли найти конкретное сохранённое, **7 из 9** уносили важное в Заметки, Notion или Карты. Поэтому начал с поиска в «Сохранённом», а не с сортировки.',
                'В замерах с тремя людьми полузабытый пост находился **примерно за 10 с вместо 90**. Подсказки коллекций превращают создание новой в **одно касание вместо двух касаний и ввода названия**.',
            ]),
            ('Observatory', 'Личный проект на macOS, дизайн в Figma, собран с Codex и ChatGPT, релиз на GitHub | июль - август 2026', 'observatory', [
                '**5 CustDev-интервью**: люди начинали с приложения, а не с процесса, поэтому процессы сгруппированы по приложениям. Brave Browser занимает **1 строку вместо 17**.',
                'Сократил разделы верхнего уровня с **3 до 2**: сохранённые записи нагрузки приложения теперь лежат там же, где запись заканчивается. **3 коллеги-разработчика** пользуются им два месяца. Сделал также айдентику, иллюстрацию и ролик к запуску.',
            ]),
            ('Две палочки', 'Продукт в Telegram для изучения китайского, по дипломному исследованию трёх студенток МПГУ | 2024', 'two-sticks', [
                'Выбрал Telegram вместо нового приложения, так что **ничего не нужно устанавливать**, а письмо от руки сделал через Telegram Web App. Спроектировал и собрал бота, API и Web App.',
                'Один список слов питает карточки, листы-прописи и письмо. Сначала выпустил цикл ученика, а инструменты преподавателя из брифа отложил; студентам не хватило практики произношения.',
            ]),
        ],
        'additional_title': 'ДРУГОЙ ОПЫТ РАБОТЫ',
        'additional': [
            ('Paycos', 'Разработчик ПО, контракт | июль 2024 - декабрь 2025', 'Разрабатывал сервисы оплаты и заказов; сократил обработку PDF-чеков с **6-10 с до 650 мс**.'),
        ],
        'skills_title': 'НАВЫКИ',
        'skills': 'Исследования: CustDev и глубинные интервью, контекстное исследование, сравнительное юзабилити-тестирование, анализ отзывов, плейтесты, job stories (JTBD), CJM, конкурентный анализ.\nДизайн: UX/UI, дизайн взаимодействий, информационная архитектура, сценарии, вайрфреймы, прототипирование, дизайн-системы, мобильный дизайн (iOS, Android); визуальный дизайн, моушн, айдентика, иллюстрация. Figma, FigJam, Material Design, Apple HIG.\nAI и прототипы: проектирование AI-функций (семантический поиск, AI-подсказки); прототипирование в коде (Flutter, React, SwiftUI) с Claude Code, Codex и ChatGPT.',
        'education_title': 'ОБРАЗОВАНИЕ И ЯЗЫКИ',
        'education': 'Колледж МФЮА (СПО), «Программирование в компьютерных системах» | 2019 - 2023',
        'languages': 'английский B2',
    },
}


def link(p, text, url, size=BODY, bold=False):
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


def rich(p, text, size=None):
    # **Bold** marks the key numbers; everything else is a plain run.
    for i, part in enumerate(text.split('**')):
        if not part: continue
        r = p.add_run(part)
        if i % 2: r.bold = True
        if size: r.font.size = Pt(size)


def build(lang, out_dir):
    c=CONTENT[lang]; d=Document(); sec=d.sections[0]
    # Each resume links to the portfolio in its own language.
    site=BASE+('ru/' if lang=='ru' else '')
    sec.page_width=Mm(210); sec.page_height=Mm(297)
    sec.top_margin=Mm(10); sec.bottom_margin=Mm(10)
    sec.left_margin=Mm(14); sec.right_margin=Mm(14)
    normal=d.styles['Normal']; normal.font.name='Arial'; normal.font.size=Pt(BODY)
    normal.font.color.rgb=RGBColor.from_string('222222')
    normal.paragraph_format.line_spacing=1.0
    normal.paragraph_format.space_after=Pt(2)
    for style in d.styles:
        for border in list(style.element.iter(qn('w:pBdr'))):
            border.getparent().remove(border)
    for name in ['Title','Subtitle','Heading 1','Heading 2','List Bullet']:
        s=d.styles[name]; s.font.name='Arial'; s.font.color.rgb=RGBColor(0,0,0)
        fonts=s.element.get_or_add_rPr().get_or_add_rFonts()
        for attr in ['asciiTheme','hAnsiTheme','eastAsiaTheme','cstheme']:
            fonts.attrib.pop(qn('w:'+attr),None)
        for attr in ['ascii','hAnsi','cs','eastAsia']: fonts.set(qn('w:'+attr),'Arial')
    d.styles['Title'].font.size=Pt(23); d.styles['Title'].font.bold=True
    d.styles['Title'].paragraph_format.space_after=Pt(1)
    d.styles['Subtitle'].font.size=Pt(BODY-0.5); d.styles['Subtitle'].font.bold=True
    d.styles['Subtitle'].font.italic=False
    d.styles['Subtitle'].paragraph_format.space_after=Pt(5)
    h=d.styles['Heading 1']; h.font.size=Pt(BODY); h.font.bold=True
    h.paragraph_format.space_before=Pt(3); h.paragraph_format.space_after=Pt(2)
    h.paragraph_format.keep_with_next=True
    h2=d.styles['Heading 2']; h2.font.size=Pt(BODY); h2.font.bold=True
    h2.paragraph_format.space_before=Pt(2); h2.paragraph_format.space_after=Pt(1)
    h2.paragraph_format.keep_with_next=True
    bullet=d.styles['List Bullet']; bullet.font.size=Pt(BODY)
    bullet.paragraph_format.left_indent=Mm(3); bullet.paragraph_format.first_line_indent=Mm(-3)
    bullet.paragraph_format.space_after=Pt(1.5)
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
    plain(p,'  |  Telegram '); link(p,'@iggy_sleepy','https://t.me/iggy_sleepy',10)
    p=d.add_paragraph(); p.paragraph_format.space_after=Pt(6)
    plain(p,c['location']+'  |  ')
    if c['linkedin']:
        link(p,'linkedin.com/in/iggydev','https://www.linkedin.com/in/iggydev',10); plain(p,'  |  ')
    if c['phone']:
        link(p,c['phone'][0],c['phone'][1],10); plain(p,'  |  ')
    link(p,'github.com/KidPudel','https://github.com/KidPudel',10)
    d.add_paragraph(c['summary'])

    def entry(title,context,body,slug=None):
        p=d.add_paragraph(style='Heading 2')
        # An empty slug is the portfolio itself.
        if slug is not None: link(p,title,site+('case-studies/'+slug+'/' if slug else ''),bold=True)
        else: p.add_run(title)
        p=d.add_paragraph(context); p.paragraph_format.keep_with_next=True
        p.paragraph_format.space_after=Pt(2)
        for r in p.runs: r.font.size=Pt(BODY-1)
        for i,s in enumerate(body):
            p=d.add_paragraph(style='List Bullet'); rich(p,'\u2022\t'+s); p.paragraph_format.keep_together=True
            # An entry never splits across pages.
            p.paragraph_format.keep_with_next=i<len(body)-1

    d.add_paragraph(c['experience'],'Heading 1')
    for title,ctx,slug,bullets in c['experience_entries']: entry(title,ctx,bullets,slug)
    d.add_paragraph(c['projects_title'],'Heading 1')
    for title,ctx,slug,bullets in c['projects']: entry(title,ctx,bullets,slug)
    d.add_paragraph(c['additional_title'],'Heading 1')
    for title,ctx,body in c['additional']:
        # Company, role and dates share one line to keep the page to one sheet.
        p=d.add_paragraph(style='Heading 2'); p.add_run(title)
        r=p.add_run('  |  '+ctx); r.bold=False; r.font.size=Pt(BODY-1); r.font.name='Arial'
        r._element.rPr.rFonts.set(qn('w:cs'), 'Arial')
        p=d.add_paragraph(style='List Bullet'); rich(p,'\u2022\t'+body); p.paragraph_format.keep_together=True
    d.add_paragraph(c['skills_title'],'Heading 1'); d.add_paragraph(c['skills'])
    d.add_paragraph(c['education_title'],'Heading 1')
    d.add_paragraph(c['education']+'  ·  '+c['languages'])
    name='igor-kupchinenko-product-designer-resume.docx' if lang=='en' else 'igor-kupchinenko-product-designer-resume-ru.docx'
    target=out_dir/name; d.save(target); print(target)


if __name__ == '__main__':
    import sys
    out_dir=Path(sys.argv[1]) if len(sys.argv)>1 else ROOT/'public'/'resume'
    for lang in CONTENT: build(lang, out_dir)
