const ru = {
  nav: {
    about: "Обо мне",
    github: "GitHub",
    skills: "Навыки",
    projects: "Проекты",
    education: "Образование",
    contact: "Контакт",
  },
  hero: {
    label: "Портфолио",
    roles: [
      "Бэкенд-разработчик",
      "ИИ / ML инженер",
      "Системный программист",
      "Разработчик игр",
      "Full-Stack разработчик",
    ],
    github: "GitHub",
    contact: "Написать",
    stats: {
      projects: "Проектов",
      technologies: "Технологий",
      years: "Лет в коде",
    },
    scroll: "Далее",
  },
  about: {
    label: "Обо мне",
    h1: "Строю программы,",
    h2: "которые работают.",
    p1: "Backend-разработчик с фокусом на системном программировании, ИИ/ML и кросс-платформенной разработке. Создаю всё: от высокопроизводительных C++ инструментов до Python-пайплайнов и полных веб-сервисов.",
    p2: "Опыт охватывает компьютерное зрение, геймдев, промышленную автоматизацию и сетевые приложения — с целью создать надёжное и эффективное ПО.",
    p3: "Работаю как с кодом низкого уровня, так и с облачной инфраструктурой на Docker и REST API.",
    info: {
      location: { label: "Регион", value: "Россия" },
      focus: { label: "Специализация", value: "Бэкенд и ИИ" },
      degree: { label: "Степень", value: "Бакалавр ПИ" },
    },
    status: "Доступен",
    statusLabel: "Статус",
  },
  github: {
    label: "Open Source",
    heading: "Активность на GitHub",
    viewProfile: "Открыть профиль",
    recentCommits: "Последние коммиты",
    noActivity: "Нет публичной активности",
    loading: "Загрузка...",
    error: "Не удалось загрузить данные",
    pushed: "push в",
    repositories: "Публичных репо",
    contributions: "Контрибуций",
    followers: "Подписчиков",
  },
  skills: {
    label: "Стек",
    heading: "Навыки и инструменты",
    categories: {
      languages: "Языки",
      aiml: "ИИ / МО",
      backend: "Бэкенд",
      database: "Базы данных",
      devops: "DevOps",
      other: "Прочее",
    },
  },
  projects: {
    label: "Работы",
    heading: "Проекты",
    viewAll: "Все проекты на GitHub",
    featured: "Избранное",
    items: [
      {
        title: "Дефектоскопия композитов",
        description:
          "Промышленное ПО для автоматической дефектоскопии автомата, производящего композиты. OpenCV и Python для анализа данных датчиков и изображений в реальном времени.",
      },
      {
        title: "AI Aimbot",
        description:
          "Система CV реального времени для обнаружения и отслеживания целей в игре. C#, DirectML и ONNX-Runtime для быстрого инференса на Windows.",
      },
      {
        title: "Система авторизации подписок",
        description:
          "Backend управления лицензиями для desktop-приложения. Python и Flask, JWT, интеграция с оплатой, ролевой доступ и аппаратный отпечаток против шаринга ключей.",
      },
      {
        title: "RNG Paradice",
        description:
          "Мобильная карточная игра на Unity и C# с механиками на основе случайности. Кастомные шейдеры, анимированный UI и полный игровой цикл с прогрессией.",
      },
      {
        title: "AnonLine VPN — VLESS",
        description:
          "VPN-клиент для VLESS-серверов с security = reality. Python + PyQt5 с Xray-core backend. Поддержка формата ключей VLESS и простой GUI.",
      },
      {
        title: "LZT Market Monitor",
        description:
          "Монитор LZT.Market с Telegram-уведомлениями о новых товарах. Тёмный GUI на PyQt5, headless Chrome, автозапуск Windows и журнал событий.",
      },
    ],
  },
  education: {
    label: "Образование",
    heading: "Образование",
    badge1: "Бакалавриат",
    badge2: "Студент",
    university: "Южно-Российский государственный политехнический университет",
    specialty: "Программная инженерия",
    description:
      "Изучаю основы CS, архитектуру ПО, алгоритмы и прикладное программирование. Практический опыт через учебные и самостоятельные проекты.",
  },
  contact: {
    label: "Контакт",
    h1: "Есть проект",
    h2: "на примете?",
    description:
      "Открыт для интересных проектов, коллабораций и предложений о работе. Отвечаю быстро.",
    write: "Написать",
    copyUsername: "Скопировать",
    copied: "Скопировано!",
    copyright: "Все права защищены.",
    builtWith: "Vite · React · TypeScript",
  },
};

export default ru;
