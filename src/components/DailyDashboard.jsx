import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Check, Flame, Dumbbell, Utensils, Footprints, Droplets,
  Moon, Plus, ArrowRight, Snowflake, Sparkles, CheckCircle2
} from 'lucide-react';
import { StorageManager, formatDays } from '../utils/storage';

export default function DailyDashboard({
  profile,
  streakState,
  setStreakState,
  onOpenMatrix,
  onOpenWorkout,
  onOpenNutrition,
  onOpenStrikeSave
}) {
  const dayNumber = streakState.dayNumber || 1;
  const logs = StorageManager.getDailyLogs();
  const currentDayLog = logs[dayNumber] || {
    nutrition: false,
    workout: false,
    steps: false,
    water: false,
    discipline: false,
    waterGlasses: 5,
    stepCount: 8752
  };

  const [checklist, setChecklist] = useState(currentDayLog);
  const [isSavedToday, setIsSavedToday] = useState(Boolean(currentDayLog.saved));

  useEffect(() => {
    const freshLogs = StorageManager.getDailyLogs();
    const freshDayLog = freshLogs[dayNumber] || {
      nutrition: false,
      workout: false,
      steps: false,
      water: false,
      discipline: false,
      waterGlasses: 5,
      stepCount: 8752
    };
    setChecklist(freshDayLog);
    setIsSavedToday(Boolean(freshDayLog.saved));
  }, [dayNumber]);

  const toggleTask = (key) => {
    if (isSavedToday) return;
    const updated = { ...checklist, [key]: !checklist[key] };
    setChecklist(updated);
  };

  const addWaterGlass = (e) => {
    e.stopPropagation();
    if (isSavedToday) return;
    const nextGlasses = Math.min(8, (checklist.waterGlasses || 0) + 1);
    const isCompleted = nextGlasses >= 8;
    const updated = {
      ...checklist,
      waterGlasses: nextGlasses,
      water: isCompleted ? true : checklist.water
    };
    setChecklist(updated);
  };

  const addSteps = (e) => {
    e.stopPropagation();
    if (isSavedToday) return;
    const nextSteps = (checklist.stepCount || 0) + 1250;
    const isCompleted = nextSteps >= 10000;
    const updated = {
      ...checklist,
      stepCount: nextSteps,
      steps: isCompleted ? true : checklist.steps
    };
    setChecklist(updated);
  };

  const completedCount = ['nutrition', 'workout', 'steps', 'water', 'discipline']
    .filter(k => checklist[k]).length;

  const handleSaveDay = () => {
    const updatedLog = { ...checklist, saved: true };
    StorageManager.saveDailyLog(dayNumber, updatedLog);
    setIsSavedToday(true);

    confetti({
      particleCount: 110,
      spread: 75,
      origin: { y: 0.6 }
    });

    const newStreakCount = (streakState.currentStreak || 0) + 1;
    const newStreakState = {
      ...streakState,
      currentStreak: newStreakCount,
      isFrozen: false
    };
    StorageManager.saveStreakState(newStreakState);
    setStreakState(newStreakState);
  };

  const kbju = profile?.kbju || {
    targetCalories: 1950,
    protein: 145,
    fats: 65,
    carbs: 195
  };

  return (
    <div className="animate-fade-in" style={{ padding: '6px 18px 24px', width: '100%' }}>
      
      {/* Freeze Warning Banner (if frozen) */}
      {streakState.isFrozen && (
        <div
          onClick={onOpenStrikeSave}
          className="glass-card"
          style={{
            padding: '12px 14px',
            background: 'var(--primary-teal-light)',
            borderColor: 'rgba(61, 175, 161, 0.4)',
            marginBottom: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer'
          }}
        >
          <Snowflake size={20} color="var(--primary-teal)" />
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--primary-teal-dark)' }}>
              Стрик заморожен 🧊
            </h4>
            <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
              Выполни штраф (+2 000 шагов), чтобы спасти стрик!
            </p>
          </div>
          <button className="btn-liquid" style={{ padding: '4px 10px', fontSize: '11px' }}>
            Спасти
          </button>
        </div>
      )}

      {/* CENTRAL CARD: «Задания на сегодня» */}
      <div style={{ marginBottom: '18px' }}>
        {/* Header of Tasks */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '10px',
          padding: '0 4px'
        }}>
          <div>
            <h2 style={{ fontSize: '17px', fontWeight: 900, color: 'var(--text-main)', letterSpacing: '-0.01em' }}>
              Задания на сегодня
            </h2>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>
              5 ключевых привычек для идеального рельефа
            </p>
          </div>

          <span className="badge badge-teal" style={{ fontSize: '11px', padding: '4px 10px' }}>
            {completedCount === 5 ? '🎉 5/5 выполнено' : `${completedCount} из 5 закрыто`}
          </span>
        </div>

        {/* Monolithic Glass Container for the 5 Tasks */}
        <div className="glass-card" style={{ padding: '4px 18px', borderRadius: 'var(--radius-lg)' }}>
          
          {/* TASK 1: 🏋️‍♂️ Тренировка дня */}
          <div
            onClick={() => toggleTask('workout')}
            style={{
              padding: '14px 0',
              cursor: isSavedToday ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              borderBottom: '1px solid rgba(61, 175, 161, 0.12)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
              {/* Checkbox */}
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                border: checklist.workout ? '2px solid var(--primary-teal)' : '2px solid rgba(61, 175, 161, 0.5)',
                background: checklist.workout ? 'linear-gradient(135deg, #44C7B5 0%, #31A598 100%)' : 'rgba(255, 255, 255, 0.85)',
                boxShadow: checklist.workout ? '0 2px 8px var(--teal-glow)' : 'inset 0 1px 2px rgba(0, 0, 0, 0.03)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}>
                {checklist.workout && <Check size={14} color="#FFFFFF" strokeWidth={3} />}
              </div>

              <div>
                <div style={{
                  fontSize: '13px',
                  fontWeight: 800,
                  color: '#1A2837',
                  textDecoration: checklist.workout ? 'line-through' : 'none'
                }}>
                  🏋️‍♂️ Тренировка дня
                </div>
                <div style={{ fontSize: '11px', color: '#4A5B6C', fontWeight: 500, marginTop: '1px' }}>
                  Силовая сессия • 20–25 мин
                </div>
              </div>
            </div>

            {/* Quick Action Button: Начать */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenWorkout();
              }}
              className="btn-liquid"
              style={{
                padding: '5px 12px',
                fontSize: '11px',
                fontWeight: 800,
                color: 'var(--primary-teal-dark)',
                borderColor: 'rgba(61, 175, 161, 0.35)',
                background: 'rgba(255, 255, 255, 0.9)',
                flexShrink: 0
              }}
            >
              <span>{checklist.workout ? 'Просмотр' : 'Начать'}</span>
              <ArrowRight size={12} strokeWidth={2.5} />
            </button>
          </div>

          {/* TASK 2: 🥗 Питание */}
          <div
            onClick={() => toggleTask('nutrition')}
            style={{
              padding: '14px 0',
              cursor: isSavedToday ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              borderBottom: '1px solid rgba(61, 175, 161, 0.12)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
              {/* Checkbox */}
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                border: checklist.nutrition ? '2px solid var(--primary-teal)' : '2px solid rgba(61, 175, 161, 0.5)',
                background: checklist.nutrition ? 'linear-gradient(135deg, #44C7B5 0%, #31A598 100%)' : 'rgba(255, 255, 255, 0.85)',
                boxShadow: checklist.nutrition ? '0 2px 8px var(--teal-glow)' : 'inset 0 1px 2px rgba(0, 0, 0, 0.03)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}>
                {checklist.nutrition && <Check size={14} color="#FFFFFF" strokeWidth={3} />}
              </div>

              <div>
                <div style={{
                  fontSize: '13px',
                  fontWeight: 800,
                  color: '#1A2837',
                  textDecoration: checklist.nutrition ? 'line-through' : 'none'
                }}>
                  🥗 Питание & КБЖУ
                </div>
                <div style={{ fontSize: '11px', color: '#4A5B6C', fontWeight: 500, marginTop: '1px' }}>
                  {kbju.targetCalories} ккал • Б:{kbju.protein}г Ж:{kbju.fats}г У:{kbju.carbs}г
                </div>
              </div>
            </div>

            {/* Quick Action Button: Меню */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenNutrition();
              }}
              className="btn-liquid"
              style={{
                padding: '5px 12px',
                fontSize: '11px',
                fontWeight: 800,
                color: 'var(--accent-coral-dark)',
                borderColor: 'rgba(255, 112, 90, 0.35)',
                background: 'rgba(255, 255, 255, 0.9)',
                flexShrink: 0
              }}
            >
              <span>Меню</span>
              <ArrowRight size={12} strokeWidth={2.5} />
            </button>
          </div>

          {/* TASK 3: 👟 Шаги */}
          <div
            onClick={() => toggleTask('steps')}
            style={{
              padding: '14px 0',
              cursor: isSavedToday ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              borderBottom: '1px solid rgba(61, 175, 161, 0.12)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
              {/* Checkbox */}
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                border: checklist.steps ? '2px solid var(--primary-teal)' : '2px solid rgba(61, 175, 161, 0.5)',
                background: checklist.steps ? 'linear-gradient(135deg, #44C7B5 0%, #31A598 100%)' : 'rgba(255, 255, 255, 0.85)',
                boxShadow: checklist.steps ? '0 2px 8px var(--teal-glow)' : 'inset 0 1px 2px rgba(0, 0, 0, 0.03)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}>
                {checklist.steps && <Check size={14} color="#FFFFFF" strokeWidth={3} />}
              </div>

              <div>
                <div style={{
                  fontSize: '13px',
                  fontWeight: 800,
                  color: '#1A2837',
                  textDecoration: checklist.steps ? 'line-through' : 'none'
                }}>
                  👟 Шаги (10 000)
                </div>
                <div style={{ fontSize: '11px', color: '#4A5B6C', fontWeight: 500, marginTop: '1px' }}>
                  {checklist.stepCount.toLocaleString('ru-RU')} из 10 000 шагов
                </div>
              </div>
            </div>

            {/* Quick Step Adder */}
            <button
              onClick={addSteps}
              disabled={isSavedToday}
              className="btn-liquid"
              style={{
                padding: '4px 10px',
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--primary-teal-dark)',
                borderColor: 'rgba(61, 175, 161, 0.3)',
                background: 'rgba(255, 255, 255, 0.9)',
                flexShrink: 0
              }}
            >
              <Plus size={11} /> 1 250
            </button>
          </div>

          {/* TASK 4: 💧 Вода */}
          <div
            onClick={() => toggleTask('water')}
            style={{
              padding: '14px 0',
              cursor: isSavedToday ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              borderBottom: '1px solid rgba(61, 175, 161, 0.12)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
              {/* Checkbox */}
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                border: checklist.water ? '2px solid var(--primary-teal)' : '2px solid rgba(61, 175, 161, 0.5)',
                background: checklist.water ? 'linear-gradient(135deg, #44C7B5 0%, #31A598 100%)' : 'rgba(255, 255, 255, 0.85)',
                boxShadow: checklist.water ? '0 2px 8px var(--teal-glow)' : 'inset 0 1px 2px rgba(0, 0, 0, 0.03)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}>
                {checklist.water && <Check size={14} color="#FFFFFF" strokeWidth={3} />}
              </div>

              <div>
                <div style={{
                  fontSize: '13px',
                  fontWeight: 800,
                  color: '#1A2837',
                  textDecoration: checklist.water ? 'line-through' : 'none'
                }}>
                  💧 Водный баланс
                </div>
                <div style={{ fontSize: '11px', color: '#4A5B6C', fontWeight: 500, marginTop: '1px' }}>
                  {checklist.waterGlasses || 5}/8 стаканов ({((checklist.waterGlasses || 5) * 0.25).toFixed(1)} л)
                </div>
              </div>
            </div>

            {/* Quick Water Button */}
            <button
              onClick={addWaterGlass}
              disabled={isSavedToday}
              className="btn-liquid"
              style={{
                padding: '4px 10px',
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--primary-teal-dark)',
                borderColor: 'rgba(61, 175, 161, 0.3)',
                background: 'rgba(255, 255, 255, 0.9)',
                flexShrink: 0
              }}
            >
              <Plus size={11} /> 250мл
            </button>
          </div>

          {/* TASK 5: 🚫 Дисциплина */}
          <div
            onClick={() => toggleTask('discipline')}
            style={{
              padding: '14px 0',
              cursor: isSavedToday ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            {/* Checkbox */}
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              border: checklist.discipline ? '2px solid var(--primary-teal)' : '2px solid rgba(61, 175, 161, 0.5)',
              background: checklist.discipline ? 'linear-gradient(135deg, #44C7B5 0%, #31A598 100%)' : 'rgba(255, 255, 255, 0.85)',
              boxShadow: checklist.discipline ? '0 2px 8px var(--teal-glow)' : 'inset 0 1px 2px rgba(0, 0, 0, 0.03)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}>
              {checklist.discipline && <Check size={14} color="#FFFFFF" strokeWidth={3} />}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: '13px',
                fontWeight: 800,
                color: '#1A2837',
                textDecoration: checklist.discipline ? 'line-through' : 'none'
              }}>
                🚫 Дисциплина и режим
              </div>
              <div style={{ fontSize: '11px', color: '#4A5B6C', fontWeight: 500, marginTop: '1px' }}>
                Сон 7–8 часов • Без сахара и алкоголя
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM FIXATION BUTTON: «Сохранить День X» */}
      {isSavedToday ? (
        <div className="glass-card" style={{
          padding: '16px',
          textAlign: 'center',
          color: 'var(--primary-teal-dark)',
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          background: 'rgba(255, 255, 255, 0.85)',
          borderColor: 'rgba(61, 175, 161, 0.45)',
          boxShadow: '0 8px 24px rgba(61, 175, 161, 0.12)'
        }}>
          <CheckCircle2 size={20} color="var(--primary-teal)" />
          <span style={{ fontSize: '15px' }}>День {dayNumber} успешно зафиксирован! 🔥</span>
        </div>
      ) : (
        <button
          onClick={handleSaveDay}
          disabled={completedCount === 0}
          className="btn-coral"
          style={{
            padding: '16px',
            fontSize: '16px',
            fontWeight: 900,
            opacity: completedCount === 0 ? 0.6 : 1,
            borderRadius: 'var(--radius-full)'
          }}
        >
          <Flame size={20} />
          <span>Сохранить День {dayNumber} 🔥</span>
        </button>
      )}
    </div>
  );
}
