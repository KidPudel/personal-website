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
        'name': 'IGOR KUPCHINENKO', 'role': 'JUNIOR PRODUCT DESIGNER · CONSUMER APPS · RESEARCH AND INTERACTION DESIGN',
        'portfolio_label': 'Portfolio: ', 'location': 'Moscow', 'linkedin': True,
        'summary': 'Product designer for consumer apps, with backgrounds in software engineering and game design. I start with interviews and observation, then design flows that make time, cost and the next step clear. At SuperGood I redesigned ordering and rebuilt the app alone: reordering a usual meal fell from about a minute to 5 seconds, and the store rating rose from 3.1 to 3.7.',
        'experience': 'DESIGN EXPERIENCE',
        'experience_entries': [
            ('PizzaSushiWok (SuperGood)', 'Product Designer / Mobile Engineer, food delivery app | Aug 2023 - Jul 2024', 'supergood', [
                'As the only designer and engineer, owned ordering end to end and worked directly with the business. Reviews doubted the app and the food’s value, so I analysed about 150 of them and watched and interviewed 10 people ordering at work to see where they hesitated.',
                'Cut reordering a usual meal from 60 s to 5 s with one-tap repeats from order history, with notices for changed prices and sold-out dishes. In a comparative usability test with 10 colleagues, success rose from 2 to 10 of 10 and ease from 3 to 6 of 7.',
                'Made time and cost visible before paying: a pinned bar with delivery time, item count and total, plus weight, ingredients and nutrition on every dish, so nobody has to leave the menu to check.',
                'Rebuilt separate iOS and Android apps as one Flutter app in 11 months, with no handoff, on a design system I built with light and dark themes: menu, basket, 3DS payment, maps, tracking, loyalty. The store rating rose from 3.1 to 3.7, and new reviews praised the app.',
            ]),
            ('22bytes', 'Game Designer / Prototype Developer, casual and hyper-casual mobile games | Apr 2023 - Aug 2023', None, [
                'Designed core loops for 7 small games (puzzles, light strategy, short RPGs): fast nested loops inside longer ones, and chains that unlock step by step.',
                'Shaped strategy through constraints: obstacles and limits that make players choose between approaches.',
                'Playtested every build: 2 to 5 minute sessions, day-1 retention of 27-30% and day-7 of 4-10%. 2 of 7 prototypes were greenlit.',
            ]),
        ],
        'projects_title': 'SELECTED PROJECTS',
        'projects': [
            ('Observatory', 'Personal macOS app, built with AI coding agents from my specs, released on GitHub | Jul - Aug 2026', 'observatory', [
                'Five customer-development interviews showed the problem was worth solving. All started from an app, never a process, so I grouped processes by app: Brave Browser reads as 1 row, not 17.',
                'Cut top-level sections from 3 to 2 by moving results to where a test ends, and started test setup from the app instead of the recording mode.',
                'Three developer colleagues have used it for two months to compare app versions and apps of one kind, such as the terminals Ghostty, kitty and Alacritty.',
            ]),
            ('Two Sticks', 'Telegram product for learning Chinese, built on a university diploma’s research | 2024', 'two-sticks', [
                'Zero installs: chose Telegram over a standalone app because learners already live there, with handwriting as a Telegram Web App. Designed and built the bot, API and Web App.',
                'One saved list feeds flashcards, notebook sheets and handwriting. Flashcards unlock at five words, so every quiz has real wrong answers.',
                'Shipped the learner loop before the teacher tools in the brief. Students valued having one place instead of three tools and missed pronunciation practice, the next step.',
            ]),
            ('Instagram Saves redesign', 'Independent concept, coded prototype | 2026', 'instagram-saves-redesign', [
                'Nine interviews and a journey map: six people could not find saved posts, seven moved anything important to Notes, Notion or Maps, and five had given up on filing. So search inside Saved came first, ahead of more organising.',
                'Collection suggestions turn a new collection from two taps and a name into one tap, with the full list kept for wrong guesses. React prototype, live on my site.',
            ]),
        ],
        'additional_title': 'OTHER EXPERIENCE',
        'additional': [
            ('Paycos', 'Software Developer, contract | Jul 2024 - Dec 2025', 'Built payment and order-processing services. Cut PDF receipt processing from 6-10 s to 650 ms by extracting text directly, keeping OCR for images.'),
        ],
        'skills_title': 'SKILLS',
        'skills': 'Research: user interviews, customer development, contextual inquiry, comparative usability testing, review analysis, playtesting, job stories (JTBD), customer journey maps, competitor analysis, synthesis.\nDesign: UX/UI, information architecture, user flows, wireframes, interaction design, prototyping, design systems, game loops and progression, motion. Figma, Material Design, Apple HIG.\nAI and code: AI-assisted features (suggestions, semantic search); building with AI coding agents (Claude Code, Codex). React, Flutter, HTML/CSS/JS, SwiftUI; Go, Python.',
        'education_title': 'EDUCATION AND LANGUAGES',
        'education': 'Programming in Computer Systems, MFUA College | 2019 - 2023',
        'languages': 'Russian native, English B2',
    },
    'ru': {
        'name': 'ИГОРЬ КУПЧИНЕНКО', 'role': 'ПРОДУКТОВЫЙ ДИЗАЙНЕР (JUNIOR) · B2C · ИССЛЕДОВАНИЯ И ИНТЕРФЕЙСЫ',
        'portfolio_label': 'Портфолио: ', 'location': 'Москва', 'linkedin': False,
        'summary': 'Продуктовый дизайнер B2C-приложений с опытом в разработке и гейм-дизайне. Начинаю с интервью и наблюдения, затем проектирую сценарии, в которых понятны сроки, цена и следующий шаг. В SuperGood переделал заказ и в одиночку пересобрал приложение: повтор привычного заказа сократился примерно с минуты до 5 секунд, рейтинг в магазинах вырос с 3,1 до 3,7.',
        'experience': 'ОПЫТ В ДИЗАЙНЕ',
        'experience_entries': [
            ('PizzaSushiWok (SuperGood)', 'Продуктовый дизайнер / мобильный разработчик, приложение доставки еды | август 2023 - июль 2024', 'supergood', [
                'Единственный дизайнер и разработчик: отвечал за заказ целиком и работал напрямую с бизнесом. В отзывах сомневались и в приложении, и в цене еды: разобрал около 150 отзывов, понаблюдал и поговорил с 10 людьми, заказывавшими на работе.',
                'Сократил повтор привычного заказа с 60 с до 5 с повтором в одно касание из истории, с уведомлениями об изменившейся цене и закончившихся блюдах. В сравнительном юзабилити-тесте на 10 коллегах успешность выросла с 2 до 10 из 10, оценка лёгкости с 3 до 6 из 7.',
                'Сделал сроки и цену видимыми до оплаты: закреплённая панель со временем доставки, числом позиций и суммой, а в карточке блюда вес, состав и КБЖУ, чтобы не уходить из меню ради проверки.',
                'Пересобрал отдельные приложения для iOS и Android в одно на Flutter за 11 месяцев, без передачи макетов, на своей дизайн-системе со светлой и тёмной темами: меню, корзина, оплата с 3DS, карты, отслеживание, лояльность. Рейтинг вырос с 3,1 до 3,7, новые отзывы хвалили приложение.',
            ]),
            ('22bytes', 'Гейм-дизайнер / разработчик прототипов, казуальные мобильные игры | апрель 2023 - август 2023', None, [
                'Спроектировал игровые циклы для 7 небольших игр (головоломки, лёгкие стратегии, короткие RPG): быстрые вложенные циклы внутри длинных и цепочки, которые открываются шаг за шагом.',
                'Формировал стратегию через ограничения: препятствия и лимиты, которые заставляют игрока выбирать между подходами.',
                'Плейтестил каждую сборку: сессии по 2-5 минут, удержание 1-го дня 27-30%, 7-го дня 4-10%. В работу взяли 2 прототипа из 7.',
            ]),
        ],
        'projects_title': 'ИЗБРАННЫЕ ПРОЕКТЫ',
        'projects': [
            ('Observatory', 'Личный проект на macOS, собран с AI-агентами по моим спецификациям, релиз на GitHub | июль - август 2026', 'observatory', [
                'Пять CustDev-интервью подтвердили, что проблема стоит решения. Все начинались с приложения, а не с процесса, поэтому процессы сгруппированы по приложениям: Brave Browser занимает 1 строку вместо 17.',
                'Сократил разделы верхнего уровня с 3 до 2, перенеся результаты туда, где заканчивается тест, а настройку теста начал с выбора приложения, а не режима записи.',
                'Три коллеги-разработчика два месяца сравнивают в нём версии приложений и приложения одного типа, например терминалы Ghostty, kitty и Alacritty.',
            ]),
            ('Две палочки', 'Продукт в Telegram для изучения китайского по исследованию дипломной работы | 2024', 'two-sticks', [
                'Ноль установок: выбрал Telegram вместо отдельного приложения, потому что ученики и так в нём, а письмо от руки сделал через Telegram Web App. Спроектировал и собрал бота, API и Web App.',
                'Один список сохранённого питает карточки, листы-прописи и письмо. Карточки открываются после пяти слов, чтобы в каждом тесте были настоящие неправильные ответы.',
                'Сначала выпустил цикл ученика, а инструменты преподавателя из брифа отложил. Студентам понравилось одно место вместо трёх инструментов; не хватило практики произношения.',
            ]),
            ('Поиск сохранённых публикаций Instagram', 'Самостоятельный концепт, прототип в коде | 2026', 'instagram-saves-redesign', [
                'Девять интервью и карта пути пользователя: шестеро не могли найти сохранённое, семеро уносили всё важное в Заметки, Notion или Карты, пятеро бросили сортировать. Поэтому первым сделал поиск в «Сохранённом», а не больше сортировки.',
                'Подсказки коллекций превращают создание новой коллекции из двух касаний и ввода названия в одно касание, а полный список остаётся на случай ошибки. Прототип на React работает на моём сайте.',
            ]),
        ],
        'additional_title': 'ДРУГОЙ ОПЫТ РАБОТЫ',
        'additional': [
            ('Paycos', 'Разработчик ПО, контракт | июль 2024 - декабрь 2025', 'Разрабатывал сервисы оплаты и обработки заказов. Сократил обработку PDF-чеков с 6-10 с до 650 мс: извлекал текст напрямую, оставив OCR для изображений.'),
        ],
        'skills_title': 'НАВЫКИ',
        'skills': 'Исследования: CustDev и глубинные интервью, контекстное исследование, сравнительное юзабилити-тестирование, анализ отзывов, плейтесты, job stories (JTBD), CJM, конкурентный анализ, синтез.\nДизайн: UX/UI, информационная архитектура, сценарии, вайрфреймы, прототипирование, дизайн-система, игровые циклы и прогрессия, моушн. Figma, Material Design, Apple HIG.\nAI и код: AI-функции (подсказки, семантический поиск), разработка с AI-агентами (Claude Code, Codex). React, Flutter, HTML/CSS/JS, SwiftUI; Go, Python.',
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
        fonts=s.element.get_or_add_rPr().get_or_add_rFonts()
        for attr in ['asciiTheme','hAnsiTheme','eastAsiaTheme','cstheme']:
            fonts.attrib.pop(qn('w:'+attr),None)
        for attr in ['ascii','hAnsi','cs','eastAsia']: fonts.set(qn('w:'+attr),'Arial')
    d.styles['Title'].font.size=Pt(23); d.styles['Title'].font.bold=True
    d.styles['Title'].paragraph_format.space_after=Pt(1)
    d.styles['Subtitle'].font.size=Pt(10); d.styles['Subtitle'].font.bold=True
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
    plain(p,'  |  Telegram '); link(p,'@iggy_sleepy','https://t.me/iggy_sleepy',10)
    p=d.add_paragraph(); p.paragraph_format.space_after=Pt(6)
    plain(p,c['location']+'  |  ')
    if c['linkedin']:
        link(p,'linkedin.com/in/iggydev','https://www.linkedin.com/in/iggydev',10); plain(p,'  |  ')
    link(p,'github.com/KidPudel','https://github.com/KidPudel',10)
    d.add_paragraph(c['summary'])

    def entry(title,context,body,slug=None):
        p=d.add_paragraph(style='Heading 2')
        if slug: link(p,title,site+'case-studies/'+slug+'/',bold=True)
        else: p.add_run(title)
        p=d.add_paragraph(context); p.paragraph_format.keep_with_next=True
        p.paragraph_format.space_after=Pt(2)
        for r in p.runs: r.font.size=Pt(9.5)
        for i,s in enumerate(body):
            p=d.add_paragraph('\u2022\t'+s,'List Bullet'); p.paragraph_format.keep_together=True
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
