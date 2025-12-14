# Интерфейсы и типы

Два основных способа описания структуры данных в TypeScript.

## Interface vs Type

### Interface

\`\`\`typescript
interface Person {
name: string;
age: number;
greet(): void;
}
\`\`\`

**Когда использовать:**

- Для описания структуры объектов
- Когда нужно расширение (extends)
- Для публичного API

### Type Alias

\`\`\`typescript
type ID = string | number;
type User = {
id: ID;
name: string;
};
\`\`\`

**Когда использовать:**

- Для union и intersection типов
- Для утилитарных типов
- Для примитивных типов

## Практический пример

\`\`\`typescript
interface Product {
id: number;
title: string;
price: number;
}

type CartItem = Product & {
quantity: number;
};

const item: CartItem = {
id: 1,
title: "Книга",
price: 500,
quantity: 2
};
\`\`\`

Дальше ещё интереснее! →
