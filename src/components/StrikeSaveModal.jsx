import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Snowflake, Shield, ShieldCheck, Check, AlertTriangle, X, ArrowRight, Flame } from 'lucide-react';
import { StorageManager, formatDays } from '../utils/storage';

export default function StrikeSaveModal({ isOpen, onClose, streakState, setStreakState }) {
  if (!isOpen) return null;

  const [penaltyCompleted, setPenaltyCompleted] = useState(false);
  const savesRemaining = streakState.savesRemaining ?? 4;

  const handleCompletePenalty = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    const updated = {
      ...streakState,
      isFrozen: false,
      savesRemaining: Math.max(0, savesRemaining - 1),
      currentStreak: (streakState.currentStreak || 1)
    };
    StorageManager.saveStreakState(updated);
    setStreakState(updated);
    setPenaltyCompleted(true);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 300,
      background: 'rgba(24, 40, 56, 0.5)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-card animate-fade-in" style={{
        width: '100%',
        maxWidth: '380px',
        padding: '22px',
        background: '#FFFFFF',
        position: 'relative'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        {penaltyCompleted ? (
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'var(--primary-teal-light)',
              color: 'var(--primary-teal-dark)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 14px'
            }}>
              <ShieldCheck size={32} />
            </div>
            <h3 style={{ fontSize: '19px', fontWeight: 800, color: 'var(--text-main)' }}>
              Стрик успешно спасён! 🛡️
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '6px 0 18px' }}>
              Твой стрик 🔥 <b>{formatDays(streakState.currentStreak)}</b> восстановлен. Осталось спасений: {savesRemaining - 1} из 4.
            </p>
            <button onClick={onClose} className="btn-teal">
              Отлично!
            </button>
          </div>
        ) : (
          <div>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'var(--primary-teal-light)',
              color: 'var(--primary-teal-dark)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '14px'
            }}>
              <Snowflake size={26} />
            </div>

            <span className="badge badge-teal" style={{ marginBottom: '8px' }}>
              Заморозка 🧊 24 часа
            </span>
            <h3 style={{ fontSize: '19px', fontWeight: 900, color: 'var(--text-main)', margin: '4px 0 6px' }}>
              Спасение Стрика (Strike Save)
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.45, marginBottom: '16px' }}>
              Ты пропустил вчерашний отчет, но твой стрик не сгорел! Выполни штрафное задание, чтобы разморозить стрик.
            </p>

            {/* Penalty Task Card */}
            <div className="glass-card" style={{
              padding: '12px 14px',
              background: 'var(--accent-coral-light)',
              border: '1px solid rgba(255, 112, 90, 0.3)',
              marginBottom: '16px'
            }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent-coral-dark)', textTransform: 'uppercase' }}>
                ШТРАФНОЕ ЗАДАНИЕ
              </div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-main)', marginTop: '2px' }}>
                👟 +2 000 дополнительных шагов
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Пройди сегодня 12 000 шагов вместо 10 000.
              </div>
            </div>

            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px', textAlign: 'center' }}>
              Доступно спасений: <b>{savesRemaining} из 4</b>
            </div>

            <button onClick={handleCompletePenalty} className="btn-teal">
              <ShieldCheck size={18} />
              <span>Я выполнил штраф — Спасти стрик</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
