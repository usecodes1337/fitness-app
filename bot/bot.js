import { Telegraf, Markup } from 'telegraf';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN || 'YOUR_BOT_TOKEN_HERE';
const WEB_APP_URL = process.env.WEB_APP_URL || 'https://my-fitness-app.vercel.app';
const CHANNEL_URL = process.env.TELEGRAM_CHANNEL_URL || 'https://t.me/telegram';
const ADMIN_ID = process.env.ADMIN_TELEGRAM_ID ? Number(process.env.ADMIN_TELEGRAM_ID) : null;

const bot = new Telegraf(BOT_TOKEN);
const SUBSCRIBERS_FILE = path.resolve('./subscribers.json');

// Helper to load subscribers database
function getSubscribers() {
  try {
    if (fs.existsSync(SUBSCRIBERS_FILE)) {
      const data = fs.readFileSync(SUBSCRIBERS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading subscribers file:', err);
  }
  return [];
}

// Helper to save subscriber
function addSubscriber(user) {
  const subscribers = getSubscribers();
  const exists = subscribers.find((s) => s.id === user.id);
  if (!exists) {
    subscribers.push({
      id: user.id,
      username: user.username || null,
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      joined_at: new Date().toISOString()
    });
    fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2));
    console.log(`[New User] ${user.first_name} (@${user.username || 'no_user'}) registered! Total: ${subscribers.length}`);
  }
}

// /start command handler
bot.start(async (ctx) => {
  const user = ctx.from;
  addSubscriber(user);

  const welcomeMessage = `
👋 <b>Привет, ${user.first_name || 'Чемпион'}!</b>

Добро пожаловать в <b>«90 дней до идеального рельефа»</b> — твой персональный фитнес-трекер и программу трансформации тела! 🔥

✨ <b>Что тебя ждет:</b>
• Персональный расчет калоража (дефицит без вреда для здоровья)
• Программа тренировок для дома или зала
• Железный трекер привычек, шагов и водного баланса
• Система стриков и защита от срывов 🧊
• Еженедельные замеры и фото-прогресс

📲 <b>Как установить приложение на экран телефона:</b>
Нажми кнопку ниже <b>«📱 Инструкция по установке»</b> или сразу открывай приложение!
`;

  const keyboard = Markup.inlineKeyboard([
    [Markup.button.url('🚀 Открыть приложение', WEB_APP_URL)],
    [Markup.button.callback('📱 Инструкция по установке на телефон', 'install_guide')],
    [Markup.button.url('📢 Наш Telegram-канал', CHANNEL_URL)]
  ]);

  await ctx.replyWithHTML(welcomeMessage, keyboard);
});

// Install Guide Handler
bot.action('install_guide', async (ctx) => {
  await ctx.answerCbQuery();

  const guideText = `
📲 <b>Как добавить приложение на экран смартфона (PWA):</b>

🍏 <b>Для iPhone (Safari):</b>
1. Открой ссылку на приложение в браузере <b>Safari</b>.
2. Внизу экрана нажми кнопку <b>«Поделиться»</b> (квадрат со стрелкой вверх ⬆️).
3. Пролистай вниз и выбери <b>«На экран „Домой“»</b> ➕.
4. Нажми <b>«Добавить»</b> в правом верхнем углу.
<i>Готово! Иконка приложения появится на твоем рабочем столе.</i>

🤖 <b>Для Android (Google Chrome):</b>
1. Открой ссылку на приложение в браузере <b>Chrome</b>.
2. Нажми на <b>три точки (⋮)</b> в правом верхнем углу.
3. Выбери пункт <b>«Установить приложение»</b> или <b>«Добавить на главный экран»</b> ➕.
4. Подтверди установку.
<i>Готово! Приложение установится как нативное.</i>
`;

  const keyboard = Markup.inlineKeyboard([
    [Markup.button.url('🚀 Перейти в приложение и начать', WEB_APP_URL)],
    [Markup.button.url('📢 Перейти в Telegram-канал', CHANNEL_URL)]
  ]);

  await ctx.replyWithHTML(guideText, keyboard);
});

// /help command
bot.help((ctx) => {
  ctx.replyWithHTML(`
📌 <b>Полезные команды:</b>
/start — Главное меню и ссылка на приложение
/install — Инструкция по установке на iPhone и Android
/channel — Наш официальный Telegram-канал
`);
});

bot.command('install', async (ctx) => {
  ctx.replyWithHTML(`
📲 <b>Как добавить приложение на экран:</b>

🍏 <b>iPhone (Safari):</b> Поделиться ⬆️ ➔ «На экран Домой» ➕
🤖 <b>Android (Chrome):</b> Меню (⋮) ➔ «Установить приложение» ➕
`, Markup.inlineKeyboard([
    [Markup.button.url('🚀 Открыть приложение', WEB_APP_URL)]
  ]));
});

bot.command('channel', async (ctx) => {
  ctx.replyWithHTML(`
📢 Подписывайся на наш официальный Telegram-канал с полезными советами по питанию, тренировкам и мотивацией:
`, Markup.inlineKeyboard([
    [Markup.button.url('Подписаться на канал', CHANNEL_URL)]
  ]));
});

// Admin Command: /stats
bot.command('stats', (ctx) => {
  if (ADMIN_ID && ctx.from.id !== ADMIN_ID) {
    return ctx.reply('⛔ У вас нет доступа к этой команде.');
  }
  const subscribers = getSubscribers();
  ctx.replyWithHTML(`📊 <b>Статистика бота:</b>\nВсего пользователей, запустивших бота: <b>${subscribers.length}</b>`);
});

// Admin Command: /broadcast <текст сообщения>
bot.command('broadcast', async (ctx) => {
  if (ADMIN_ID && ctx.from.id !== ADMIN_ID) {
    return ctx.reply('⛔ У вас нет доступа к этой команде.');
  }

  const text = ctx.message.text.replace('/broadcast', '').trim();
  if (!text) {
    return ctx.reply('⚠️ Использование: /broadcast Ваш текст рассылки для всех пользователей.');
  }

  const subscribers = getSubscribers();
  let successCount = 0;
  let failCount = 0;

  ctx.reply(`⏳ Начинаю рассылку для ${subscribers.length} пользователей...`);

  for (const sub of subscribers) {
    try {
      await bot.telegram.sendMessage(sub.id, text, {
        parse_mode: 'HTML',
        ...Markup.inlineKeyboard([
          [Markup.button.url('🚀 Открыть приложение', WEB_APP_URL)],
          [Markup.button.url('📢 Наш Telegram-канал', CHANNEL_URL)]
        ])
      });
      successCount++;
      // Anti-flood sleep (35ms per message)
      await new Promise((r) => setTimeout(r, 40));
    } catch (err) {
      failCount++;
    }
  }

  ctx.replyWithHTML(`✅ <b>Рассылка завершена!</b>\nУспешно доставлено: <b>${successCount}</b>\nНе удалось доставить (бот заблокирован): <b>${failCount}</b>`);
});

// Start bot
if (process.env.BOT_TOKEN && process.env.BOT_TOKEN !== 'YOUR_BOT_TOKEN_HERE') {
  bot.launch()
    .then(() => console.log('🤖 Telegram Bot успешно запущен и ожидает пользователей!'))
    .catch((err) => console.error('Ошибка запуска бота:', err.message));
} else {
  console.log('ℹ️ Telegram Bot готов к работе. Укажи BOT_TOKEN в bot/.env файле для запуска.');
}

// Graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
