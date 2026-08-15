import React, { useState } from 'react';
import {
  Users, TrendingUp, Bell, Send, Snowflake, RotateCcw,
  CheckCircle, Shield, X, Activity, BarChart2, LogOut, User, Sparkles
} from 'lucide-react';
import { StorageManager } from '../utils/storage';

export default function AdminPanelModal({
  isOpen,
  onClose,
  profile,
  streakState,
  setStreakState,
  onLogout
}) {
  if (!isOpen) return null;

  const [pushText, setPushText] = useState('🔥 Напоминание: заполни вечерний отчёт до 23:59, чтобы не заморозить стрик!');
  const [pushSent, setPushSent] = useState(false);

  const simulateMissedDay = () => {
    const updated = {
      ...streakState,
      isFrozen: true
    };
    StorageManager.saveStreakState(updated);
    setStreakState(updated);
    alert('🧊 День заморожен! Теперь на дашборде появится баннер спасения стрика.');
    onClose();
  };

  const handleSendPush = (e) => {
    e.preventDefault();
    setPushSent(true);
    setTimeout(() => setPushSent(false), 2500);
  };

  const userName = profile?.name || profile?.telegramUsername || 'Атлет';
  const targetCalories = profile?.kbju?.targetCalories || 2085;

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
        maxWidth: '400px',
        maxHeight: '88vh',
        overflowY: 'auto',
        padding: '22px',
        background: '#FFFFFF',
        position: 'relative'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <User size={20} color="var(--primary-teal)" />
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-main)' }}>Профиль и Настройки</h2>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* User Card */}
        <div className="glass-card" style={{
          padding: '14px 16px',
          background: 'var(--primary-teal-light)',
          border: '1px solid rgba(61, 175, 161, 0.3)',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            background: 'var(--primary-teal)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            fontWeight: 800
          }}>
            {userName.charAt(0).toUpperCase()}
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-main)' }}>
              {userName}
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Цель: Сушка & Рельеф • {targetCalories} ккал
            </p>
          </div>
        </div>

        {/* Analytics Summary */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
          <div className="glass-card" style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.8)' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>Текущий стрик</span>
            <div style={{ fontSize: '20px', fontWeight: 900, color: 'var(--accent-coral)', marginTop: '2px' }}>
              {streakState?.currentStreak || 1} дней 🔥
            </div>
            <span style={{ fontSize: '10px', color: 'var(--text-dim)' }}>День {streakState?.dayNumber || 1} из 90</span>
          </div>

          <div className="glass-card" style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.8)' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>Спасений стрика</span>
            <div style={{ fontSize: '20px', fontWeight: 900, color: 'var(--primary-teal-dark)', marginTop: '2px' }}>
              {streakState?.savesRemaining ?? 4} из 4 🧊
            </div>
            <span style={{ fontSize: '10px', color: 'var(--primary-teal)' }}>Запас активен</span>
          </div>
        </div>

        {/* Account Actions & Logout */}
        <div style={{ marginBottom: '18px' }}>
          <h3 style={{ fontSize: '13px', fontWeight: 800, marginBottom: '8px', color: 'var(--text-main)' }}>
            Управление аккаунтом
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button
              onClick={simulateMissedDay}
              className="btn-liquid"
              style={{ justifyContent: 'flex-start', padding: '10px 14px', color: 'var(--primary-teal-dark)', background: 'var(--primary-teal-light)' }}
            >
              <Snowflake size={16} />
              <span>Симулировать пропуск дня (Заморозка 🧊)</span>
            </button>

            {/* Logout Button */}
            <button
              onClick={() => {
                onClose();
                onLogout();
              }}
              className="btn-liquid"
              style={{
                justifyContent: 'flex-start',
                padding: '10px 14px',
                color: 'var(--accent-coral-dark)',
                background: 'var(--accent-coral-light)',
                borderColor: 'rgba(255, 112, 90, 0.3)'
              }}
            >
              <LogOut size={16} />
              <span style={{ fontWeight: 800 }}>Выйти из профиля</span>
            </button>
          </div>
        </div>

        {/* Push Broadcast Simulator */}
        <div>
          <h3 style={{ fontSize: '13px', fontWeight: 800, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-main)' }}>
            <Bell size={15} color="var(--primary-teal)" />
            <span>Тест Push-рассылки пользователям</span>
          </h3>

          <form onSubmit={handleSendPush}>
            <textarea
              value={pushText}
              onChange={(e) => setPushText(e.target.value)}
              rows="2"
              style={{
                width: '100%',
                padding: '10px 12px',
                background: '#F8FBFA',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '12px',
                fontFamily: 'inherit',
                color: 'var(--text-main)',
                outline: 'none',
                marginBottom: '8px'
              }}
            />

            <button type="submit" className="btn-teal" style={{ padding: '10px', fontSize: '13px' }}>
              <Send size={15} />
              <span>{pushSent ? 'Уведомление отправлено! 🔔' : 'Отправить Push-уведомление'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
