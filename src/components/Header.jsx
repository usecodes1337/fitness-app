import React from 'react';
import { Flame, Snowflake, Bell, Menu, Sparkles } from 'lucide-react';

export default function Header({ profile, streakState, onOpenMatrix, onOpenPaywall, onOpenAdmin }) {
  const { currentStreak = 1, isFrozen, dayNumber = 1 } = streakState || {};
  const userName = profile?.name || profile?.telegramUsername || 'Атлет';
  const progressPercent = Math.min(100, Math.round((dayNumber / 90) * 100));

  return (
    <div style={{ width: '100%', padding: 'max(14px, env(safe-area-inset-top, 14px)) 20px 10px', background: 'transparent' }}>
      {/* Main Seamless Header Row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '12px'
      }}>
        {/* Left: Menu Icon + Greeting */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
            title="Меню и профиль"
          >
            <Menu size={24} strokeWidth={2.2} />
          </button>

          {/* User Title & Subtitle */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <h1 style={{
                fontSize: '19px',
                fontWeight: 900,
                color: 'var(--text-main)',
                letterSpacing: '-0.01em',
                lineHeight: 1.2
              }}>
                Привет, {userName}
              </h1>
              <span style={{ fontSize: '17px' }}>👋</span>
            </div>
            <p style={{
              fontSize: '12px',
              color: 'var(--text-secondary)',
              fontWeight: 500,
              marginTop: '1px'
            }}>
              Готов растопить жир сегодня?
            </p>
          </div>
        </div>

        {/* Right: Streak Badge + Notification Bell */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
              border: isFrozen ? '1px solid rgba(61, 175, 161, 0.3)' : '1px solid rgba(255, 112, 90, 0.3)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
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

      {/* Challenge Progress Bar: «День 1 из 90» with percentage */}
      <div
        onClick={onOpenMatrix}
        style={{
          cursor: 'pointer',
          padding: '2px 2px'
        }}
        title="Открыть сетку 90 дней"
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '11px',
          fontWeight: 700,
          marginBottom: '5px'
        }}>
          <span style={{ color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>День {dayNumber} из 90</span>
            <span style={{ color: 'var(--text-dim)' }}>•</span>
            <span style={{ color: 'var(--primary-teal-dark)' }}>Сушка & Рельеф</span>
          </span>
          <span style={{ color: 'var(--primary-teal-dark)', fontWeight: 800 }}>
            {progressPercent}% пути
          </span>
        </div>

        {/* Slim glowing progress bar */}
        <div style={{
          width: '100%',
          height: '6px',
          borderRadius: 'var(--radius-full)',
          background: 'rgba(255, 255, 255, 0.65)',
          boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.04)',
          overflow: 'hidden',
          padding: '1px'
        }}>
          <div style={{
            width: `${Math.max(4, progressPercent)}%`,
            height: '100%',
            borderRadius: 'var(--radius-full)',
            background: 'linear-gradient(90deg, #44C7B5 0%, #31A598 100%)',
            boxShadow: '0 0 8px rgba(61, 175, 161, 0.4)',
            transition: 'width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }} />
        </div>
      </div>
    </div>
  );
}
