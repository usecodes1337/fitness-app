import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Check, Flame, Trophy, Snowflake,
  Dumbbell, Utensils, Plus, Shield
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
    const updated = {
      ...checklist,
      waterGlasses: nextGlasses,
      water: nextGlasses >= 8 ? true : checklist.water
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
      particleCount: 90,
      spread: 70,
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

  return (
    <div className="animate-fade-in" style={{ padding: '8px 18px 20px', width: '100%' }}>
      
      {/* Freeze Warning Banner */}
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

      {/* Quick Action Cards (3 Clean Glass Tiles) */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
          {/* Workout Card */}
          <div
            onClick={onOpenWorkout}
            className="glass-card"
            style={{
              padding: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer'
            }}
          >
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '12px',
              background: 'var(--primary-teal-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary-teal-dark)',
              flexShrink: 0
            }}>
              <Dumbbell size={18} />
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-main)' }}>Тренировка</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Открыть план</div>
            </div>
          </div>

          {/* Nutrition Card */}
          <div
            onClick={onOpenNutrition}
            className="glass-card"
            style={{
              padding: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer'
            }}
          >
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '12px',
              background: 'var(--accent-coral-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-coral)',
              flexShrink: 0
            }}>
              <Utensils size={18} />
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-main)' }}>Питание</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{profile?.kbju?.targetCalories || 1950} ккал</div>
            </div>
          </div>
        </div>

        {/* Matrix & Streak Card */}
        <div
          onClick={onOpenMatrix}
          className="glass-card"
          style={{
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '12px',
              background: 'var(--amber-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-amber)',
              flexShrink: 0
            }}>
              <Trophy size={18} />
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-main)' }}>
                Сетка 90 дней
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                День {dayNumber} из 90 • {formatDays(streakState.currentStreak || 1)} 🔥
              </div>
            </div>
          </div>
          <span className="badge badge-teal" style={{ fontSize: '11px' }}>
            Сетка
          </span>
        </div>
      </div>

      {/* Unified Daily Checklist Card Container */}
      <div style={{ marginBottom: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', padding: '0 4px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-main)' }}>
            Чек-лист дня ({completedCount} из 5)
          </h3>
          <span style={{ fontSize: '11px', fontWeight: 700, color: completedCount === 5 ? 'var(--primary-teal-dark)' : 'var(--text-muted)' }}>
            {completedCount === 5 ? '🎉 Все закрыто!' : `${completedCount}/5 выполнено`}
          </span>
        </div>

        {/* Single Frosted Glass Card Container */}
        <div className="glass-card" style={{ padding: '2px 18px', borderRadius: 'var(--radius-lg)' }}>
          {[
            { key: 'nutrition', title: '🥗 Питание', desc: `Норма ${profile?.kbju?.targetCalories || 1950} ккал и БЖУ` },
            { key: 'workout', title: '🏋️‍♂️ Тренировка', desc: 'Плановая сессия выполнена' },
            { key: 'steps', title: '👟 Шаги', desc: '10 000+ шагов за день' },
            {
              key: 'water',
              title: '💧 Вода',
              desc: `${checklist.waterGlasses || 5}/8 стаканов (2.0 л)`,
              extra: (
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
                    background: 'rgba(255, 255, 255, 0.8)'
                  }}
                >
                  <Plus size={11} /> 250мл
                </button>
              )
            },
            { key: 'discipline', title: '🚫 Дисциплина', desc: 'Без сахара / без алкоголя / сон 7-8ч' }
          ].map((item, idx) => {
            const isChecked = checklist[item.key];
            const isLast = idx === 4;

            return (
              <div
                key={item.key}
                onClick={() => toggleTask(item.key)}
                style={{
                  padding: '13px 0',
                  cursor: isSavedToday ? 'default' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  borderBottom: isLast ? 'none' : '1px solid rgba(61, 175, 161, 0.12)',
                  transition: 'all 0.15s ease'
                }}
              >
                {/* Round Checkbox with Mint-Teal Interactive Outline */}
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  border: isChecked ? '2px solid var(--primary-teal)' : '2px solid rgba(61, 175, 161, 0.5)',
                  background: isChecked ? 'linear-gradient(135deg, #44C7B5 0%, #31A598 100%)' : 'rgba(255, 255, 255, 0.85)',
                  boxShadow: isChecked ? '0 2px 8px var(--teal-glow)' : 'inset 0 1px 2px rgba(0, 0, 0, 0.03)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}>
                  {isChecked && <Check size={14} color="#FFFFFF" strokeWidth={3} />}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: 800,
                    color: '#1A2837',
                    textDecoration: isChecked ? 'line-through' : 'none'
                  }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '11px', color: '#4A5B6C', fontWeight: 500, marginTop: '2px' }}>
                    {item.desc}
                  </div>
                </div>

                {item.extra}
              </div>
            );
          })}
        </div>
      </div>

      {/* Save Day Button */}
      {isSavedToday ? (
        <div className="glass-card" style={{
          padding: '14px',
          textAlign: 'center',
          color: 'var(--primary-teal-dark)',
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          background: 'rgba(255, 255, 255, 0.85)',
          borderColor: 'rgba(61, 175, 161, 0.4)'
        }}>
          <Check size={18} />
          <span>День {dayNumber} успешно сохранён! 🔥</span>
        </div>
      ) : (
        <button
          onClick={handleSaveDay}
          disabled={completedCount === 0}
          className="btn-coral"
          style={{ padding: '14px', fontSize: '15px', opacity: completedCount === 0 ? 0.6 : 1 }}
        >
          <Flame size={18} />
          <span>Сохранить День {dayNumber}</span>
        </button>
      )}
    </div>
  );
}
