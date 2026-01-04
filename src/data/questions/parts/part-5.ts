import type { QuizQuestion } from '@/shared/types/quiz.types'

/**
 * Вопросы по Части V. TypeScript
 */
export const part5Questions: QuizQuestion[] = [
  {
    id: 'q-5-1',
    type: 'single',
    question:
      'Вы проектируете публичный контракт (например, типы пропсов компонента) и хотите понимать, где лучше `interface`, а где — `type`. В чём ключевое отличие `interface` от `type` в TypeScript?',
    answers: [
      {
        id: 'a-5-1-4',
        text: 'type поддерживает declaration merging и расширение через extends, а interface — нет',
        isCorrect: false,
      },
      {
        id: 'a-5-1-1',
        text: 'interface можно расширять и объединять через extends, type более гибкий для создания утилитарных типов',
        isCorrect: true,
      },
      {
        id: 'a-5-1-2',
        text: 'interface используется только для описания объектов, type может описывать любые типы данных',
        isCorrect: false,
      },
      {
        id: 'a-5-1-3',
        text: 'interface компилируется в runtime код, type полностью удаляется при компиляции',
        isCorrect: false,
      },
    ],
    explanation:
      'interface можно расширять и объединять через extends, что делает его удобным для описания объектов. type более гибкий и может использоваться для создания утилитарных типов, union types и т.д.',
    chapterId: 'chapter-5-2',
    partId: 'part-5',
    difficulty: 'medium',
  },
  {
    id: 'q-5-2',
    type: 'single',
    question:
      'Вы пишете функцию `identity`, которая должна работать с любым типом и при этом сохранять конкретный тип на выходе. Какой механизм TypeScript для этого используется?',
    answers: [
      {
        id: 'a-5-2-4',
        text: 'Способ оптимизации компиляции TypeScript кода',
        isCorrect: false,
      },
      {
        id: 'a-5-2-2',
        text: 'Способ создания новых типов данных из существующих',
        isCorrect: false,
      },
      {
        id: 'a-5-2-1',
        text: 'Механизм создания переиспользуемых компонентов, которые работают с разными типами данных',
        isCorrect: true,
      },
      {
        id: 'a-5-2-3',
        text: 'Механизм для автоматического вывода типов без явного указания',
        isCorrect: false,
      },
    ],
    explanation:
      'Дженерики позволяют создавать переиспользуемые компоненты, функции и классы, которые работают с разными типами данных, сохраняя при этом типобезопасность.',
    chapterId: 'chapter-5-3',
    partId: 'part-5',
    difficulty: 'hard',
  },
  {
    id: 'q-5-3',
    type: 'single',
    question:
      'Нужно “переиспользовать” существующий тип: взять только часть полей, сделать поля опциональными или исключить ключи. Как называются встроенные типы TypeScript вроде `Pick`, `Omit`, `Partial`?',
    answers: [
      {
        id: 'a-5-3-4',
        text: 'Типы для оптимизации производительности компиляции',
        isCorrect: false,
      },
      {
        id: 'a-5-3-3',
        text: 'Типы для валидации данных во время выполнения программы',
        isCorrect: false,
      },
      {
        id: 'a-5-3-2',
        text: 'Типы для работы с асинхронными операциями и промисами',
        isCorrect: false,
      },
      {
        id: 'a-5-3-1',
        text: 'Встроенные типы для трансформации существующих типов (Pick, Omit, Partial и др.)',
        isCorrect: true,
      },
    ],
    explanation:
      'Утилитарные типы (Pick, Omit, Partial, Required, Readonly и др.) — это встроенные типы TypeScript для трансформации существующих типов без создания новых с нуля.',
    chapterId: 'chapter-5-3',
    partId: 'part-5',
    difficulty: 'medium',
  },
  {
    id: 'q-5-4',
    type: 'single',
    question:
      'В проекте много командной разработки и рефакторингов, и хочется ловить ошибки до запуска в браузере. Какое преимущество TypeScript перед JavaScript обычно называют ключевым?',
    answers: [
      {
        id: 'a-5-4-3',
        text: 'Автоматическая оптимизация кода при компиляции',
        isCorrect: false,
      },
      {
        id: 'a-5-4-1',
        text: 'Статическая типизация, которая помогает находить ошибки на этапе разработки',
        isCorrect: true,
      },
      {
        id: 'a-5-4-2',
        text: 'Более быстрая производительность выполнения кода',
        isCorrect: false,
      },
      {
        id: 'a-5-4-4',
        text: 'Встроенная поддержка всех современных браузеров',
        isCorrect: false,
      },
    ],
    explanation:
      'Основное преимущество TypeScript — статическая типизация, которая позволяет находить ошибки на этапе разработки, улучшает автодополнение и рефакторинг.',
    chapterId: 'chapter-5-1',
    partId: 'part-5',
    difficulty: 'easy',
  },
  {
    id: 'q-5-5',
    type: 'single',
    question:
      'Вы получили значение типа `unknown` (например, из `JSON.parse`) и хотите “подсказать” компилятору тип, понимая риски. Что такое type assertion в TypeScript и что он (не) делает?',
    answers: [
      {
        id: 'a-5-5-2',
        text: 'Автоматическое определение типа на основе значения',
        isCorrect: false,
      },
      {
        id: 'a-5-5-4',
        text: 'Механизм проверки типов во время выполнения',
        isCorrect: false,
      },
      {
        id: 'a-5-5-1',
        text: 'Указание компилятору рассматривать значение как определённый тип',
        isCorrect: true,
      },
      {
        id: 'a-5-5-3',
        text: 'Способ создания новых типов из существующих',
        isCorrect: false,
      },
    ],
    explanation:
      'Type assertion (as или <>) позволяет указать компилятору TypeScript, что значение имеет определённый тип. Это не преобразует тип, а только говорит компилятору, как его рассматривать.',
    chapterId: 'chapter-5-1',
    partId: 'part-5',
    difficulty: 'medium',
  },
  {
    id: 'q-5-6',
    type: 'multiple',
    question:
      'Вы описываете типы данных в приложении и хотите понимать, что TypeScript добавляет поверх JavaScript (и какие составные типы есть “из коробки”). Какие варианты корректно относятся к типовой системе TypeScript?',
    answers: [
      {
        id: 'a-5-6-5',
        text: 'Только типы из JavaScript',
        isCorrect: false,
      },
      {
        id: 'a-5-6-2',
        text: 'Объектные типы (object, array)',
        isCorrect: true,
      },
      {
        id: 'a-5-6-1',
        text: 'Примитивные типы (string, number, boolean)',
        isCorrect: true,
      },
      {
        id: 'a-5-6-4',
        text: 'Intersection types (A & B)',
        isCorrect: true,
      },
      {
        id: 'a-5-6-3',
        text: 'Union types (string | number)',
        isCorrect: true,
      },
    ],
    explanation:
      'TypeScript поддерживает все типы JavaScript плюс дополнительные: union, intersection, literal types, tuple, enum, any, unknown, void, never и др.',
    chapterId: 'chapter-5-1',
    partId: 'part-5',
    difficulty: 'easy',
  },
  {
    id: 'q-5-7',
    type: 'single',
    question:
      'Вы парсите данные из внешнего источника и не уверены в типе. Почему `unknown` безопаснее `any`, и в чём их принципиальная разница?',
    answers: [
      {
        id: 'a-5-7-4',
        text: 'unknown можно использовать так же свободно, как any: TypeScript не потребует проверок перед доступом к полям',
        isCorrect: false,
      },
      {
        id: 'a-5-7-3',
        text: 'any устаревший, unknown современный вариант',
        isCorrect: false,
      },
      {
        id: 'a-5-7-2',
        text: 'any для объектов, unknown для примитивов',
        isCorrect: false,
      },
      {
        id: 'a-5-7-1',
        text: 'any отключает проверку типов, unknown требует проверки типа перед использованием',
        isCorrect: true,
      },
    ],
    explanation:
      'any отключает проверку типов и позволяет делать что угодно. unknown требует проверки типа (type guard) перед использованием, что безопаснее.',
    chapterId: 'chapter-5-4',
    partId: 'part-5',
    difficulty: 'medium',
  },
  {
    id: 'q-5-8',
    type: 'single',
    question:
      'У вас есть `unknown` или union-тип, и перед доступом к полям нужно доказать TypeScript, что значение имеет конкретный тип. Как называется такая проверка/паттерн в TypeScript?',
    answers: [
      {
        id: 'a-5-8-3',
        text: 'Способ создания новых типов',
        isCorrect: false,
      },
      {
        id: 'a-5-8-2',
        text: 'Механизм защиты от изменения типов',
        isCorrect: false,
      },
      {
        id: 'a-5-8-4',
        text: 'Инструмент для валидации данных',
        isCorrect: false,
      },
      {
        id: 'a-5-8-1',
        text: 'Функция, которая проверяет тип значения во время выполнения и сужает тип для TypeScript',
        isCorrect: true,
      },
    ],
    explanation:
      'Type guard — это функция, которая проверяет тип во время выполнения (например, typeof, instanceof, пользовательские проверки) и позволяет TypeScript сузить тип.',
    chapterId: 'chapter-5-4',
    partId: 'part-5',
    difficulty: 'hard',
  },
  {
    id: 'q-5-9',
    type: 'single',
    question:
      'Функция принимает либо строку, либо число, и внутри нужно корректно сузить тип. Как называется тип `A | B` в TypeScript?',
    answers: [
      {
        id: 'a-5-9-1',
        text: 'Тип, который может быть одним из нескольких типов',
        isCorrect: true,
      },
      {
        id: 'a-5-9-3',
        text: 'Тип для работы с массивами',
        isCorrect: false,
      },
      {
        id: 'a-5-9-4',
        text: 'Тип для асинхронных операций',
        isCorrect: false,
      },
      {
        id: 'a-5-9-2',
        text: 'Тип, который объединяет свойства нескольких типов',
        isCorrect: false,
      },
    ],
    explanation:
      'Union type (A | B) означает, что значение может быть типа A или типа B. Пример: string | number. TypeScript требует проверки типа перед использованием (type narrowing).',
    chapterId: 'chapter-5-2',
    partId: 'part-5',
    difficulty: 'medium',
  },
  {
    id: 'q-5-10',
    type: 'single',
    question:
      'Нужно описать объект, который одновременно соответствует двум контрактам (например, имеет поля и из `A`, и из `B`). Как называется тип `A & B` в TypeScript?',
    answers: [
      {
        id: 'a-5-10-1',
        text: 'Тип, который объединяет все свойства типов A и B',
        isCorrect: true,
      },
      {
        id: 'a-5-10-3',
        text: 'Тип для работы с массивами',
        isCorrect: false,
      },
      {
        id: 'a-5-10-2',
        text: 'Тип, который может быть A или B',
        isCorrect: false,
      },
      {
        id: 'a-5-10-4',
        text: 'Тип для асинхронных операций',
        isCorrect: false,
      },
    ],
    explanation:
      'Intersection type (A & B) объединяет все свойства обоих типов. Пример: {name: string} & {age: number} = {name: string, age: number}. Полезен для миксинов и композиции типов.',
    chapterId: 'chapter-5-2',
    partId: 'part-5',
    difficulty: 'medium',
  },
  {
    id: 'q-5-11',
    type: 'single',
    question:
      'Вы хотите переиспользовать существующий тип: выбрать часть ключей, исключить ключи или сделать все поля опциональными. Какие утилитарные типы для этого есть в TypeScript?',
    answers: [
      {
        id: 'a-5-11-1',
        text: 'Утилитарные типы: Pick выбирает свойства, Omit исключает, Partial делает все свойства опциональными',
        isCorrect: true,
      },
      {
        id: 'a-5-11-2',
        text: 'Методы для работы с объектами',
        isCorrect: false,
      },
      {
        id: 'a-5-11-4',
        text: 'Способы создания новых типов',
        isCorrect: false,
      },
      {
        id: 'a-5-11-3',
        text: 'Операторы для проверки типов',
        isCorrect: false,
      },
    ],
    explanation:
      'Pick<T, K> выбирает свойства K из T. Omit<T, K> исключает свойства K из T. Partial<T> делает все свойства T опциональными. Это утилитарные типы для трансформации существующих типов.',
    chapterId: 'chapter-5-3',
    partId: 'part-5',
    difficulty: 'medium',
  },
  {
    id: 'q-5-12',
    type: 'single',
    question:
      'Вы хотите запретить присваивание в поле после инициализации на уровне типов (а не runtime). Какой модификатор/утилита TypeScript для этого используется?',
    answers: [
      {
        id: 'a-5-12-2',
        text: 'Модификатор для приватных свойств',
        isCorrect: false,
      },
      {
        id: 'a-5-12-1',
        text: 'Модификатор, который делает свойство или массив неизменяемым после инициализации',
        isCorrect: true,
      },
      {
        id: 'a-5-12-3',
        text: 'Модификатор для статических свойств',
        isCorrect: false,
      },
      {
        id: 'a-5-12-4',
        text: 'Модификатор для опциональных свойств',
        isCorrect: false,
      },
    ],
    explanation:
      'readonly делает свойство или массив доступным только для чтения после инициализации. Пример: readonly name: string или readonly items: string[]. Readonly<T> делает все свойства readonly.',
    chapterId: 'chapter-5-2',
    partId: 'part-5',
    difficulty: 'easy',
  },
  {
    id: 'q-5-13',
    type: 'single',
    question:
      'Нужно описать набор именованных констант (например, статусы), и при этом помнить про то, что попадёт в runtime. Что такое `enum` в TypeScript?',
    answers: [
      {
        id: 'a-5-13-4',
        text: 'Способ создания интерфейсов',
        isCorrect: false,
      },
      {
        id: 'a-5-13-2',
        text: 'Способ создания массивов',
        isCorrect: false,
      },
      {
        id: 'a-5-13-1',
        text: 'Конструкция для создания набора именованных констант',
        isCorrect: true,
      },
      {
        id: 'a-5-13-3',
        text: 'Механизм для работы с классами',
        isCorrect: false,
      },
    ],
    explanation:
      'enum создаёт набор именованных констант. Пример: enum Color {Red, Green, Blue}. Может быть числовым или строковым. Компилируется в JavaScript объект. В современном TypeScript часто заменяется union types.',
    chapterId: 'chapter-5-2',
    partId: 'part-5',
    difficulty: 'easy',
  },
  {
    id: 'q-5-14',
    type: 'single',
    question:
      'Вы возвращаете из функции пару `[value, error]` с фиксированным порядком и разными типами элементов. Какой тип TypeScript лучше всего описывает такой массив фиксированной структуры?',
    answers: [
      {
        id: 'a-5-14-2',
        text: 'Тип для работы с объектами',
        isCorrect: false,
      },
      {
        id: 'a-5-14-4',
        text: 'Способ создания классов',
        isCorrect: false,
      },
      {
        id: 'a-5-14-1',
        text: 'Массив с фиксированной длиной и известными типами элементов на каждой позиции',
        isCorrect: true,
      },
      {
        id: 'a-5-14-3',
        text: 'Тип для асинхронных операций',
        isCorrect: false,
      },
    ],
    explanation:
      'Tuple — массив с фиксированной длиной и известными типами на каждой позиции. Пример: [string, number] = ["name", 42]. Полезен для возврата нескольких значений из функции.',
    chapterId: 'chapter-5-2',
    partId: 'part-5',
    difficulty: 'medium',
  },
  {
    id: 'q-5-15',
    type: 'single',
    question:
      'Вы включаете строгую типизацию в проекте, чтобы ловить больше ошибок на этапе компиляции (особенно про `null/undefined` и неявные `any`). Что включает флаг `strict` в TypeScript?',
    answers: [
      {
        id: 'a-5-15-4',
        text: 'Режим для отключения проверки типов',
        isCorrect: false,
      },
      {
        id: 'a-5-15-1',
        text: 'Режим, который включает все строгие проверки типов (strictNullChecks, noImplicitAny и др.)',
        isCorrect: true,
      },
      {
        id: 'a-5-15-3',
        text: 'Режим для работы только с современным JavaScript',
        isCorrect: false,
      },
      {
        id: 'a-5-15-2',
        text: 'Режим для оптимизации компиляции',
        isCorrect: false,
      },
    ],
    explanation:
      'strict mode включает все строгие проверки: strictNullChecks (строгая проверка null/undefined), noImplicitAny (ошибка при неявном any), strictFunctionTypes и др. Рекомендуется включать в новых проектах.',
    chapterId: 'chapter-5-1',
    partId: 'part-5',
    difficulty: 'easy',
  },
  {
    id: 'q-5-16',
    type: 'single',
    question:
      'Вы видите синтаксис `@Injectable()`/`@Controller()` и хотите понимать, что это за механизм и почему он требует настройки компилятора. Что такое декораторы в TypeScript?',
    answers: [
      {
        id: 'a-5-16-2',
        text: 'Способ создания новых типов',
        isCorrect: false,
      },
      {
        id: 'a-5-16-4',
        text: 'Способ оптимизации кода',
        isCorrect: false,
      },
      {
        id: 'a-5-16-1',
        text: 'Специальные функции, которые добавляют метаданные или изменяют поведение классов, методов, свойств',
        isCorrect: true,
      },
      {
        id: 'a-5-16-3',
        text: 'Механизм для работы с массивами',
        isCorrect: false,
      },
    ],
    explanation:
      'Декораторы — функции, которые модифицируют классы, методы, свойства. Синтаксис: @decorator. Используются в Angular, NestJS. Требуют включения experimentalDecorators в tsconfig.json.',
    chapterId: 'chapter-5-3',
    partId: 'part-5',
    difficulty: 'hard',
  },
  {
    id: 'q-5-17',
    type: 'single',
    question:
      'В API-ответе поле может отсутствовать, и вы хотите описать это в типах. Что означает `?` у свойства в интерфейсе/типе TypeScript?',
    answers: [
      {
        id: 'a-5-17-3',
        text: 'Свойства для статических данных',
        isCorrect: false,
      },
      {
        id: 'a-5-17-4',
        text: 'Свойства, которые работают только в строгом режиме',
        isCorrect: false,
      },
      {
        id: 'a-5-17-2',
        text: 'Свойства, которые нельзя изменять',
        isCorrect: false,
      },
      {
        id: 'a-5-17-1',
        text: 'Свойства, которые могут отсутствовать в объекте, помечаются знаком ? после имени свойства',
        isCorrect: true,
      },
    ],
    explanation:
      'Опциональные свойства: interface User { name: string; age?: number; }. age может отсутствовать. При обращении нужно проверять: user.age?.toString() или if (user.age !== undefined).',
    chapterId: 'chapter-5-2',
    partId: 'part-5',
    difficulty: 'easy',
  },
  {
    id: 'q-5-18',
    type: 'single',
    question:
      'Одна функция принимает разные типы аргументов и возвращает разные типы результата, но реализация одна. Как в TypeScript описывают такие “несколько сигнатур одной функции”?',
    answers: [
      {
        id: 'a-5-18-1',
        text: 'Механизм для описания нескольких сигнатур одной функции с разными типами параметров и возвращаемых значений',
        isCorrect: true,
      },
      {
        id: 'a-5-18-2',
        text: 'Способ создания нескольких функций с одинаковым именем',
        isCorrect: false,
      },
      {
        id: 'a-5-18-4',
        text: 'Способ работы с асинхронными функциями',
        isCorrect: false,
      },
      {
        id: 'a-5-18-3',
        text: 'Механизм для оптимизации функций',
        isCorrect: false,
      },
    ],
    explanation:
      'Перегрузка функций: function format(x: string): string; function format(x: number): string; function format(x: string | number): string { return String(x); }. TypeScript выбирает правильную сигнатуру на основе аргументов.',
    chapterId: 'chapter-5-2',
    partId: 'part-5',
    difficulty: 'hard',
  },
  {
    id: 'q-5-19',
    type: 'single',
    question:
      'Вы хотите взять тип `T` и построить новый тип, проходясь по его ключам (например, сделать все поля `readonly` или `optional`). Как называется такой механизм в TypeScript?',
    answers: [
      {
        id: 'a-5-19-3',
        text: 'Механизм для оптимизации типов',
        isCorrect: false,
      },
      {
        id: 'a-5-19-4',
        text: 'Способ создания новых типов',
        isCorrect: false,
      },
      {
        id: 'a-5-19-1',
        text: 'Типы, которые создают новый тип путём трансформации свойств существующего типа через цикл по ключам',
        isCorrect: true,
      },
      {
        id: 'a-5-19-2',
        text: 'Типы для работы с картами и объектами',
        isCorrect: false,
      },
    ],
    explanation:
      'Mapped types: type Readonly<T> = { readonly [K in keyof T]: T[K] }. Позволяют трансформировать свойства типа. Примеры: Partial, Required, Readonly, Record. Основа для создания утилитарных типов.',
    chapterId: 'chapter-5-3',
    partId: 'part-5',
    difficulty: 'hard',
  },
  {
    id: 'q-5-20',
    type: 'single',
    question:
      'Нужно описать “словарь” вида `ключ → значение` с ограничением на тип ключей и тип значений. Какой утилитарный тип TypeScript для этого обычно используют?',
    answers: [
      {
        id: 'a-5-20-2',
        text: 'Тип для работы с записями базы данных',
        isCorrect: false,
      },
      {
        id: 'a-5-20-4',
        text: 'Способ создания массивов',
        isCorrect: false,
      },
      {
        id: 'a-5-20-1',
        text: 'Утилитарный тип для создания объекта с ключами типа K и значениями типа T',
        isCorrect: true,
      },
      {
        id: 'a-5-20-3',
        text: 'Механизм для кэширования типов',
        isCorrect: false,
      },
    ],
    explanation:
      'Record<K, T> создаёт тип объекта с ключами K и значениями T. Пример: Record<string, number> = { [key: string]: number }. Полезен для словарей, маппингов. type UserRoles = Record<string, "admin" | "user">.',
    chapterId: 'chapter-5-3',
    partId: 'part-5',
    difficulty: 'medium',
  },
  {
    id: 'q-5-21',
    type: 'single',
    question:
      'Вы пишете типобезопасный хелпер `get(obj, key)` и хотите, чтобы `key` мог быть только существующим ключом объекта. Какой оператор TypeScript даёт union всех ключей типа?',
    answers: [
      {
        id: 'a-5-21-1',
        text: 'Оператор, который возвращает union типов всех ключей объекта',
        isCorrect: true,
      },
      {
        id: 'a-5-21-3',
        text: 'Механизм для работы с ключами',
        isCorrect: false,
      },
      {
        id: 'a-5-21-2',
        text: 'Оператор для проверки наличия ключа',
        isCorrect: false,
      },
      {
        id: 'a-5-21-4',
        text: 'Способ создания ключей',
        isCorrect: false,
      },
    ],
    explanation:
      'keyof возвращает union всех ключей объекта. Пример: type Keys = keyof { name: string; age: number } // "name" | "age". Используется в mapped types, для создания типизированных функций доступа к свойствам.',
    chapterId: 'chapter-5-3',
    partId: 'part-5',
    difficulty: 'medium',
  },
  {
    id: 'q-5-22',
    type: 'single',
    question:
      'Вы хотите “вытащить” тип из уже существующей переменной/объекта (например, из конфига) и переиспользовать его в типах. Какой оператор TypeScript для этого используют?',
    answers: [
      {
        id: 'a-5-22-3',
        text: 'Механизм для работы с типами',
        isCorrect: false,
      },
      {
        id: 'a-5-22-1',
        text: 'Оператор, который возвращает тип значения переменной или выражения',
        isCorrect: true,
      },
      {
        id: 'a-5-22-4',
        text: 'Способ создания типов',
        isCorrect: false,
      },
      {
        id: 'a-5-22-2',
        text: 'Оператор для проверки типа значения',
        isCorrect: false,
      },
    ],
    explanation:
      'typeof в TypeScript возвращает тип значения. Пример: const user = { name: "John" }; type User = typeof user; // { name: string }. Полезен для создания типов из значений, особенно для констант и конфигураций.',
    chapterId: 'chapter-5-3',
    partId: 'part-5',
    difficulty: 'medium',
  },
  {
    id: 'q-5-23',
    type: 'single',
    question:
      'Вы пишете условный тип и хотите “вытащить” часть типа (например, тип элемента массива или тип аргумента функции) прямо внутри `extends`. Какой механизм TypeScript для этого предназначен?',
    answers: [
      {
        id: 'a-5-23-3',
        text: 'Механизм для оптимизации типов',
        isCorrect: false,
      },
      {
        id: 'a-5-23-2',
        text: 'Ключевое слово для проверки типов',
        isCorrect: false,
      },
      {
        id: 'a-5-23-1',
        text: 'Ключевое слово для вывода типа внутри условных типов, позволяет извлечь тип из другого типа',
        isCorrect: true,
      },
      {
        id: 'a-5-23-4',
        text: 'Способ создания новых типов',
        isCorrect: false,
      },
    ],
    explanation:
      'infer используется в условных типах для вывода типа. Пример: type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never. Позволяет извлечь тип возвращаемого значения функции или тип элемента массива.',
    chapterId: 'chapter-5-3',
    partId: 'part-5',
    difficulty: 'hard',
  },
  {
    id: 'q-5-24',
    type: 'single',
    question:
      'Нужно выразить тип по условию вида “если `T` расширяет `U`, то один тип, иначе другой” — как в шаблонах. Как называется такой механизм в TypeScript?',
    answers: [
      {
        id: 'a-5-24-2',
        text: 'Типы для условных операторов в коде',
        isCorrect: false,
      },
      {
        id: 'a-5-24-4',
        text: 'Способ создания типов',
        isCorrect: false,
      },
      {
        id: 'a-5-24-1',
        text: 'Типы, которые выбирают один из двух типов на основе условия, используют синтаксис T extends U ? X : Y',
        isCorrect: true,
      },
      {
        id: 'a-5-24-3',
        text: 'Механизм для проверки типов',
        isCorrect: false,
      },
    ],
    explanation:
      'Условные типы: type IsArray<T> = T extends any[] ? true : false. Позволяют создавать типы, которые зависят от других типов. Используются в утилитарных типах: Exclude, Extract, NonNullable, ReturnType.',
    chapterId: 'chapter-5-3',
    partId: 'part-5',
    difficulty: 'hard',
  },
  {
    id: 'q-5-25',
    type: 'single',
    question:
      'Вы работаете с union-типом и хотите либо убрать из него часть вариантов, либо наоборот — оставить только пересечение с другим union. Какие утилиты TypeScript для этого используются?',
    answers: [
      {
        id: 'a-5-25-3',
        text: 'Extract/Exclude — это runtime‑утилиты: они реально фильтруют значения, поэтому их можно использовать вместо type guards',
        isCorrect: false,
      },
      {
        id: 'a-5-25-4',
        text: 'Exclude/Extract работают только с объектными типами, а для union литералов (строк/чисел) они не применимы',
        isCorrect: false,
      },
      {
        id: 'a-5-25-1',
        text: 'Exclude исключает из типа T все типы, которые можно присвоить U; Extract оставляет только типы, которые можно присвоить U',
        isCorrect: true,
      },
      {
        id: 'a-5-25-2',
        text: 'Exclude используют только для объектных типов, а Extract — только для массивов и tuple (для union они не подходят)',
        isCorrect: false,
      },
    ],
    explanation:
      'Exclude<T, U> исключает из T все типы, которые можно присвоить U. Extract<T, U> оставляет только типы из T, которые можно присвоить U. Пример: Exclude<"a" | "b" | "c", "a"> = "b" | "c".',
    chapterId: 'chapter-5-3',
    partId: 'part-5',
    difficulty: 'hard',
  },
  {
    id: 'q-5-26',
    type: 'single',
    question:
      'У вас тип `T | null | undefined`, и вы хотите получить вариант без `null/undefined`, чтобы не тащить проверки дальше по коду. Какой утилитарный тип TypeScript для этого есть?',
    answers: [
      {
        id: 'a-5-26-4',
        text: 'Способ создания типов',
        isCorrect: false,
      },
      {
        id: 'a-5-26-3',
        text: 'Механизм для проверки на null',
        isCorrect: false,
      },
      {
        id: 'a-5-26-1',
        text: 'Утилитарный тип, который исключает null и undefined из типа',
        isCorrect: true,
      },
      {
        id: 'a-5-26-2',
        text: 'Тип для работы с nullable значениями',
        isCorrect: false,
      },
    ],
    explanation:
      'NonNullable<T> исключает null и undefined из типа T. Пример: NonNullable<string | null | undefined> = string. Полезен для гарантии, что значение не null/undefined после проверки.',
    chapterId: 'chapter-5-3',
    partId: 'part-5',
    difficulty: 'medium',
  },
  {
    id: 'q-5-27',
    type: 'single',
    question:
      'Вы хотите вывести тип возвращаемого значения функции и типы её параметров, чтобы переиспользовать их в других местах (без дублирования). Какие utility-типы TypeScript для этого существуют?',
    answers: [
      {
        id: 'a-5-27-1',
        text: 'ReturnType извлекает тип возвращаемого значения функции; Parameters извлекает типы параметров функции как tuple',
        isCorrect: true,
      },
      {
        id: 'a-5-27-4',
        text: 'Parameters возвращает объединение (union) типов параметров, а ReturnType возвращает tuple параметров',
        isCorrect: false,
      },
      {
        id: 'a-5-27-3',
        text: 'Parameters/ReturnType работают только для sync‑функций: для async они всегда дают `Promise<unknown>` и практически бесполезны',
        isCorrect: false,
      },
      {
        id: 'a-5-27-2',
        text: 'Эти утилиты работают только для методов классов (в интерфейсах), а для обычных функций их использовать нельзя',
        isCorrect: false,
      },
    ],
    explanation:
      'ReturnType<T> извлекает тип возвращаемого значения функции. Parameters<T> извлекает типы параметров как tuple. Пример: type Fn = (a: string, b: number) => boolean; ReturnType<Fn> = boolean; Parameters<Fn> = [string, number].',
    chapterId: 'chapter-5-3',
    partId: 'part-5',
    difficulty: 'hard',
  },
  {
    id: 'q-5-28',
    type: 'single',
    question:
      'Вы описываете тип результата async-функции и хотите получить “развёрнутый” тип из `Promise<T>`. Какой utility-тип TypeScript для этого используется?',
    answers: [
      {
        id: 'a-5-28-3',
        text: 'Механизм для проверки промисов',
        isCorrect: false,
      },
      {
        id: 'a-5-28-2',
        text: 'Тип для работы с асинхронными функциями',
        isCorrect: false,
      },
      {
        id: 'a-5-28-4',
        text: 'Способ создания промисов',
        isCorrect: false,
      },
      {
        id: 'a-5-28-1',
        text: 'Утилитарный тип, который извлекает тип значения из Promise',
        isCorrect: true,
      },
    ],
    explanation:
      'Awaited<T> извлекает тип значения из Promise. Пример: Awaited<Promise<string>> = string. Работает с вложенными промисами: Awaited<Promise<Promise<number>>> = number. Полезен для типизации async функций.',
    chapterId: 'chapter-5-3',
    partId: 'part-5',
    difficulty: 'hard',
  },
  {
    id: 'q-5-29',
    type: 'single',
    question:
      'Нужно описать объект-словарь, где заранее неизвестны имена ключей (например, `Record` с произвольными ключами), но известен тип значений. Как в TypeScript это описывается через индексную сигнатуру?',
    answers: [
      {
        id: 'a-5-29-1',
        text: 'Способ описания объектов с динамическими ключами через синтаксис [key: string]: valueType',
        isCorrect: true,
      },
      {
        id: 'a-5-29-2',
        text: 'Способ создания индексов для массивов',
        isCorrect: false,
      },
      {
        id: 'a-5-29-3',
        text: 'Механизм для работы с ключами',
        isCorrect: false,
      },
      {
        id: 'a-5-29-4',
        text: 'Способ оптимизации объектов',
        isCorrect: false,
      },
    ],
    explanation:
      'Индексные сигнатуры: interface StringMap { [key: string]: string; }. Позволяют описывать объекты с динамическими ключами. Можно комбинировать с конкретными свойствами: interface Config { apiUrl: string; [key: string]: string | number; }',
    chapterId: 'chapter-5-2',
    partId: 'part-5',
    difficulty: 'medium',
  },
  {
    id: 'q-5-30',
    type: 'single',
    question:
      'Вы объявляете `interface` с одним и тем же именем в двух местах, и TypeScript их “склеивает”. Как называется этот механизм и для каких сущностей он характерен?',
    answers: [
      {
        id: 'a-5-30-1',
        text: 'Механизм, при котором несколько объявлений интерфейса с одинаковым именем автоматически объединяются',
        isCorrect: true,
      },
      {
        id: 'a-5-30-2',
        text: 'Механизм для объединения модулей',
        isCorrect: false,
      },
      {
        id: 'a-5-30-4',
        text: 'Механизм для работы с классами',
        isCorrect: false,
      },
      {
        id: 'a-5-30-3',
        text: 'Способ оптимизации типов',
        isCorrect: false,
      },
    ],
    explanation:
      'Declaration merging позволяет объявлять интерфейс несколько раз — они автоматически объединяются. Пример: interface Window { prop1: string; } interface Window { prop2: number; } → Window имеет оба свойства. Работает только с interface, не с type.',
    chapterId: 'chapter-5-2',
    partId: 'part-5',
    difficulty: 'medium',
  },
  {
    id: 'q-5-31',
    type: 'single',
    question:
      'Вы хотите сохранить литеральные значения и сделать объект/массив максимально “узким” по типам (например, чтобы `status: "ok"` не расширялся до `string`). Какой приём TypeScript для этого используют?',
    answers: [
      {
        id: 'a-5-31-1',
        text: 'Механизм, который делает значения readonly и выводит максимально узкие типы (литеральные типы вместо общих)',
        isCorrect: true,
      },
      {
        id: 'a-5-31-2',
        text: 'Механизм для создания констант',
        isCorrect: false,
      },
      {
        id: 'a-5-31-4',
        text: 'Механизм для работы с массивами',
        isCorrect: false,
      },
      {
        id: 'a-5-31-3',
        text: 'Способ оптимизации типов',
        isCorrect: false,
      },
    ],
    explanation:
      'as const делает значения readonly и выводит литеральные типы. Пример: const arr = [1, 2] as const → readonly [1, 2] вместо number[]. const obj = { name: "John" } as const → { readonly name: "John" } вместо { name: string }.',
    chapterId: 'chapter-5-4',
    partId: 'part-5',
    difficulty: 'hard',
  },
  {
    id: 'q-5-32',
    type: 'single',
    question:
      'Вы хотите проверить, что объект соответствует интерфейсу, но при этом сохранить максимально точный (узкий) вывод типов по значениям. Какую роль играет оператор `satisfies` в TypeScript?',
    answers: [
      {
        id: 'a-5-32-4',
        text: 'Способ создания типов',
        isCorrect: false,
      },
      {
        id: 'a-5-32-1',
        text: 'Оператор, который проверяет соответствие типа без расширения типа значения, сохраняя более узкий тип',
        isCorrect: true,
      },
      {
        id: 'a-5-32-3',
        text: 'Механизм для работы с типами',
        isCorrect: false,
      },
      {
        id: 'a-5-32-2',
        text: 'Оператор для проверки типов',
        isCorrect: false,
      },
    ],
    explanation:
      'satisfies проверяет соответствие типу, но сохраняет более узкий тип значения. Пример: const config = { theme: "dark" } satisfies Config → тип остаётся { theme: "dark" }, а не Config. Полезен для сохранения литеральных типов.',
    chapterId: 'chapter-5-4',
    partId: 'part-5',
    difficulty: 'hard',
  },
  {
    id: 'q-5-33',
    type: 'single',
    question:
      'Почему unknown в TypeScript безопаснее any при работе с внешними данными?',
    answers: [
      {
        id: 'a-5-33-1',
        text: 'unknown требует явного сужения/проверок перед использованием, поэтому не “протаскивает” небезопасные операции в runtime',
        isCorrect: true,
      },
      {
        id: 'a-5-33-4',
        text: 'unknown всегда превращается в never при инференсе, поэтому компилятор “запрещает” использовать значение без кастов',
        isCorrect: false,
      },
      {
        id: 'a-5-33-3',
        text: 'unknown автоматически добавляет runtime‑проверки и валидирует данные, поэтому его выбирают вместо любых схем (Zod не нужен)',
        isCorrect: false,
      },
      {
        id: 'a-5-33-2',
        text: 'unknown автоматически валидирует JSON на соответствие интерфейсу: если данные не совпали, TypeScript “кинет ошибку” в runtime',
        isCorrect: false,
      },
    ],
    explanation:
      'any отключает проверку типов и позволяет делать что угодно. unknown, наоборот, заставляет проверять тип перед доступом к полям/вызовами — это полезно для данных из API/форм.',
    chapterId: 'chapter-5-1',
    partId: 'part-5',
    difficulty: 'medium',
  },
  {
    id: 'q-5-34',
    type: 'single',
    question:
      'В чём практический смысл пользовательских type guards (user-defined type guards)?',
    answers: [
      {
        id: 'a-5-34-2',
        text: 'Они валидируют данные в runtime лучше Zod без библиотек',
        isCorrect: false,
      },
      {
        id: 'a-5-34-3',
        text: 'Они автоматически генерируют OpenAPI спецификацию',
        isCorrect: false,
      },
      {
        id: 'a-5-34-4',
        text: 'Они запрещены в strict режиме',
        isCorrect: false,
      },
      {
        id: 'a-5-34-1',
        text: 'Они позволяют TypeScript сузить тип внутри ветки, потому что функция возвращает предикат вида value is T',
        isCorrect: true,
      },
    ],
    explanation:
      'Type guard — это способ “объяснить” компилятору, что после проверки значение имеет более конкретный тип. Это повышает типобезопасность и убирает лишние касты.',
    chapterId: 'chapter-5-2',
    partId: 'part-5',
    difficulty: 'hard',
  },
  {
    id: 'q-5-35',
    type: 'single',
    question:
      'Какой основной риск у “as Type” (type assertion) при работе с данными из API?',
    answers: [
      {
        id: 'a-5-35-2',
        text: 'Type assertion запрещает tree-shaking и увеличивает бандл',
        isCorrect: false,
      },
      {
        id: 'a-5-35-4',
        text: 'Type assertion автоматически сериализует типы в JSON',
        isCorrect: false,
      },
      {
        id: 'a-5-35-3',
        text: 'Type assertion замедляет HTTP-запросы',
        isCorrect: false,
      },
      {
        id: 'a-5-35-1',
        text: 'Это не проверка в runtime: можно “заставить” компилятор поверить, но приложение упадёт, если данные не соответствуют типу',
        isCorrect: true,
      },
    ],
    explanation:
      'Типы TypeScript существуют только во время компиляции. Для runtime-данных нужен валидатор (например, Zod), иначе “as” может скрыть реальные проблемы.',
    chapterId: 'chapter-5-6',
    partId: 'part-5',
    difficulty: 'medium',
  },
  {
    id: 'q-5-36',
    type: 'single',
    question:
      'Какое утверждение точнее всего про распределительные conditional types?',
    answers: [
      {
        id: 'a-5-36-2',
        text: 'Conditional types никогда не распределяются по union: результат вычисляется “целиком”, поэтому обёртка `[T]` не влияет на поведение',
        isCorrect: false,
      },
      {
        id: 'a-5-36-3',
        text: 'Распределение происходит только для interface: у type alias нет вычислений, поэтому conditional types в них не “распадаются”',
        isCorrect: false,
      },
      {
        id: 'a-5-36-1',
        text: 'Conditional type распределяется по union, если проверяемый тип стоит “голым” (T extends U ? ... : ...)',
        isCorrect: true,
      },
      {
        id: 'a-5-36-4',
        text: 'Распределение включается только если использовать infer: без infer conditional type всегда даёт один итоговый тип',
        isCorrect: false,
      },
    ],
    explanation:
      'Классический пример: Extract/Exclude. Если нужно “отключить” распределение, часто оборачивают тип в кортеж: [T] extends [U] ? ... : ...',
    chapterId: 'chapter-5-5',
    partId: 'part-5',
    difficulty: 'hard',
  },
  {
    id: 'q-5-37',
    type: 'single',
    question:
      'Зачем в TypeScript иногда используют “брендированные типы” (branded/nominal types)?',
    answers: [
      {
        id: 'a-5-37-3',
        text: 'Чтобы автоматически валидировать данные в runtime без библиотек: бренд гарантирует корректность значений на исполнении',
        isCorrect: false,
      },
      {
        id: 'a-5-37-4',
        text: 'Чтобы включить рефлексию типов в JavaScript: бренд “передаёт” типовую информацию в runtime и её можно прочитать',
        isCorrect: false,
      },
      {
        id: 'a-5-37-1',
        text: 'Чтобы сделать типы несовместимыми при одинаковой структуре (например, UserId и PostId оба string), предотвращая логические ошибки',
        isCorrect: true,
      },
      {
        id: 'a-5-37-2',
        text: 'Чтобы ускорить компиляцию: брендирование уменьшает union и делает вывод типов “быстрее” для компилятора',
        isCorrect: false,
      },
    ],
    explanation:
      'TypeScript структурный, поэтому одинаковые структуры совместимы. Брендирование добавляет “метку”, делая типы номинальными и защищая от путаницы идентификаторов.',
    chapterId: 'chapter-5-5',
    partId: 'part-5',
    difficulty: 'hard',
  },
  {
    id: 'q-5-38',
    type: 'single',
    question: 'Что возвращает z.infer<typeof Schema> в Zod?',
    answers: [
      {
        id: 'a-5-38-1',
        text: 'TypeScript-тип, соответствующий схеме, выведенный из Zod-схемы',
        isCorrect: true,
      },
      {
        id: 'a-5-38-3',
        text: 'JSON-schema для Swagger/OpenAPI',
        isCorrect: false,
      },
      {
        id: 'a-5-38-4',
        text: 'Promise с типом данных, который вернёт API',
        isCorrect: false,
      },
      {
        id: 'a-5-38-2',
        text: 'Runtime-валидатор, который можно вызывать как функцию',
        isCorrect: false,
      },
    ],
    explanation:
      'Zod-схема — runtime, а z.infer — compile-time тип из этой схемы. Это делает схему “единственным источником правды” для валидации и типов.',
    chapterId: 'chapter-5-6',
    partId: 'part-5',
    difficulty: 'easy',
  },
  {
    id: 'q-5-39',
    type: 'single',
    question:
      'В чём практическая разница между Schema.parse и Schema.safeParse в Zod?',
    answers: [
      {
        id: 'a-5-39-4',
        text: 'parse не возвращает данные, он только проверяет',
        isCorrect: false,
      },
      {
        id: 'a-5-39-3',
        text: 'parse работает только в dev, а safeParse — только в prod',
        isCorrect: false,
      },
      {
        id: 'a-5-39-1',
        text: 'parse бросает исключение при ошибке, safeParse возвращает объект результата { success, data/error } без throw',
        isCorrect: true,
      },
      {
        id: 'a-5-39-2',
        text: 'safeParse валидирует только примитивы, а parse — любые схемы',
        isCorrect: false,
      },
    ],
    explanation:
      'В UI/формах часто удобнее safeParse, чтобы показать ошибки без try/catch. В сервисном коде parse может быть ок, если вы централизованно ловите ошибки.',
    chapterId: 'chapter-5-6',
    partId: 'part-5',
    difficulty: 'medium',
  },
  {
    id: 'q-5-40',
    type: 'single',
    question: 'Когда в Zod стоит использовать preprocess вместо transform?',
    answers: [
      {
        id: 'a-5-40-4',
        text: 'preprocess применяют ПОСЛЕ успешной валидации, а transform — ДО неё, чтобы “подготовить” вход',
        isCorrect: false,
      },
      {
        id: 'a-5-40-1',
        text: 'Когда нужно привести входные данные к форме, подходящей для последующей валидации (например, пустую строку → null)',
        isCorrect: true,
      },
      {
        id: 'a-5-40-3',
        text: 'Когда нужно “поменять тип”, не трогая данные: preprocess/transform якобы влияют только на типы, а не на значения',
        isCorrect: false,
      },
      {
        id: 'a-5-40-2',
        text: 'Когда нужно ускорить компиляцию TypeScript: preprocess якобы выполняется на этапе type-check и не добавляет runtime-кода',
        isCorrect: false,
      },
    ],
    explanation:
      'preprocess запускается до основной валидации и помогает нормализовать вход. transform чаще применяют после успешной валидации для преобразования результата.',
    chapterId: 'chapter-5-6',
    partId: 'part-5',
    difficulty: 'hard',
  },
  {
    id: 'q-5-41',
    type: 'multiple',
    question:
      'Какие преимущества даёт discriminatedUnion в Zod по сравнению с обычным union?',
    answers: [
      {
        id: 'a-5-41-4',
        text: 'Гарантированная защита от XSS на фронтенде',
        isCorrect: false,
      },
      {
        id: 'a-5-41-3',
        text: 'Автоматическая генерация SQL-таблиц по схеме',
        isCorrect: false,
      },
      {
        id: 'a-5-41-2',
        text: 'Более понятные ошибки валидации, потому что выбор ветки делается по tag',
        isCorrect: true,
      },
      {
        id: 'a-5-41-1',
        text: 'Более предсказуемая и быстрая валидация за счёт “дискриминатора” (tag field)',
        isCorrect: true,
      },
    ],
    explanation:
      'Discriminated union (tagged union) выбирает ветку по полю-дискриминатору и обычно даёт более ясные ошибки и лучшее поведение, чем “перебор” вариантов в union.',
    chapterId: 'chapter-5-6',
    partId: 'part-5',
    difficulty: 'hard',
  },
  {
    id: 'q-5-42',
    type: 'single',
    question: 'Зачем в Zod нужен superRefine, если уже есть refine?',
    answers: [
      {
        id: 'a-5-42-4',
        text: 'superRefine автоматически исправляет данные, если они невалидны, поэтому его используют вместо любых трансформаций',
        isCorrect: false,
      },
      {
        id: 'a-5-42-1',
        text: 'superRefine позволяет добавлять несколько ошибок и “прикреплять” их к конкретным путям (полям), делая валидацию более точной',
        isCorrect: true,
      },
      {
        id: 'a-5-42-2',
        text: 'superRefine “включает” strictNullChecks в TypeScript и делает схему более типобезопасной на уровне компиляции',
        isCorrect: false,
      },
      {
        id: 'a-5-42-3',
        text: 'superRefine нужен только для массивов/коллекций, а refine применим исключительно к объектам и формам',
        isCorrect: false,
      },
    ],
    explanation:
      'refine чаще про “одна проверка → одна ошибка”. superRefine даёт доступ к ctx и позволяет навешивать несколько issues на разные поля — важно для сложных форм.',
    chapterId: 'chapter-5-6',
    partId: 'part-5',
    difficulty: 'hard',
  },
  {
    id: 'q-5-43',
    type: 'single',
    question: 'Какой сценарий лучше всего оправдывает использование z.lazy?',
    answers: [
      {
        id: 'a-5-43-2',
        text: 'Когда нужно сделать валидацию асинхронной: z.lazy включает async‑режим и даёт await внутри схемы',
        isCorrect: false,
      },
      {
        id: 'a-5-43-1',
        text: 'Рекурсивные структуры (деревья), где схема ссылается сама на себя',
        isCorrect: true,
      },
      {
        id: 'a-5-43-3',
        text: 'Чтобы Zod начал работать в compile-time и не влиял на runtime',
        isCorrect: false,
      },
      {
        id: 'a-5-43-4',
        text: 'Чтобы автоматически конвертировать JSON в классы',
        isCorrect: false,
      },
    ],
    explanation:
      'z.lazy откладывает создание схемы, что позволяет описывать рекурсивные типы (например, категорию с подкатегориями) без циклических ссылок при инициализации.',
    chapterId: 'chapter-5-6',
    partId: 'part-5',
    difficulty: 'medium',
  },
  {
    id: 'q-5-44',
    type: 'single',
    question: 'Что даёт .brand() в Zod и какая проблема это решает?',
    answers: [
      {
        id: 'a-5-44-2',
        text: 'Шифрует значения на лету, чтобы их нельзя было украсть из памяти или прочитать в DevTools даже при XSS',
        isCorrect: false,
      },
      {
        id: 'a-5-44-3',
        text: 'Ускоряет запросы к API за счёт кеширования валидации: бренд сохраняется в runtime и схема “не проверяет повторно”',
        isCorrect: false,
      },
      {
        id: 'a-5-44-1',
        text: 'Создаёт брендированный тип на уровне TypeScript (nominal typing), чтобы различать логически разные значения одинаковой структуры (например, разные id)',
        isCorrect: true,
      },
      {
        id: 'a-5-44-4',
        text: 'Добавляет поле `brand` в runtime объект, и по нему можно отличать `UserId` от `PostId` без type guards',
        isCorrect: false,
      },
    ],
    explanation:
      'brand — это типовой “лейбл” для TS, а не runtime поле. Он помогает избежать путаницы между разными id/строками одинакового вида.',
    chapterId: 'chapter-5-6',
    partId: 'part-5',
    difficulty: 'hard',
  },
]
