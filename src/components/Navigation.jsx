import React from 'react';
import { Home, Dumbbell, BarChart2, Utensils, BookOpen } from 'lucide-react';

export default function Navigation({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'dashboard', label: 'Главная', icon: Home },
    { id: 'workout', label: 'Тренинг', icon: Dumbbell },
    { id: 'nutrition', label: 'Питание', icon: Utensils },
    { id: 'weekly', label: 'Активность', icon: BarChart2 },
    { id: 'knowledge', label: 'Гайды', icon: BookOpen }
  ];

  return (
    <nav style={{
      position: 'absolute',
      bottom: 'calc(12px + env(safe-area-inset-bottom, 0px))',
      left: '16px',
      right: '16px',
      height: '66px',
      background: 'rgba(255, 255, 255, 0.55)',
      backdropFilter: 'blur(30px) saturate(200%)',
      WebkitBackdropFilter: 'blur(30px) saturate(200%)',
      border: '1px solid rgba(255, 255, 255, 0.65)',
      borderRadius: 'var(--radius-full)',
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      alignItems: 'center',
      padding: '4px 6px',
      boxShadow: '0 16px 36px rgba(35, 65, 60, 0.12), inset 0 1.5px 2px rgba(255, 255, 255, 0.95)',
      zIndex: 100
    }}>
      {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: isActive ? 'rgba(61, 175, 161, 0.14)' : 'transparent',
              border: isActive ? '1px solid rgba(61, 175, 161, 0.25)' : '1px solid transparent',
              borderRadius: 'var(--radius-full)',
              height: '52px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: isActive ? 'var(--primary-teal-dark)' : 'var(--text-muted)',
              transition: 'all 0.22s ease',
              outline: 'none',
              padding: '2px 0'
            }}
            title={tab.label}
          >
            <Icon
              size={isActive ? 20 : 22}
              color={isActive ? 'var(--primary-teal-dark)' : 'var(--text-muted)'}
              strokeWidth={isActive ? 2.6 : 2}
            />

            {/* Label strictly BELOW the icon, only visible when active */}
            {isActive && (
              <span style={{
                fontSize: '10px',
                fontWeight: 800,
                color: 'var(--primary-teal-dark)',
                whiteSpace: 'nowrap',
                letterSpacing: '-0.01em',
                marginTop: '2px',
                lineHeight: 1,
                animation: 'fadeIn 0.18s ease forwards'
              }}>
                {tab.label}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
