import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Check, Dumbbell, Home, Activity, ShieldCheck } from 'lucide-react';

export default function OnboardingQuiz({ onComplete }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: 'Алексей',
    gender: 'male',
    age: 28,
    height: 178,
    weight: 82,
    fatPercentage: '15-19',
    activity: 'moderate',
    healthLimits: ['none'],
    workoutLocation: 'home'
  });

  const totalSteps = 6;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const toggleHealthLimit = (value) => {
    if (value === 'none') {
      setFormData({ ...formData, healthLimits: ['none'] });
      return;
    }
    let current = formData.healthLimits.filter(item => item !== 'none');
    if (current.includes(value)) {
      current = current.filter(item => item !== value);
    } else {
      current.push(value);
    }
    if (current.length === 0) current = ['none'];
    setFormData({ ...formData, healthLimits: current });
  };

  return (
    <div className="animate-fade-in" style={{ padding: '24px 20px', width: '100%', overflowY: 'auto' }}>
      {/* Top Header & Progress Bar */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          {step > 1 ? (
            <button
              onClick={handleBack}
              className="btn-liquid"
              style={{ padding: '6px 14px', fontSize: '13px' }}
            >
              <ArrowLeft size={16} /> Назад
            </button>
          ) : <div />}
          <span className="badge badge-teal">
            Шаг {step} из {totalSteps}
          </span>
        </div>
        <div style={{ width: '100%', height: '8px', background: '#DCE8E7', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{
            width: `${(step / totalSteps) * 100}%`,
            height: '100%',
            background: 'var(--primary-teal)',
            borderRadius: '4px',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      {/* STEP 1: Name & Gender */}
      {step === 1 && (
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
            Как тебя зовут и твой пол?
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '20px' }}>
            Мы персонализируем программу и расчеты базового метаболизма.
          </p>

          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
              Твое имя или ник в Telegram
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Например: Артем или @username"
              style={{
                width: '100%',
                padding: '14px 16px',
                background: '#FFFFFF',
                border: '1.5px solid rgba(0, 0, 0, 0.08)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-main)',
                fontSize: '15px',
                fontWeight: 700,
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '28px' }}>
            <div
              onClick={() => setFormData({ ...formData, gender: 'male' })}
              className="glass-card"
              style={{
                textAlign: 'center',
                padding: '20px 14px',
                cursor: 'pointer',
                borderColor: formData.gender === 'male' ? 'var(--primary-teal)' : 'var(--card-border)',
                background: formData.gender === 'male' ? 'var(--primary-teal-light)' : '#FFFFFF'
              }}
            >
              <div style={{ fontSize: '38px', marginBottom: '6px' }}>👨</div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-main)' }}>
                Мужчина
              </h3>
            </div>

            <div
              onClick={() => setFormData({ ...formData, gender: 'female' })}
              className="glass-card"
              style={{
                textAlign: 'center',
                padding: '20px 14px',
                cursor: 'pointer',
                borderColor: formData.gender === 'female' ? 'var(--accent-coral)' : 'var(--card-border)',
                background: formData.gender === 'female' ? 'var(--accent-coral-light)' : '#FFFFFF'
              }}
            >
              <div style={{ fontSize: '38px', marginBottom: '6px' }}>👩</div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-main)' }}>
                Женщина
              </h3>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: Body Parameters */}
      {step === 2 && (
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
            Физические параметры
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '20px' }}>
            Для точной формулы Миффлина-Сан Жеора (BMR).
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
            {[
              { key: 'age', label: 'Возраст (полных лет)', unit: 'лет' },
              { key: 'height', label: 'Рост (в сантиметрах)', unit: 'см' },
              { key: 'weight', label: 'Текущий вес (в килограммах)', unit: 'кг' }
            ].map(field => (
              <div key={field.key} className="glass-card" style={{ padding: '14px 18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>{field.label}</label>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--primary-teal-dark)' }}>{formData[field.key]} {field.unit}</span>
                </div>
                <input
                  type="number"
                  value={formData[field.key]}
                  onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    background: '#FFFFFF',
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '16px',
                    fontWeight: 800,
                    color: 'var(--text-main)',
                    outline: 'none'
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 3: Fat % Estimation */}
      {step === 3 && (
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
            Примерный % жира
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '18px' }}>
            Оцени свой текущий уровень рельефа.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '24px' }}>
            {[
              { val: '10-14', title: '10 - 14%', desc: 'Пресс виден, легкая сухость' },
              { val: '15-19', title: '15 - 19%', desc: 'Умеренная форма, спорт' },
              { val: '20-25', title: '20 - 25%', desc: 'Мягкий животик, есть резерв' },
              { val: '26+', title: '26% и более', desc: 'Цель: убрать 8+ кг' }
            ].map(item => {
              const isSelected = formData.fatPercentage === item.val;
              return (
                <div
                  key={item.val}
                  onClick={() => setFormData({ ...formData, fatPercentage: item.val })}
                  className="glass-card"
                  style={{
                    padding: '16px',
                    cursor: 'pointer',
                    borderColor: isSelected ? 'var(--primary-teal)' : 'var(--card-border)',
                    background: isSelected ? 'var(--primary-teal-light)' : '#FFFFFF'
                  }}
                >
                  <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-main)' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.35 }}>
                    {item.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 4: Activity Level */}
      {step === 4 && (
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
            Бытовая активность
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '18px' }}>
            Сколько ты двигаешься в обычные дни?
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
            {[
              { val: 'sedentary', title: '🪑 Сидячий образ жизни', desc: 'Офис / за рулем / до 5 000 шагов в день' },
              { val: 'moderate', title: '👟 Умеренная активность', desc: '1–3 тренировки в неделю, 7 000–10 000 шагов' },
              { val: 'high', title: '🔥 Высокая активность', desc: '4+ тренировок в неделю, более 12 000 шагов' }
            ].map(item => {
              const isSelected = formData.activity === item.val;
              return (
                <div
                  key={item.val}
                  onClick={() => setFormData({ ...formData, activity: item.val })}
                  className="glass-card"
                  style={{
                    padding: '16px 18px',
                    cursor: 'pointer',
                    borderColor: isSelected ? 'var(--primary-teal)' : 'var(--card-border)',
                    background: isSelected ? 'var(--primary-teal-light)' : '#FFFFFF'
                  }}
                >
                  <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-main)' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '3px' }}>
                    {item.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 5: Health Limits */}
      {step === 5 && (
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
            Ограничения по здоровью
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '18px' }}>
            Мы отфильтруем травмоопасные упражнения в программе.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
            {[
              { val: 'none', title: '✅ Без ограничений', desc: 'Полная программа без фильтрации' },
              { val: 'no_axial', title: '🩺 Исключить осевые нагрузки', desc: 'Проблемы со спиной/позвоночником (без осевого давления)' },
              { val: 'no_impact', title: '🦵 Исключить ударную нагрузку', desc: 'Проблемы с коленями/суставами (без бега и прыжков)' }
            ].map(item => {
              const isSelected = formData.healthLimits.includes(item.val);
              return (
                <div
                  key={item.val}
                  onClick={() => toggleHealthLimit(item.val)}
                  className="glass-card"
                  style={{
                    padding: '16px 18px',
                    cursor: 'pointer',
                    borderColor: isSelected ? 'var(--primary-teal)' : 'var(--card-border)',
                    background: isSelected ? 'var(--primary-teal-light)' : '#FFFFFF'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-main)' }}>
                      {item.title}
                    </div>
                    {isSelected && <Check size={18} color="var(--primary-teal)" strokeWidth={3} />}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '3px' }}>
                    {item.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 6: Workout Location */}
      {step === 6 && (
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
            Где тренируешься?
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '18px' }}>
            Программа адаптируется под твое оборудование.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
            {[
              { val: 'home', title: '🏠 Дома', icon: Home, desc: 'Собственный вес, гантели, фитнес-резинки' },
              { val: 'gym', title: '🏋️‍♂️ В тренажерном зале', icon: Dumbbell, desc: 'Тренажеры, гантели, штанги' },
              { val: 'cardio', title: '🏃‍♂️ Только кардио и активность', icon: Activity, desc: 'Ходьба, функционал, бег на свежем воздухе' }
            ].map(item => {
              const Icon = item.icon;
              const isSelected = formData.workoutLocation === item.val;
              return (
                <div
                  key={item.val}
                  onClick={() => setFormData({ ...formData, workoutLocation: item.val })}
                  className="glass-card"
                  style={{
                    padding: '16px 18px',
                    cursor: 'pointer',
                    borderColor: isSelected ? 'var(--primary-teal)' : 'var(--card-border)',
                    background: isSelected ? 'var(--primary-teal-light)' : '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px'
                  }}
                >
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: isSelected ? '#FFFFFF' : 'var(--primary-teal-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={20} color="var(--primary-teal-dark)" />
                  </div>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-main)' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      {item.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Next Button */}
      <button onClick={handleNext} className="btn-teal" style={{ padding: '15px', fontSize: '15px' }}>
        <span>{step === totalSteps ? 'Рассчитать мой калораж и программу' : 'Продолжить'}</span>
        <ArrowRight size={18} />
      </button>
    </div>
  );
}
