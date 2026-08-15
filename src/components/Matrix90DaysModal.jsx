import React from 'react';
import { X, Flame, Check, Snowflake, Trophy } from 'lucide-react';
import { StorageManager } from '../utils/storage';

export default function Matrix90DaysModal({ isOpen, onClose, currentDay, onSelectDay }) {
  if (!isOpen) return null;

  const logs = StorageManager.getDailyLogs();
  const daysArray = Array.from({ length: 90 }, (_, i) => i + 1);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 200,
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
        maxHeight: '85vh',
        overflowY: 'auto',
        position: 'relative',
        padding: '22px',
        background: '#FFFFFF'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div>
            <h3 style={{ fontSize: '19px', fontWeight: 900, color: 'var(--text-main)' }}>Сетка 90 дней 🔥</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Каждый квадрат — твой шаг к идеальному телу</p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontSize: '11px', fontWeight: 700, marginBottom: '16px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: 'var(--primary-teal)' }} /> Выполнен
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: 'var(--accent-coral)' }} /> Сегодня
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#8E7CF7' }} /> Спасён 🧊
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#E3EBEA' }} /> Впереди
          </span>
        </div>

        {/* 90-Day Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(10, 1fr)',
          gap: '5px',
          marginBottom: '18px'
        }}>
          {daysArray.map((dayNum) => {
            const dayLog = logs[dayNum];
            const isCompleted = dayLog && dayLog.saved;
            const isCurrent = dayNum === currentDay;
            const isFuture = dayNum > currentDay;

            let bgColor = '#F2F7F6';
            let textColor = 'var(--text-dim)';
            let border = '1px solid rgba(0, 0, 0, 0.04)';

            if (isCompleted) {
              bgColor = 'var(--primary-teal)';
              textColor = '#FFFFFF';
            } else if (isCurrent) {
              bgColor = 'var(--accent-coral)';
              textColor = '#FFFFFF';
              border = '2px solid #FFFFFF';
            }

            return (
              <button
                key={dayNum}
                onClick={() => {
                  onSelectDay(dayNum);
                  onClose();
                }}
                style={{
                  aspectRatio: '1/1',
                  borderRadius: '5px',
                  background: bgColor,
                  border: border,
                  color: textColor,
                  fontSize: '10px',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: isFuture ? 'not-allowed' : 'pointer',
                  opacity: isFuture ? 0.6 : 1,
                  boxShadow: isCurrent ? '0 3px 8px rgba(255, 112, 90, 0.35)' : 'none'
                }}
                disabled={isFuture}
                title={`День ${dayNum}`}
              >
                {dayNum}
              </button>
            );
          })}
        </div>

        <button onClick={onClose} className="btn-teal">
          Закрыть
        </button>
      </div>
    </div>
  );
}
