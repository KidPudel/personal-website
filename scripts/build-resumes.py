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
        'name': 'IGOR KUPCHINENKO', 'role': 'PRODUCT DESIGNER',
        'summary': 'Product designer with a software-engineering background. At SuperGood, my role expanded from mobile development into designing the ordering experience. I designed and built the app released on iOS and Android. My independent work includes a released macOS app and a redesign concept informed by user interviews.',
        'experience': 'RELEVANT DESIGN EXPERIENCE',
        'supergood': ('PizzaSushiWok (SuperGood)', 'Product Designer / Mobile Engineer | Jan 2023 - Jul 2024', [
            'Designed and shipped the food-ordering app, from menu and basket through payment and delivery tracking. Built one Flutter app to replace separate Android and iOS applications.',
            'Customer conversations and ordering tasks highlighted uncertainty about dish details, delivery time and total cost. Added fuller dish information and a persistent order summary.',
            'Made previous orders reusable: users could add individual dishes or the whole order back to the basket. Added access through favourites and adapted layouts for different mobile screens.',
        ]),
        'projects_title': 'SELECTED PROJECTS',
        'projects': [
            ('Instagram Saves redesign', 'Independent concept | 2026', 'instagram-saves-redesign', [
                'Spoke with eight people about saving and finding posts. Used the recurring problems to shape collection suggestions, search and date filters, notes and pins.',
                'Built an interactive prototype of the proposed flows and explored bringing saved collections into the main feed to help people revisit them.',
            ]),
            ('Observatory', 'Personal project | Jul 2026 - Aug 2026', 'observatory', [
                'Five exploratory interviews informed an app-first view of Mac performance. Grouped related processes so users could read application totals before opening details.',
                'Designed the interface and saved-recording comparisons, directed AI-assisted implementation, and released the macOS app with a launch film.',
            ]),
            ('Two Sticks', 'Collaborative prototype | May 2024 - Jun 2024', 'two-sticks', [
                "Turned a diploma team's pedagogical research into a Telegram flow for finding, saving and practising Chinese characters. Designed and built the bot and handwriting web app; the prototype is no longer hosted.",
            ]),
        ],
        'additional_title': 'ADDITIONAL EXPERIENCE',
        'additional': [
            ('Paycos', 'Software Developer, contract | Jul 2024 - Dec 2025', 'Built payment and order-processing services. Cut PDF receipt processing from 6-10 seconds to 600-650 ms by extracting text directly and retaining OCR for image inputs.'),
            ('22bytes', 'Mobile Game Designer / Prototype Developer | Nov 2022 - Jan 2023', 'Built playable Android prototypes in short cycles, shaping interaction flows, player feedback and scope.'),
        ],
        'skills_title': 'SKILLS',
        'skills': 'User interviews, research synthesis, user flows, interaction and visual design, prototyping, usability testing, responsive layouts and motion. Figma; code prototypes with Flutter and Vue; software development with Go, Python and Unity.',
        'education_title': 'EDUCATION AND LANGUAGES',
        'education': 'Bachelor of Computer & Information Science | 2019 - 2023\nMoscow Finance and Law Academy (MFUA)',
        'languages': 'Russian: native | English: B2 (upper-intermediate)',
    },
    'ru': {
        'name': 'ИГОРЬ КУПЧИНЕНКО', 'role': 'ПРОДУКТОВЫЙ ДИЗАЙНЕР',
        'summary': 'Продуктовый дизайнер с опытом разработки. В SuperGood моя роль выросла из мобильной разработки в проектирование приложения, выпущенного на iOS и Android. Самостоятельно исследую задачи пользователей, проектирую интерфейсы и проверяю идеи в работающих прототипах.',
        'experience': 'ОПЫТ В ПРОДУКТОВОМ ДИЗАЙНЕ',
        'supergood': ('PizzaSushiWok (SuperGood)', 'Продуктовый дизайнер / мобильный разработчик | январь 2023 - июль 2024', [
            'Спроектировал сценарий заказа от меню до оплаты и отслеживания доставки. Реализовал и выпустил одно Flutter-приложение вместо отдельных версий для iOS и Android.',
            'Беседы с пользователями и проверки сценария заказа выявили нехватку информации о блюдах, доставке и стоимости. Добавил подробные карточки блюд и закреплённую сводку заказа.',
            'Сделал повторный заказ из истории: можно добавить отдельные блюда или весь заказ в корзину. Добавил переход из избранного и адаптировал интерфейс под разные мобильные экраны.',
        ]),
        'projects_title': 'ИЗБРАННЫЕ ПРОЕКТЫ',
        'projects': [
            ('Поиск сохранённых публикаций', 'Самостоятельный UX-концепт | 2026', 'instagram-saves-redesign', [
                'Поговорил с восемью людьми о том, как они сохраняют и находят посты. Спроектировал подсказки коллекций, поиск, фильтры по дате, заметки и закрепление публикаций.',
                'Собрал интерактивный прототип предложенных сценариев. Продумал просмотр коллекций в основной ленте, чтобы к сохранённому было проще вернуться.',
            ]),
            ('Observatory', 'Личный проект | июль 2026 - август 2026', 'observatory', [
                'По итогам пяти интервью спроектировал просмотр нагрузки на Mac по приложениям. Объединил связанные процессы: сначала видна общая нагрузка, затем можно раскрыть детали.',
                'Спроектировал интерфейс и сравнение сохранённых записей, направлял реализацию с AI-инструментами. Выпустил приложение для macOS и релизный ролик.',
            ]),
            ('Two Sticks', 'Командный прототип | май 2024 - июнь 2024', 'two-sticks', [
                'На основе исследования дипломной команды МПГУ спроектировал поиск, сохранение и практику китайских иероглифов в Telegram. Реализовал бота и веб-приложение для письма. Прототип больше не размещён онлайн.',
            ]),
        ],
        'additional_title': 'ДРУГОЙ ОПЫТ РАБОТЫ',
        'additional': [
            ('Paycos', 'Разработчик ПО, контракт | июль 2024 - декабрь 2025', 'Разрабатывал сервисы оплаты и обработки заказов. Сократил обработку PDF-чеков с 6-10 секунд до 600-650 мс: извлекал текст напрямую, сохранив OCR для изображений.'),
            ('22bytes', 'Гейм-дизайнер / разработчик прототипов | ноябрь 2022 - январь 2023', 'В коротких циклах собирал игровые Android-прототипы: продумывал взаимодействие, обратную связь игроку и объём работы.'),
        ],
        'skills_title': 'НАВЫКИ',
        'skills': 'Интервью и анализ результатов, пользовательские сценарии, UX/UI, прототипирование, юзабилити-тестирование, адаптивные интерфейсы и анимация. Figma; прототипы на Flutter и Vue; Go, Python, Unity.',
        'education_title': 'ОБРАЗОВАНИЕ И ЯЗЫКИ',
        'education': 'Бакалавр компьютерных и информационных наук | МФЮА | 2019 - 2023',
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
    sec.top_margin=Mm(13); sec.bottom_margin=Mm(13)
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
    h.paragraph_format.space_before=Pt(6); h.paragraph_format.space_after=Pt(3)
    h.paragraph_format.keep_with_next=True
    h2=d.styles['Heading 2']; h2.font.size=Pt(10.5); h2.font.bold=True
    h2.paragraph_format.space_before=Pt(4); h2.paragraph_format.space_after=Pt(1)
    h2.paragraph_format.keep_with_next=True
    bullet=d.styles['List Bullet']; bullet.font.size=Pt(10.5)
    bullet.paragraph_format.left_indent=Mm(3); bullet.paragraph_format.first_line_indent=Mm(-3)
    bullet.paragraph_format.space_after=Pt(2)
    d.core_properties.author=c['name']; d.core_properties.title=c['name']+' '+c['role']
    d.core_properties.language='ru-RU' if lang=='ru' else 'en-US'
    settings=d.settings.element; default=settings.find(qn('w:themeFontLang'))
    if default is not None: default.set(qn('w:val'), 'ru-RU' if lang=='ru' else 'en-US')
    d.add_paragraph(c['name'],'Title'); d.add_paragraph(c['role'],'Subtitle')
    p=d.add_paragraph(); p.paragraph_format.space_after=Pt(2)
    link(p,'i.kupchinenko@gmail.com','mailto:i.kupchinenko@gmail.com',10)
    p.add_run('  |  ')
    link(p,'kidpudel.github.io/personal-website',BASE,10)
    p=d.add_paragraph(); p.paragraph_format.space_after=Pt(6)
    link(p,'linkedin.com/in/iggydev','https://www.linkedin.com/in/iggydev',10)
    p.add_run('  |  '); link(p,'github.com/KidPudel','https://github.com/KidPudel',10)
    d.add_paragraph(c['summary'])

    def entry(title,context,body,slug=None):
        p=d.add_paragraph(style='Heading 2')
        if slug: link(p,title,BASE+'case-studies/'+slug+'/',bold=True)
        else: p.add_run(title)
        p=d.add_paragraph(context); p.paragraph_format.keep_with_next=True
        p.paragraph_format.space_after=Pt(2)
        for r in p.runs: r.font.size=Pt(9.5)
        for s in body:
            p=d.add_paragraph(s,'List Bullet'); p.paragraph_format.keep_together=True

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
