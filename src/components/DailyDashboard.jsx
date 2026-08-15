import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Check, Flame, Calendar, Trophy, Zap, Snowflake,
  Dumbbell, Utensils, Camera, Activity, Plus, ChevronRight, Shield
} from 'lucide-react';
import { StorageManager, formatDays } from '../utils/storage';

export default function DailyDashboard({
  profile,
  streakState,
  setStreakState,
  onOpenMatrix,
  onOpenWeekly,
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
  
  const completionPercentage = Math.round((completedCount / 5) * 100);

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

  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (completionPercentage / 100) * circumference;

  return (
    <div className="animate-fade-in" style={{ padding: '8px 18px 20px', width: '100%' }}>
      
      {/* CARD 1: Today's Progress in Exact 3D Frosted Glass (From Reference Screenshot) */}
      <div className="glass-card" style={{ padding: '20px', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.01em' }}>
            Прогресс сегодня
          </h2>
          <span className="badge badge-teal" style={{ fontSize: '11px', padding: '3px 10px' }}>
            День {dayNumber} из 90
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '22px' }}>
          {/* 3D Gauge (Exact Match to Reference Screenshot) */}
          <div style={{
            position: 'relative',
            width: '96px',
            height: '96px',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(240, 246, 245, 0.6) 100%)',
            boxShadow: 'inset 0 2px 6px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(255, 255, 255, 0.8)'
          }}>
            <svg width="96" height="96" viewBox="0 0 96 96" style={{ transform: 'rotate(-90deg)', position: 'absolute' }}>
              <defs>
                <linearGradient id="teal3DGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4BD0BE" />
                  <stop offset="100%" stopColor="#31A395" />
                </linearGradient>
              </defs>
              {/* Background Track */}
              <circle
                cx="48"
                cy="48"
                r={radius}
                fill="transparent"
                stroke="#E2EBE9"
                strokeWidth="8"
              />
              {/* Active Gauge Arc with 3D shadow */}
              <circle
                cx="48"
                cy="48"
                r={radius}
                fill="transparent"
                stroke="url(#teal3DGrad)"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                style={{
                  transition: 'stroke-dashoffset 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  filter: 'drop-shadow(0 3px 6px rgba(49, 163, 149, 0.45))'
                }}
              />
            </svg>
            <div style={{ textAlign: 'center', zIndex: 2 }}>
              <span style={{ fontSize: '22px', fontWeight: 900, color: 'var(--text-main)', display: 'block', lineHeight: 1, letterSpacing: '-0.02em' }}>
                {completionPercentage}%
              </span>
            </div>
          </div>

          {/* Breakdown List (Matching Reference Screenshot layout in Russian) */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)', fontWeight: 500 }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3FB5A6', boxShadow: '0 0 6px rgba(63, 181, 166, 0.4)' }} />
                Тренировка
              </span>
              <span style={{ fontWeight: 800, color: 'var(--text-main)' }}>
                {checklist.workout ? '45 мин' : '0 мин'}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)', fontWeight: 500 }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F27A67', boxShadow: '0 0 6px rgba(242, 122, 103, 0.4)' }} />
                Калории
              </span>
              <span style={{ fontWeight: 800, color: 'var(--text-main)' }}>
                {checklist.nutrition ? '1 950 ккал' : '520 ккал'}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)', fontWeight: 500 }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3FB5A6', boxShadow: '0 0 6px rgba(63, 181, 166, 0.4)' }} />
                Шаги
              </span>
              <span style={{ fontWeight: 800, color: 'var(--text-main)' }}>
                {checklist.stepCount.toLocaleString('ru-RU')}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontWeight: 500 }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#B8C5CE' }} />
                Активность
              </span>
              <span style={{ fontWeight: 800, color: 'var(--text-main)' }}>
                1ч 15м
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CARD 2: Weekly Activity in Frosted Glass */}
      <div className="glass-card" style={{ padding: '16px 20px', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-main)' }}>Активность недели</h3>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Стрик: <b style={{ color: 'var(--accent-coral)' }}>{formatDays(streakState.currentStreak || 1)} 🔥</b>
          </span>
        </div>

        {/* 7 Days Bars with Glass Depth */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '56px', padding: '0 6px' }}>
          {[
            { day: 'Пн', h: '38px', active: false },
            { day: 'Вт', h: '30px', active: false },
            { day: 'Ср', h: '50px', active: true },
            { day: 'Чт', h: '34px', active: false },
            { day: 'Пт', h: '42px', active: false },
            { day: 'Сб', h: '26px', active: false },
            { day: 'Вс', h: '36px', active: false }
          ].map((bar, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <div style={{
                width: '12px',
                height: bar.h,
                borderRadius: 'var(--radius-full)',
                background: bar.active ? 'linear-gradient(180deg, #44C7B5 0%, #31A598 100%)' : '#D0E3DF',
                boxShadow: bar.active ? '0 3px 8px var(--teal-glow)' : 'none'
              }} />
              <span style={{
                fontSize: '10px',
                fontWeight: bar.active ? 800 : 600,
                color: bar.active ? 'var(--primary-teal-dark)' : 'var(--text-dim)'
              }}>
                {bar.day}
              </span>
            </div>
          ))}
        </div>
      </div>

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

      {/* CARD 3: Quick Actions 2x2 Glass Grid */}
      <div style={{ marginBottom: '14px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <div
            onClick={onOpenWorkout}
            className="glass-card"
            style={{
              padding: '10px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer'
            }}
          >
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '10px',
              background: 'var(--primary-teal-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary-teal-dark)'
            }}>
              <Dumbbell size={16} />
            </div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-main)' }}>Тренировка</div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Открыть план</div>
            </div>
          </div>

          <div
            onClick={onOpenNutrition}
            className="glass-card"
            style={{
              padding: '10px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer'
            }}
          >
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '10px',
              background: 'var(--accent-coral-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-coral)'
            }}>
              <Utensils size={16} />
            </div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-main)' }}>Питание</div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Меню & КБЖУ</div>
            </div>
          </div>

          <div
            onClick={onOpenWeekly}
            className="glass-card"
            style={{
              padding: '10px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer'
            }}
          >
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '10px',
              background: 'var(--purple-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-purple)'
            }}>
              <Camera size={16} />
            </div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-main)' }}>Замеры тела</div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Фото и вес</div>
            </div>
          </div>

          <div
            onClick={onOpenMatrix}
            className="glass-card"
            style={{
              padding: '10px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer'
            }}
          >
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '10px',
              background: 'var(--amber-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-amber)'
            }}>
              <Trophy size={16} />
            </div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-main)' }}>Сетка 90 дней</div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Стрики</div>
            </div>
          </div>
        </div>
      </div>

      {/* CARD 4: 5 Daily Checkmarks Grouped in a Single Glass Container Card */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', padding: '0 4px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-main)' }}>
            Чек-лист дня ({completedCount} из 5)
          </h3>
          <span style={{ fontSize: '11px', fontWeight: 700, color: completedCount === 5 ? 'var(--primary-teal-dark)' : 'var(--text-muted)' }}>
            {completedCount === 5 ? '🎉 Все закрыто!' : `${completedCount}/5 выполнено`}
          </span>
        </div>

        {/* Single White Frosted Glass Card Container */}
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
          background: 'rgba(255, 255, 255, 0.95)',
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
