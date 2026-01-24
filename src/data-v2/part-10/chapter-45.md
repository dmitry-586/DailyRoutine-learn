# Глава 45. useEffect: зависимости, cleanup, ловушки

`useEffect` — один из самых важных и сложных хуков в React. Понимание его работы, зависимостей и cleanup критично для написания корректного кода.

---

## 45.1. Базовое использование

`useEffect` используется для побочных эффектов:

- запросы к API;
- подписки на события;
- таймеры и интервалы;
- работа с DOM напрямую;
- синхронизация с внешними системами.

### Синтаксис

```jsx
useEffect(() => {
  // effect — код, который выполняется
  return () => {
    // cleanup — код, который выполняется перед следующим эффектом или размонтированием
  }
}, [deps]) // массив зависимостей
```

---

## 45.2. Массив зависимостей

### deps отсутствует

```jsx
useEffect(() => {
  console.log('Выполняется при каждом рендере')
})
```

**Поведение:** эффект выполняется **при каждом рендере**. Обычно это антипаттерн.

### deps = `[]`

```jsx
useEffect(() => {
  console.log('Выполняется только при монтировании')
}, [])
```

**Поведение:** эффект выполняется **только один раз** при монтировании компонента.

### deps = `[a, b]`

```jsx
useEffect(() => {
  console.log('Выполняется при изменении a или b')
}, [a, b])
```

**Поведение:** эффект выполняется при изменении любого из значений в массиве зависимостей.

---

## 45.3. Cleanup функция

Cleanup функция выполняется:

- **перед следующим эффектом** — если зависимости изменились;
- **при размонтировании компонента** — если компонент удаляется из DOM.

```jsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log('Tick')
  }, 1000)

  return () => {
    clearInterval(timer) // cleanup
  }
}, [])
```

**Зачем нужен cleanup:**

- предотвращает утечки памяти (таймеры, подписки);
- отменяет запросы, которые больше не нужны;
- очищает ресурсы, которые были выделены в эффекте.

### Пример: подписка на события

```jsx
useEffect(() => {
  const handleResize = () => {
    console.log('Window resized')
  }

  window.addEventListener('resize', handleResize)

  return () => {
    window.removeEventListener('resize', handleResize)
  }
}, [])
```

### Пример: отмена запроса

```jsx
useEffect(() => {
  const controller = new AbortController()

  fetch('/api/data', { signal: controller.signal })
    .then((res) => res.json())
    .then(setData)
    .catch((error) => {
      if (error.name !== 'AbortError') {
        console.error(error)
      }
    })

  return () => {
    controller.abort()
  }
}, [])
```

---

## 45.4. Типичные ошибки в useEffect

### 1. Забытые зависимости

```jsx
function Component({ userId }) {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch(`/api/user/${userId}`).then(setData)
  }, []) //  userId не в зависимостях!
}
```

**Проблема:** если `userId` изменится, запрос не выполнится заново.

**Решение:**

```jsx
useEffect(() => {
  fetch(`/api/user/${userId}`).then(setData)
}, [userId]) // 
```

### 2. Stale closures

```jsx
function Component() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      console.log(count) // всегда выводит 0!
    }, 1000)

    return () => clearInterval(timer)
  }, []) //  count не в зависимостях
}
```

**Проблема:** `count` в замыкании всегда будет равен начальному значению (0).

**Решение 1: функциональное обновление**

```jsx
useEffect(() => {
  const timer = setInterval(() => {
    setCount((prev) => {
      console.log(prev) // актуальное значение
      return prev + 1
    })
  }, 1000)

  return () => clearInterval(timer)
}, []) // можно оставить пустым, т.к. используем функциональное обновление
```

**Решение 2: добавить в зависимости**

```jsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log(count)
  }, 1000)

  return () => clearInterval(timer)
}, [count]) // 
```

### 3. Бесконечные циклы

```jsx
function Component() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('/api/data')
      .then((res) => res.json())
      .then(setData)
  }, [data]) //  data в зависимостях → бесконечный цикл
}
```

