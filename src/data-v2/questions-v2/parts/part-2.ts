import type { QuizQuestion } from '@/shared/types/quiz.types'

export const part2Questions: QuizQuestion[] = [
  {
    id: 'q-v2-2-1',
    type: 'single',
    question:
      'Почему современные браузеры используют многопроцессную архитектуру?',
    answers: [
      {
        id: 'a-v2-2-1-1',
        text: 'Чтобы повысить стабильность (вкладки изолированы), безопасность (sandboxing) и распараллелить работу',
        isCorrect: true,
      },
      {
        id: 'a-v2-2-1-2',
        text: 'Потому что JavaScript нельзя исполнять в том же процессе, что и сеть: иначе сложно гарантировать безопасность соединений',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-1-3',
        text: 'Чтобы каждый сайт работал в своём отдельном потоке, а процессы использовались только для окон браузера',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-1-4',
        text: 'Потому что GPU обязателен для загрузки страниц, и без отдельного GPU‑процесса вкладки не смогут открываться',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-7',
    partId: 'part-2',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-2-2',
    type: 'single',
    question:
      'В каком процессе браузера обычно исполняется JavaScript страницы?',
    answers: [
      { id: 'a-v2-2-2-1', text: 'В Renderer Process', isCorrect: true },
      { id: 'a-v2-2-2-2', text: 'В Browser Process', isCorrect: false },
      { id: 'a-v2-2-2-3', text: 'В Network Process', isCorrect: false },
      { id: 'a-v2-2-2-4', text: 'В GPU Process', isCorrect: false },
    ],
    chapterId: 'chapter-7',
    partId: 'part-2',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-2-3',
    type: 'single',
    question:
      'Какой процесс в современных браузерах обычно отвечает за DNS/HTTP/кэш и работу с cookies?',
    answers: [
      { id: 'a-v2-2-3-1', text: 'Network Service Process', isCorrect: true },
      { id: 'a-v2-2-3-2', text: 'GPU Process', isCorrect: false },
      { id: 'a-v2-2-3-3', text: 'Renderer Process', isCorrect: false },
      { id: 'a-v2-2-3-4', text: 'Utility Process (Fonts)', isCorrect: false },
    ],
    chapterId: 'chapter-7',
    partId: 'part-2',
    difficulty: 'medium',
  },
  {
    id: 'q-v2-2-4',
    type: 'single',
    question:
      'Что из перечисленного наиболее характерно для GPU Process в браузере?',
    answers: [
      {
        id: 'a-v2-2-4-1',
        text: 'Компоновка слоёв (compositing), аппаратное ускорение, WebGL и отрисовка трансформаций',
        isCorrect: true,
      },
      {
        id: 'a-v2-2-4-2',
        text: 'Построение DOM/CSSOM и выполнение JavaScript, потому что GPU лучше подходит для параллельных вычислений',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-4-3',
        text: 'DNS‑разрешение и TLS‑handshake, потому что это “низкоуровневые” операции и их выносят из renderer',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-4-4',
        text: 'Проверка CORS и формирование Access-Control-Allow-* заголовков перед тем, как отрисовать ответ на странице',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-7',
    partId: 'part-2',
    difficulty: 'medium',
  },
  {
    id: 'q-v2-2-5',
    type: 'single',
    question: 'Что означает Site Isolation (в упрощённом виде)?',
    answers: [
      {
        id: 'a-v2-2-5-1',
        text: 'Разные origins изолируются по процессам: даже iframe с другим origin может рендериться в отдельном процессе',
        isCorrect: true,
      },
      {
        id: 'a-v2-2-5-2',
        text: 'Каждая вкладка всегда рендерится в одном процессе, но сайт “изолируется” на уровне памяти внутри него',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-5-3',
        text: 'Каждый домен получает отдельный поток в JS-движке, чтобы не блокировать main thread',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-5-4',
        text: 'Все запросы к разным доменам автоматически проксируются через CORS, чтобы изолировать сайты',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-7',
    partId: 'part-2',
    difficulty: 'hard',
  },
  {
    id: 'q-v2-2-6',
    type: 'single',
    question: 'Что такое IPC в контексте архитектуры браузера?',
    answers: [
      {
        id: 'a-v2-2-6-1',
        text: 'Inter-Process Communication — обмен сообщениями между процессами (например, renderer ↔ network) через безопасные каналы',
        isCorrect: true,
      },
      {
        id: 'a-v2-2-6-2',
        text: 'Internet Protocol Control — механизм управления маршрутизацией пакетов на уровне IP',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-6-3',
        text: 'Internal Page Cache — механизм кеширования страниц между навигациями',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-6-4',
        text: 'Inline Process Compilation — способ ускорить V8 за счёт компиляции прямо в DOM',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-7',
    partId: 'part-2',
    difficulty: 'medium',
  },
  {
    id: 'q-v2-2-7',
    type: 'single',
    question: 'Почему Web Worker не имеет доступа к DOM?',
    answers: [
      {
        id: 'a-v2-2-7-1',
        text: 'DOM “живёт” в renderer, а worker изолирован; для общения используются сообщения (postMessage/IPC)',
        isCorrect: true,
      },
      {
        id: 'a-v2-2-7-2',
        text: 'Потому что DOM становится доступным только после load, а worker может стартовать до полной загрузки ресурсов',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-7-3',
        text: 'Потому что DOM связан с Network Process, а worker не может обращаться к сетевому процессу напрямую',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-7-4',
        text: 'Потому что DOM хранится как HTML‑строка, а worker работает только с “чистыми” данными без разметки',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-7',
    partId: 'part-2',
    difficulty: 'hard',
  },
  {
    id: 'q-v2-2-8',
    type: 'single',
    question:
      'Как лучше всего описать sandboxing (песочницу) для Renderer Process в современном браузере?',
    answers: [
      {
        id: 'a-v2-2-8-1',
        text: 'Рендерер ограничен в правах: нет прямого доступа к файлам/устройствам/сети, привилегии — только через IPC',
        isCorrect: true,
      },
      {
        id: 'a-v2-2-8-2',
        text: 'Рендерер может читать файловую систему напрямую, но только в “папке origin” (вроде sandbox-директории сайта)',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-8-3',
        text: 'Sandbox — это режим приватности: в нём отключаются cookies и localStorage',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-8-4',
        text: 'Sandbox — это способ запускать JavaScript на GPU, чтобы ускорить вычисления и изолировать код',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-7',
    partId: 'part-2',
    difficulty: 'medium',
  },
  {
    id: 'q-v2-2-9',
    type: 'single',
    question:
      'Что из этого ближе всего к моменту “navigation commit” в браузере?',
    answers: [
      {
        id: 'a-v2-2-9-1',
        text: 'Момент, когда браузер “фиксирует” навигацию и начинает показывать новый документ (commit перехода)',
        isCorrect: true,
      },
      {
        id: 'a-v2-2-9-2',
        text: 'Когда сработал load и загрузились все картинки/стили',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-9-3',
        text: 'Когда браузер завершил компоновку слоёв на GPU (composite) и показал первый кадр',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-9-4',
        text: 'Когда выполнены все defer-скрипты и завершилась гидратация',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-7',
    partId: 'part-2',
    difficulty: 'hard',
  },
  {
    id: 'q-v2-2-10',
    type: 'single',
    question:
      'Какое из утверждений лучше всего описывает путь сетевого запроса из JavaScript страницы?',
    answers: [
      {
        id: 'a-v2-2-10-1',
        text: 'JS (Renderer) инициирует запрос → через IPC обращается к Network Process → Network делает DNS/HTTP → результат возвращается обратно в Renderer через IPC',
        isCorrect: true,
      },
      {
        id: 'a-v2-2-10-2',
        text: 'JS (Renderer) напрямую открывает сокеты и сам делает DNS/HTTP в этом же процессе, а браузер только показывает результат',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-10-3',
        text: 'JS (Renderer) отправляет запрос в GPU Process, потому что GPU быстрее выполняет сетевые операции и возвращает ответ в renderer',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-10-4',
        text: 'Network Process сам отправляет запросы “по расписанию”, а JS лишь подписывается и читает результаты из кэша',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-7',
    partId: 'part-2',
    difficulty: 'medium',
  },

  {
    id: 'q-v2-2-11',
    type: 'single',
    question: 'Чем отличается событие DOMContentLoaded от события load?',
    answers: [
      {
        id: 'a-v2-2-11-1',
        text: 'DOMContentLoaded — HTML распарсен и DOM построен; load — загрузились все ресурсы страницы (картинки, CSS и т.п.)',
        isCorrect: true,
      },
      {
        id: 'a-v2-2-11-2',
        text: 'DOMContentLoaded срабатывает после выполнения всех скриптов, а load — как только DOM готов (ресурсы могут догружаться)',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-11-3',
        text: 'load означает, что DOM построен и можно работать с элементами, а DOMContentLoaded — что загрузились изображения и стили',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-11-4',
        text: 'DOMContentLoaded в основном важен для SPA, а load — для SSR, потому что в SSR DOM приходит уже готовым',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-8',
    partId: 'part-2',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-2-12',
    type: 'single',
    question: 'Что измеряет LCP (Largest Contentful Paint)?',
    answers: [
      {
        id: 'a-v2-2-12-1',
        text: 'Когда на экране отрисовался самый крупный элемент контента (обычно основной контент первого экрана)',
        isCorrect: true,
      },
      {
        id: 'a-v2-2-12-2',
        text: 'Время до первого байта ответа от сервера (TTFB) — насколько быстро “началась” загрузка',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-12-3',
        text: 'Суммарное время выполнения JavaScript до того, как интерфейс станет отзывчивым на действия пользователя',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-12-4',
        text: 'Количество layout‑пересчётов (reflow), которые произошли на странице до отображения первого экрана',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-8',
    partId: 'part-2',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-2-13',
    type: 'single',
    question:
      'Какая ситуация чаще всего ухудшает CLS (Cumulative Layout Shift)?',
    answers: [
      {
        id: 'a-v2-2-13-1',
        text: 'Изображения/виджеты без заранее зарезервированного места (не заданы размеры), из-за чего контент “прыгает” при загрузке',
        isCorrect: true,
      },
      {
        id: 'a-v2-2-13-2',
        text: 'Длинный DNS/TLS на старте: контент появляется позже, и из‑за задержки метрика CLS становится хуже',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-13-3',
        text: 'Много запросов к API после загрузки: из‑за асинхронного прихода данных страница пересобирается и растёт CLS',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-13-4',
        text: 'Использование prefetch вместо preload: ресурсы первого экрана догружаются позже и “двигают” контент',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-8',
    partId: 'part-2',
    difficulty: 'medium',
  },
  {
    id: 'q-v2-2-14',
    type: 'single',
    question: 'Что измеряет INP (Interaction to Next Paint) на высоком уровне?',
    answers: [
      {
        id: 'a-v2-2-14-1',
        text: 'Задержку от взаимодействия пользователя (клик/ввод) до следующей отрисовки (next paint), часто упирается в main thread',
        isCorrect: true,
      },
      {
        id: 'a-v2-2-14-2',
        text: 'Пропускную способность сети: насколько быстро скачиваются ресурсы, и поэтому насколько быстро интерфейс “откликается”',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-14-3',
        text: 'Время построения CSSOM после загрузки styles.css: чем быстрее CSSOM, тем быстрее “следующий кадр”',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-14-4',
        text: 'Суммарное время, пока страница была скрыта (background/оверлеи), и как быстро она перерисуется при возвращении',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-8',
    partId: 'part-2',
    difficulty: 'medium',
  },
  {
    id: 'q-v2-2-15',
    type: 'single',
    question: 'Какие действия обычно улучшают TTFB?',
    answers: [
      {
        id: 'a-v2-2-15-1',
        text: 'Кэширование (HTTP/edge/серверное), CDN ближе к пользователю и оптимизация серверной части (БД/логика/холодные старты)',
        isCorrect: true,
      },
      {
        id: 'a-v2-2-15-2',
        text: 'Сместить тяжёлую работу обработчиков в requestAnimationFrame, чтобы браузер быстрее отдавал первый байт',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-15-3',
        text: 'Отложить загрузку CSS (аналог defer), чтобы браузер быстрее получил первый ответ и улучшил TTFB',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-15-4',
        text: 'Поменять формат ответа (например, JSON → XML), чтобы снизить нагрузку сериализации и ускорить первый байт',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-8',
    partId: 'part-2',
    difficulty: 'hard',
  },
  {
    id: 'q-v2-2-16',
    type: 'single',
    question:
      'Что чаще всего помогает улучшить LCP на странице с “hero”-изображением?',
    answers: [
      {
        id: 'a-v2-2-16-1',
        text: 'Оптимизировать изображение (размер/формат), дать ему приоритет загрузки и уменьшить блокирующие ресурсы первого экрана',
        isCorrect: true,
      },
      {
        id: 'a-v2-2-16-2',
        text: 'Убрать все preload, чтобы браузер сам выбрал приоритеты и не ошибся',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-16-3',
        text: 'Включить SameSite=None у cookies, чтобы ускорить загрузку ресурсов с CDN',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-16-4',
        text: 'Перевести все сетевые запросы на WebSocket, чтобы уменьшить TTFB и LCP одновременно',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-8',
    partId: 'part-2',
    difficulty: 'medium',
  },
  {
    id: 'q-v2-2-17',
    type: 'single',
    question: 'Чем отличается preload от prefetch?',
    answers: [
      {
        id: 'a-v2-2-17-1',
        text: 'preload — “нужно сейчас” и высокий приоритет; prefetch — “может понадобиться позже” и низкий приоритет',
        isCorrect: true,
      },
      {
        id: 'a-v2-2-17-2',
        text: 'preload работает только для CSS, а prefetch — только для JavaScript',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-17-3',
        text: 'prefetch всегда блокирует рендеринг, а preload — никогда',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-17-4',
        text: 'prefetch используется для первого экрана, а preload — только для следующей страницы',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-8',
    partId: 'part-2',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-2-18',
    type: 'single',
    question:
      'Почему “лабораторные” замеры (Lighthouse) могут отличаться от продовых метрик (RUM)?',
    answers: [
      {
        id: 'a-v2-2-18-1',
        text: 'Лаборатория воспроизводима, но не отражает разнообразие реальных устройств/сетей/поведения; в проде данные собираются от реальных пользователей',
        isCorrect: true,
      },
      {
        id: 'a-v2-2-18-2',
        text: 'Потому что Lighthouse измеряет в основном серверные метрики, а RUM — в основном клиентские (и их нельзя сравнивать напрямую)',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-18-3',
        text: 'Потому что в проде кэш браузера обычно “мешает” и его выключают, а Lighthouse измеряет только в условиях включённого кэша',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-18-4',
        text: 'Потому что RUM собирает только TTFB/серверные тайминги, а Lighthouse — только визуальные метрики вроде CLS/LCP',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-8',
    partId: 'part-2',
    difficulty: 'medium',
  },
  {
    id: 'q-v2-2-19',
    type: 'single',
    question:
      'Какая метрика чаще всего страдает от тяжёлых синхронных обработчиков и long tasks в main thread?',
    answers: [
      {
        id: 'a-v2-2-19-1',
        text: 'INP — страдает, когда main thread занят и отклик на действия запаздывает',
        isCorrect: true,
      },
      {
        id: 'a-v2-2-19-2',
        text: 'CLS — страдает, когда main thread занят и “прыгает” расположение элементов',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-19-3',
        text: 'TTFB — страдает, когда main thread занят и сервер дольше отдаёт первый байт',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-19-4',
        text: 'DNS — страдает, когда main thread занят и домены резолвятся с задержкой',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-8',
    partId: 'part-2',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-2-20',
    type: 'single',
    question:
      'Какой подход чаще всего помогает снизить CLS при загрузке контента?',
    answers: [
      {
        id: 'a-v2-2-20-1',
        text: 'Заранее резервировать место под медиа/виджеты и не вставлять контент “сверху” без резерва',
        isCorrect: true,
      },
      {
        id: 'a-v2-2-20-2',
        text: 'Сделать изображения background-image: тогда они не будут участвовать в layout и CLS автоматически станет лучше',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-20-3',
        text: 'Перевести страницу на HTTP/3: загрузка станет быстрее, и из‑за этого CLS снизится почти автоматически',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-20-4',
        text: 'Добавить больше async‑скриптов: интерактив появится быстрее, и “прыжки” верстки станут менее заметны',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-8',
    partId: 'part-2',
    difficulty: 'medium',
  },

  {
    id: 'q-v2-2-21',
    type: 'single',
    question: 'Какой порядок этапов ближе всего к Critical Rendering Path?',
    answers: [
      {
        id: 'a-v2-2-21-1',
        text: 'HTML → DOM, CSS → CSSOM, затем Render Tree → Layout → Paint → Composite',
        isCorrect: true,
      },
      {
        id: 'a-v2-2-21-2',
        text: 'HTML → DOM → CSSOM → Render Tree → Paint → Layout → Composite',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-21-3',
        text: 'HTML → DOM → Layout → CSSOM → Paint → Composite',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-21-4',
        text: 'HTML → DOM → Render Tree → CSSOM → Layout → Paint',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-9',
    partId: 'part-2',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-2-22',
    type: 'single',
    question: 'Чем отличается `<script defer>` от `<script async>`?',
    answers: [
      {
        id: 'a-v2-2-22-1',
        text: 'Оба скачиваются параллельно; async выполняется сразу после загрузки (может прервать парсинг), defer — после парсинга HTML',
        isCorrect: true,
      },
      {
        id: 'a-v2-2-22-2',
        text: 'defer обычно выполняется раньше async, потому что имеет “более высокий приоритет” и браузер планирует его заранее',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-22-3',
        text: 'async сохраняет порядок выполнения скриптов, а defer нет — поэтому defer используют редко',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-22-4',
        text: 'defer используют только для inline‑скриптов, а async — для внешних файлов, поэтому их сложно сравнивать',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-9',
    partId: 'part-2',
    difficulty: 'medium',
  },
  {
    id: 'q-v2-2-23',
    type: 'single',
    question: 'Почему CSS считается блокирующим ресурсом для рендеринга?',
    answers: [
      {
        id: 'a-v2-2-23-1',
        text: 'Без CSSOM браузер не может корректно построить Render Tree, а JS может зависеть от рассчитанных размеров/стилей',
        isCorrect: true,
      },
      {
        id: 'a-v2-2-23-2',
        text: 'Потому что CSS всегда загружается синхронно и браузер не может продолжать парсинг HTML, пока не получит styles.css',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-23-3',
        text: 'Потому что CSS требует отдельного TLS‑handshake и из‑за этого блокирует отображение, пока не установится защищённый канал',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-23-4',
        text: 'Потому что стили “применяются на GPU”, и пока GPU не увидит CSS, он не сможет нарисовать первый кадр',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-9',
    partId: 'part-2',
    difficulty: 'hard',
  },
  {
    id: 'q-v2-2-24',
    type: 'single',
    question: 'Какой DOM-элемент, как правило, НЕ попадает в Render Tree?',
    answers: [
      {
        id: 'a-v2-2-24-1',
        text: 'Элемент с `display: none` (не отображается)',
        isCorrect: true,
      },
      {
        id: 'a-v2-2-24-2',
        text: 'Элемент с `visibility: hidden` (невидим, но в дереве)',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-24-3',
        text: 'Элемент с `opacity: 0` (прозрачный, но в дереве)',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-24-4',
        text: 'Элемент с `position: fixed` (отдельный слой)',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-9',
    partId: 'part-2',
    difficulty: 'medium',
  },
  {
    id: 'q-v2-2-25',
    type: 'single',
    question: 'В чём разница между reflow (layout) и repaint?',
    answers: [
      {
        id: 'a-v2-2-25-1',
        text: 'Reflow пересчитывает геометрию/расположение элементов (дорого), repaint перерисовывает визуальные детали без пересчёта layout (обычно дешевле)',
        isCorrect: true,
      },
      {
        id: 'a-v2-2-25-2',
        text: 'Repaint обычно дороже reflow, потому что рисование пикселей тяжёлое и выполняется чаще, чем пересчёт геометрии',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-25-3',
        text: 'Reflow выполняется на GPU (композитинг слоёв), а repaint — на CPU, потому что это “перерисовка стилей”',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-25-4',
        text: 'Reflow связан только с изменениями DOM, а repaint — только с изменениями CSS; поэтому их можно разделять по источнику',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-9',
    partId: 'part-2',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-2-26',
    type: 'single',
    question: 'Какие изменения чаще всего провоцируют reflow (layout)?',
    answers: [
      {
        id: 'a-v2-2-26-1',
        text: 'Изменения, влияющие на размеры/расположение: width/height/margin/padding/position/font-size и т.п.',
        isCorrect: true,
      },
      {
        id: 'a-v2-2-26-2',
        text: 'Смена цвета текста/фона (color/background), потому что браузеру нужно пересчитать все стили и заново разложить элементы',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-26-3',
        text: 'Изменение opacity, потому что прозрачность влияет на размеры элемента и заставляет браузер пересчитывать layout',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-26-4',
        text: 'Изменение z-index, потому что меняется порядок наложения и браузер перестраивает геометрию слоёв',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-9',
    partId: 'part-2',
    difficulty: 'medium',
  },
  {
    id: 'q-v2-2-27',
    type: 'single',
    question:
      'Какие CSS-свойства обычно рекомендуют для плавных анимаций (минимум reflow/repaint)?',
    answers: [
      {
        id: 'a-v2-2-27-1',
        text: 'transform и opacity (чаще всего композитятся)',
        isCorrect: true,
      },
      {
        id: 'a-v2-2-27-2',
        text: 'top и left (анимируют положение напрямую)',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-27-3',
        text: 'width и height (контролируют размер и “не трогают” соседей)',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-27-4',
        text: 'margin и padding (меняют отступы без пересчёта геометрии)',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-9',
    partId: 'part-2',
    difficulty: 'easy',
  },
  {
    id: 'q-v2-2-28',
    type: 'single',
    question: 'Что такое layout thrashing?',
    answers: [
      {
        id: 'a-v2-2-28-1',
        text: 'Чередование чтений layout-свойств (которые форсят расчёты) и записей стилей в цикле, вызывающее многократные reflow',
        isCorrect: true,
      },
      {
        id: 'a-v2-2-28-2',
        text: 'Ситуация, когда GPU не успевает композитить слои из-за частых opacity/transform анимаций и падает FPS',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-28-3',
        text: 'Ситуация, когда CSSOM слишком дорогой из-за селекторов и браузер “пересобирает” стили при каждом изменении DOM',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-28-4',
        text: 'Ситуация, когда Web Worker не успевает передавать данные в renderer, из-за чего UI обновляется рывками',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-9',
    partId: 'part-2',
    difficulty: 'hard',
  },
  {
    id: 'q-v2-2-29',
    type: 'single',
    question: 'Какой подход лучше всего помогает избежать layout thrashing?',
    answers: [
      {
        id: 'a-v2-2-29-1',
        text: 'Сгруппировать чтения layout-свойств, затем сгруппировать записи (read → write), при необходимости батчить через rAF',
        isCorrect: true,
      },
      {
        id: 'a-v2-2-29-2',
        text: 'Чаще читать offsetHeight/offsetWidth, чтобы браузер держал layout “свежим” и не делал лишние пересчёты при изменениях',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-29-3',
        text: 'Использовать setInterval вместо requestAnimationFrame, чтобы обновления происходили равномерно независимо от рендера',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-29-4',
        text: 'Вынести DOM‑операции в отдельный процесс через IPC (например, network), чтобы renderer меньше блокировался',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-9',
    partId: 'part-2',
    difficulty: 'medium',
  },
  {
    id: 'q-v2-2-30',
    type: 'single',
    question: 'Для чего обычно используют requestAnimationFrame?',
    answers: [
      {
        id: 'a-v2-2-30-1',
        text: 'Чтобы синхронизировать обновления (особенно анимации) с циклом рендера браузера перед следующим кадром',
        isCorrect: true,
      },
      {
        id: 'a-v2-2-30-2',
        text: 'Чтобы выполнять сетевые запросы “между кадрами” и тем самым снижать нагрузку на основной поток',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-30-3',
        text: 'Чтобы гарантировать выполнение кода после load, когда страница полностью готова и можно начинать анимации',
        isCorrect: false,
      },
      {
        id: 'a-v2-2-30-4',
        text: 'Чтобы “перенести” вычисления на GPU: rAF запускается в GPU‑цикле и разгружает main thread',
        isCorrect: false,
      },
    ],
    chapterId: 'chapter-9',
    partId: 'part-2',
    difficulty: 'easy',
  },
]
