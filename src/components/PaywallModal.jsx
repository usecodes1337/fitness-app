import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle2, ShieldCheck, X, CreditCard, Flame, Zap } from 'lucide-react';

export default function PaywallModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }, 1200);
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
        maxWidth: '400px',
        padding: '22px',
        background: '#FFFFFF',
        position: 'relative'
      }}>
        {/* Close */}
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

        {isPaid ? (
          <div style={{ textAlign: 'center', padding: '14px 0' }}>
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
              <CheckCircle2 size={32} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 900, color: 'var(--text-main)' }}>Полный доступ активирован! 🎉</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '6px 0 20px' }}>
              Все 90 дней челленджа, тренировки, адаптивное меню и база знаний разблокированы навсегда.
            </p>
            <button onClick={onClose} className="btn-teal">
              Перейти к челленджу
            </button>
          </div>
        ) : (
          <div>
            <span className="badge badge-coral" style={{ marginBottom: '10px' }}>
              <Flame size={13} /> Free Trial: 3 дня бесплатно
            </span>
            
            <h2 style={{ fontSize: '22px', fontWeight: 900, lineHeight: 1.2, marginBottom: '6px', color: 'var(--text-main)' }}>
              Полный доступ на 90 дней <br />
              <span style={{ color: 'var(--primary-teal)' }}>до идеального рельефа</span>
            </h2>

            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Единоразовая покупка без скрытых подписок и автосписаний.
            </p>

            {/* Features List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px', fontSize: '12px' }}>
              {[
                'Все 90 дней плана тренировок (Дом / Зал)',
                'Адаптивный перерасчет калоража при плато',
                'Система стриков и спасения заморозки 🧊',
                'Еженедельные замеры и фото-коллаж До/После',
                'База знаний и руководство по БАДам'
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={15} color="var(--primary-teal)" />
                  <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{item}</span>
                </div>
              ))}
            </div>

            {/* Price Box */}
            <div className="glass-card" style={{
              background: 'var(--primary-teal-light)',
              border: '1px solid rgba(61, 175, 161, 0.3)',
              padding: '14px',
              marginBottom: '16px',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Единоразовый платеж за 90 дней</span>
              <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--text-main)', margin: '2px 0' }}>
                2 990 ₽ <span style={{ fontSize: '15px', color: 'var(--text-dim)', textDecoration: 'line-through' }}>5 990 ₽</span>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--primary-teal-dark)', fontWeight: 800 }}>
                Всего 33 ₽ в день за тело твоей мечты
              </span>
            </div>

            {/* Payment Button */}
            <button
              onClick={handlePay}
              disabled={isProcessing}
              className="btn-coral"
              style={{ padding: '15px', fontSize: '15px' }}
            >
              <CreditCard size={17} />
              <span>{isProcessing ? 'Обработка платежа (ЮKassa)...' : 'Оплатить 2 990 ₽'}</span>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '10px', fontSize: '11px', color: 'var(--text-dim)' }}>
              <span>🔒 Безопасная оплата</span>
              <span>•</span>
              <span>Т-Банк / ЮKassa / СБП</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
