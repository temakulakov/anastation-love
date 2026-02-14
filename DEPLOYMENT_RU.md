# 🚀 Деплой на Production

## Быстрый Деплой на Vercel (Рекомендуется)

Vercel - это платформа создателей Next.js, идеальна для этого проекта.

### Шаг 1: Подготовка
```bash
git add .
git commit -m "Готово к деплою"
git push origin main
```

### Шаг 2: Деплой
1. Перейдите на [vercel.com](https://vercel.com)
2. Нажмите "Create a new project"
3. Импортируйте из GitHub
4. Выберите репозиторий `anastation-love`
5. Нажмите "Deploy"

**Готово!** Ваш сайт будет доступен по URL вроде `https://anastation-love.vercel.app`

## Деплой на GitHub Pages

```bash
# 1. Измените next.config.ts для статического экспорта:
# export const output = 'export';

# 2. Постройте сайт
npm run build

# 3. Загрузите содержимое .next/static в GitHub Pages
```

## Деплой на собственный сервер

### На Ubuntu/Linux с Node.js

```bash
# 1. Клонируйте репозиторий на сервер
git clone <your-repo-url>
cd anastation-love

# 2. Установите зависимости
npm install --production

# 3. Постройте проект
npm run build

# 4. Запустите с pm2 (для фонового запуска)
npm install -g pm2
pm2 start "npm run start" --name "anastation-love"
pm2 save

# 5. Настройте nginx как reverse proxy
```

### Пример Nginx конфигурации

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Деплой на Docker

### Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### Запуск
```bash
docker build -t anastation-love .
docker run -p 3000:3000 anastation-love
```

## Оптимизация для Production

### 1. Переменные окружения
Создайте `.env.local`:
```
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### 2. Оптимизируйте изображения
Используйте Next.js Image компонент вместо обычного `<img>`

### 3. Добавьте HTTPS
Все рекомендованные платформы (Vercel, GitHub Pages) автоматически включают HTTPS.

## Мониторинг и Поддержка

### На Vercel
- Автоматические аналитика
- Оповещения об ошибках
- Логи развертывания

### На собственном сервере
```bash
# Проверьте логи
pm2 logs anastation-love

# Перезагрузите приложение
pm2 restart anastation-love

# Остановите приложение
pm2 stop anastation-love
```

## Обновления

### Обновить на Vercel
Просто сделайте `git push` - Vercel автоматически пересоберет и развернет.

### Обновить на собственном сервере
```bash
cd /path/to/anastation-love
git pull
npm install
npm run build
pm2 restart anastation-love
```

## Ускорение Performance

### 1. Кэширование
```javascript
// next.config.ts
export default {
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
}
```

### 2. Image Optimization
```typescript
import Image from 'next/image';

<Image
  src="/photo.jpg"
  alt="Photo"
  width={500}
  height={500}
  priority
/>
```

### 3. Code Splitting
Next.js автоматически делает code splitting

## Мониторинг Домена

Рекомендуемые регистраторы доменов:
- Vercel Domains
- Namecheap
- GoDaddy
- Google Domains

---

Выберите вариант деплоя в зависимости от ваших нужд:
- **Простой**: Vercel ⭐ Рекомендуется
- **Бесплатный**: GitHub Pages
- **Мощный**: Собственный сервер
- **Контейнеризированный**: Docker

Успехов! 🚀💕
