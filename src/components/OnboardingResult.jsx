import React from 'react';
import { calculateKBJU } from '../utils/storage';
import { Flame, CheckCircle, Zap, Shield, ArrowRight, Send, Globe } from 'lucide-react';

export default function OnboardingResult({ profile, onStartChallenge }) {
  const kbju = calculateKBJU(profile);
  const estimatedWeightLoss = (parseFloat(profile.weight) * 0.08).toFixed(1);
  const targetWeight = (parseFloat(profile.weight) - parseFloat(estimatedWeightLoss)).toFixed(1);

  return (
    <div className="animate-fade-in" style={{ padding: '24px 20px', width: '100%', overflowY: 'auto' }}>
      {/* Header Badge */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <span className="badge badge-teal" style={{ padding: '6px 14px', fontSize: '12px', marginBottom: '8px' }}>
          <Zap size={14} /> Твой план рассчитан для: {profile.name || 'Алекс'}
        </span>
        <h2 style={{ fontSize: '26px', fontWeight: 900, marginTop: '6px', lineHeight: 1.2, color: 'var(--text-main)' }}>
          90 дней до твоего <br />
          <span style={{ color: 'var(--primary-teal)' }}>Идеального Рельефа</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '6px' }}>
          Индивидуальный расчет дефицита и безопасный подбор упражнений.
        </p>
      </div>

      {/* Target Forecast Card */}
      <div className="glass-card" style={{
        background: 'var(--primary-teal-light)',
        borderColor: 'rgba(61, 175, 161, 0.4)',
        padding: '20px',
        marginBottom: '14px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary-teal-dark)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Прогноз снижения веса за 90 дней
        </div>
        <div style={{ fontSize: '38px', fontWeight: 900, color: 'var(--primary-teal-dark)', margin: '2px 0' }}>
          -{estimatedWeightLoss} кг
        </div>
        <div style={{ fontSize: '13px', color: 'var(--text-main)', fontWeight: 600 }}>
          Старт: {profile.weight} кг ➔ Цель: <span style={{ color: 'var(--accent-coral)' }}>{targetWeight} кг</span>
        </div>
      </div>

      {/* Calories & Macros Card */}
      <div className="glass-card" style={{ marginBottom: '14px', padding: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Суточная норма на сушку
          </span>
          <span className="badge badge-coral">
            Дефицит -20%
          </span>
        </div>

        <div style={{
          background: '#FFFFFF',
          border: '1px solid rgba(0, 0, 0, 0.06)',
          borderRadius: 'var(--radius-md)',
          padding: '14px',
          textAlign: 'center',
          marginBottom: '14px'
        }}>
          <div style={{ fontSize: '32px', fontWeight: 900, color: 'var(--text-main)', lineHeight: 1.1 }}>
            {kbju.targetCalories} <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-muted)' }}>ккал/день</span>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>
            Базовый обмен (BMR): {kbju.bmr} ккал • TDEE: {kbju.tdee} ккал
          </span>
        </div>

        {/* 3 Macro Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
          <div className="glass-card" style={{ padding: '10px 6px', textAlign: 'center', background: 'var(--primary-teal-light)' }}>
            <div style={{ fontSize: '10px', color: 'var(--primary-teal-dark)', fontWeight: 700 }}>БЕЛКИ</div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-main)', marginTop: '2px' }}>{kbju.proteinGrams}г</div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>2.0г / кг</div>
          </div>

          <div className="glass-card" style={{ padding: '10px 6px', textAlign: 'center', background: 'var(--amber-light)' }}>
            <div style={{ fontSize: '10px', color: 'var(--accent-amber)', fontWeight: 700 }}>ЖИРЫ</div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-main)', marginTop: '2px' }}>{kbju.fatGrams}г</div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>0.9г / кг</div>
          </div>

          <div className="glass-card" style={{ padding: '10px 6px', textAlign: 'center', background: 'var(--accent-coral-light)' }}>
            <div style={{ fontSize: '10px', color: 'var(--accent-coral)', fontWeight: 700 }}>УГЛЕВОДЫ</div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-main)', marginTop: '2px' }}>{kbju.carbGrams}г</div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Остаток</div>
          </div>
        </div>
      </div>

      {/* Program Summary Card */}
      <div className="glass-card" style={{ marginBottom: '20px', padding: '16px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 800, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)' }}>
          <Shield size={16} color="var(--primary-teal)" />
          <span>Адаптация программы под тебя</span>
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle size={15} color="var(--primary-teal)" />
            <span>Формат: <b>{profile.workoutLocation === 'home' ? 'Дома (собственный вес/резинки)' : profile.workoutLocation === 'gym' ? 'В фитнес-зале' : 'Только Кардио'}</b></span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle size={15} color="var(--primary-teal)" />
            <span>Фильтрация: <b>{profile.healthLimits?.includes('none') ? 'Без ограничений' : 'Исключены опасные осевые/ударные нагрузки'}</b></span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle size={15} color="var(--primary-teal)" />
            <span>Система удержания: <b>Заморозка стрика 🧊 + Штрафное спасение 🛡️</b></span>
          </div>
        </div>
      </div>

      {/* Platform Choice CTAs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '14px' }}>
        <button onClick={onStartChallenge} className="btn-teal" style={{ padding: '15px 18px', fontSize: '15px' }}>
          <Globe size={18} />
          <span>Продолжить в приложении (3 дня бесплатно)</span>
          <ArrowRight size={16} />
        </button>

        <button
          onClick={() => {
            alert('Ссылка на Telegram Bot Mini App: скопируйте или откройте через бота. Запускаем PWA версию!');
            onStartChallenge();
          }}
          className="btn-liquid"
          style={{ padding: '12px', fontSize: '13px', gap: '8px' }}
        >
          <Send size={16} color="var(--primary-teal-dark)" />
          <span>Или открыть через Telegram Mini App</span>
        </button>
      </div>

      <p style={{ textAlign: 'center', fontSize: '11px', color: 'var(--text-dim)' }}>
        3 дня Free Trial • Без скрытых подписок • 100% гарантия
      </p>
    </div>
  );
}
