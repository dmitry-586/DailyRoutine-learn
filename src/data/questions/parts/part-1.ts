import type { QuizQuestion } from '@/shared/types/quiz.types'

/**
 * Вопросы по Части I. Фундамент веба
 */
export const part1Questions: QuizQuestion[] = [
  {
    id: 'q-1-1',
    type: 'single',
    question: 'Что такое DNS и зачем он нужен?',
    answers: [
      {
        id: 'a-1-1-1',
        text: 'Система доменных имён, которая преобразует доменные имена в IP-адреса',
        isCorrect: true,
      },
      {
        id: 'a-1-1-2',
        text: 'Протокол для передачи данных в интернете между серверами и клиентами',
        isCorrect: false,
      },
      {
        id: 'a-1-1-3',
        text: 'Система кэширования веб-страниц для ускорения загрузки сайтов',
        isCorrect: false,
      },
      {
        id: 'a-1-1-4',
        text: 'Протокол для безопасного соединения с использованием шифрования данных',
        isCorrect: false,
      },
    ],
    explanation:
      'DNS (Domain Name System) — это система доменных имён, которая преобразует человекочитаемые доменные имена (например, google.com) в IP-адреса, которые используются для установления соединения.',
    chapterId: 'chapter-1-1',
    partId: 'part-1',
    difficulty: 'easy',
  },
  {
    id: 'q-1-2',
    type: 'single',
    question: 'Что такое трёхстороннее рукопожатие (3-way handshake) в TCP?',
    answers: [
      {
        id: 'a-1-2-1',
        text: 'Процесс установления соединения между клиентом и сервером через обмен SYN, SYN-ACK и ACK пакетами',
        isCorrect: true,
      },
      {
        id: 'a-1-2-2',
        text: 'Процесс разрыва соединения между клиентом и сервером через обмен FIN и ACK пакетами',
        isCorrect: false,
      },
      {
        id: 'a-1-2-3',
        text: 'Процесс передачи данных между клиентом и сервером после установления соединения',
        isCorrect: false,
      },
      {
        id: 'a-1-2-4',
        text: 'Процесс кэширования запросов для оптимизации сетевого взаимодействия',
        isCorrect: false,
      },
    ],
    explanation:
      'Трёхстороннее рукопожатие — это процесс установления TCP-соединения, при котором клиент отправляет SYN, сервер отвечает SYN-ACK, а клиент подтверждает ACK. Только после этого начинается передача данных.',
    chapterId: 'chapter-1-1',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-1-3',
    type: 'multiple',
    question: 'Какие процессы выделяют современные браузеры?',
    answers: [
      {
        id: 'a-1-3-1',
        text: 'Browser Process (главный процесс)',
        isCorrect: true,
      },
      {
        id: 'a-1-3-2',
        text: 'Renderer Processes (процессы рендеринга)',
        isCorrect: true,
      },
      {
        id: 'a-1-3-3',
        text: 'GPU Process',
        isCorrect: true,
      },
      {
        id: 'a-1-3-4',
        text: 'Network Service Process',
        isCorrect: true,
      },
      {
        id: 'a-1-3-5',
        text: 'Database Process',
        isCorrect: false,
      },
    ],
    explanation:
      'Современные браузеры используют многопроцессную архитектуру: Browser Process управляет окнами и вкладками, Renderer Processes выполняют JavaScript и рендерят страницы, GPU Process обрабатывает графику, Network Service Process управляет сетевыми запросами.',
    chapterId: 'chapter-1-2',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-1-4',
    type: 'single',
    question: 'Почему рендеринг изолирован в отдельном процессе?',
    answers: [
      {
        id: 'a-1-4-1',
        text: 'Для безопасности: чтобы вредный скрипт из одной вкладки не мог получить доступ к данным другой вкладки',
        isCorrect: true,
      },
      {
        id: 'a-1-4-2',
        text: 'Для увеличения скорости загрузки страниц и оптимизации производительности',
        isCorrect: false,
      },
      {
        id: 'a-1-4-3',
        text: 'Для уменьшения потребления памяти и более эффективного управления ресурсами',
        isCorrect: false,
      },
      {
        id: 'a-1-4-4',
        text: 'Для поддержки старых браузеров и обеспечения обратной совместимости',
        isCorrect: false,
      },
    ],
    explanation:
      'Изоляция рендеринга в отдельном процессе обеспечивает безопасность: вредный скрипт из одной вкладки не может прочитать память другой вкладки, получить доступ к файлам или уронить весь браузер.',
    chapterId: 'chapter-1-2',
    partId: 'part-1',
    difficulty: 'easy',
  },
  {
    id: 'q-1-5',
    type: 'single',
    question: 'Что такое HTTP и HTTPS?',
    answers: [
      {
        id: 'a-1-5-1',
        text: 'HTTP — протокол передачи данных, HTTPS — его защищённая версия с шифрованием через TLS/SSL',
        isCorrect: true,
      },
      {
        id: 'a-1-5-2',
        text: 'HTTP и HTTPS — это разные версии одного протокола без существенных различий',
        isCorrect: false,
      },
      {
        id: 'a-1-5-3',
        text: 'HTTP — для статических сайтов, HTTPS — для динамических приложений',
        isCorrect: false,
      },
      {
        id: 'a-1-5-4',
        text: 'HTTP — протокол для серверов, HTTPS — для клиентских приложений',
        isCorrect: false,
      },
    ],
    explanation:
      'HTTP (HyperText Transfer Protocol) — протокол для передачи данных. HTTPS — это HTTP с добавлением шифрования TLS/SSL для защиты данных от перехвата.',
    chapterId: 'chapter-1-1',
    partId: 'part-1',
    difficulty: 'easy',
  },
  {
    id: 'q-1-6',
    type: 'single',
    question: 'Что такое CORS и зачем он нужен?',
    answers: [
      {
        id: 'a-1-6-1',
        text: 'Механизм безопасности браузера, который ограничивает запросы между разными доменами для защиты пользователей',
        isCorrect: true,
      },
      {
        id: 'a-1-6-2',
        text: 'Протокол для ускорения загрузки ресурсов с разных серверов',
        isCorrect: false,
      },
      {
        id: 'a-1-6-3',
        text: 'Механизм кэширования данных между различными доменами',
        isCorrect: false,
      },
      {
        id: 'a-1-6-4',
        text: 'Способ синхронизации данных между клиентом и сервером',
        isCorrect: false,
      },
    ],
    explanation:
      'CORS (Cross-Origin Resource Sharing) — механизм безопасности браузера, который контролирует, какие запросы между разными доменами разрешены, защищая пользователей от вредоносных сайтов.',
    chapterId: 'chapter-1-1',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-1-7',
    type: 'single',
    question: 'Что такое Critical Rendering Path?',
    answers: [
      {
        id: 'a-1-7-1',
        text: 'Последовательность шагов, которые браузер выполняет для преобразования HTML, CSS и JavaScript в отображаемые пиксели',
        isCorrect: true,
      },
      {
        id: 'a-1-7-2',
        text: 'Процесс оптимизации изображений для быстрой загрузки',
        isCorrect: false,
      },
      {
        id: 'a-1-7-3',
        text: 'Механизм кэширования ресурсов в браузере',
        isCorrect: false,
      },
      {
        id: 'a-1-7-4',
        text: 'Способ минификации CSS и JavaScript файлов',
        isCorrect: false,
      },
    ],
    explanation:
      'Critical Rendering Path — это последовательность шагов, которые браузер выполняет для преобразования HTML, CSS и JavaScript в отображаемые пиксели на экране.',
    chapterId: 'chapter-1-3',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-1-8',
    type: 'multiple',
    question: 'Какие этапы включает процесс рендеринга страницы?',
    answers: [
      {
        id: 'a-1-8-1',
        text: 'Парсинг HTML и построение DOM',
        isCorrect: true,
      },
      {
        id: 'a-1-8-2',
        text: 'Парсинг CSS и построение CSSOM',
        isCorrect: true,
      },
      {
        id: 'a-1-8-3',
        text: 'Объединение DOM и CSSOM в Render Tree',
        isCorrect: true,
      },
      {
        id: 'a-1-8-4',
        text: 'Layout (reflow) — вычисление позиций и размеров',
        isCorrect: true,
      },
      {
        id: 'a-1-8-5',
        text: 'Paint — отрисовка пикселей',
        isCorrect: true,
      },
      {
        id: 'a-1-8-6',
        text: 'Компиляция JavaScript в машинный код',
        isCorrect: false,
      },
    ],
    explanation:
      'Процесс рендеринга включает: парсинг HTML (DOM), парсинг CSS (CSSOM), построение Render Tree, Layout (reflow), Paint и Composite.',
    chapterId: 'chapter-1-3',
    partId: 'part-1',
    difficulty: 'hard',
  },
  {
    id: 'q-1-9',
    type: 'single',
    question: 'Что такое reflow (layout) в процессе рендеринга?',
    answers: [
      {
        id: 'a-1-9-1',
        text: 'Процесс вычисления геометрии элементов: их позиций и размеров',
        isCorrect: true,
      },
      {
        id: 'a-1-9-2',
        text: 'Процесс перерисовки элементов после изменения стилей',
        isCorrect: false,
      },
      {
        id: 'a-1-9-3',
        text: 'Процесс загрузки ресурсов страницы',
        isCorrect: false,
      },
      {
        id: 'a-1-9-4',
        text: 'Процесс кэширования DOM-дерева',
        isCorrect: false,
      },
    ],
    explanation:
      'Reflow (layout) — это процесс вычисления геометрии элементов: их позиций и размеров. Это дорогая операция, которую нужно минимизировать.',
    chapterId: 'chapter-1-3',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-1-10',
    type: 'single',
    question: 'Что такое ARIA и зачем он нужен?',
    answers: [
      {
        id: 'a-1-10-1',
        text: 'Набор атрибутов для улучшения доступности веб-контента для пользователей с ограниченными возможностями',
        isCorrect: true,
      },
      {
        id: 'a-1-10-2',
        text: 'Библиотека для создания анимаций на веб-страницах',
        isCorrect: false,
      },
      {
        id: 'a-1-10-3',
        text: 'Протокол для безопасной передачи данных',
        isCorrect: false,
      },
      {
        id: 'a-1-10-4',
        text: 'Способ оптимизации производительности рендеринга',
        isCorrect: false,
      },
    ],
    explanation:
      'ARIA (Accessible Rich Internet Applications) — это набор атрибутов, которые помогают сделать веб-контент более доступным для пользователей с ограниченными возможностями, особенно для пользователей скринридеров.',
    chapterId: 'chapter-1-4',
    partId: 'part-1',
    difficulty: 'easy',
  },
  {
    id: 'q-1-11',
    type: 'multiple',
    question: 'Какие HTML-элементы являются семантическими?',
    answers: [
      {
        id: 'a-1-11-1',
        text: '<header>',
        isCorrect: true,
      },
      {
        id: 'a-1-11-2',
        text: '<nav>',
        isCorrect: true,
      },
      {
        id: 'a-1-11-3',
        text: '<main>',
        isCorrect: true,
      },
      {
        id: 'a-1-11-4',
        text: '<article>',
        isCorrect: true,
      },
      {
        id: 'a-1-11-5',
        text: '<section>',
        isCorrect: true,
      },
      {
        id: 'a-1-11-6',
        text: '<div>',
        isCorrect: false,
      },
      {
        id: 'a-1-11-7',
        text: '<span>',
        isCorrect: false,
      },
    ],
    explanation:
      'Семантические HTML-элементы (<header>, <nav>, <main>, <article>, <section>, <footer> и др.) несут смысловую нагрузку и улучшают доступность и SEO.',
    chapterId: 'chapter-1-4',
    partId: 'part-1',
    difficulty: 'easy',
  },
  {
    id: 'q-1-12',
    type: 'single',
    question: 'Что такое IPv4 и IPv6?',
    answers: [
      {
        id: 'a-1-12-1',
        text: 'IPv4 и IPv6 — это версии протокола IP для адресации устройств в сети, IPv6 решает проблему нехватки адресов',
        isCorrect: true,
      },
      {
        id: 'a-1-12-2',
        text: 'IPv4 — для локальных сетей, IPv6 — для глобального интернета',
        isCorrect: false,
      },
      {
        id: 'a-1-12-3',
        text: 'IPv4 — старый протокол, IPv6 — новый протокол для мобильных устройств',
        isCorrect: false,
      },
      {
        id: 'a-1-12-4',
        text: 'IPv4 и IPv6 — это разные способы шифрования данных',
        isCorrect: false,
      },
    ],
    explanation:
      'IPv4 использует 32-битные адреса (пример: 192.168.0.1), IPv6 использует 128-битные адреса и решает проблему нехватки адресов в интернете.',
    chapterId: 'chapter-1-1',
    partId: 'part-1',
    difficulty: 'easy',
  },
  {
    id: 'q-1-13',
    type: 'single',
    question: 'В чём основное отличие TCP от UDP?',
    answers: [
      {
        id: 'a-1-13-1',
        text: 'TCP гарантирует доставку и порядок пакетов, UDP — быстрый протокол без гарантий',
        isCorrect: true,
      },
      {
        id: 'a-1-13-2',
        text: 'TCP — для веб-страниц, UDP — для файлов',
        isCorrect: false,
      },
      {
        id: 'a-1-13-3',
        text: 'TCP — старый протокол, UDP — новый',
        isCorrect: false,
      },
      {
        id: 'a-1-13-4',
        text: 'TCP — для серверов, UDP — для клиентов',
        isCorrect: false,
      },
    ],
    explanation:
      'TCP обеспечивает надёжную доставку с подтверждением и контролем порядка, UDP — быстрый протокол без установления соединения, подходит для стриминга и игр.',
    chapterId: 'chapter-1-1',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-1-14',
    type: 'multiple',
    question: 'Какие преимущества даёт HTTP/2 по сравнению с HTTP/1.1?',
    answers: [
      {
        id: 'a-1-14-1',
        text: 'Мультиплексирование — несколько запросов в одном TCP-соединении',
        isCorrect: true,
      },
      {
        id: 'a-1-14-2',
        text: 'Сжатие заголовков (HPACK)',
        isCorrect: true,
      },
      {
        id: 'a-1-14-3',
        text: 'Server Push — сервер может отправлять ресурсы до запроса',
        isCorrect: true,
      },
      {
        id: 'a-1-14-4',
        text: 'Бинарный протокол вместо текстового',
        isCorrect: true,
      },
      {
        id: 'a-1-14-5',
        text: 'Автоматическое кэширование всех ресурсов',
        isCorrect: false,
      },
    ],
    explanation:
      'HTTP/2 решает проблемы HTTP/1.1: head-of-line blocking, множественные соединения, неэффективные заголовки. Мультиплексирование позволяет отправлять несколько запросов параллельно.',
    chapterId: 'chapter-1-1',
    partId: 'part-1',
    difficulty: 'hard',
  },
  {
    id: 'q-1-15',
    type: 'single',
    question: 'Что такое QUIC и HTTP/3?',
    answers: [
      {
        id: 'a-1-15-1',
        text: 'HTTP/3 работает поверх UDP через протокол QUIC, что уменьшает задержки и улучшает производительность на мобильных сетях',
        isCorrect: true,
      },
      {
        id: 'a-1-15-2',
        text: 'QUIC — это новый язык программирования для веб-разработки',
        isCorrect: false,
      },
      {
        id: 'a-1-15-3',
        text: 'HTTP/3 — это улучшенная версия HTTP/2 с лучшим кэшированием',
        isCorrect: false,
      },
      {
        id: 'a-1-15-4',
        text: 'QUIC — это система управления базами данных',
        isCorrect: false,
      },
    ],
    explanation:
      'HTTP/3 использует QUIC (Quick UDP Internet Connections) поверх UDP вместо TCP, что устраняет head-of-line blocking и уменьшает задержки, особенно на мобильных сетях.',
    chapterId: 'chapter-1-1',
    partId: 'part-1',
    difficulty: 'hard',
  },
  {
    id: 'q-1-16',
    type: 'single',
    question: 'Что такое TLS handshake и зачем он нужен?',
    answers: [
      {
        id: 'a-1-16-1',
        text: 'Процесс установления защищённого соединения, при котором клиент и сервер обмениваются ключами для шифрования данных',
        isCorrect: true,
      },
      {
        id: 'a-1-16-2',
        text: 'Процесс проверки скорости интернет-соединения',
        isCorrect: false,
      },
      {
        id: 'a-1-16-3',
        text: 'Механизм кэширования SSL-сертификатов',
        isCorrect: false,
      },
      {
        id: 'a-1-16-4',
        text: 'Способ оптимизации загрузки HTTPS-страниц',
        isCorrect: false,
      },
    ],
    explanation:
      'TLS handshake — процесс установления защищённого соединения: клиент и сервер согласовывают алгоритмы шифрования, обмениваются сертификатами и ключами. Обычно добавляет 1 RTT к времени загрузки.',
    chapterId: 'chapter-1-1',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-1-17',
    type: 'multiple',
    question: 'Какие HTTP-методы являются идемпотентными?',
    answers: [
      {
        id: 'a-1-17-1',
        text: 'GET',
        isCorrect: true,
      },
      {
        id: 'a-1-17-2',
        text: 'PUT',
        isCorrect: true,
      },
      {
        id: 'a-1-17-3',
        text: 'DELETE',
        isCorrect: true,
      },
      {
        id: 'a-1-17-4',
        text: 'POST',
        isCorrect: false,
      },
      {
        id: 'a-1-17-5',
        text: 'PATCH',
        isCorrect: false,
      },
    ],
    explanation:
      'Идемпотентный запрос можно повторить без изменения результата. GET, PUT, DELETE — идемпотентны. POST и PATCH — нет, так как могут создавать новые ресурсы или изменять состояние.',
    chapterId: 'chapter-1-1',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-1-18',
    type: 'single',
    question: 'В чём разница между PUT и PATCH?',
    answers: [
      {
        id: 'a-1-18-1',
        text: 'PUT заменяет весь ресурс, PATCH обновляет только указанные поля',
        isCorrect: true,
      },
      {
        id: 'a-1-18-2',
        text: 'PUT — для создания, PATCH — для обновления',
        isCorrect: false,
      },
      {
        id: 'a-1-18-3',
        text: 'PUT — быстрее, PATCH — медленнее',
        isCorrect: false,
      },
      {
        id: 'a-1-18-4',
        text: 'PUT — для GET-запросов, PATCH — для POST-запросов',
        isCorrect: false,
      },
    ],
    explanation:
      'PUT заменяет весь ресурс целиком, PATCH применяет частичные обновления только к указанным полям. PUT идемпотентен, PATCH — нет.',
    chapterId: 'chapter-1-1',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-1-19',
    type: 'single',
    question: 'Что означает HTTP-код 304 Not Modified?',
    answers: [
      {
        id: 'a-1-19-1',
        text: 'Ресурс не изменился, можно использовать кэшированную версию',
        isCorrect: true,
      },
      {
        id: 'a-1-19-2',
        text: 'Ресурс был удалён с сервера',
        isCorrect: false,
      },
      {
        id: 'a-1-19-3',
        text: 'Сервер временно недоступен',
        isCorrect: false,
      },
      {
        id: 'a-1-19-4',
        text: 'Требуется авторизация для доступа к ресурсу',
        isCorrect: false,
      },
    ],
    explanation:
      '304 Not Modified означает, что ресурс не изменился с момента последнего запроса, и клиент может использовать кэшированную версию. Это экономит трафик и ускоряет загрузку.',
    chapterId: 'chapter-1-1',
    partId: 'part-1',
    difficulty: 'easy',
  },
  {
    id: 'q-1-20',
    type: 'single',
    question: 'Что такое REST API?',
    answers: [
      {
        id: 'a-1-20-1',
        text: 'Архитектурный стиль, где ресурсы представлены через URL, а действия через HTTP-методы',
        isCorrect: true,
      },
      {
        id: 'a-1-20-2',
        text: 'Протокол для передачи данных между серверами',
        isCorrect: false,
      },
      {
        id: 'a-1-20-3',
        text: 'Библиотека для работы с HTTP-запросами',
        isCorrect: false,
      },
      {
        id: 'a-1-20-4',
        text: 'Способ шифрования данных в веб-приложениях',
        isCorrect: false,
      },
    ],
    explanation:
      'REST (Representational State Transfer) — архитектурный стиль, где ресурсы идентифицируются через URL, действия через HTTP-методы (GET, POST, PUT, DELETE), а результаты через HTTP-статусы.',
    chapterId: 'chapter-1-1',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-1-21',
    type: 'single',
    question: 'Что такое GraphQL и чем он отличается от REST?',
    answers: [
      {
        id: 'a-1-21-1',
        text: 'GraphQL — язык запросов, позволяющий клиенту запрашивать только нужные поля, избегая overfetching и underfetching',
        isCorrect: true,
      },
      {
        id: 'a-1-21-2',
        text: 'GraphQL — это улучшенная версия REST с автоматическим кэшированием',
        isCorrect: false,
      },
      {
        id: 'a-1-21-3',
        text: 'GraphQL — протокол для передачи файлов',
        isCorrect: false,
      },
      {
        id: 'a-1-21-4',
        text: 'GraphQL — это библиотека для работы с базами данных',
        isCorrect: false,
      },
    ],
    explanation:
      'GraphQL позволяет клиенту точно указать, какие данные нужны, в одном запросе. Это решает проблемы REST: overfetching (получение лишних данных) и underfetching (недостаточно данных).',
    chapterId: 'chapter-1-1',
    partId: 'part-1',
    difficulty: 'hard',
  },
  {
    id: 'q-1-22',
    type: 'multiple',
    question: 'Что происходит при вводе URL в адресной строке браузера?',
    answers: [
      {
        id: 'a-1-22-1',
        text: 'DNS lookup для преобразования домена в IP-адрес',
        isCorrect: true,
      },
      {
        id: 'a-1-22-2',
        text: 'Установление TCP/TLS соединения',
        isCorrect: true,
      },
      {
        id: 'a-1-22-3',
        text: 'Отправка HTTP-запроса',
        isCorrect: true,
      },
      {
        id: 'a-1-22-4',
        text: 'Получение HTML и начало парсинга',
        isCorrect: true,
      },
      {
        id: 'a-1-22-5',
        text: 'Создание Renderer Process для рендеринга страницы',
        isCorrect: true,
      },
      {
        id: 'a-1-22-6',
        text: 'Автоматическое кэширование всех ресурсов',
        isCorrect: false,
      },
    ],
    explanation:
      'При вводе URL происходит: DNS lookup, установление TCP/TLS, отправка HTTP-запроса, получение HTML, создание Renderer Process, парсинг HTML/CSS, построение DOM/CSSOM, рендеринг.',
    chapterId: 'chapter-1-2',
    partId: 'part-1',
    difficulty: 'hard',
  },
  {
    id: 'q-1-23',
    type: 'single',
    question: 'Что такое Site Isolation в браузерах?',
    answers: [
      {
        id: 'a-1-23-1',
        text: 'Механизм безопасности, который изолирует разные сайты в отдельные процессы для защиты от атак',
        isCorrect: true,
      },
      {
        id: 'a-1-23-2',
        text: 'Способ оптимизации загрузки сайтов из разных доменов',
        isCorrect: false,
      },
      {
        id: 'a-1-23-3',
        text: 'Механизм кэширования данных между сайтами',
        isCorrect: false,
      },
      {
        id: 'a-1-23-4',
        text: 'Способ синхронизации данных между вкладками',
        isCorrect: false,
      },
    ],
    explanation:
      'Site Isolation — механизм безопасности, усиленный после уязвимостей Spectre/Meltdown. Каждый сайт изолирован в отдельном процессе, что предотвращает утечки данных между сайтами.',
    chapterId: 'chapter-1-2',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-1-24',
    type: 'single',
    question: 'Что такое GPU Process в браузере?',
    answers: [
      {
        id: 'a-1-24-1',
        text: 'Отдельный процесс для аппаратного ускорения графики, компоновки слоёв и WebGL',
        isCorrect: true,
      },
      {
        id: 'a-1-24-2',
        text: 'Процесс для обработки видео на странице',
        isCorrect: false,
      },
      {
        id: 'a-1-24-3',
        text: 'Процесс для кэширования изображений',
        isCorrect: false,
      },
      {
        id: 'a-1-24-4',
        text: 'Процесс для управления памятью браузера',
        isCorrect: false,
      },
    ],
    explanation:
      'GPU Process обрабатывает графику: аппаратное ускорение, компоновку слоёв (compositor), WebGL, CSS-трансформации. Операции transform и opacity выполняются на GPU, что намного быстрее.',
    chapterId: 'chapter-1-2',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-1-25',
    type: 'single',
    question: 'Почему CSS блокирует рендеринг?',
    answers: [
      {
        id: 'a-1-25-1',
        text: 'Браузер не может построить Render Tree без полной информации о стилях',
        isCorrect: true,
      },
      {
        id: 'a-1-25-2',
        text: 'CSS файлы слишком большие и долго загружаются',
        isCorrect: false,
      },
      {
        id: 'a-1-25-3',
        text: 'CSS требует компиляции перед использованием',
        isCorrect: false,
      },
      {
        id: 'a-1-25-4',
        text: 'CSS блокирует только на мобильных устройствах',
        isCorrect: false,
      },
    ],
    explanation:
      'CSS блокирует рендеринг, потому что браузер не может корректно построить Render Tree без знания всех стилей. Неправильные стили могут привести к неправильному отображению.',
    chapterId: 'chapter-1-3',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-1-26',
    type: 'single',
    question: 'В чём разница между defer и async у тега <script>?',
    answers: [
      {
        id: 'a-1-26-1',
        text: 'async — выполняется сразу после загрузки, defer — после полного парсинга HTML',
        isCorrect: true,
      },
      {
        id: 'a-1-26-2',
        text: 'async — для внешних скриптов, defer — для встроенных',
        isCorrect: false,
      },
      {
        id: 'a-1-26-3',
        text: 'async — быстрее, defer — медленнее',
        isCorrect: false,
      },
      {
        id: 'a-1-26-4',
        text: 'async — для старых браузеров, defer — для новых',
        isCorrect: false,
      },
    ],
    explanation:
      'async загружается параллельно и выполняется сразу после загрузки (может прервать парсинг). defer загружается параллельно, но выполняется после полного парсинга HTML в порядке появления.',
    chapterId: 'chapter-1-3',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-1-27',
    type: 'single',
    question: 'Что такое paint в процессе рендеринга?',
    answers: [
      {
        id: 'a-1-27-1',
        text: 'Процесс отрисовки пикселей на экране на основе вычисленных позиций и стилей',
        isCorrect: true,
      },
      {
        id: 'a-1-27-2',
        text: 'Процесс загрузки изображений на страницу',
        isCorrect: false,
      },
      {
        id: 'a-1-27-3',
        text: 'Процесс применения CSS-стилей к элементам',
        isCorrect: false,
      },
      {
        id: 'a-1-27-4',
        text: 'Процесс кэширования визуальных элементов',
        isCorrect: false,
      },
    ],
    explanation:
      'Paint — это процесс отрисовки пикселей. Браузер заполняет пиксели цветами, текстурами, тенями на основе вычисленных в Layout позиций и стилей из CSSOM.',
    chapterId: 'chapter-1-3',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-1-28',
    type: 'single',
    question: 'Что такое composite в рендеринге?',
    answers: [
      {
        id: 'a-1-28-1',
        text: 'Процесс объединения слоёв в финальный кадр для отображения на экране',
        isCorrect: true,
      },
      {
        id: 'a-1-28-2',
        text: 'Процесс компиляции CSS в машинный код',
        isCorrect: false,
      },
      {
        id: 'a-1-28-3',
        text: 'Процесс объединения нескольких CSS-файлов',
        isCorrect: false,
      },
      {
        id: 'a-1-28-4',
        text: 'Процесс оптимизации изображений',
        isCorrect: false,
      },
    ],
    explanation:
      'Composite — финальный этап рендеринга, когда браузер объединяет все слои (layers) в один кадр. Это происходит на GPU и позволяет эффективно обновлять только изменённые слои.',
    chapterId: 'chapter-1-3',
    partId: 'part-1',
    difficulty: 'hard',
  },
  {
    id: 'q-1-29',
    type: 'multiple',
    question: 'Какие CSS-свойства вызывают reflow (layout)?',
    answers: [
      {
        id: 'a-1-29-1',
        text: 'width, height',
        isCorrect: true,
      },
      {
        id: 'a-1-29-2',
        text: 'top, left, right, bottom',
        isCorrect: true,
      },
      {
        id: 'a-1-29-3',
        text: 'margin, padding',
        isCorrect: true,
      },
      {
        id: 'a-1-29-4',
        text: 'transform',
        isCorrect: false,
      },
      {
        id: 'a-1-29-5',
        text: 'opacity',
        isCorrect: false,
      },
    ],
    explanation:
      'Свойства, изменяющие геометрию (width, height, top, left, margin, padding), вызывают reflow. Transform и opacity не вызывают reflow, они обрабатываются на GPU в слое composite.',
    chapterId: 'chapter-1-3',
    partId: 'part-1',
    difficulty: 'hard',
  },
  {
    id: 'q-1-30',
    type: 'single',
    question: 'Что такое <main> в HTML5?',
    answers: [
      {
        id: 'a-1-30-1',
        text: 'Семантический тег для основного уникального содержимого страницы, должен быть один на странице',
        isCorrect: true,
      },
      {
        id: 'a-1-30-2',
        text: 'Тег для главной страницы сайта',
        isCorrect: false,
      },
      {
        id: 'a-1-30-3',
        text: 'Тег для навигационного меню',
        isCorrect: false,
      },
      {
        id: 'a-1-30-4',
        text: 'Тег для боковой панели',
        isCorrect: false,
      },
    ],
    explanation:
      '<main> — семантический тег HTML5 для основного содержимого страницы. Должен быть уникальным и не повторяться. Помогает screen readers и поисковым системам найти основной контент.',
    chapterId: 'chapter-1-4',
    partId: 'part-1',
    difficulty: 'easy',
  },
  {
    id: 'q-1-31',
    type: 'single',
    question: 'В чём разница между <article> и <section>?',
    answers: [
      {
        id: 'a-1-31-1',
        text: '<article> — самодостаточный блок контента (пост, новость), <section> — логический раздел страницы',
        isCorrect: true,
      },
      {
        id: 'a-1-31-2',
        text: '<article> — для статей, <section> — для секций сайта',
        isCorrect: false,
      },
      {
        id: 'a-1-31-3',
        text: '<article> — для блогов, <section> — для форумов',
        isCorrect: false,
      },
      {
        id: 'a-1-31-4',
        text: 'Нет разницы, это синонимы',
        isCorrect: false,
      },
    ],
    explanation:
      '<article> — самодостаточный, независимый блок (пост в блоге, статья, комментарий). <section> — тематический раздел страницы, логически связанный блок контента.',
    chapterId: 'chapter-1-4',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-1-32',
    type: 'multiple',
    question: 'Какие ARIA-атрибуты используются для улучшения доступности?',
    answers: [
      {
        id: 'a-1-32-1',
        text: 'aria-label — для описания элемента',
        isCorrect: true,
      },
      {
        id: 'a-1-32-2',
        text: 'aria-hidden — для скрытия элемента от screen readers',
        isCorrect: true,
      },
      {
        id: 'a-1-32-3',
        text: 'role — для указания роли элемента',
        isCorrect: true,
      },
      {
        id: 'a-1-32-4',
        text: 'aria-live — для объявления динамических изменений',
        isCorrect: true,
      },
      {
        id: 'a-1-32-5',
        text: 'aria-color — для указания цвета',
        isCorrect: false,
      },
    ],
    explanation:
      'ARIA-атрибуты улучшают доступность: aria-label описывает элемент, aria-hidden скрывает декоративные элементы, role указывает семантическую роль, aria-live объявляет изменения для screen readers.',
    chapterId: 'chapter-1-4',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-1-33',
    type: 'single',
    question: 'Почему важно использовать семантические HTML-теги?',
    answers: [
      {
        id: 'a-1-33-1',
        text: 'Улучшают SEO, доступность для screen readers, поддерживаемость кода и UX',
        isCorrect: true,
      },
      {
        id: 'a-1-33-2',
        text: 'Делают страницу быстрее загружаться',
        isCorrect: false,
      },
      {
        id: 'a-1-33-3',
        text: 'Уменьшают размер HTML-файла',
        isCorrect: false,
      },
      {
        id: 'a-1-33-4',
        text: 'Требуются только для старых браузеров',
        isCorrect: false,
      },
    ],
    explanation:
      'Семантические теги улучшают SEO (поисковики понимают структуру), доступность (screen readers навигация), поддерживаемость (код понятнее) и UX (клавиатурная навигация, правильная структура).',
    chapterId: 'chapter-1-4',
    partId: 'part-1',
    difficulty: 'easy',
  },
  {
    id: 'q-1-34',
    type: 'single',
    question: 'Что такое автономные системы (AS) в контексте Интернета?',
    answers: [
      {
        id: 'a-1-34-1',
        text: 'Крупные "острова" сети (сеть провайдера, компаний, дата-центров), соединённые через протокол BGP',
        isCorrect: true,
      },
      {
        id: 'a-1-34-2',
        text: 'Независимые серверы, которые работают без подключения к интернету',
        isCorrect: false,
      },
      {
        id: 'a-1-34-3',
        text: 'Локальные сети внутри одной организации',
        isCorrect: false,
      },
      {
        id: 'a-1-34-4',
        text: 'Системы автоматического управления сетевыми ресурсами',
        isCorrect: false,
      },
    ],
    explanation:
      'Автономные системы (AS) — это крупные "острова" сети, управляемые одной организацией (провайдер, компания, дата-центр). Они соединены между собой через протокол BGP, который является "системой навигации" всего Интернета.',
    chapterId: 'chapter-1-1',
    partId: 'part-1',
    difficulty: 'hard',
  },
  {
    id: 'q-1-35',
    type: 'single',
    question: 'Что такое hop в контексте сетевых запросов?',
    answers: [
      {
        id: 'a-1-35-1',
        text: 'Переход пакета данных от одного узла сети к другому (компьютер → роутер → провайдер → сервер)',
        isCorrect: true,
      },
      {
        id: 'a-1-35-2',
        text: 'Время задержки при передаче данных между клиентом и сервером',
        isCorrect: false,
      },
      {
        id: 'a-1-35-3',
        text: 'Протокол для быстрой передачи данных в локальных сетях',
        isCorrect: false,
      },
      {
        id: 'a-1-35-4',
        text: 'Метод кэширования данных на промежуточных серверах',
        isCorrect: false,
      },
    ],
    explanation:
      'Hop — это переход пакета данных от одного узла сети к другому. Каждый переход (компьютер → роутер → провайдер → магистральные маршрутизаторы → сервер) увеличивает задержку (latency).',
    chapterId: 'chapter-1-1',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-1-36',
    type: 'multiple',
    question: 'Какие этапы включает процесс DNS-lookup?',
    answers: [
      {
        id: 'a-1-36-1',
        text: 'Проверка локального кэша браузера',
        isCorrect: true,
      },
      {
        id: 'a-1-36-2',
        text: 'Проверка кэша операционной системы',
        isCorrect: true,
      },
      {
        id: 'a-1-36-3',
        text: 'Обращение к DNS-серверу провайдера',
        isCorrect: true,
      },
      {
        id: 'a-1-36-4',
        text: 'Запрос к корневому DNS-серверу',
        isCorrect: true,
      },
      {
        id: 'a-1-36-5',
        text: 'Проверка кэша CDN',
        isCorrect: false,
      },
    ],
    explanation:
      'DNS-lookup включает: проверку локального кэша браузера, кэша ОС, обращение к DNS-серверу провайдера, запрос к корневому серверу, затем к серверу зоны (.com) и авторитетному серверу домена. Обычно занимает 20-120 мс.',
    chapterId: 'chapter-1-1',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-1-37',
    type: 'single',
    question: 'В чём основное отличие IPv4 от IPv6?',
    answers: [
      {
        id: 'a-1-37-1',
        text: 'IPv6 решает проблему нехватки адресов и уменьшает количество hop',
        isCorrect: true,
      },
      {
        id: 'a-1-37-2',
        text: 'IPv6 работает только в локальных сетях, а IPv4 — в глобальных',
        isCorrect: false,
      },
      {
        id: 'a-1-37-3',
        text: 'IPv6 медленнее, но безопаснее, чем IPv4',
        isCorrect: false,
      },
      {
        id: 'a-1-37-4',
        text: 'IPv6 поддерживает только HTTP, а IPv4 — все протоколы',
        isCorrect: false,
      },
    ],
    explanation:
      'IPv6 решает проблему нехватки IP-адресов (IPv4 имеет ограниченное количество адресов) и уменьшает количество hop, что улучшает производительность сети.',
    chapterId: 'chapter-1-1',
    partId: 'part-1',
    difficulty: 'easy',
  },
  {
    id: 'q-1-38',
    type: 'single',
    question: 'Какие характеристики обеспечивает протокол TCP?',
    answers: [
      {
        id: 'a-1-38-1',
        text: 'Гарантированную доставку, контроль последовательности, контроль потерь и повторную отправку пакетов',
        isCorrect: true,
      },
      {
        id: 'a-1-38-2',
        text: 'Максимальную скорость передачи данных без гарантий доставки',
        isCorrect: false,
      },
      {
        id: 'a-1-38-3',
        text: 'Шифрование данных и защиту от перехвата',
        isCorrect: false,
      },
      {
        id: 'a-1-38-4',
        text: 'Автоматическое кэширование и оптимизацию маршрутизации',
        isCorrect: false,
      },
    ],
    explanation:
      'TCP обеспечивает надёжную доставку данных: гарантирует доставку пакетов, контролирует их последовательность, отслеживает потери и автоматически повторяет отправку при необходимости.',
    chapterId: 'chapter-1-1',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-1-39',
    type: 'single',
    question: 'Что происходит на каждом этапе трёхстороннего рукопожатия TCP?',
    answers: [
      {
        id: 'a-1-39-1',
        text: '1) Клиент → SYN, 2) Сервер → SYN-ACK, 3) Клиент → ACK. Только после этого начинается передача данных',
        isCorrect: true,
      },
      {
        id: 'a-1-39-2',
        text: '1) Сервер → SYN, 2) Клиент → SYN-ACK, 3) Сервер → ACK',
        isCorrect: false,
      },
      {
        id: 'a-1-39-3',
        text: '1) Клиент → ACK, 2) Сервер → SYN, 3) Клиент → SYN-ACK',
        isCorrect: false,
      },
      {
        id: 'a-1-39-4',
        text: 'Одновременный обмен SYN и ACK пакетами между клиентом и сервером',
        isCorrect: false,
      },
    ],
    explanation:
      'Трёхстороннее рукопожатие: клиент отправляет SYN с начальным номером, сервер отвечает SYN-ACK со своим номером, клиент подтверждает ACK. Только после третьего шага начинается передача полезных данных.',
    chapterId: 'chapter-1-1',
    partId: 'part-1',
    difficulty: 'hard',
  },
  {
    id: 'q-1-40',
    type: 'single',
    question: 'Почему первое соединение к домену дороже по времени?',
    answers: [
      {
        id: 'a-1-40-1',
        text: 'Требуется выполнить DNS-резолв, TCP handshake и часто TLS handshake',
        isCorrect: true,
      },
      {
        id: 'a-1-40-2',
        text: 'Браузер загружает все ресурсы страницы при первом соединении',
        isCorrect: false,
      },
      {
        id: 'a-1-40-3',
        text: 'Сервер обрабатывает первый запрос медленнее из-за инициализации',
        isCorrect: false,
      },
      {
        id: 'a-1-40-4',
        text: 'Первый запрос всегда больше по размеру, чем последующие',
        isCorrect: false,
      },
    ],
    explanation:
      'Первое соединение требует DNS-резолва (20-120 мс), TCP handshake (100-200 мс на медленных сетях) и часто TLS handshake (дополнительный RTT). Поэтому важны keep-alive и протоколы, уменьшающие количество handshake (HTTP/2, HTTP/3, TLS 1.3).',
    chapterId: 'chapter-1-1',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-1-41',
    type: 'multiple',
    question: 'Какие характеристики имеет протокол UDP?',
    answers: [
      {
        id: 'a-1-41-1',
        text: 'Нет рукопожатия — пакет можно отправить сразу',
        isCorrect: true,
      },
      {
        id: 'a-1-41-2',
        text: 'Нет гарантии, что пакет дойдёт',
        isCorrect: true,
      },
      {
        id: 'a-1-41-3',
        text: 'Нет гарантии порядка доставки пакетов',
        isCorrect: true,
      },
      {
        id: 'a-1-41-4',
        text: 'Нет автоматической повторной отправки',
        isCorrect: true,
      },
      {
        id: 'a-1-41-5',
        text: 'Гарантированная доставка всех пакетов',
        isCorrect: false,
      },
    ],
    explanation:
      'UDP — быстрый протокол без установления соединения: нет handshake, нет гарантий доставки и порядка, нет автоматической повторной отправки. Полезен для стриминга, WebRTC, игр и DNS.',
    chapterId: 'chapter-1-1',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-1-42',
    type: 'single',
    question: 'Где полезно использовать UDP вместо TCP?',
    answers: [
      {
        id: 'a-1-42-1',
        text: 'Стриминг видео/аудио, WebRTC, онлайн-игры, DNS — где важнее актуальные данные, чем идеальная доставка',
        isCorrect: true,
      },
      {
        id: 'a-1-42-2',
        text: 'Интернет-банкинг и финансовые транзакции, где важна надёжность',
        isCorrect: false,
      },
      {
        id: 'a-1-42-3',
        text: 'Загрузка файлов и передача важных документов',
        isCorrect: false,
      },
      {
        id: 'a-1-42-4',
        text: 'API-запросы, где нужна гарантированная доставка данных',
        isCorrect: false,
      },
    ],
    explanation:
      'UDP полезен там, где важнее актуальные данные, чем идеальная доставка всех предыдущих: стриминг (важен текущий кадр), WebRTC (видеозвонки), игры (актуальное положение), DNS (независимые запросы).',
    chapterId: 'chapter-1-1',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-1-43',
    type: 'single',
    question: 'Что такое QUIC и как он связан с HTTP/3?',
    answers: [
      {
        id: 'a-1-43-1',
        text: 'QUIC — протокол поверх UDP, который реализует надёжность на уровне протокола. HTTP/3 работает поверх QUIC',
        isCorrect: true,
      },
      {
        id: 'a-1-43-2',
        text: 'QUIC — это старая версия HTTP/2, которая больше не используется',
        isCorrect: false,
      },
      {
        id: 'a-1-43-3',
        text: 'QUIC — это протокол для локальных сетей, не связанный с HTTP',
        isCorrect: false,
      },
      {
        id: 'a-1-43-4',
        text: 'QUIC — это метод сжатия данных в HTTP/1.1',
        isCorrect: false,
      },
    ],
    explanation:
      'QUIC (Quick UDP Internet Connections) — протокол поверх UDP, который реализует надёжность, контроль порядка и шифрование на уровне протокола, избегая классического TCP handshake. HTTP/3 работает поверх QUIC.',
    chapterId: 'chapter-1-1',
    partId: 'part-1',
    difficulty: 'hard',
  },
  {
    id: 'q-1-44',
    type: 'multiple',
    question: 'Какие проблемы решает HTTP/2 по сравнению с HTTP/1.1?',
    answers: [
      {
        id: 'a-1-44-1',
        text: 'Мультиплексирование — несколько запросов в одном TCP-соединении',
        isCorrect: true,
      },
      {
        id: 'a-1-44-2',
        text: 'Сжатие заголовков (HPACK)',
        isCorrect: true,
      },
      {
        id: 'a-1-44-3',
        text: 'Бинарный протокол вместо текстового',
        isCorrect: true,
      },
      {
        id: 'a-1-44-4',
        text: 'Server Push — сервер может отправлять данные клиенту без запроса',
        isCorrect: true,
      },
      {
        id: 'a-1-44-5',
        text: 'Устранение проблемы head-of-line blocking',
        isCorrect: false,
      },
    ],
    explanation:
      'HTTP/2 решает проблемы HTTP/1.1: мультиплексирование (несколько запросов в одном TCP), сжатие заголовков HPACK, бинарный протокол, Server Push. Но TCP всё ещё медленный при потерях пакетов.',
    chapterId: 'chapter-1-1',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-1-45',
    type: 'single',
    question: 'В чём основное преимущество HTTP/3 перед HTTP/2?',
    answers: [
      {
        id: 'a-1-45-1',
        text: 'Работает поверх UDP (QUIC), потери пакетов не блокируют остальные запросы, меньше задержек в мобильных сетях',
        isCorrect: true,
      },
      {
        id: 'a-1-45-2',
        text: 'Поддерживает только текстовый формат для лучшей читаемости',
        isCorrect: false,
      },
      {
        id: 'a-1-45-3',
        text: 'Требует меньше памяти на сервере',
        isCorrect: false,
      },
      {
        id: 'a-1-45-4',
        text: 'Работает только в локальных сетях',
        isCorrect: false,
      },
    ],
    explanation:
      'HTTP/3 работает поверх UDP (QUIC), каждый HTTP-поток независимый, потери не блокируют остальные запросы, 0-RTT для повторных подключений, меньше задержек в мобильных сетях.',
    chapterId: 'chapter-1-1',
    partId: 'part-1',
    difficulty: 'hard',
  },
  {
    id: 'q-1-46',
    type: 'single',
    question: 'Что такое head-of-line blocking в HTTP/1.1?',
    answers: [
      {
        id: 'a-1-46-1',
        text: 'Блокировка последующих запросов, пока не завершится текущий запрос в том же TCP-соединении',
        isCorrect: true,
      },
      {
        id: 'a-1-46-2',
        text: 'Блокировка загрузки страницы из-за медленного DNS',
        isCorrect: false,
      },
      {
        id: 'a-1-46-3',
        text: 'Блокировка JavaScript-кода при загрузке CSS',
        isCorrect: false,
      },
      {
        id: 'a-1-46-4',
        text: 'Блокировка рендеринга из-за больших изображений',
        isCorrect: false,
      },
    ],
    explanation:
      'Head-of-line blocking в HTTP/1.1 — это блокировка последующих запросов в том же TCP-соединении, пока не завершится текущий. Браузер открывает до 6 соединений на домен, но каждое может обрабатывать только один запрос за раз.',
    chapterId: 'chapter-1-1',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-1-47',
    type: 'single',
    question: 'Что происходит во время TLS Handshake?',
    answers: [
      {
        id: 'a-1-47-1',
        text: 'Клиент отправляет список алгоритмов, сервер выбирает и отправляет сертификат, клиент проверяет, обмениваются ключами, устанавливается шифрованный канал',
        isCorrect: true,
      },
      {
        id: 'a-1-47-2',
        text: 'Клиент и сервер одновременно обмениваются зашифрованными данными',
        isCorrect: false,
      },
      {
        id: 'a-1-47-3',
        text: 'Сервер проверяет подлинность клиента через сертификат',
        isCorrect: false,
      },
      {
        id: 'a-1-47-4',
        text: 'Устанавливается соединение для передачи только текстовых данных',
        isCorrect: false,
      },
    ],
    explanation:
      'TLS Handshake: клиент отправляет список поддерживаемых алгоритмов, сервер выбирает алгоритм и отправляет сертификат, клиент проверяет сертификат (trusted CA), обмениваются ключами, устанавливается шифрованный канал. Обычно добавляет 1 RTT.',
    chapterId: 'chapter-1-1',
    partId: 'part-1',
    difficulty: 'hard',
  },
  {
    id: 'q-1-48',
    type: 'multiple',
    question: 'Какие HTTP-методы являются идемпотентными?',
    answers: [
      {
        id: 'a-1-48-1',
        text: 'GET — можно повторять без изменения результата',
        isCorrect: true,
      },
      {
        id: 'a-1-48-2',
        text: 'PUT — можно повторять без изменения результата',
        isCorrect: true,
      },
      {
        id: 'a-1-48-3',
        text: 'DELETE — обычно можно повторять без изменения результата',
        isCorrect: true,
      },
      {
        id: 'a-1-48-4',
        text: 'POST — не является идемпотентным',
        isCorrect: true,
      },
      {
        id: 'a-1-48-5',
        text: 'PATCH — всегда идемпотентный',
        isCorrect: false,
      },
    ],
    explanation:
      'Идемпотентный запрос можно повторить без изменения результата. GET, PUT, DELETE — идемпотентны. POST — нет (каждый вызов может создать новый ресурс). PATCH — обычно не идемпотентен.',
    chapterId: 'chapter-1-1',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-1-49',
    type: 'single',
    question: 'В чём разница между PUT и PATCH?',
    answers: [
      {
        id: 'a-1-49-1',
        text: 'PUT заменяет весь ресурс, PATCH частично обновляет только указанные поля',
        isCorrect: true,
      },
      {
        id: 'a-1-49-2',
        text: 'PUT работает только с JSON, PATCH — с любыми форматами',
        isCorrect: false,
      },
      {
        id: 'a-1-49-3',
        text: 'PUT создаёт ресурс, PATCH обновляет существующий',
        isCorrect: false,
      },
      {
        id: 'a-1-49-4',
        text: 'PUT быстрее, чем PATCH',
        isCorrect: false,
      },
    ],
    explanation:
      'PUT заменяет весь ресурс (идемпотентный), PATCH частично обновляет только указанные поля (обычно не идемпотентный). Это частый вопрос на собеседованиях.',
    chapterId: 'chapter-1-1',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-1-50',
    type: 'multiple',
    question: 'Какие HTTP-коды состояния относятся к группе 2xx (успех)?',
    answers: [
      {
        id: 'a-1-50-1',
        text: '200 OK — успешный запрос',
        isCorrect: true,
      },
      {
        id: 'a-1-50-2',
        text: '201 Created — ресурс успешно создан',
        isCorrect: true,
      },
      {
        id: 'a-1-50-3',
        text: '204 No Content — успешный запрос без тела ответа',
        isCorrect: true,
      },
      {
        id: 'a-1-50-4',
        text: '304 Not Modified — ресурс не изменился, используй кэш',
        isCorrect: false,
      },
      {
        id: 'a-1-50-5',
        text: '202 Accepted — запрос принят, но ещё не обработан',
        isCorrect: true,
      },
    ],
    explanation:
      '2xx — успешные ответы: 200 OK, 201 Created, 202 Accepted, 204 No Content. 304 Not Modified относится к 3xx (редиректы/кэш).',
    chapterId: 'chapter-1-1',
    partId: 'part-1',
    difficulty: 'easy',
  },
  {
    id: 'q-1-51',
    type: 'single',
    question: 'Что такое REST и каковы его основные принципы?',
    answers: [
      {
        id: 'a-1-51-1',
        text: 'Архитектурный стиль поверх HTTP, где URL описывает ресурсы, HTTP-методы — действия, статусы — результат',
        isCorrect: true,
      },
      {
        id: 'a-1-51-2',
        text: 'Протокол для передачи данных быстрее, чем HTTP',
        isCorrect: false,
      },
      {
        id: 'a-1-51-3',
        text: 'Язык запросов к базе данных, похожий на SQL',
        isCorrect: false,
      },
      {
        id: 'a-1-51-4',
        text: 'Фреймворк для создания веб-приложений',
        isCorrect: false,
      },
    ],
    explanation:
      'REST — архитектурный стиль поверх HTTP: URL описывает ресурсы (/users, /users/1), HTTP-методы описывают действия (GET, POST, PUT, DELETE), статусы описывают результат. Простой, читаемый контракт.',
    chapterId: 'chapter-1-1',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-1-52',
    type: 'multiple',
    question: 'Какие преимущества имеет GraphQL по сравнению с REST?',
    answers: [
      {
        id: 'a-1-52-1',
        text: 'Решает проблему overfetching/underfetching — клиент получает ровно нужные поля',
        isCorrect: true,
      },
      {
        id: 'a-1-52-2',
        text: 'Один endpoint вместо множества',
        isCorrect: true,
      },
      {
        id: 'a-1-52-3',
        text: 'Сильная типизация схемы (SDL), автогенерация TypeScript-типов',
        isCorrect: true,
      },
      {
        id: 'a-1-52-4',
        text: 'Удобная интеграция с кэшами на клиенте (Apollo, Relay)',
        isCorrect: true,
      },
      {
        id: 'a-1-52-5',
        text: 'Проще кэширование на уровне CDN',
        isCorrect: false,
      },
    ],
    explanation:
      'GraphQL решает overfetching/underfetching, использует один endpoint, имеет сильную типизацию, удобную интеграцию с клиентскими кэшами. Минусы: сложнее кэширование на CDN, сложнее дебаг HTTP-трафика.',
    chapterId: 'chapter-1-1',
    partId: 'part-1',
    difficulty: 'hard',
  },
  {
    id: 'q-1-53',
    type: 'single',
    question: 'Что такое gRPC и где он обычно используется?',
    answers: [
      {
        id: 'a-1-53-1',
        text: 'RPC-фреймворк поверх HTTP/2 с бинарным протоколом Protocol Buffers, используется для общения микросервисов между собой',
        isCorrect: true,
      },
      {
        id: 'a-1-53-2',
        text: 'Протокол для передачи графики и изображений в веб-приложениях',
        isCorrect: false,
      },
      {
        id: 'a-1-53-3',
        text: 'Язык запросов для работы с реляционными базами данных',
        isCorrect: false,
      },
      {
        id: 'a-1-53-4',
        text: 'Фреймворк для создания пользовательских интерфейсов',
        isCorrect: false,
      },
    ],
    explanation:
      'gRPC — RPC-фреймворк поверх HTTP/2 с бинарным протоколом Protocol Buffers. Очень маленькие и быстрые сообщения, чёткая типизация. Отличен для общения микросервисов. На фронтенде обычно прячется за REST/GraphQL-шлюзом.',
    chapterId: 'chapter-1-1',
    partId: 'part-1',
    difficulty: 'hard',
  },
  {
    id: 'q-1-54',
    type: 'single',
    question: 'Что такое Same-Origin Policy и как определяется origin?',
    answers: [
      {
        id: 'a-1-54-1',
        text: 'Политика безопасности браузера. Origin = protocol + domain + port. Запросы между разными origin ограничены',
        isCorrect: true,
      },
      {
        id: 'a-1-54-2',
        text: 'Политика кэширования данных. Origin определяется только доменом',
        isCorrect: false,
      },
      {
        id: 'a-1-54-3',
        text: 'Механизм оптимизации загрузки ресурсов. Origin = только домен',
        isCorrect: false,
      },
      {
        id: 'a-1-54-4',
        text: 'Протокол для синхронизации данных между серверами',
        isCorrect: false,
      },
    ],
    explanation:
      'Same-Origin Policy — политика безопасности браузера. Origin = protocol + domain + port. Например, https://example.com:443 и http://example.com:80 — разные origin. CORS позволяет частично ослаблять это правило.',
    chapterId: 'chapter-1-1',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-1-55',
    type: 'single',
    question: 'Кто настраивает CORS — сервер или браузер?',
    answers: [
      {
        id: 'a-1-55-1',
        text: 'CORS настраивает сервер через заголовки (Access-Control-Allow-Origin). Браузер лишь исполняет политику сервера',
        isCorrect: true,
      },
      {
        id: 'a-1-55-2',
        text: 'CORS настраивается в браузере через настройки безопасности',
        isCorrect: false,
      },
      {
        id: 'a-1-55-3',
        text: 'CORS настраивается автоматически браузером на основе домена',
        isCorrect: false,
      },
      {
        id: 'a-1-55-4',
        text: 'CORS настраивается на уровне операционной системы',
        isCorrect: false,
      },
    ],
    explanation:
      'CORS настраивает сервер через HTTP-заголовки (Access-Control-Allow-Origin, Access-Control-Allow-Methods и др.). Браузер лишь проверяет эти заголовки и блокирует запросы, если сервер не разрешил.',
    chapterId: 'chapter-1-1',
    partId: 'part-1',
    difficulty: 'easy',
  },
  {
    id: 'q-1-56',
    type: 'single',
    question: 'В чём разница между WebSocket и SSE (Server-Sent Events)?',
    answers: [
      {
        id: 'a-1-56-1',
        text: 'WebSocket — двусторонняя связь, постоянное соединение. SSE — односторонний поток от сервера к клиенту, легче и дешевле',
        isCorrect: true,
      },
      {
        id: 'a-1-56-2',
        text: 'WebSocket работает только через HTTPS, SSE — через HTTP',
        isCorrect: false,
      },
      {
        id: 'a-1-56-3',
        text: 'WebSocket для текста, SSE для бинарных данных',
        isCorrect: false,
      },
      {
        id: 'a-1-56-4',
        text: 'WebSocket медленнее, но надёжнее, чем SSE',
        isCorrect: false,
      },
    ],
    explanation:
      'WebSocket — двусторонняя связь, постоянное соединение (чаты, игры). SSE — односторонний поток от сервера к клиенту, автоматическое переподключение, дешевле по ресурсам (как радио: сервер говорит, клиент слушает).',
    chapterId: 'chapter-1-1',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-1-57',
    type: 'single',
    question: 'Что такое Browser Process в архитектуре браузера?',
    answers: [
      {
        id: 'a-1-57-1',
        text: 'Главный процесс, который управляет окнами, вкладками, сетевым стеком, доступом к диску и навигацией',
        isCorrect: true,
      },
      {
        id: 'a-1-57-2',
        text: 'Процесс, который рендерит страницы и выполняет JavaScript',
        isCorrect: false,
      },
      {
        id: 'a-1-57-3',
        text: 'Процесс, который обрабатывает графику и WebGL',
        isCorrect: false,
      },
      {
        id: 'a-1-57-4',
        text: 'Процесс, который управляет только сетевыми запросами',
        isCorrect: false,
      },
    ],
    explanation:
      'Browser Process — главный процесс, администратор. Управляет окнами, вкладками, сетевым стеком, доступом к диску, навигацией. Принимает системные решения: какую вкладку выгрузить, какие разрешения выданы странице. Не рендерит сайт.',
    chapterId: 'chapter-1-2',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-1-58',
    type: 'single',
    question: 'Что происходит в Renderer Process?',
    answers: [
      {
        id: 'a-1-58-1',
        text: 'Парсинг HTML, выполнение JavaScript, layout, paint, composite — весь код приложения живёт здесь',
        isCorrect: true,
      },
      {
        id: 'a-1-58-2',
        text: 'Только выполнение JavaScript без рендеринга',
        isCorrect: false,
      },
      {
        id: 'a-1-58-3',
        text: 'Только обработка сетевых запросов',
        isCorrect: false,
      },
      {
        id: 'a-1-58-4',
        text: 'Только управление вкладками и окнами',
        isCorrect: false,
      },
    ],
    explanation:
      'Renderer Process изолирован в песочнице. В нём происходит парсинг HTML, выполнение JavaScript (V8 для Chrome), layout, paint, composite. Весь код приложения живёт здесь. Подвисания и утечки памяти бьют по UX конкретной вкладки.',
    chapterId: 'chapter-1-2',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-1-59',
    type: 'single',
    question: 'Зачем нужен GPU Process в браузере?',
    answers: [
      {
        id: 'a-1-59-1',
        text: 'Для аппаратного ускорения, компоновки слоёв (compositor), WebGL и рендеринга CSS-трансформаций',
        isCorrect: true,
      },
      {
        id: 'a-1-59-2',
        text: 'Для выполнения JavaScript-кода',
        isCorrect: false,
      },
      {
        id: 'a-1-59-3',
        text: 'Для обработки сетевых запросов',
        isCorrect: false,
      },
      {
        id: 'a-1-59-4',
        text: 'Для парсинга HTML и построения DOM',
        isCorrect: false,
      },
    ],
    explanation:
      'GPU Process нужен для аппаратного ускорения, компоновки слоёв (compositor), WebGL, рендеринга CSS-трансформаций. Важно: transform и opacity рендерятся на GPU, а top/left изменяют layout → CPU → Reflow. Разница в производительности огромная.',
    chapterId: 'chapter-1-2',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-1-60',
    type: 'single',
    question: 'Что такое Network Service Process?',
    answers: [
      {
        id: 'a-1-60-1',
        text: 'Процесс, полностью отвечающий за DNS резолвинг, HTTP/HTTPS, кэширование, сокеты и работу с cookies',
        isCorrect: true,
      },
      {
        id: 'a-1-60-2',
        text: 'Процесс для рендеринга сетевых графиков и диаграмм',
        isCorrect: false,
      },
      {
        id: 'a-1-60-3',
        text: 'Процесс для управления сетевыми настройками пользователя',
        isCorrect: false,
      },
      {
        id: 'a-1-60-4',
        text: 'Процесс для выполнения сетевых скриптов на сервере',
        isCorrect: false,
      },
    ],
    explanation:
      'Network Service Process полностью отвечает за DNS резолвинг, HTTP/HTTPS, кэширование, сокеты, работу с cookies. С рендерером взаимодействует через IPC (Inter-Process Communication).',
    chapterId: 'chapter-1-2',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-1-61',
    type: 'single',
    question: 'Что такое DOM и чем он отличается от HTML?',
    answers: [
      {
        id: 'a-1-61-1',
        text: 'DOM — структура данных в памяти, построенная из HTML. HTML — строка текста, DOM — объектная модель документа',
        isCorrect: true,
      },
      {
        id: 'a-1-61-2',
        text: 'DOM и HTML — это одно и то же, просто разные названия',
        isCorrect: false,
      },
      {
        id: 'a-1-61-3',
        text: 'DOM — это сжатая версия HTML для экономии памяти',
        isCorrect: false,
      },
      {
        id: 'a-1-61-4',
        text: 'DOM — это серверная версия HTML',
        isCorrect: false,
      },
    ],
    explanation:
      'HTML — строка текста. DOM (Document Object Model) — структура данных в памяти, построенная парсером из HTML. DOM — это "карта" для браузера, как карта событий в голове при чтении книги.',
    chapterId: 'chapter-1-3',
    partId: 'part-1',
    difficulty: 'easy',
  },
  {
    id: 'q-1-62',
    type: 'single',
    question: 'Что может заблокировать парсинг HTML?',
    answers: [
      {
        id: 'a-1-62-1',
        text: '<script> без defer, <link rel="stylesheet">, синхронные операции, влияющие на рендеринг',
        isCorrect: true,
      },
      {
        id: 'a-1-62-2',
        text: 'Только JavaScript-файлы',
        isCorrect: false,
      },
      {
        id: 'a-1-62-3',
        text: 'Только CSS-файлы',
        isCorrect: false,
      },
      {
        id: 'a-1-62-4',
        text: 'Только изображения и медиа-файлы',
        isCorrect: false,
      },
    ],
    explanation:
      'HTML-парсинг блокируется при встрече <script> без defer (парсер ждёт загрузки и выполнения), <link rel="stylesheet"> (CSS блокирующий), синхронных операциях. Поэтому используют defer или async для скриптов.',
    chapterId: 'chapter-1-3',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-1-63',
    type: 'single',
    question: 'В чём разница между defer и async для <script>?',
    answers: [
      {
        id: 'a-1-63-1',
        text: 'async — скачивается параллельно, выполняется сразу после загрузки. defer — скачивается параллельно, выполняется после полного парсинга HTML',
        isCorrect: true,
      },
      {
        id: 'a-1-63-2',
        text: 'async блокирует парсинг, defer — нет',
        isCorrect: false,
      },
      {
        id: 'a-1-63-3',
        text: 'defer работает только в старых браузерах, async — в новых',
        isCorrect: false,
      },
      {
        id: 'a-1-63-4',
        text: 'Нет разницы, это синонимы',
        isCorrect: false,
      },
    ],
    explanation:
      'async — скрипт скачивается параллельно и выполняется сразу после загрузки (может прервать парсинг). defer — скачивается параллельно, но выполняется после полного парсинга HTML (сохраняет порядок выполнения).',
    chapterId: 'chapter-1-3',
    partId: 'part-1',
    difficulty: 'hard',
  },
  {
    id: 'q-1-64',
    type: 'single',
    question: 'Почему CSS-файлы блокирующие?',
    answers: [
      {
        id: 'a-1-64-1',
        text: 'Браузер не может построить render tree, пока не знает, какие стили применяются',
        isCorrect: true,
      },
      {
        id: 'a-1-64-2',
        text: 'CSS-файлы очень большие и требуют много времени на загрузку',
        isCorrect: false,
      },
      {
        id: 'a-1-64-3',
        text: 'CSS должен быть загружен до JavaScript',
        isCorrect: false,
      },
      {
        id: 'a-1-64-4',
        text: 'CSS блокирует только в старых браузерах',
        isCorrect: false,
      },
    ],
    explanation:
      'CSS блокирующий, потому что браузер не может корректно построить render tree, пока не знает стили. Как макет для разработчика: пока дизайнер не определился со шрифтами и отступами, смысла выводить макет нет.',
    chapterId: 'chapter-1-3',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-1-65',
    type: 'multiple',
    question: 'Что входит в Critical Rendering Path?',
    answers: [
      {
        id: 'a-1-65-1',
        text: 'Парсинг HTML и построение DOM',
        isCorrect: true,
      },
      {
        id: 'a-1-65-2',
        text: 'Парсинг CSS и построение CSSOM',
        isCorrect: true,
      },
      {
        id: 'a-1-65-3',
        text: 'Объединение DOM и CSSOM в Render Tree',
        isCorrect: true,
      },
      {
        id: 'a-1-65-4',
        text: 'Layout (reflow) — расчёт позиций элементов',
        isCorrect: true,
      },
      {
        id: 'a-1-65-5',
        text: 'Paint — отрисовка пикселей',
        isCorrect: true,
      },
      {
        id: 'a-1-65-6',
        text: 'Composite — компоновка слоёв',
        isCorrect: true,
      },
    ],
    explanation:
      'Critical Rendering Path: парсинг HTML → DOM, парсинг CSS → CSSOM, объединение → Render Tree, Layout (расчёт позиций), Paint (отрисовка), Composite (компоновка слоёв). Это путь от HTML до пикселей на экране.',
    chapterId: 'chapter-1-3',
    partId: 'part-1',
    difficulty: 'hard',
  },
]
