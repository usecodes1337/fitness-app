import React from 'react';
import { Flame, Snowflake, Bell, Menu } from 'lucide-react';

export default function Header({ profile, streakState, onOpenMatrix, onOpenPaywall, onOpenAdmin }) {
  const { currentStreak, isFrozen, dayNumber = 1 } = streakState || {};
  const userName = profile?.name || profile?.telegramUsername || 'Атлет';

  return (
    <div style={{ width: '100%', padding: 'max(14px, env(safe-area-inset-top, 14px)) 20px 8px', background: 'transparent' }}>
      {/* Main Seamless Header Row (Matching Reference Concept Screenshot) */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Left: Menu Icon + Greeting */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Hamburger Menu Icon */}
          <button
            onClick={onOpenAdmin}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-main)'
            }}
            title="Меню и админ-панель"
          >
            <Menu size={24} strokeWidth={2.2} />
          </button>

          {/* User Title & Subtitle */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <h1 style={{
                fontSize: '20px',
                fontWeight: 800,
                color: 'var(--text-main)',
                letterSpacing: '-0.01em',
                lineHeight: 1.2
              }}>
                Привет, {userName}
              </h1>
              <span style={{ fontSize: '18px' }}>👋</span>
            </div>
            <p style={{
              fontSize: '13px',
              color: 'var(--text-secondary)',
              fontWeight: 500,
              marginTop: '1px'
            }}>
              Готов растопить жир сегодня?
            </p>
          </div>
        </div>

        {/* Right: Streak Badge + Notification Bell */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Streak Flame Pill */}
          <div
            onClick={onOpenMatrix}
            style={{
              padding: '5px 10px',
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
              background: isFrozen ? 'rgba(61, 175, 161, 0.18)' : 'rgba(255, 112, 90, 0.18)',
              border: isFrozen ? '1px solid rgba(61, 175, 161, 0.3)' : '1px solid rgba(255, 112, 90, 0.3)'
            }}
            title="Стрик дней"
          >
            {isFrozen ? (
              <Snowflake size={14} color="var(--primary-teal)" />
            ) : (
              <Flame size={14} color="var(--accent-coral)" />
            )}
            <span style={{
              color: isFrozen ? 'var(--primary-teal-dark)' : 'var(--accent-coral-dark)',
              fontWeight: 800,
              fontSize: '12px'
            }}>
              {currentStreak}
            </span>
          </div>

          {/* Notification Bell with Coral Dot */}
          <button
            onClick={onOpenPaywall}
            style={{
              background: 'none',
              border: 'none',
              padding: '4px',
              cursor: 'pointer',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-main)'
            }}
            title="Уведомления и статус"
          >
            <Bell size={22} strokeWidth={2.2} />
            {/* Coral notification dot */}
            <span style={{
              position: 'absolute',
              top: '4px',
              right: '4px',
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: '#FF705A',
              border: '1.5px solid #FFFFFF'
            }} />
          </button>
        </div>
      </div>
    </div>
  );
}
