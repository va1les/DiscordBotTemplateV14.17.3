# 🚀 Discord Bot Template V14.17.3

Шаблон для создания Discord-бота на **Discord.js v14.17.3** с поддержкой **MongoDB**.

---

## 📌 Возможности
✅ Поддержка Discord.js v14.17.3
✅ Подключение к MongoDB
✅ Простая настройка через config.json
✅ Примеры команд и событий
✅ Динамический обработчик слэш-команд, контекстных команд, событий и компонентов

---

## 📥 Установка

### 1️⃣ Установка пакетов
Установите все необходимые пакеты, выполнив команду:  
```sh
npm install
```

---

### 2️⃣ Настройка конфигурации
Настройте файл `config.json`:
```json
{
  "token": "YOUR_DISCORD_BOT_TOKEN",
  "mongoURL": "YOUR_MONGODB_URL",
  "clientId": "YOUR_CLIENT_ID",
  "channelId": "YOUR_CHANNEL_ID",
  "guildId": "YOUR_GUILD_ID",
  "developers": [
    "YOUR_DISCORD_ID"
  ]
}
```
🔹 **`token`** – Токен бота из [Discord Developer Portal](https://discord.com/developers/applications)
🔹 **`mongoURL`** – Ссылка на базу данных MongoDB
🔹 **`clientId`** – ID бота
🔹 **`channelId`** – ID канала для логов бота (не используется)
🔹 **`guildId`** – ID сервера
🔹 **`developers`** – Массив ID разработчиков бота

---

### 3️⃣ Получение **MongoDB URI**
1. Зарегистрируйтесь на [MongoDB Atlas](https://www.mongodb.com/atlas/database)
2. Создайте новый **кластер**
3. Перейдите в **Database Deployments** → **Connect**
4. Выберите **Drivers** → **Node.js** и скопируйте `MongoDB URI`
5. Вставьте его в `mongoURL` в `config.json`

---

### 4️⃣ Запуск бота
Для запуска выполните команду:
```sh
node index.js
```

---

## 📚 Полезные ссылки
- 📑 **Документация Discord.js** – [Перейти](https://discord.js.org/)
- 📚 **Гайд по Discord.js** – [Перейти](https://discordjs.guide/)
- 📥 **Discord Developer Portal** – [Перейти](https://discord.com/developers/applications)
- 🗄️ **MongoDB Atlas** – [Перейти](https://www.mongodb.com/atlas/database)

---

## 👨‍💻 Контакты
📩 **Telegram:** [@s0bakennn](https://t.me/s0bakennn)
🌀 **Discord:** [va1les](https://discord.com/users/550336142160035840)