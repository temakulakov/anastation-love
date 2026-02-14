# 🦄 Инструкции по Кастомизации

## 1. Добавление Фоновой Музыки

Поместите ваш MP3 файл сюда: `/public/audio/background.mp3`

Желаемый формат: MP3, не более 10MB, мелодично 🎵

## 2. Добавление GIF Единорога

При загрузке единорог закомпилирован как эмодзи 🦄. Если хотите использовать GIF:

```tsx
// В ComponentLoadingPage.tsx, замените:
<div className={styles.unicornPlaceholder}>🦄</div>

// На:
<Image
  src="/unicorn.gif"
  alt="Loading unicorn"
  width={100}
  height={100}
/>
```

Поместите файл: `/public/unicorn.gif`

## 3. Добавление Данных Timeline

Откройте `/utils/constants.ts` и отредактируйте `MOCK_TIMELINE_DATA`:

**Каждое событие должно содержать:**
```typescript
{
  id: number,              // Уникальный номер
  date: string,            // Дата в формате ДД.МММ.ГГГГ
  title: string,           // Название события
  description: string,     // Описание (может содержать эмодзи)
  photos: string[],        // Массив URL фото (макс 4)
}
```

**Пример:**
```typescript
{
  id: 1,
  date: '14.02.2024',
  title: 'Первая встреча',
  description: 'Наша история началась в этот прекрасный день 💕',
  photos: [
    'https://example.com/photo1.jpg',
    'https://example.com/photo2.jpg',
  ],
}
```

## 4. Изменение Фраз Загрузки

В `/utils/constants.ts`, отредактируйте массив `LOADING_PHRASES`:

```typescript
export const LOADING_PHRASES = [
  '💕 загружаем любовь...',
  '✨ буферизируем волшебство...',
  // Добавьте свои фразы
];
```

## 5. Изменение Фраз Timeline

В `/utils/constants.ts`, отредактируйте массив `TIMELINE_PHRASES`:

```typescript
export const TIMELINE_PHRASES = [
  'наша история любви',
  // Добавьте свои фразы
];
```

## 6. Изменение Цветовой Схемы

Откройте `/styles/globals.scss` и измените переменные:

```scss
$primary-pink: #ff69b4;    // Основной розовый
$light-pink: #ffb6d9;      // Светлый розовый
$dark-pink: #ff1493;       // Темный розовый
$white: #ffffff;           // Белый
$black: #000000;           // Черный
$soft-bg: #fff5f9;         // Мягкий фон
```

## 7. Добавление Новых Событий

1. Откройте `/utils/constants.ts`
2. Добавьте новый объект в `MOCK_TIMELINE_DATA`
3. Сохраните файл
4. Страница автоматически обновится (hot reload)

## 8. Кастомизация Пароля

В `/utils/constants.ts`, измените `VALID_PASSWORDS`:

```typescript
export const VALID_PASSWORDS = [
  'принцесса',
  'принцессочка',
  'твой_пароль',
];
```

> 📝 Примечание: Пароль проверяется на включение этих слов и минимальную длину 8 символов

## 9. Изменение Стилей Компонентов

Каждый компонент имеет свой SCSS модуль в `/styles/components/`:
- `AuthPage.module.scss`
- `LoadingPage.module.scss`
- `TimelinePage.module.scss`
- `TimelineCard.module.scss`
- `MusicToggle.module.scss`
- `DecorationElements.module.scss`

## 10. Добавление Дополнительных Эмодзи

Редактируйте компоненты и добавляйте эмодзи в JSX:

```tsx
<span className={styles.emoji}>🦄</span>
<span className={styles.emoji}>💀</span>
<span className={styles.emoji}>🐹</span>
```

## 🐛 Решение Проблем

### Музыка не играет
- Убедитесь, что `/public/audio/background.mp3` существует
- Проверьте консоль браузера на ошибки CORS

### Фото не загружаются
- Проверьте правильность URL
- Убедитесь, что сервер может получить доступ к фото (CORS)

### Стили не применяются
- Очистите кэш браузера (Ctrl+Shift+Delete)
- Перезагрузите страницу

## 📚 Дополнительные Ресурсы

- [Next.js Документация](https://nextjs.org/)
- [Framer Motion API](https://www.framer.com/motion/)
- [SCSS/SASS Документация](https://sass-lang.com/)

---

Счастливого кодирования! 💕✨
