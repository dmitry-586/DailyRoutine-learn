# Утилитарные типы TypeScript

TypeScript предоставляет множество встроенных утилитарных типов.

## Часто используемые

### Partial<T>

Делает все свойства опциональными

\`\`\`typescript
interface User {
id: number;
name: string;
email: string;
}

type PartialUser = Partial<User>;
// { id?: number; name?: string; email?: string; }
\`\`\`

### Required<T>

Делает все свойства обязательными

\`\`\`typescript
type RequiredUser = Required<PartialUser>;
\`\`\`

### Pick<T, K>

Выбирает определённые свойства

\`\`\`typescript
type UserPreview = Pick<User, 'id' | 'name'>;
// { id: number; name: string; }
\`\`\`

### Omit<T, K>

Исключает определённые свойства

\`\`\`typescript
type UserWithoutEmail = Omit<User, 'email'>;
// { id: number; name: string; }
\`\`\`

## Record<K, T>

\`\`\`typescript
type Role = 'admin' | 'user' | 'guest';
type Permissions = Record<Role, string[]>;

const permissions: Permissions = {
admin: ['read', 'write', 'delete'],
user: ['read', 'write'],
guest: ['read']
};
\`\`\`

---

## 🎉 Поздравляем!

Вы изучили основы TypeScript. Продолжайте практиковаться и писать типобезопасный код!

### Полезные ресурсы

- [Официальная документация](https://www.typescriptlang.org)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript)
- [TypeScript Playground](https://www.typescriptlang.org/play)
