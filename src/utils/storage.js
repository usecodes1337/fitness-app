// Storage and Domain Logic Helper for 90 Days Body Challenge PWA

const STORAGE_KEYS = {
  USER_PROFILE: 'fitness_90d_user_profile',
  DAILY_LOGS: 'fitness_90d_daily_logs',
  WEEKLY_LOGS: 'fitness_90d_weekly_logs',
  STREAK_STATE: 'fitness_90d_streak_state',
  CURRENT_DAY: 'fitness_90d_current_day',
};

// Initial Mock Exercises Library
export const EXERCISE_DATABASE = [
  {
    id: 'ex_1',
    name: 'Жим гантелей лежа на лавке',
    category: 'Грудь',
    location: 'Gym',
    requiresAxial: false,
    requiresImpact: false,
    sets: '4 подхода x 10-12 повторений',
    gifUrl: 'https://media.giphy.com/media/l0HlS98bO6cI6w4iA/giphy.gif',
    description: 'Лопатки сведены, плавно опускаем гантели на 3 секунды, мощный выдох при подъеме вверх.',
    alternatives: ['Отжимания от пола широким хватом', 'Отжимания от возвышения']
  },
  {
    id: 'ex_2',
    name: 'Отжимания от пола / с колен',
    category: 'Грудь',
    location: 'Home',
    requiresAxial: false,
    requiresImpact: false,
    sets: '4 подхода x 12-15 повторений',
    gifUrl: 'https://media.giphy.com/media/xT39D7O9Xj1JqKq5Hy/giphy.gif',
    description: 'Корпус прямая линия, локти под углом 45 градусов к телу. Не прогибайте поясницу.',
    alternatives: ['Жим резинки стоя', 'Отжимания от дивана']
  },
  {
    id: 'ex_3',
    name: 'Тяга верхнего блока к груди',
    category: 'Спина',
    location: 'Gym',
    requiresAxial: false,
    requiresImpact: false,
    sets: '4 подхода x 12 повторений',
    gifUrl: 'https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.gif',
    description: 'Тяните рукоять усилием широчайших мышц спины к верху груди. Не отклоняйтесь назад сильно.',
    alternatives: ['Тяга горизонтального блока', 'Австралийские подтягивания']
  },
  {
    id: 'ex_4',
    name: 'Тяга фитнес-резинки к поясу',
    category: 'Спина',
    location: 'Home',
    requiresAxial: false,
    requiresImpact: false,
    sets: '4 подхода x 15 повторений',
    gifUrl: 'https://media.giphy.com/media/26n6WywJyh39n1pBu/giphy.gif',
    description: 'Закрепите резинку за стопы, спина прямая. Сводите лопатки и тяните локти назад.',
    alternatives: ['Лодочка (гиперэкстензия на полу)', 'Тяга гантели одной рукой в наклоне']
  },
  {
    id: 'ex_5',
    name: 'Приседания без отягощения / кубковые',
    category: 'Ноги',
    location: 'Home',
    requiresAxial: true, // Исключаем при проблемах со спиной
    requiresImpact: false,
    sets: '4 подхода x 15 повторений',
    gifUrl: 'https://media.giphy.com/media/3o6Zt9BZpLTLhB2l68/giphy.gif',
    description: 'Таз уходит назад, колени сонаправлены с носками. Пятки от пола не оторвать.',
    alternatives: ['Ягодичный мостик на полу', 'Выпады на месте']
  },
  {
    id: 'ex_6',
    name: 'Ягодичный мостик с весом / без',
    category: 'Ноги / Ягодицы',
    location: 'Home',
    requiresAxial: false, // БЕЗОПАСНО ДЛЯ СПИНЫ
    requiresImpact: false, // БЕЗОПАСНО ДЛЯ КОЛЕНЕЙ
    sets: '4 подхода x 20 повторений',
    gifUrl: 'https://media.giphy.com/media/3o7TKSrF1pvhRk1Xm0/giphy.gif',
    description: 'Упор на пятки. Задержитесь в верхней точке на 1-2 секунды, максимально сжимая ягодицы.',
    alternatives: ['Махи ногой назад на четвереньках', 'Отведение ноги в сторону']
  },
  {
    id: 'ex_7',
    name: 'Махи гантелями через стороны (Дельты)',
    category: 'Плечи',
    location: 'Gym',
    requiresAxial: false,
    requiresImpact: false,
    sets: '4 подхода x 15 повторений',
    gifUrl: 'https://media.giphy.com/media/l0HlCqV35v5rZ1v0s/giphy.gif',
    description: 'Локти слегка согнуты, движение идет от локтя вверх до параллели с полом.',
    alternatives: ['Махи резинкой через стороны', 'Жим гантелей сидя']
  },
  {
    id: 'ex_8',
    name: 'Планка на предплечьях',
    category: 'Пресс / Кор',
    location: 'Home',
    requiresAxial: false,
    requiresImpact: false,
    sets: '3 подхода x 45-60 секунд',
    gifUrl: 'https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif',
    description: 'Пресс и ягодицы напряжены, поясница не провисает. Дыхание ровное.',
    alternatives: ['Мертвый жук (Deadbug)', 'Боковая планка']
  }
];

