import type { QuizQuestion } from '@/shared/types/quiz.types'

/**
 * Вопросы по Части I. Фундамент веба
 */
export const part1Questions: QuizQuestion[] = [
  {
    id: 'q-1-1',
    type: 'single',
    question:
      'Пользователь впервые открывает сайт `https://shop.example`. Сервер отвечает очень быстро, но TTFB всё равно высокий. Какая причина наиболее правдоподобна, если по HAR видно, что задержка происходит до установления TCP-соединения?',
    answers: [
      {
        id: 'a-1-1-2',
        text: 'CSSOM ещё не построен, поэтому браузер откладывает сетевой запрос до загрузки стилей',
        isCorrect: false,
      },
      {
        id: 'a-1-1-1',
        text: 'DNS-разрешение: нужно получить IP-адрес домена до TCP (при первом обращении это заметно в TTFB)',
        isCorrect: true,
      },
      {
        id: 'a-1-1-3',
        text: 'Render Tree строится медленно, поэтому Network Service ждёт окончания layout перед отправкой запроса',
        isCorrect: false,
      },
      {
        id: 'a-1-1-4',
        text: 'HTTP/2 мультиплексирует запросы в одном соединении, поэтому первый запрос всегда ждёт освобождения потока',
        isCorrect: false,
      },
    ],
    explanation:
      'До сетевого соединения браузеру нужен IP-адрес. При первом обращении DNS-разрешение (кэш браузера/ОС/резолвер → корневые/зоновые/авторитетные серверы) часто даёт ощутимую задержку и попадает в TTFB ещё до TCP/TLS.',
    chapterId: 'chapter-1-1',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-1-2',
    type: 'single',
    question:
      'Какое утверждение точнее всего описывает, почему первая загрузка нового домена обычно “дороже”, чем последующие?',
    answers: [
      {
        id: 'a-1-2-2',
        text: 'Потому что браузер всегда заново скачивает весь HTML, даже если есть кэш',
        isCorrect: false,
      },
      {
        id: 'a-1-2-3',
        text: 'Потому что HTTP/2 требует больше отдельных соединений, чем HTTP/1.1',
        isCorrect: false,
      },
      {
        id: 'a-1-2-1',
        text: 'При первом обращении к домену: DNS + TCP/TLS; дальше — кэш и keep-alive',
        isCorrect: true,
      },
      {
        id: 'a-1-2-4',
        text: 'Потому что TLS handshake происходит только после получения полного DOM',
        isCorrect: false,
      },
    ],
    explanation:
      'При первом обращении к новому домену почти всегда есть DNS-разрешение и рукопожатия (TCP, затем TLS для HTTPS). Повторные запросы выигрывают от кэширования и reuse соединений (keep-alive, HTTP/2/3).',
    chapterId: 'chapter-1-1',
    partId: 'part-1',
    difficulty: 'easy',
  },
  {
    id: 'q-1-3',
    type: 'single',
    question:
      'Почему TCP 3-way handshake влияет на задержку первого запроса, особенно в мобильных сетях?',
    answers: [
      {
        id: 'a-1-3-2',
        text: 'Потому что TCP всегда пересылает каждый пакет дважды “для надёжности”',
        isCorrect: false,
      },
      {
        id: 'a-1-3-3',
        text: 'Потому что TCP работает поверх DNS и ждёт ответа от корневого сервера',
        isCorrect: false,
      },
      {
        id: 'a-1-3-4',
        text: 'Потому что TCP не поддерживает keep-alive и всегда закрывает соединение после ответа',
        isCorrect: false,
      },
      {
        id: 'a-1-3-1',
        text: 'До завершения SYN → SYN-ACK → ACK HTTP-данные не пойдут по каналу — добавляется RTT',
        isCorrect: true,
      },
    ],
    explanation:
      'TCP устанавливает соединение через 3-way handshake. На высоком RTT (типично для мобильных сетей) это добавляет ощутимую задержку до первого байта запроса/ответа.',
    chapterId: 'chapter-1-1',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-1-4',
    type: 'single',
    question:
      'Какое описание лучше всего отражает ключевую разницу TCP vs UDP с точки зрения веб-приложения?',
    answers: [
      {
        id: 'a-1-4-2',
        text: 'UDP надёжнее TCP, потому что не имеет рукопожатия и меньше этапов',
        isCorrect: false,
      },
      {
        id: 'a-1-4-1',
        text: 'TCP — порядок/повторы (надёжность), UDP — без соединения и гарантий (быстрый старт)',
        isCorrect: true,
      },
      {
        id: 'a-1-4-3',
        text: 'UDP “быстрее”, поэтому его обычно используют для HTTP/HTTPS, а TCP оставляют только для DNS и “надёжных” задач',
        isCorrect: false,
      },
      {
        id: 'a-1-4-4',
        text: 'UDP может терять пакеты и не гарантирует порядок, а TCP гарантирует порядок — но это не означает, что TCP “никогда не теряет” и не делает повторных отправок',
        isCorrect: false,
      },
    ],
    explanation:
      'TCP обеспечивает контроль потерь и порядка (надёжность), но платит задержкой (установка соединения, повторы). UDP проще: можно слать сразу, но доставка/порядок не гарантированы.',
    chapterId: 'chapter-1-1',
    partId: 'part-1',
    difficulty: 'easy',
  },
  {
    id: 'q-1-5',
    type: 'single',
    question:
      'Почему в HTTP/2 всё ещё возможна “общая” блокировка при потере пакетов, несмотря на мультиплексирование?',
    answers: [
      {
        id: 'a-1-5-2',
        text: 'Из‑за приоритезации потоков в HTTP/2 часть ресурсов может “голодать” и казаться медленной, хотя мультиплексирование работает',
        isCorrect: false,
      },
      {
        id: 'a-1-5-3',
        text: 'При потерях на уровне TCP ретрансмит может задержать доставку данных и “размазать” задержку сразу на несколько потоков',
        isCorrect: false,
      },
      {
        id: 'a-1-5-1',
        text: 'HTTP/2 — один TCP: потери/ретрансмит могут тормозить все потоки',
        isCorrect: true,
      },
      {
        id: 'a-1-5-4',
        text: 'Мультиплексирование не отменяет ограничений TCP: потеря сегмента может задержать доставку данных и повлиять на несколько запросов',
        isCorrect: false,
      },
    ],
    explanation:
      'HTTP/2 решает проблемы уровня HTTP (мультиплексирование запросов в одном соединении), но TCP-уровень остаётся: потери/ретрансмиты могут задерживать доставку сегментов, влияя на все потоки внутри одного TCP.',
    chapterId: 'chapter-1-1',
    partId: 'part-1',
    difficulty: 'hard',
  },
  {
    id: 'q-1-6',
    type: 'single',
    question:
      'Что даёт HTTP/3 (QUIC) по сравнению с HTTP/2 в условиях потерь пакетов?',
    answers: [
      {
        id: 'a-1-6-2',
        text: 'QUIC может уменьшать задержку установления соединения (включая 0‑RTT для повторных подключений), но TLS/шифрование остаются частью протокола',
        isCorrect: false,
      },
      {
        id: 'a-1-6-3',
        text: 'HTTP/3 не “запрещает параллельность”: он активно использует потоки, просто транспорт другой и лучше переносит потери',
        isCorrect: false,
      },
      {
        id: 'a-1-6-4',
        text: 'На уровне HTTP‑семантики похоже на HTTP/2, но транспорт (QUIC поверх UDP) меняет поведение при потерях и установление соединения',
        isCorrect: false,
      },
      {
        id: 'a-1-6-1',
        text: 'QUIC/UDP: потери в одном потоке меньше блокируют остальные (меньше задержек)',
        isCorrect: true,
      },
    ],
    explanation:
      'HTTP/3 построен на QUIC поверх UDP: потоки более независимы, а потери/повторы не так “глобально” стопорят всю передачу, как в одном TCP-соединении.',
    chapterId: 'chapter-1-1',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-1-7',
    type: 'single',
    question:
      'Какая оценка наиболее корректна для “минимума до первого байта” на HTTPS при новом подключении (упрощённо), если нет кэшей и соединение не переиспользуется?',
    answers: [
      {
        id: 'a-1-7-2',
        text: '0‑RTT возможно для повторных подключений (TLS 1.3/QUIC), но для первого подключения рукопожатия обычно нужны до данных',
        isCorrect: false,
      },
      {
        id: 'a-1-7-1',
        text: '~2 RTT: TCP + TLS до полезных данных (упрощённо)',
        isCorrect: true,
      },
      {
        id: 'a-1-7-3',
        text: '1 RTT иногда достижимо за счёт оптимизаций/повторных подключений, но это не гарантируется “всегда и в одном пакете”',
        isCorrect: false,
      },
      {
        id: 'a-1-7-4',
        text: 'Задержка может вырасти из‑за редиректов и сетевых условий, но базовый порядок не “TLS до TCP”',
        isCorrect: false,
      },
    ],
    explanation:
      'Упрощённо: прежде чем пойдут полезные данные, нужно установить TCP (рукопожатие) и поднять TLS (рукопожатие). Это добавляет RTT к “первому байту”.',
    chapterId: 'chapter-1-1',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-1-8',
    type: 'single',
    question:
      'Какой HTTP-метод наиболее корректно считать неидемпотентным по умолчанию (в смысле семантики метода)?',
    answers: [
      {
        id: 'a-1-8-2',
        text: 'GET',
        isCorrect: false,
      },
      {
        id: 'a-1-8-3',
        text: 'PUT',
        isCorrect: false,
      },
      {
        id: 'a-1-8-1',
        text: 'POST',
        isCorrect: true,
      },
      {
        id: 'a-1-8-4',
        text: 'DELETE',
        isCorrect: false,
      },
    ],
    explanation:
      'Идемпотентность — про повторяемость без изменения состояния после первого успешного выполнения. По семантике: GET/PUT/DELETE — идемпотентные, POST — нет.',
    chapterId: 'chapter-1-1',
    partId: 'part-1',
    difficulty: 'easy',
  },
  {
    id: 'q-1-9',
    type: 'single',
    question:
      'Какой сценарий лучше всего объясняет, зачем браузеру нужен CORS preflight (OPTIONS)?',
    answers: [
      {
        id: 'a-1-9-2',
        text: 'Браузер всегда отправляет OPTIONS перед любым GET, чтобы ускорить кэш',
        isCorrect: false,
      },
      {
        id: 'a-1-9-3',
        text: 'OPTIONS нужен, чтобы заменить TLS handshake и сэкономить RTT',
        isCorrect: false,
      },
      {
        id: 'a-1-9-4',
        text: 'Preflight выполняется сервером внутри базы данных, браузер его не отправляет',
        isCorrect: false,
      },
      {
        id: 'a-1-9-1',
        text: 'Preflight (OPTIONS): сервер разрешает метод/заголовки для Origin',
        isCorrect: true,
      },
    ],
    explanation:
      'Preflight — это запрос браузера (OPTIONS) при определённых кросс-ориджин сценариях, чтобы сервер явным образом разрешил метод и заголовки через Access-Control-Allow-*.',
    chapterId: 'chapter-1-1',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-1-10',
    type: 'single',
    question: 'Как корректно определяется origin в браузере?',
    answers: [
      {
        id: 'a-1-10-2',
        text: 'только domain (без протокола и порта)',
        isCorrect: false,
      },
      {
        id: 'a-1-10-1',
        text: 'protocol + domain + port',
        isCorrect: true,
      },
      {
        id: 'a-1-10-3',
        text: 'domain + path (например, /api/users)',
        isCorrect: false,
      },
      {
        id: 'a-1-10-4',
        text: 'только IP-адрес сервера, домен не учитывается',
        isCorrect: false,
      },
    ],
    explanation:
      'Same-Origin Policy сравнивает origin как тройку: схема (protocol), хост (domain) и порт. Изменение любого из трёх даёт другой origin.',
    chapterId: 'chapter-1-1',
    partId: 'part-1',
    difficulty: 'easy',
  },
  {
    id: 'q-1-11',
    type: 'single',
    question:
      'Чем WebSocket принципиально отличается от SSE (Server-Sent Events)?',
    answers: [
      {
        id: 'a-1-11-2',
        text: 'SSE двусторонний, а WebSocket — только server → client',
        isCorrect: false,
      },
      {
        id: 'a-1-11-3',
        text: 'WebSocket подходит для чатов, но часто сложнее в эксплуатации (прокси, балансировка, множество постоянных соединений) по сравнению с SSE',
        isCorrect: false,
      },
      {
        id: 'a-1-11-1',
        text: 'WebSocket — двусторонний канал; SSE — поток server → client поверх HTTP',
        isCorrect: true,
      },
      {
        id: 'a-1-11-4',
        text: 'SSE работает поверх UDP и поэтому быстрее HTTP/3',
        isCorrect: false,
      },
    ],
    explanation:
      'WebSocket — постоянное двустороннее соединение. SSE — серверная “трансляция” обновлений клиенту (в одну сторону), обычно проще и дешевле по ресурсам в типичных кейсах.',
    chapterId: 'chapter-1-1',
    partId: 'part-1',
    difficulty: 'easy',
  },

  // --- Глава 2. Архитектура браузера ---
  {
    id: 'q-1-12',
    type: 'single',
    question:
      'В каком процессе современного браузера (в терминах архитектуры Chrome) обычно исполняется ваш JavaScript-код страницы?',
    answers: [
      {
        id: 'a-1-12-2',
        text: 'В Browser Process (главном процессе), потому что он “управляет всем”',
        isCorrect: false,
      },
      {
        id: 'a-1-12-3',
        text: 'В GPU Process, потому что там строится DOM и CSSOM',
        isCorrect: false,
      },
      {
        id: 'a-1-12-4',
        text: 'В Network Service Process, потому что JS связан с запросами',
        isCorrect: false,
      },
      {
        id: 'a-1-12-1',
        text: 'В Renderer Process (процессе рендеринга вкладки/страницы)',
        isCorrect: true,
      },
    ],
    explanation:
      'Код приложения и работа с DOM происходят в renderer-процессе. Поэтому тяжёлые синхронные вычисления “вешают” конкретную вкладку, а не весь браузер.',
    chapterId: 'chapter-1-2',
    partId: 'part-1',
    difficulty: 'easy',
  },
  {
    id: 'q-1-13',
    type: 'single',
    question:
      'Какой процесс в браузере чаще всего отвечает за DNS/HTTP/кэш/сокеты (по модели из главы)?',
    answers: [
      {
        id: 'a-1-13-2',
        text: 'Renderer Process (DOM/CSSOM/JS/layout/paint)',
        isCorrect: false,
      },
      {
        id: 'a-1-13-1',
        text: 'Network Service Process (DNS/HTTP/кэш/сокеты)',
        isCorrect: true,
      },
      {
        id: 'a-1-13-3',
        text: 'GPU Process (композитинг слоёв, WebGL, ускорение)',
        isCorrect: false,
      },
      {
        id: 'a-1-13-4',
        text: 'Browser Process (вкладки/навигация/разрешения, но не сеть целиком)',
        isCorrect: false,
      },
    ],
    explanation:
      'Сетевой процесс выделен отдельно: DNS, HTTP/HTTPS, кэширование, сокеты, cookies — обычно вне renderer-а, с общением через IPC.',
    chapterId: 'chapter-1-2',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-1-14',
    type: 'single',
    question:
      'Что из перечисленного лучше всего объясняет, зачем браузеру нужна “песочница” (sandbox) и изоляция процессов?',
    answers: [
      {
        id: 'a-1-14-2',
        text: 'Чтобы ускорить JavaScript за счёт отключения проверок безопасности',
        isCorrect: false,
      },
      {
        id: 'a-1-14-3',
        text: 'Чтобы полностью запретить любые сетевые запросы из вкладок',
        isCorrect: false,
      },
      {
        id: 'a-1-14-1',
        text: 'Чтобы вкладка не читала диск/устройства/чужие данные напрямую',
        isCorrect: true,
      },
      {
        id: 'a-1-14-4',
        text: 'Чтобы браузер мог читать данные других сайтов без CORS',
        isCorrect: false,
      },
    ],
    explanation:
      'Мультипроцессная архитектура повышает устойчивость и безопасность: даже если вкладка “сломалась” или страница вредоносна, ущерб ограничивается процессом и правами.',
    chapterId: 'chapter-1-2',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-1-15',
    type: 'single',
    question:
      'В чём ключевое отличие `<link rel="preconnect">` от `<link rel="dns-prefetch">`?',
    answers: [
      {
        id: 'a-1-15-2',
        text: 'preconnect загружает сам ресурс (как preload), а dns-prefetch загружает только HTML',
        isCorrect: false,
      },
      {
        id: 'a-1-15-3',
        text: 'dns-prefetch ускоряет layout, а preconnect ускоряет paint',
        isCorrect: false,
      },
      {
        id: 'a-1-15-4',
        text: 'Разницы нет: оба тега просто “поднимают” приоритет CSS',
        isCorrect: false,
      },
      {
        id: 'a-1-15-1',
        text: 'dns-prefetch — имя→IP; preconnect — TCP/TLS заранее',
        isCorrect: true,
      },
    ],
    explanation:
      'dns-prefetch — только про имя → IP. preconnect — про более “дорогую” часть: заранее подготовить сетевое соединение, чтобы уменьшить задержку первого запроса к домену.',
    chapterId: 'chapter-1-2',
    partId: 'part-1',
    difficulty: 'hard',
  },
  {
    id: 'q-1-16',
    type: 'single',
    question:
      'Какое утверждение лучше всего описывает разницу prefetch vs preload (по смыслу, а не по “популярности”)?',
    answers: [
      {
        id: 'a-1-16-2',
        text: 'prefetch всегда блокирует рендер, а preload никогда не блокирует',
        isCorrect: false,
      },
      {
        id: 'a-1-16-1',
        text: 'preload — сейчас, prefetch — позже (обычно low priority)',
        isCorrect: true,
      },
      {
        id: 'a-1-16-3',
        text: 'preload работает только для картинок, а prefetch — только для JS',
        isCorrect: false,
      },
      {
        id: 'a-1-16-4',
        text: 'prefetch нужен для TLS, preload — для DNS',
        isCorrect: false,
      },
    ],
    explanation:
      'preload сообщает браузеру, что ресурс критичен для текущей страницы. prefetch — подсказка на будущее: ресурс может пригодиться позже и не должен конкурировать с критическими.',
    chapterId: 'chapter-1-2',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-1-17',
    type: 'single',
    question: 'Когда срабатывает DOMContentLoaded (в общем случае)?',
    answers: [
      {
        id: 'a-1-17-2',
        text: 'Только когда загружено абсолютно всё, включая изображения, шрифты и iframe (это load)',
        isCorrect: false,
      },
      {
        id: 'a-1-17-3',
        text: 'Сразу после DNS-разрешения, до начала загрузки HTML',
        isCorrect: false,
      },
      {
        id: 'a-1-17-1',
        text: 'Когда DOM построен (HTML распарсен); картинки и ресурсы ещё могут грузиться',
        isCorrect: true,
      },
      {
        id: 'a-1-17-4',
        text: 'Только после первого repaint, когда уже построен Render Tree',
        isCorrect: false,
      },
    ],
    explanation:
      'DOMContentLoaded — про готовность DOM. load — про готовность всех ресурсов. Разделение важно для понимания “когда безопасно трогать DOM”.',
    chapterId: 'chapter-1-2',
    partId: 'part-1',
    difficulty: 'easy',
  },

  // --- Глава 3. Рендеринг ---
  {
    id: 'q-1-18',
    type: 'single',
    question:
      'Какая последовательность наиболее близка к “критическому пути рендеринга” (high-level) от HTML до пикселей?',
    answers: [
      {
        id: 'a-1-18-2',
        text: 'Paint → Layout → Render Tree → DOM → CSSOM → Composite',
        isCorrect: false,
      },
      {
        id: 'a-1-18-3',
        text: 'CSSOM → DOM → Paint → Composite → Layout',
        isCorrect: false,
      },
      {
        id: 'a-1-18-4',
        text: 'DOM → Paint → CSSOM → Layout → Composite',
        isCorrect: false,
      },
      {
        id: 'a-1-18-1',
        text: 'DOM/CSSOM→RenderTree→Layout→Paint→Composite',
        isCorrect: true,
      },
    ],
    explanation:
      'Браузер строит DOM из HTML, CSSOM из CSS, объединяет их в Render Tree для видимых узлов и стилей, затем считает геометрию (layout), рисует (paint) и композитит слои (composite).',
    chapterId: 'chapter-1-3',
    partId: 'part-1',
    difficulty: 'easy',
  },
  {
    id: 'q-1-19',
    type: 'single',
    question:
      'Почему CSS считается “render-blocking” ресурсом в классическом pipeline?',
    answers: [
      {
        id: 'a-1-19-2',
        text: 'Потому что CSS влияет на вычисление стилей и layout: пока нет CSSOM, браузер не может гарантировать корректный первый рендер',
        isCorrect: false,
      },
      {
        id: 'a-1-19-1',
        text: 'Без CSSOM Render Tree/layout не собрать — рендер ждёт стили',
        isCorrect: true,
      },
      {
        id: 'a-1-19-3',
        text: 'CSS не “останавливает сеть”, но может блокировать первый рендер: браузер ждёт стили, чтобы избежать “скачка” (FOUC)',
        isCorrect: false,
      },
      {
        id: 'a-1-19-4',
        text: 'Приоритет загрузки зависит от обнаружения ресурса и приоритетов; утверждение “всегда после картинок” неверно',
        isCorrect: false,
      },
    ],
    explanation:
      'CSS влияет на размеры и отображение. Если начать рисовать “без стилей”, а затем применить CSS, придётся пересобирать/перерисовывать. Поэтому браузер стремится иметь CSSOM до первого корректного рендера.',
    chapterId: 'chapter-1-3',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-1-20',
    type: 'single',
    question:
      'Почему `<script src="main.js"></script>` без атрибутов может “остановить” парсинг HTML?',
    answers: [
      {
        id: 'a-1-20-2',
        text: 'Потому что `<script>` по умолчанию грузится только после события load',
        isCorrect: false,
      },
      {
        id: 'a-1-20-3',
        text: 'Кэшируемость тут ни при чём: блокировка возникает из‑за синхронной загрузки и выполнения скрипта без async/defer',
        isCorrect: false,
      },
      {
        id: 'a-1-20-1',
        text: 'Без defer/async парсер ждёт выполнения скрипта (он может менять DOM/CSSOM)',
        isCorrect: true,
      },
      {
        id: 'a-1-20-4',
        text: 'Render Tree не “строится внутри script”: проблема в том, что синхронный script блокирует парсер до выполнения',
        isCorrect: false,
      },
    ],
    explanation:
      'Синхронный скрипт без defer/async блокирует парсер. Это напрямую удлиняет Critical Rendering Path, особенно если скрипт тяжёлый или медленно загружается.',
    chapterId: 'chapter-1-3',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-1-21',
    type: 'single',
    question:
      'Что точнее описывает различие `defer` и `async` для внешних скриптов?',
    answers: [
      {
        id: 'a-1-21-2',
        text: 'defer выполняется раньше async, потому что “имеет приоритет” в браузере',
        isCorrect: false,
      },
      {
        id: 'a-1-21-3',
        text: 'async выполняется только после DOMContentLoaded, а defer — сразу при встрече тега',
        isCorrect: false,
      },
      {
        id: 'a-1-21-4',
        text: 'defer выполняется после парсинга HTML и сохраняет порядок; это не “режим без DOM” и не имеет отношения к service worker',
        isCorrect: false,
      },
      {
        id: 'a-1-21-1',
        text: 'async — после загрузки; defer — после парсинга HTML (по порядку)',
        isCorrect: true,
      },
    ],
    explanation:
      'Ключ — момент выполнения: async “когда загрузился”, defer “после парсинга HTML”. Это влияет на предсказуемость порядка и на блокировки.',
    chapterId: 'chapter-1-3',
    partId: 'part-1',
    difficulty: 'hard',
  },
  {
    id: 'q-1-22',
    type: 'single',
    question:
      'Какое изменение с наибольшей вероятностью будет “composite-only” (самое дешёвое) при анимации?',
    answers: [
      {
        id: 'a-1-22-2',
        text: 'Изменение top/left — обычно трогает layout (reflow), поэтому дороже',
        isCorrect: false,
      },
      {
        id: 'a-1-22-1',
        text: 'Изменение transform/opacity — часто только composite, без layout',
        isCorrect: true,
      },
      {
        id: 'a-1-22-3',
        text: 'Изменение width/height — почти всегда запускает layout и может сдвигать соседей',
        isCorrect: false,
      },
      {
        id: 'a-1-22-4',
        text: 'Изменение font-size меняет метрики текста и обычно запускает layout (и repaint)',
        isCorrect: false,
      },
    ],
    explanation:
      'transform/opacity часто обрабатываются на стадии композиции слоёв (GPU), не требуя пересчёта layout и полной перерисовки. top/left/width/font-size обычно вызывают layout (reflow).',
    chapterId: 'chapter-1-3',
    partId: 'part-1',
    difficulty: 'easy',
  },
  {
    id: 'q-1-23',
    type: 'single',
    question:
      'Что такое layout thrashing и почему это плохо для производительности?',
    answers: [
      {
        id: 'a-1-23-2',
        text: 'Ситуация, когда GPU не успевает нарисовать кадр из-за слишком большого PNG',
        isCorrect: false,
      },
      {
        id: 'a-1-23-3',
        text: 'Поведение, при котором CSSOM строится после DOMContentLoaded и поэтому всегда вызывает фриз',
        isCorrect: false,
      },
      {
        id: 'a-1-23-1',
        text: 'read (offset*/getBoundingClientRect) + write (style.*) в цикле → многократный reflow',
        isCorrect: true,
      },
      {
        id: 'a-1-23-4',
        text: 'Эффект, когда HTTP/2 поток “вытесняет” другой и ломает порядок кадров',
        isCorrect: false,
      },
    ],
    explanation:
      'Когда вы заставляете браузер “считать геометрию” снова и снова (read → write → read → write), получаются фризы. Лечится батчингом, порядком read → write и rAF.',
    chapterId: 'chapter-1-3',
    partId: 'part-1',
    difficulty: 'hard',
  },
  {
    id: 'q-1-24',
    type: 'single',
    question:
      'Почему requestAnimationFrame обычно предпочтительнее setInterval для UI-анимаций?',
    answers: [
      {
        id: 'a-1-24-2',
        text: 'setInterval выполняется только в фоне, поэтому анимации на нём не видны',
        isCorrect: false,
      },
      {
        id: 'a-1-24-3',
        text: 'rAF работает в отдельном потоке и никогда не блокируется тяжёлым JS',
        isCorrect: false,
      },
      {
        id: 'a-1-24-4',
        text: 'rAF автоматически переписывает CSS так, чтобы не было reflow',
        isCorrect: false,
      },
      {
        id: 'a-1-24-1',
        text: 'rAF синхронизирован с кадрами → анимация стабильнее, чем setInterval',
        isCorrect: true,
      },
    ],
    explanation:
      'rAF привязан к render loop. Таймеры не синхронизированы с кадрами и чаще дают “дёрганость” и дрейф, особенно под нагрузкой.',
    chapterId: 'chapter-1-3',
    partId: 'part-1',
    difficulty: 'medium',
  },

  // --- Глава 4. Семантика HTML и доступность ---
  {
    id: 'q-1-25',
    type: 'single',
    question:
      'Какое правило лучше всего отражает “суть” семантической вёрстки?',
    answers: [
      {
        id: 'a-1-25-2',
        text: 'Семантика — это когда все элементы имеют className и id',
        isCorrect: false,
      },
      {
        id: 'a-1-25-1',
        text: 'Семантика: теги по смыслу (button/a/nav), а не “как удобнее стилизовать”',
        isCorrect: true,
      },
      {
        id: 'a-1-25-3',
        text: 'Семантика важна только для старых браузеров, в SPA она не нужна',
        isCorrect: false,
      },
      {
        id: 'a-1-25-4',
        text: 'Семантика — это использование только `<section>` и `<article>` вместо остальных тегов',
        isCorrect: false,
      },
    ],
    explanation:
      'Семантика — про смысл и структуру, а не про визуал. Это влияет на доступность, SEO и поддерживаемость.',
    chapterId: 'chapter-1-4',
    partId: 'part-1',
    difficulty: 'easy',
  },
  {
    id: 'q-1-26',
    type: 'single',
    question:
      'Почему `<button>` обычно лучше, чем `<div role="button" tabindex="0">` для кликабельного действия?',
    answers: [
      {
        id: 'a-1-26-2',
        text: 'Потому что `<div>` не может иметь обработчик клика в браузере',
        isCorrect: false,
      },
      {
        id: 'a-1-26-3',
        text: 'Потому что `<button>` всегда быстрее рендерится, так как идёт через GPU',
        isCorrect: false,
      },
      {
        id: 'a-1-26-1',
        text: '`<button>` даёт фокус/Enter/Space и роль без ручной реализации',
        isCorrect: true,
      },
      {
        id: 'a-1-26-4',
        text: 'ARIA не запрещена: она нужна в кастомных контролах, но если есть нативный `<button>`, он почти всегда надёжнее div + role',
        isCorrect: false,
      },
    ],
    explanation:
      'Делать “кнопку из div” можно, но тогда вы вручную воспроизводите всё, что браузер уже умеет: клавиатуру, роли, фокус, состояния. Нативный `<button>` почти всегда надёжнее.',
    chapterId: 'chapter-1-4',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-1-27',
    type: 'single',
    question:
      'Какая связка тега и сценария наиболее корректна: “перейти на другую страницу” vs “изменить состояние текущей страницы”?',
    answers: [
      {
        id: 'a-1-27-2',
        text: 'Навигация — `<button>`, действие — `<a>` (так лучше для SEO)',
        isCorrect: false,
      },
      {
        id: 'a-1-27-3',
        text: 'Всегда `<div onClick>`, потому что можно стилизовать как угодно',
        isCorrect: false,
      },
      {
        id: 'a-1-27-4',
        text: 'Всегда `<a>`, потому что кнопки не поддерживают клавиатуру',
        isCorrect: false,
      },
      {
        id: 'a-1-27-1',
        text: 'Переход — `<a href>`, действие — `<button type="button">`',
        isCorrect: true,
      },
    ],
    explanation:
      'Ссылка — про переход (navigation). Кнопка — про действие (action) в текущем контексте. Это важно и для доступности, и для ожидаемого поведения.',
    chapterId: 'chapter-1-4',
    partId: 'part-1',
    difficulty: 'easy',
  },
  {
    id: 'q-1-28',
    type: 'single',
    question:
      'Почему `<label for="email">` критически важен для доступности форм?',
    answers: [
      {
        id: 'a-1-28-2',
        text: 'Форма отправится и без label, но поле будет хуже для доступности: screen reader может не озвучить назначение, и не будет фокуса по клику на подпись',
        isCorrect: false,
      },
      {
        id: 'a-1-28-1',
        text: 'Связывает label с input: фокус по клику и корректная озвучка',
        isCorrect: true,
      },
      {
        id: 'a-1-28-3',
        text: 'label нужен только для CSS, чтобы работали селекторы',
        isCorrect: false,
      },
      {
        id: 'a-1-28-4',
        text: 'label заменяет aria-label во всех случаях, поэтому ARIA больше не нужна',
        isCorrect: false,
      },
    ],
    explanation:
      'Связка label ↔ input — базовая доступность. Она помогает клавиатуре, скринридерам и автозаполнению.',
    chapterId: 'chapter-1-4',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-1-29',
    type: 'single',
    question:
      'Нужно скрыть текст визуально, но оставить его доступным для screen reader. Что из этого ближе всего к правильному решению?',
    answers: [
      {
        id: 'a-1-29-2',
        text: 'Использовать display: none — это лучший способ скрытия для доступности',
        isCorrect: false,
      },
      {
        id: 'a-1-29-3',
        text: 'Поставить opacity: 0 — это всегда эквивалент visually-hidden для screen reader',
        isCorrect: false,
      },
      {
        id: 'a-1-29-1',
        text: 'Использовать паттерн “visually-hidden” (position/clip/1px), а не display: none',
        isCorrect: true,
      },
      {
        id: 'a-1-29-4',
        text: 'Убрать текст из DOM и заменить на aria-hidden="false" на родителе',
        isCorrect: false,
      },
    ],
    explanation:
      'display: none скрывает элемент и для ассистивных технологий. Для “доступного скрытия” используют специальные CSS-паттерны, которые убирают элемент с экрана, но оставляют его в доступном дереве.',
    chapterId: 'chapter-1-4',
    partId: 'part-1',
    difficulty: 'hard',
  },
  {
    id: 'q-1-30',
    type: 'single',
    question:
      'Когда правило “Не используйте ARIA, если можно использовать нативный элемент” наиболее уместно?',
    answers: [
      {
        id: 'a-1-30-2',
        text: 'ARIA не запрещена: её используют, когда нет подходящего нативного элемента или нужно описать состояние (expanded/selected) в кастомном UI',
        isCorrect: false,
      },
      {
        id: 'a-1-30-3',
        text: 'Только в Safari: в остальных браузерах ARIA не поддерживается',
        isCorrect: false,
      },
      {
        id: 'a-1-30-4',
        text: 'Только для SEO: ARIA влияет на ранжирование сильнее, чем HTML',
        isCorrect: false,
      },
      {
        id: 'a-1-30-1',
        text: 'Если есть нативный элемент — он обычно лучше, чем div + role',
        isCorrect: true,
      },
    ],
    explanation:
      'ARIA — инструмент точечной настройки, а не “универсальная замена” семантики. Нативные элементы дают поведение и доступность из коробки.',
    chapterId: 'chapter-1-4',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-1-31',
    type: 'single',
    question:
      'В чём разница между `aria-label` и `aria-labelledby` (по смыслу)?',
    answers: [
      {
        id: 'a-1-31-2',
        text: 'aria-label для ссылок, aria-labelledby только для кнопок',
        isCorrect: false,
      },
      {
        id: 'a-1-31-1',
        text: 'aria-label = строка; aria-labelledby = ссылка на id текста-лейбла',
        isCorrect: true,
      },
      {
        id: 'a-1-31-3',
        text: 'aria-labelledby скрывает элемент от screen reader, aria-label — показывает',
        isCorrect: false,
      },
      {
        id: 'a-1-31-4',
        text: 'Разницы нет: оба якобы задают одно и то же имя элемента для screen reader',
        isCorrect: false,
      },
    ],
    explanation:
      'aria-label — “строка-имя”. aria-labelledby — “возьми имя из другого элемента”. Второй вариант часто предпочтительнее, если на странице уже есть видимый текст-лейбл.',
    chapterId: 'chapter-1-4',
    partId: 'part-1',
    difficulty: 'hard',
  },
  {
    id: 'q-1-32',
    type: 'multiple',
    question:
      'Какие практики обычно улучшают SEO и доступность за счёт семантики?',
    answers: [
      {
        id: 'a-1-32-4',
        text: 'Замена всех `<button>` на `<div onClick>`, чтобы уменьшить HTML',
        isCorrect: false,
      },
      {
        id: 'a-1-32-1',
        text: 'Один осмысленный `<h1>` на страницу и логичная иерархия заголовков без “скачков”',
        isCorrect: true,
      },
      {
        id: 'a-1-32-5',
        text: 'Скрытие всего текста через display: none, чтобы роботы индексировали только картинки',
        isCorrect: false,
      },
      {
        id: 'a-1-32-2',
        text: 'Alt-текст у изображений, где это уместно (описание смысла изображения)',
        isCorrect: true,
      },
      {
        id: 'a-1-32-3',
        text: 'Использование `<main>` для обозначения основного уникального контента страницы',
        isCorrect: true,
      },
    ],
    explanation:
      'Семантика помогает поисковым системам и ассистивным технологиям понимать структуру и смысл страницы. Это улучшает навигацию, индексирование и UX.',
    chapterId: 'chapter-1-4',
    partId: 'part-1',
    difficulty: 'medium',
  },
]