**Проблема:** эффект обновляет `data`, что вызывает новый эффект, который снова обновляет `data`, и так далее.

**Решение:**

```jsx
useEffect(() => {
  fetch('/api/data')
    .then((res) => res.json())
    .then(setData)
}, []) //  выполнится только один раз
```

### 4. Отсутствие cleanup для подписок

```jsx
useEffect(() => {
  const subscription = subscribe()
  //  нет cleanup → утечка памяти
}, [])
```

**Решение:**

```jsx
useEffect(() => {
  const subscription = subscribe()
  return () => {
    subscription.unsubscribe() //  cleanup
  }
}, [])
```

### 5. Объекты и функции в зависимостях

```jsx
function Component({ user }) {
  useEffect(() => {
    fetchUserData(user.id)
  }, [user]) //  user — объект, ссылка меняется при каждом рендере
}
```

**Проблема:** объект `user` создаётся заново при каждом рендере, даже если его содержимое не изменилось.

**Решение:**

```jsx
useEffect(() => {
  fetchUserData(user.id)
}, [user.id]) //  только нужное значение
```

---

## 45.5. Паттерны использования

### Запрос данных при монтировании

```jsx
useEffect(() => {
  let cancelled = false

  async function fetchData() {
    const data = await fetch('/api/data').then((res) => res.json())
    if (!cancelled) {
      setData(data)
    }
  }

  fetchData()

  return () => {
    cancelled = true
  }
}, [])
```

### Синхронизация с пропсами

```jsx
useEffect(() => {
  // Выполняется при изменении userId
  fetchUser(userId)
}, [userId])
```

### Подписка на события

```jsx
useEffect(() => {
  const handleKeyPress = (e) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  document.addEventListener('keydown', handleKeyPress)

  return () => {
    document.removeEventListener('keydown', handleKeyPress)
  }
}, [onClose])
```

### Таймеры

```jsx
useEffect(() => {
  const timer = setInterval(() => {
    setTime(new Date())
  }, 1000)

  return () => {
    clearInterval(timer)
  }
}, [])
```

---

## 45.6. Правила работы с зависимостями

### 1. Включай все используемые значения

Если в эффекте используется значение из области видимости компонента, оно должно быть в зависимостях:

```jsx
//  Плохо
useEffect(() => {
  console.log(count)
}, [])

//  Хорошо
useEffect(() => {
  console.log(count)
}, [count])
```

### 2. Используй функциональное обновление для setState

Если нужно обновить состояние на основе предыдущего значения, используй функциональное обновление:

```jsx
//  Не нужно добавлять count в зависимости
useEffect(() => {
  const timer = setInterval(() => {
    setCount((prev) => prev + 1)
  }, 1000)

  return () => clearInterval(timer)
}, [])
```

### 3. Мемоизируй объекты и функции в зависимостях

Если объект или функция создаётся при каждом рендере, используй `useMemo` или `useCallback`:

```jsx
const user = useMemo(() => ({ id: userId, name: userName }), [userId, userName])

useEffect(() => {
  fetchUserData(user)
}, [user])
```

---

## Вопросы на собеседовании

### 1. Что такое cleanup функция в useEffect?

Функция, которая выполняется перед следующим эффектом или при размонтировании компонента. Используется для очистки ресурсов (таймеры, подписки, запросы).

### 2. Что произойдёт, если не указать зависимости?

Эффект будет выполняться при каждом рендере, что обычно является антипаттерном.

### 3. Что такое stale closure в useEffect?

Проблема, когда значение в замыкании устарело из-за отсутствия в зависимостях. Решается функциональным обновлением или добавлением в зависимости.

### 4. Почему возникает бесконечный цикл в useEffect?

Когда эффект обновляет значение, которое находится в зависимостях, что вызывает новый эффект.

### 5. Как отменить запрос в useEffect?

Использовать `AbortController` и вызвать `abort()` в cleanup функции.
