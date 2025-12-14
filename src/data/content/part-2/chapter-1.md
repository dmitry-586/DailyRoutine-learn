# Дженерики в TypeScript

Дженерики позволяют создавать переиспользуемые компоненты, которые работают с различными типами.

## Зачем нужны?

Вместо того чтобы писать:

\`\`\`typescript
function identity(arg: number): number {
return arg;
}
\`\`\`

Используем дженерик:

\`\`\`typescript
function identity<T>(arg: T): T {
return arg;
}

const num = identity<number>(42);
const str = identity<string>("Hello");
\`\`\`

## Дженерики в интерфейсах

\`\`\`typescript
interface ApiResponse<T> {
data: T;
status: number;
message: string;
}

interface User {
id: number;
name: string;
}

const response: ApiResponse<User> = {
data: { id: 1, name: "John" },
status: 200,
message: "Success"
};
\`\`\`

## Ограничения дженериков

\`\`\`typescript
interface HasLength {
length: number;
}

function logLength<T extends HasLength>(arg: T): void {
console.log(arg.length);
}

logLength("Hello"); // ✅ OK
logLength([1, 2, 3]); // ✅ OK
// logLength(123); // ❌ Error
\`\`\`

Почти закончили! →