// Calculation Functions
export function calculateKBJU(profile) {
  const { gender, age, height, weight, activity } = profile;
  
  let weightNum = parseFloat(weight) || 70;
  let heightNum = parseFloat(height) || 175;
  let ageNum = parseFloat(age) || 28;

  // Mifflin-St Jeor Formula
  let bmr = (10 * weightNum) + (6.25 * heightNum) - (5 * ageNum);
  if (gender === 'female') {
    bmr -= 161;
  } else {
    bmr += 5;
  }

  let activityMult = 1.2;
  if (activity === 'moderate') activityMult = 1.45;
  if (activity === 'high') activityMult = 1.7;

  const tdee = bmr * activityMult;
  
  // 20% Calorie Deficit for Cutting
  const targetCalories = Math.round(tdee * 0.8);
  
  // Protein: 2.0g per kg
  const proteinGrams = Math.round(weightNum * 2.0);
  const proteinKcal = proteinGrams * 4;

  // Fat: 0.9g per kg
  const fatGrams = Math.round(weightNum * 0.9);
  const fatKcal = fatGrams * 9;

  // Carbs: Remaining calories
  const carbKcal = Math.max(0, targetCalories - (proteinKcal + fatKcal));
  const carbGrams = Math.round(carbKcal / 4);

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    targetCalories,
    proteinGrams,
    fatGrams,
    carbGrams
  };
}

// Storage Manager
export const StorageManager = {
  getUserProfile() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  saveUserProfile(profile) {
    const kbju = calculateKBJU(profile);
    const updatedProfile = { ...profile, kbju, createdAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(updatedProfile));
    return updatedProfile;
  },

  getDailyLogs() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DAILY_LOGS);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  },

  saveDailyLog(dayNumber, logData) {
    const logs = this.getDailyLogs();
    logs[dayNumber] = {
      ...logData,
      timestamp: new Date().toISOString(),
      completedAt: new Date().toLocaleDateString('ru-RU')
    };
    localStorage.setItem(STORAGE_KEYS.DAILY_LOGS, JSON.stringify(logs));
    this.updateStreak();
    return logs;
  },

  getStreakState() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.STREAK_STATE);
      return data ? JSON.parse(data) : { currentStreak: 1, isFrozen: false, savesRemaining: 4, dayNumber: 1 };
    } catch {
      return { currentStreak: 1, isFrozen: false, savesRemaining: 4, dayNumber: 1 };
    }
  },

  saveStreakState(state) {
    localStorage.setItem(STORAGE_KEYS.STREAK_STATE, JSON.stringify(state));
  },

  updateStreak() {
    const logs = this.getDailyLogs();
    const completedDaysCount = Object.keys(logs).length;
    const streak = this.getStreakState();
    streak.currentStreak = completedDaysCount > 0 ? completedDaysCount : 1;
    this.saveStreakState(streak);
  },

  getWeeklyLogs() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.WEEKLY_LOGS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveWeeklyLog(entry) {
    const logs = this.getWeeklyLogs();
    logs.push({
      ...entry,
      id: Date.now(),
      date: new Date().toLocaleDateString('ru-RU')
    });
    localStorage.setItem(STORAGE_KEYS.WEEKLY_LOGS, JSON.stringify(logs));
    return logs;
  },

  // Reset demo data
  resetAll() {
    localStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
    localStorage.removeItem(STORAGE_KEYS.DAILY_LOGS);
    localStorage.removeItem(STORAGE_KEYS.WEEKLY_LOGS);
    localStorage.removeItem(STORAGE_KEYS.STREAK_STATE);
  }
};

// Russian Days Pluralization Helper
export function formatDays(count) {
  const n = Math.abs(count || 0) % 100;
  const n1 = n % 10;
  if (n > 10 && n < 20) return `${count} дней`;
  if (n1 > 1 && n1 < 5) return `${count} дня`;
  if (n1 === 1) return `${count} день`;
  return `${count} дней`;
}

