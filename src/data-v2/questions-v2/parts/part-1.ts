import type { QuizQuestion } from '@/shared/types/quiz.types'

export const part1Questions: QuizQuestion[] = [
  {
    id: 'q-v2-1-1',
    type: 'single',
    question:
      'Пользователь впервые открывает сайт https://example.com. Что из перечисленного НЕ входит в TTFB (Time To First Byte)?',
    answers: [
      {
        id: 'a-v2-1-1-1',
        text: 'DNS-разрешение (преобразование домена в IP-адрес)',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-1-2',
        text: 'TCP 3-way handshake',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-1-3',
        text: 'TLS handshake для HTTPS',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-1-4',
        text: 'Парсинг HTML и построение DOM-дерева',
        isCorrect: true,
      },
    ],
    chapterId: 'chapter-1',
    partId: 'part-1',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-1-2',
    type: 'single',
    question:
      'Какая последовательность действий происходит при DNS-разрешении домена example.com, если его нет в локальном кэше?',
    answers: [
      {
        id: 'a-v2-1-2-1',
        text: 'Браузер → OS кэш → DNS провайдера → корневой сервер → .com сервер → авторитетный сервер домена',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-2-2',
        text: 'Браузер → OS кэш → DNS провайдера → авторитетный DNS-сервер домена (без обращения к корневым и TLD)',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-2-3',
        text: 'Браузер → OS кэш → корневой сервер → авторитетный DNS-сервер домена → сервер зоны (.com)',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-2-4',
        text: 'Браузер → DNS провайдера → сервер зоны (.com) → корневой сервер → авторитетный DNS-сервер домена',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-1',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-v2-1-3',
    type: 'single',
    question:
      'Почему IPv6 важен для современного интернета, помимо решения проблемы нехватки адресов?',
    answers: [
      {
        id: 'a-v2-1-3-1',
        text: 'В IPv6 «встроено» шифрование на уровне протокола, поэтому HTTPS (TLS) больше не нужен',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-3-2',
        text: 'IPv6 может улучшать маршрутизацию (например, за счёт меньшего NAT-оверhead) и иногда снижать задержки, но это не гарантировано',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-3-3',
        text: 'IPv6 позволяет обходиться без DNS, потому что «с адресами достаточно работать напрямую, без доменов»',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-3-4',
        text: 'HTTP/3 требует IPv6, поэтому HTTP/2 по IPv6 работать не сможет',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-1',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-v2-1-4',
    type: 'single',
    question:
      'Что означает термин "hop" в контексте сетевой архитектуры интернета?',
    answers: [
      {
        id: 'a-v2-1-4-1',
        text: 'Количество DNS-запросов до получения IP-адреса',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-4-2',
        text: 'Промежуточный узел на пути пакета (обычно маршрутизатор)',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-4-3',
        text: 'Размер пакета данных в килобайтах',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-4-4',
        text: 'Время задержки между отправкой и получением пакета',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-1',
    partId: 'part-1',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-1-5',
    type: 'single',
    question:
      'Какое утверждение наиболее точно описывает, почему первое подключение к новому домену "дороже" последующих?',
    answers: [
      {
        id: 'a-v2-1-5-1',
        text: 'Первое подключение требует DNS-разрешения, TCP handshake, TLS handshake; последующие используют кэш DNS и keep-alive соединения',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-5-2',
        text: 'Первый визит к домену обычно дольше, потому что у браузера ещё нет кэша ресурсов (HTML/CSS/JS), а при повторном заходе многое берётся из кеша',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-5-3',
        text: 'HTTP/2 не работает при первом подключении к домену',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-5-4',
        text: 'TLS handshake происходит только после построения полного DOM',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-1',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-v2-1-6',
    type: 'single',
    question:
      'Что такое автономные системы (AS) в контексте архитектуры интернета?',
    answers: [
      {
        id: 'a-v2-1-6-1',
        text: 'DNS-серверы, которые работают без подключения к интернету',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-6-2',
        text: 'Крупные домены маршрутизации (ASN), обменивающиеся маршрутами через BGP',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-6-3',
        text: 'Браузеры, работающие в offline режиме через Service Worker',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-6-4',
        text: 'CDN узлы, которые кэшируют статические файлы',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-1',
    partId: 'part-1',
    difficulty: 'hard',
  },

  {
    id: 'q-v2-1-7',
    type: 'single',
    question: 'Какое утверждение наиболее точно описывает TCP 3-way handshake?',
    answers: [
      {
        id: 'a-v2-1-7-1',
        text: 'Клиент отправляет SYN, сервер отвечает SYN-ACK, клиент подтверждает ACK. Только после этого начинается передача полезных данных',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-7-2',
        text: '3-way handshake — это обмен подтверждениями доставки данных: клиент отправляет пакет, сервер подтверждает, и клиент подтверждает подтверждение',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-7-3',
        text: '3-way handshake — это механизм балансировки: клиент, прокси и сервер «договариваются», к какому узлу подключиться',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-7-4',
        text: '3-way handshake — это часть TLS/HTTPS: до него нельзя начать шифрованный обмен ключами',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-2',
    partId: 'part-1',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-1-8',
    type: 'single',
    question:
      'Чем принципиально отличается UDP от TCP с точки зрения гарантий доставки?',
    answers: [
      {
        id: 'a-v2-1-8-1',
        text: 'UDP быстрее, но не гарантирует доставку, порядок пакетов и не имеет handshake',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-8-2',
        text: 'UDP считается «надёжным» в вебе, потому что поверх него часто работают протоколы, которые сами добавляют подтверждения доставки',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-8-3',
        text: 'UDP обычно используют только для DNS, а весь HTTP/HTTPS трафик всегда идёт исключительно по TCP',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-8-4',
        text: 'UDP в современных браузерах практически всегда означает QUIC, поэтому «UDP-трафик» по умолчанию шифруется и не требует TLS',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-2',
    partId: 'part-1',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-1-9',
    type: 'single',
    question:
      'Почему TCP 3-way handshake критично влияет на производительность в мобильных сетях?',
    answers: [
      {
        id: 'a-v2-1-9-1',
        text: 'На мобильных сетях RTT может достигать 200-500 мс, и каждый handshake добавляет эту задержку',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-9-2',
        text: 'В мобильных сетях чаще используют UDP/QUIC, поэтому TCP рукопожатие становится узким местом и почти не применяется',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-9-3',
        text: 'В мобильных сетях рукопожатие медленнее в основном из‑за пропускной способности, а не из‑за задержек (RTT)',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-9-4',
        text: 'В мобильных сетях TCP рукопожатие часто требует больше шагов из‑за особенностей сети и дополнительных подтверждений',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-2',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-v2-1-10',
    type: 'single',
    question: 'Что такое RTT (Round-Trip Time) и почему это важно?',
    answers: [
      {
        id: 'a-v2-1-10-1',
        text: 'Время, за которое пакет проходит от клиента до сервера и обратно',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-10-2',
        text: 'Пропускная способность канала (сколько байт/сек можно передать)',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-10-3',
        text: 'Размер TCP окна (flow control), который ограничивает объём данных “в полёте”',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-10-4',
        text: 'Время обработки запроса на сервере (server processing time)',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-2',
    partId: 'part-1',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-1-11',
    type: 'single',
    question:
      'Как HTTP/3 (QUIC) решает проблему head-of-line blocking, присущую HTTP/2?',
    answers: [
      {
        id: 'a-v2-1-11-1',
        text: 'QUIC работает поверх UDP, и потоки независимы — потери в одном потоке не блокируют остальные',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-11-2',
        text: 'HTTP/3 открывает отдельное TCP-соединение для каждого запроса',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-11-3',
        text: 'HTTP/3 избегает блокировок в основном за счёт мультиплексирования/приоритезации на уровне HTTP; транспорт здесь вторичен',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-11-4',
        text: 'HTTP/3 после установки соединения переключается на WebSocket, поэтому проблемы TCP больше не влияют на загрузку',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-2',
    partId: 'part-1',
    difficulty: 'hard',
  },
  {
    id: 'q-v2-1-12',
    type: 'single',
    question:
      'В каких сценариях UDP предпочтительнее TCP, несмотря на отсутствие гарантий доставки?',
    answers: [
      {
        id: 'a-v2-1-12-1',
        text: 'Для критичных операций (платежи, заказы), потому что UDP быстрее и его надёжность можно “включить” на уровне приложения',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-12-2',
        text: 'Для стриминга видео, WebRTC, онлайн-игр — где важнее актуальные данные, чем гарантированная доставка всех старых',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-12-3',
        text: 'Для скачивания больших файлов, потому что даже при потерях можно докачать недостающие части позже',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-12-4',
        text: 'UDP выбирают, когда важна низкая задержка, а порядок пакетов обычно обеспечивается на уровне приложения',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-2',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-v2-1-13',
    type: 'single',
    question:
      'Что даёт 0-RTT (Zero Round-Trip Time) в TLS 1.3 и HTTP/3 для повторных подключений?',
    answers: [
      {
        id: 'a-v2-1-13-1',
        text: 'Позволяет отправить данные без ожидания полного рукопожатия даже при первом подключении, экономя задержку',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-13-2',
        text: 'Позволяет отправить данные вместе с первым пакетом для уже известных серверов, экономя 1 RTT',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-13-3',
        text: '0-RTT доступен без привязки к предыдущим сессиям: клиент может отправлять данные сразу при любом подключении',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-13-4',
        text: 'Ускоряет подключение ценой упрощения шифрования: часть данных может уйти до полной установки защищённого канала',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-2',
    partId: 'part-1',
    difficulty: 'hard',
  },

  {
    id: 'q-v2-1-14',
    type: 'single',
    question:
      'В чём ключевое отличие HTTP/2 от HTTP/1.1 с точки зрения обработки запросов?',
    answers: [
      {
        id: 'a-v2-1-14-1',
        text: 'HTTP/2 мультиплексирует несколько запросов в одном TCP-соединении; в HTTP/1.1 в рамках одного соединения мультиплексирования нет',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-14-2',
        text: 'HTTP/2 может работать поверх UDP, чтобы уменьшить задержки и избежать head-of-line blocking',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-14-3',
        text: 'HTTP/2 работает только без TLS, потому что TLS мешает бинарному протоколу и сжатию заголовков',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-14-4',
        text: 'HTTP/1.1 часто быстрее на мобильных, потому что параллелизм достигается несколькими соединениями, а не одним “общим” каналом',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-3',
    partId: 'part-1',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-1-15',
    type: 'single',
    question:
      'Что происходит во время TLS handshake при установке HTTPS соединения?',
    answers: [
      {
        id: 'a-v2-1-15-1',
        text: 'Клиент и сервер обмениваются списками поддерживаемых алгоритмов, сертификатом, и устанавливают шифрованный канал',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-15-2',
        text: 'Сервер сначала возвращает ответ (HTML/JSON), а затем устанавливается TLS и включается шифрование',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-15-3',
        text: 'Браузер проверяет DNS-записи домена и сертификат одновременно, и если всё валидно — соединение считается защищённым',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-15-4',
        text: 'TLS — это “отдельное соединение”: браузер закрывает TCP и открывает новое соединение уже поверх TLS',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-3',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-v2-1-16',
    type: 'single',
    question: 'Какой из перечисленных HTTP-методов является идемпотентным?',
    answers: [
      {
        id: 'a-v2-1-16-1',
        text: 'POST (повтор может создать ещё один ресурс/операцию)',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-16-2',
        text: 'PUT (повтор приводит к тому же состоянию ресурса)',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-16-3',
        text: 'PATCH (часто зависит от формата патча и может быть неидемпотентным)',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-16-4',
        text: 'Любой метод можно сделать идемпотентным на сервере, поэтому спецификация не важна',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-3',
    partId: 'part-1',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-1-17',
    type: 'single',
    question: 'В чём разница между методами PUT и PATCH?',
    answers: [
      {
        id: 'a-v2-1-17-1',
        text: 'PUT полностью заменяет ресурс (идемпотентный), PATCH частично обновляет (может быть неидемпотентным)',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-17-2',
        text: 'PUT обычно используют для создания ресурса, а PATCH — только для обновления уже существующего',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-17-3',
        text: 'На практике разницы почти нет: и PUT, и PATCH частично обновляют ресурс, отличие в соглашениях команды',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-17-4',
        text: 'PATCH часто считают идемпотентным и используют для полной замены, а PUT — для частичного обновления отдельных полей',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-3',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-v2-1-18',
    type: 'single',
    question: 'Для чего используется HTTP метод HEAD?',
    answers: [
      {
        id: 'a-v2-1-18-1',
        text: 'Для проверки доступности ресурса (как GET), но “легче”, потому что сервер может не отправлять всё тело',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-18-2',
        text: 'Для получения только заголовков ответа без тела (проверка размера, актуальности кэша)',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-18-3',
        text: 'Для удаления ресурса “безопасно”: сервер возвращает только заголовки и не отправляет тело ответа',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-18-4',
        text: 'Для CORS preflight: браузер отправляет HEAD, чтобы проверить разрешения перед запросом',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-3',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-v2-1-19',
    type: 'single',
    question: 'Когда браузер автоматически отправляет OPTIONS запрос?',
    answers: [
      {
        id: 'a-v2-1-19-1',
        text: 'Почти перед любым запросом к API: браузер отправляет OPTIONS, чтобы узнать, какие методы разрешены',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-19-2',
        text: 'При CORS preflight — перед "сложными" запросами (POST с кастомными заголовками, PUT, DELETE)',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-19-3',
        text: 'Перед загрузкой любых cross-origin ресурсов (изображения/CSS/JS), чтобы проверить разрешения',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-19-4',
        text: 'Preflight делается только если включены cookies/credentials; без этого браузер почти никогда не отправляет OPTIONS',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-3',
    partId: 'part-1',
    difficulty: 'hard',
  },
  {
    id: 'q-v2-1-20',
    type: 'single',
    question: 'Что означает HTTP код состояния 304 Not Modified?',
    answers: [
      {
        id: 'a-v2-1-20-1',
        text: 'Сервер не смог отдать ресурс и просит клиента повторить запрос позже',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-20-2',
        text: 'Кэшированная версия актуальна, можно использовать локальную копию',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-20-3',
        text: 'Сервер сообщает, что ресурс был изменён, поэтому нужно заново скачать полную версию',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-20-4',
        text: 'Сервер сообщает, что кэш на клиенте устарел и требуется обновить данные перед продолжением',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-3',
    partId: 'part-1',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-1-21',
    type: 'single',
    question: 'В чём разница между кодами 301 и 302 редиректа?',
    answers: [
      {
        id: 'a-v2-1-21-1',
        text: '301 — постоянный редирект (браузер кэширует), 302 — временный (не кэшируется)',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-21-2',
        text: '301 чаще кэшируется браузером как “навсегда”, а 302 — обычно воспринимается как временная переадресация без долгого кэша',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-21-3',
        text: '301 и 302 отличаются в основном тем, что один сохраняет HTTP-метод, а второй может менять его на GET',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-21-4',
        text: '302 часто используют после POST, чтобы перевести клиента на страницу результата (Post/Redirect/Get)',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-3',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-v2-1-22',
    type: 'single',
    question:
      'Какой код состояния сервер должен вернуть при успешном создании нового ресурса через POST?',
    answers: [
      {
        id: 'a-v2-1-22-1',
        text: '200 OK (успех, но не “создание”)',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-22-2',
        text: '201 Created (ресурс создан на сервере)',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-22-3',
        text: '204 No Content (успех без тела)',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-22-4',
        text: '202 Accepted (принято, не завершено)',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-3',
    partId: 'part-1',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-1-23',
    type: 'single',
    question:
      'Какой код состояния правильнее использовать для валидационных ошибок в API?',
    answers: [
      {
        id: 'a-v2-1-23-1',
        text: '400 Bad Request (часто используют и для ошибок валидации)',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-23-2',
        text: '422 Unprocessable Entity (валидация не прошла)',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-23-3',
        text: '409 Conflict (если это конфликт состояния, например дубликат)',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-23-4',
        text: '401 Unauthorized (если проблема в аутентификации, а не в полях)',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-3',
    partId: 'part-1',
    difficulty: 'medium',
  },

  {
    id: 'q-v2-1-24',
    type: 'single',
    question: 'Что такое REST с архитектурной точки зрения?',
    answers: [
      {
        id: 'a-v2-1-24-1',
        text: 'REST — это набор принципов и ограничений для построения API, а не конкретный протокол',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-24-2',
        text: 'REST — это стандарт HTTP API, который определяет структуру URL, набор методов и JSON-формат ответов',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-24-3',
        text: 'REST — это популярный подход к проектированию API, который реализуется через роутинг и контроллеры в фреймворках',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-24-4',
        text: 'REST — это соглашение о том, как хранить и версионировать эндпоинты внутри сервиса',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-4',
    partId: 'part-1',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-1-25',
    type: 'single',
    question: 'В чём разница между REST и RESTful API?',
    answers: [
      {
        id: 'a-v2-1-25-1',
        text: 'REST — архитектурные принципы, RESTful API — практическая реализация, которая следует большинству принципов',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-25-2',
        text: 'REST — это набор best practices, а RESTful — “идеальная” версия REST по спецификации',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-25-3',
        text: 'RESTful API считается RESTful только если использует JSON и правильные HTTP статусы (иначе это просто HTTP API)',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-25-4',
        text: 'RESTful — это “современная версия” REST с обязательной типизацией контрактов и схемой ошибок',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-4',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-v2-1-26',
    type: 'single',
    question:
      'Какой принцип REST означает, что каждый запрос содержит всю необходимую информацию?',
    answers: [
      {
        id: 'a-v2-1-26-1',
        text: 'Stateless (без состояния)',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-26-2',
        text: 'Cacheable (кэшируемость)',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-26-3',
        text: 'Layered System (слоистая архитектура)',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-26-4',
        text: 'HATEOAS',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-4',
    partId: 'part-1',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-1-27',
    type: 'single',
    question: 'Что означает HATEOAS в контексте REST?',
    answers: [
      {
        id: 'a-v2-1-27-1',
        text: 'Hypertext As The Engine Of Application State — когда клиент получает ссылки и следует им (но это не часть REST)',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-27-2',
        text: 'Hypermedia as the Engine of Application State — API возвращает ссылки на возможные действия',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-27-3',
        text: 'Hypermedia API That Encodes Operations As State — когда сервер возвращает только данные без ссылок',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-27-4',
        text: 'HTTP Actions Through Endpoints Over API Schemas — когда в URL описывают действия (create/update/delete)',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-4',
    partId: 'part-1',
    difficulty: 'hard',
  },
  {
    id: 'q-v2-1-28',
    type: 'single',
    question:
      'Какая структура URL правильна для REST API согласно best practices?',
    answers: [
      {
        id: 'a-v2-1-28-1',
        text: '/api/users — существительные во множественном числе для коллекций',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-28-2',
        text: '/api/users/list — явное действие в URL вместо ресурса',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-28-3',
        text: '/api/user — коллекция в единственном числе (обычно так не рекомендуют для коллекций)',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-28-4',
        text: '/api/UserList — “говорящее” имя ресурса и CamelCase в URL',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-4',
    partId: 'part-1',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-1-29',
    type: 'single',
    question:
      'Какой подход к версионированию API наиболее распространён для публичных REST API?',
    answers: [
      {
        id: 'a-v2-1-29-1',
        text: 'В URL (например, `/api/v1/users` → `/api/v2/users`)',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-29-2',
        text: 'В заголовке (например, `Accept` или `X-API-Version`)',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-29-3',
        text: 'В поддомене (например, `v1.api.example.com`)',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-29-4',
        text: 'Версионирование не используется в REST',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-4',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-v2-1-30',
    type: 'single',
    question: 'Какая ключевая проблема REST решается GraphQL?',
    answers: [
      {
        id: 'a-v2-1-30-1',
        text: 'Overfetching (лишние данные) и underfetching (недостаточно данных) — клиент получает ровно то, что запросил',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-30-2',
        text: 'GraphQL решает проблему версионирования: схема меняется, а клиент запрашивает только те поля, которые понимает',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-30-3',
        text: 'GraphQL решает проблему N+1 на клиенте: один запрос вместо множества REST эндпоинтов',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-30-4',
        text: 'GraphQL нужен в основном для чтения, а изменения (create/update) лучше делать через REST',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-4',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-v2-1-31',
    type: 'single',
    question: 'Когда GraphQL предпочтительнее REST для фронтенд-приложения?',
    answers: [
      {
        id: 'a-v2-1-31-1',
        text: 'Для простых CRUD операций с фиксированными DTO, где структура ответа почти не меняется',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-31-2',
        text: 'Для сложных UI с гибкими требованиями к данным и множеством связей',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-31-3',
        text: 'Когда важно кэширование на уровне CDN и хочется кэшировать ответы как обычные GET по URL',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-31-4',
        text: 'Когда нужно максимально простое кэширование на CDN и прозрачные HTTP-кеши',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-4',
    partId: 'part-1',
    difficulty: 'hard',
  },

  {
    id: 'q-v2-1-32',
    type: 'single',
    question: 'Как определяется origin в браузере?',
    answers: [
      {
        id: 'a-v2-1-32-1',
        text: '`protocol (scheme)` + `domain (host)` + `port`',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-32-2',
        text: 'Схема (http/https) + домен, порт обычно не учитывается, если он стандартный',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-32-3',
        text: 'Домен + путь (path), потому что разные страницы считаются разными источниками',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-32-4',
        text: 'IP-адрес + порт, потому что домен — это лишь алиас через DNS',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-5',
    partId: 'part-1',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-1-33',
    type: 'single',
    question:
      'Какие из этих URL считаются одним origin с https://example.com:443?',
    answers: [
      {
        id: 'a-v2-1-33-1',
        text: 'https://example.com/api/users',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-33-2',
        text: 'http://example.com:443',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-33-3',
        text: 'https://api.example.com:443',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-33-4',
        text: 'https://example.com:8080',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-5',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-v2-1-34',
    type: 'single',
    question: 'Что блокирует Same-Origin Policy в браузере?',
    answers: [
      {
        id: 'a-v2-1-34-1',
        text: 'Любую загрузку ресурсов с другого домена (img, CSS, JS) — SOP запрещает cross-origin загрузки',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-34-2',
        text: 'Чтение ответа (тела/заголовков) из XHR/fetch к другому origin',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-34-3',
        text: 'Подключение JS/CSS с CDN через `<script>`/`<link>`, потому что это нарушает политику источников',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-34-4',
        text: 'Отправку HTML-форм на другой origin: браузер запрещает submit при отличающемся источнике',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-5',
    partId: 'part-1',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-1-35',
    type: 'single',
    question: 'Как работает CORS на высоком уровне?',
    answers: [
      {
        id: 'a-v2-1-35-1',
        text: 'Браузер отправляет запрос с заголовком Origin, сервер отвечает с Access-Control-Allow-*, браузер проверяет разрешения',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-35-2',
        text: 'CORS настраивается на клиенте: достаточно указать режим `cors/no-cors`, а серверные заголовки необязательны',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-35-3',
        text: 'CORS “включён по умолчанию”: если запрос cross-origin, браузер сам разрешит его, а заголовки нужны только для оптимизаций',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-35-4',
        text: 'CORS относится только к старым API (XMLHttpRequest); fetch и формы работают без CORS-ограничений',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-5',
    partId: 'part-1',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-1-36',
    type: 'single',
    question: 'Какие запросы требуют CORS preflight (OPTIONS)?',
    answers: [
      {
        id: 'a-v2-1-36-1',
        text: 'Любые cross-origin запросы с `credentials: include`, даже если это обычный GET',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-36-2',
        text: 'PUT, DELETE, PATCH или POST с кастомными заголовками / Content-Type: application/json',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-36-3',
        text: 'Загрузка скриптов/стилей с CDN, потому что это “чтение” данных с другого origin',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-36-4',
        text: 'Открытие WebSocket соединения: перед Upgrade браузер делает OPTIONS как preflight',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-5',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-v2-1-37',
    type: 'single',
    question:
      'Почему нельзя использовать Access-Control-Allow-Origin: * с credentials: include?',
    answers: [
      {
        id: 'a-v2-1-37-1',
        text: 'Это небезопасно — если разрешены credentials, должен быть указан конкретный origin',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-37-2',
        text: 'Потому что `*` нельзя сочетать с `Access-Control-Allow-Credentials: true`: браузер отклонит ответ ещё до чтения тела',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-37-3',
        text: 'Потому что при `*` браузер не сможет определить, какие cookies относятся к какому сайту, и заблокирует запрос',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-37-4',
        text: 'Потому что wildcard разрешён только для простых запросов (GET/HEAD), а для credentials он всегда запрещён',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-5',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-v2-1-38',
    type: 'single',
    question: 'Что делает заголовок Access-Control-Max-Age в CORS?',
    answers: [
      {
        id: 'a-v2-1-38-1',
        text: 'Задаёт время жизни cookies/credentials в CORS-запросах',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-38-2',
        text: 'Кэширует результат preflight запроса на указанное время в секундах',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-38-3',
        text: 'Кэширует результат обычного CORS-запроса (GET/POST), чтобы ускорить повторные ответы',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-38-4',
        text: 'Определяет общий таймаут ожидания ответа при cross-origin запросах, после которого браузер прерывает запрос',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-5',
    partId: 'part-1',
    difficulty: 'hard',
  },
  {
    id: 'q-v2-1-39',
    type: 'single',
    question: 'Что делает атрибут HttpOnly у cookies?',
    answers: [
      {
        id: 'a-v2-1-39-1',
        text: '`HttpOnly` означает “cookie отправляется только по HTTPS” (то же, что `Secure`)',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-39-2',
        text: 'Cookie недоступна из JavaScript (`document.cookie`), что снижает риск при XSS',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-39-3',
        text: '`HttpOnly` запрещает отправку cookie в POST/PUT, оставляя только “безопасные” запросы (GET/HEAD)',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-39-4',
        text: '`HttpOnly` управляет cross-site отправкой cookie, поэтому это основной механизм защиты от CSRF',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-5',
    partId: 'part-1',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-1-40',
    type: 'single',
    question: 'Что означает атрибут Secure у cookies?',
    answers: [
      {
        id: 'a-v2-1-40-1',
        text: 'Cookie отправляется только по HTTPS (не по HTTP)',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-40-2',
        text: '`Secure` шифрует cookie при отправке',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-40-3',
        text: '`Secure` делает cookie недоступной из JavaScript (как `HttpOnly`)',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-40-4',
        text: '`Secure` делает cookie сессионной (до закрытия браузера)',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-5',
    partId: 'part-1',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-1-41',
    type: 'single',
    question: 'В чём разница между SameSite=Strict и SameSite=Lax для cookies?',
    answers: [
      {
        id: 'a-v2-1-41-1',
        text: 'Strict — cookie обычно не отправляется в cross-site сценариях; Lax — может отправляться при top-level навигации (чаще GET)',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-41-2',
        text: 'Strict работает только с HTTPS, Lax — с HTTP и HTTPS',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-41-3',
        text: 'Strict и Lax одинаково запрещают отправку cookie в fetch/XHR, но оба разрешают cookie при переходе по ссылке',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-41-4',
        text: 'Strict/Lax — это про безопасность cookie в целом: Strict защищает от XSS, а Lax — от MITM',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-5',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-v2-1-42',
    type: 'single',
    question: 'Когда нужно использовать SameSite=None для cookies?',
    answers: [
      {
        id: 'a-v2-1-42-1',
        text: 'Когда нужно максимальное ограничение: SameSite=None фактически запрещает отправку cookie между сайтами',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-42-2',
        text: 'Для iframe и cross-site функциональности, но обязательно с Secure флагом',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-42-3',
        text: 'Когда фронтенд и API на разных доменах и нужно отправлять cookie в fetch, причём без обязательного Secure',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-42-4',
        text: 'Для защиты от CSRF: SameSite=None блокирует cookie в cross-site запросах лучше, чем Lax/Strict',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-5',
    partId: 'part-1',
    difficulty: 'hard',
  },
  {
    id: 'q-v2-1-43',
    type: 'multiple',
    question:
      'Какие преимущества cookies перед LocalStorage для хранения аутентификации?',
    answers: [
      {
        id: 'a-v2-1-43-1',
        text: 'HttpOnly флаг защищает от XSS',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-43-2',
        text: 'SameSite защищает от CSRF',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-43-3',
        text: 'Автоматическая отправка на сервер с каждым запросом',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-43-4',
        text: 'Больший размер хранилища и удобнее хранить большие JWT без разбиения на части',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-43-5',
        text: 'Cookies читаются браузером “оптимизировано” и почти не влияют на производительность, в отличие от LocalStorage',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-5',
    partId: 'part-1',
    difficulty: 'medium',
  },

  {
    id: 'q-v2-1-44',
    type: 'single',
    question:
      'В чём ключевое различие между WebSocket и Server-Sent Events (SSE)?',
    answers: [
      {
        id: 'a-v2-1-44-1',
        text: 'WebSocket — двусторонняя связь, SSE — односторонняя (сервер → клиент)',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-44-2',
        text: 'SSE быстрее WebSocket, потому что работает поверх HTTP/2 и не требует отдельного соединения',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-44-3',
        text: 'WebSocket менее удобен, потому что требует отдельного рукопожатия и не имеет “встроенных” событий',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-44-4',
        text: 'SSE плохо поддерживается и обычно требует полифилов, поэтому в продакшене почти всегда выбирают WebSocket',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-6',
    partId: 'part-1',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-1-45',
    type: 'single',
    question: 'Как начинается установка WebSocket соединения?',
    answers: [
      {
        id: 'a-v2-1-45-1',
        text: 'С обычного HTTP-запроса с заголовком `Upgrade: websocket` (handshake и апгрейд протокола)',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-45-2',
        text: 'С отдельного UDP-пакета на порт сервера, без участия HTTP (поэтому быстрее, чем handshake)',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-45-3',
        text: 'С TLS-handshake “поверх TCP” без HTTP-запроса: после него канал считается WebSocket',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-45-4',
        text: 'Автоматически при загрузке страницы: браузер сам открывает WebSocket без запроса со стороны JS',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-6',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-v2-1-46',
    type: 'single',
    question:
      'Какой код закрытия WebSocket соединения означает нормальное закрытие?',
    answers: [
      {
        id: 'a-v2-1-46-1',
        text: '1000 (normal closure)',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-46-2',
        text: '1001 (going away)',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-46-3',
        text: '1006 (abnormal closure)',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-46-4',
        text: '200 (HTTP OK, не WebSocket)',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-6',
    partId: 'part-1',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-1-47',
    type: 'single',
    question: 'Какие типы данных поддерживает WebSocket?',
    answers: [
      {
        id: 'a-v2-1-47-1',
        text: 'Только текст (обычно JSON)',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-47-2',
        text: 'Текст и бинарные данные (ArrayBuffer, Blob)',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-47-3',
        text: 'Текст и Blob, но не ArrayBuffer (бинарные буферы в браузере блокируются)',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-47-4',
        text: 'Только base64-строки: бинарные данные через WebSocket не поддерживаются',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-6',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-v2-1-48',
    type: 'single',
    question: 'Что происходит с SSE соединением при потере связи?',
    answers: [
      {
        id: 'a-v2-1-48-1',
        text: 'Соединение закрывается и не восстанавливается: нужно вручную создавать новый `EventSource`',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-48-2',
        text: 'Браузер (EventSource) автоматически пытается переподключиться с задержкой',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-48-3',
        text: 'Переподключение нужно реализовать вручную (например, с backoff), иначе события пропадут',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-48-4',
        text: 'Переподключение работает только если сервер явно указал `retry:` в потоке событий',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-6',
    partId: 'part-1',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-1-49',
    type: 'single',
    question: 'Когда WebSocket предпочтительнее SSE?',
    answers: [
      {
        id: 'a-v2-1-49-1',
        text: 'Для простых уведомлений сервер → клиент, потому что WebSocket даёт меньше накладных расходов, чем SSE',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-49-2',
        text: 'Для чата, онлайн-игр, коллаборативных редакторов (нужна двусторонняя связь)',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-49-3',
        text: 'Для мониторинга статусов и метрик, потому что WebSocket лучше подходит для “стрима” событий',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-49-4',
        text: 'Когда нужно автоматическое переподключение и контроль повторной доставки сообщений без потерь',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-6',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-v2-1-50',
    type: 'single',
    question: 'Можно ли отправлять данные от клиента к серверу через SSE?',
    answers: [
      {
        id: 'a-v2-1-50-1',
        text: 'Да, через `EventSource.send()` — можно отправлять сообщения обратно по тому же соединению',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-50-2',
        text: 'Нет, SSE только для сервер → клиент. Для отправки используй обычный HTTP (POST/PUT)',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-50-3',
        text: 'Можно, но только текстовые данные: бинарные не поддерживаются, поэтому придётся кодировать их в base64',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-50-4',
        text: 'Да, SSE двусторонний, но только если сервер включил поддержку “reply” событий',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-6',
    partId: 'part-1',
    difficulty: 'easy',
  },

  {
    id: 'q-v2-1-51',
    type: 'single',
    question:
      'Какой редирект следует использовать, если нужно временно перенаправить запрос и при этом сохранить HTTP-метод и тело запроса?',
    answers: [
      {
        id: 'a-v2-1-51-1',
        text: '302 Found (может сменить метод на GET у некоторых клиентов)',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-51-2',
        text: '307 Temporary Redirect (сохраняет метод и тело)',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-51-3',
        text: '308 Permanent Redirect (сохраняет метод, но постоянный)',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-51-4',
        text: '304 Not Modified (кэширование, не редирект)',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-3',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-v2-1-52',
    type: 'single',
    question: 'В чём разница между HTTP статусами 401 и 403?',
    answers: [
      {
        id: 'a-v2-1-52-1',
        text: '401 — требуется аутентификация, 403 — доступ запрещён даже при наличии аутентификации/прав',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-52-2',
        text: '401 обычно означает “не хватает прав на ресурс”, а 403 — “нужно залогиниться”, то есть смысл статусов часто путают местами',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-52-3',
        text: '401 и 403 отличаются только тем, возвращает ли сервер страницу логина; по смыслу это одно и то же',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-52-4',
        text: 'На практике выбор между 401 и 403 чаще зависит от политики безопасности (что показывать пользователю), а не от строгой семантики',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-3',
    partId: 'part-1',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-1-53',
    type: 'single',
    question:
      'Какой набор заголовков обычно используется для условного запроса, чтобы сервер мог вернуть 304 Not Modified?',
    answers: [
      {
        id: 'a-v2-1-53-1',
        text: 'If-None-Match (ETag) или If-Modified-Since (Last-Modified) в запросе — и 304 в ответе при совпадении',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-53-2',
        text: 'If-Match (ETag) или If-Unmodified-Since: сервер сравнит значения и вернёт 304, если ресурс не изменился',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-53-3',
        text: 'Cache-Control: no-cache — этого достаточно, чтобы сервер возвращал 304 вместо 200 и экономил трафик',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-53-4',
        text: 'Достаточно ETag/Last-Modified в предыдущем ответе — браузер сможет “считать” ресурс актуальным без условного запроса',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-3',
    partId: 'part-1',
    difficulty: 'hard',
  },
  {
    id: 'q-v2-1-54',
    type: 'single',
    question:
      'Почему HttpOnly cookie считается безопаснее для хранения сессии, чем LocalStorage?',
    answers: [
      {
        id: 'a-v2-1-54-1',
        text: 'Потому что HttpOnly cookie недоступна из JavaScript, что снижает риск кражи токена через XSS',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-54-2',
        text: 'Потому что HttpOnly cookie не отправляется в cross-site запросах, поэтому автоматически защищает от CSRF',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-54-3',
        text: 'Потому что HttpOnly cookie защищает от CSRF так же, как SameSite, и при этом работает даже при XSS',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-54-4',
        text: 'Потому что LocalStorage можно “сделать HttpOnly” на уровне браузера, а cookie — нет; поэтому cookie менее безопасны',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-5',
    partId: 'part-1',
    difficulty: 'medium',
  },
  {
    id: 'q-v2-1-55',
    type: 'single',
    question:
      'Что означает `Domain=.example.com` в Set-Cookie (в рамках типичной практики)?',
    answers: [
      {
        id: 'a-v2-1-55-1',
        text: 'Cookie будет доступна для example.com и всех его поддоменов (например, api.example.com)',
        isCorrect: true,
      },
      {
        id: 'a-v2-1-55-2',
        text: 'Cookie будет доступна только для поддоменов (например, api.example.com), но не для самого example.com',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-55-3',
        text: 'Cookie будет доступна для любых доменов, которые заканчиваются на `example.com` (включая `anotherexample.com`)',
        isCorrect: false,
      },
      {
        id: 'a-v2-1-55-4',
        text: 'Cookie автоматически получит SameSite=None и будет отправляться между сайтами, если указан Domain с точкой',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-5',
    partId: 'part-1',
    difficulty: 'medium',
  },
]
