import React, { useState } from 'react';
import { ArrowRight, Plus, Smartphone, X, Share, MoreVertical } from 'lucide-react';

export default function OnboardingStartScreen({ onStart }) {
  const [isInstallGuideOpen, setIsInstallGuideOpen] = useState(false);

  return (
    <div className="animate-fade-in" style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '20px 22px 24px',
      position: 'relative',
      overflowY: 'auto'
    }}>
      {/* Top Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 10
      }}>
        <button
          onClick={() => setIsInstallGuideOpen(true)}
          style={{
            height: '38px',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(255, 255, 255, 0.65)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.85)',
            padding: '0 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12px',
            fontWeight: 700,
            color: 'var(--text-main)',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
          }}
          title="Инструкция по установке"
        >
          <Smartphone size={15} color="var(--primary-teal-dark)" />
          <span>На экран</span>
        </button>

        <button
          onClick={onStart}
          className="btn-liquid"
          style={{ padding: '6px 14px', fontSize: '13px', color: 'var(--text-secondary)' }}
        >
          Войти
        </button>
      </div>

      {/* Main Content & Athlete Visual Area */}
      <div style={{ position: 'relative', margin: '10px 0', zIndex: 5 }}>
        
        {/* Teal Arch in background */}
        <div style={{
          position: 'absolute',
          top: '-10px',
          right: '5%',
          width: '190px',
          height: '240px',
          borderRadius: '95px 95px 0 0',
          background: 'rgba(61, 175, 161, 0.22)',
          zIndex: 1
        }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', position: 'relative', zIndex: 2 }}>
          {/* Headline on the left */}
          <div style={{ maxWidth: '170px', paddingBottom: '10px' }}>
            <h1 style={{
              fontSize: '28px',
              fontWeight: 900,
              lineHeight: 1.15,
              color: 'var(--text-main)',
              letterSpacing: '-0.02em',
              marginBottom: '10px'
            }}>
              Твой путь <br />
              <span style={{ color: 'var(--primary-teal-dark)' }}>к рельефу</span> <br />
              начинается <br />
              здесь
            </h1>
            <p style={{
              fontSize: '12px',
              color: 'var(--text-secondary)',
              lineHeight: 1.45,
              fontWeight: 500
            }}>
              Тренируйся, соблюдай дисциплину и создай лучшую форму за 90 дней.
            </p>
          </div>

          {/* Athletic Model Image */}
          <div style={{ width: '170px', height: '260px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
            <img
              src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=80"
              alt="Fitness Athlete"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 12px 28px rgba(35, 65, 60, 0.12)',
                border: '1.5px solid rgba(255, 255, 255, 0.85)'
              }}
            />
          </div>
        </div>

        {/* CTA Button: Начать with arrow */}
        <div style={{ marginTop: '20px' }}>
          <button
            onClick={onStart}
            className="btn-teal"
            style={{
              justifyContent: 'space-between',
              padding: '6px 8px 6px 24px',
              fontSize: '16px',
              fontWeight: 800,
              borderRadius: 'var(--radius-full)'
            }}
          >
            <span>Начать</span>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary-teal-dark)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}>
              <ArrowRight size={20} strokeWidth={2.5} />
            </div>
          </button>
        </div>
      </div>

      {/* Bottom Social Proof Glass Card */}
      <div className="glass-card" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 18px',
        borderRadius: 'var(--radius-lg)',
        zIndex: 10,
        background: 'rgba(255, 255, 255, 0.65)'
      }}>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-main)' }}>
            Присоединяйся
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>
            К 2 400+ участникам
          </div>
        </div>

        {/* Avatars Stack + Plus Button */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {[
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
            'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=100&q=80'
          ].map((url, i) => (
            <img
              key={i}
              src={url}
              alt="User"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: '2px solid #FFFFFF',
                marginLeft: i > 0 ? '-10px' : 0,
                objectFit: 'cover'
              }}
            />
          ))}
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: '2px solid #FFFFFF',
            marginLeft: '-10px',
            background: '#FFFFFF',
            color: 'var(--text-main)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '13px',
            fontWeight: 800,
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.06)'
          }}>
            <Plus size={14} strokeWidth={3} />
          </div>
        </div>
      </div>

      {/* PWA Install Instructions Modal */}
      {isInstallGuideOpen && (
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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 900, color: 'var(--text-main)' }}>
                Установка на экран 📲
              </h3>
              <button
                onClick={() => setIsInstallGuideOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', marginBottom: '18px' }}>
              {/* iPhone Guide */}
              <div className="glass-card" style={{ padding: '12px 14px', background: 'var(--primary-teal-light)' }}>
                <div style={{ fontWeight: 800, color: 'var(--primary-teal-dark)', marginBottom: '4px' }}>
                  🍏 Для iPhone (Safari):
                </div>
                <div style={{ color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  1. Нажми <b>«Поделиться»</b> (квадрат со стрелкой ⬆️).<br />
                  2. Выбери <b>«На экран „Домой“»</b> ➕.<br />
                  3. Нажми <b>«Добавить»</b>.
                </div>
              </div>

              {/* Android Guide */}
              <div className="glass-card" style={{ padding: '12px 14px', background: 'var(--accent-coral-light)' }}>
                <div style={{ fontWeight: 800, color: 'var(--accent-coral-dark)', marginBottom: '4px' }}>
                  🤖 Для Android (Chrome):
                </div>
                <div style={{ color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  1. Нажми <b>меню (три точки ⋮)</b> вверху.<br />
                  2. Выбери <b>«Установить приложение»</b> ➕.
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setIsInstallGuideOpen(false);
                onStart();
              }}
              className="btn-teal"
            >
              Понятно, начать челлендж!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
