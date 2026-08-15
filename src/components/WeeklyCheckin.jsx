import React, { useState } from 'react';
import {
  Camera, TrendingDown, Scale, Check, AlertCircle, ArrowUpRight,
  ShieldCheck, Share2, Plus, Sparkles, ChevronRight, Activity, Calendar
} from 'lucide-react';
import { StorageManager } from '../utils/storage';

export default function WeeklyCheckin({ profile, onUpdateProfile, onClose }) {
  const [activeSubTab, setActiveSubTab] = useState('activity');
  const [period, setPeriod] = useState('Week');

  const weeklyLogs = StorageManager.getWeeklyLogs();
  const lastLog = weeklyLogs[weeklyLogs.length - 1] || {};

  const [weight, setWeight] = useState(profile?.weight || 82);
  const [waist, setWaist] = useState(lastLog.waist || 85);
  const [chest, setChest] = useState(lastLog.chest || 102);
  const [biceps, setBiceps] = useState(lastLog.biceps || 38);
  const [hips, setHips] = useState(lastLog.hips || 98);

  const [photos, setPhotos] = useState({
    front: null,
    side: null,
    back: null
  });

  const [showAdaptiveAlert, setShowAdaptiveAlert] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handlePhotoChange = (key, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotos(prev => ({ ...prev, [key]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const entry = {
      weight: parseFloat(weight),
      waist: parseFloat(waist),
      chest: parseFloat(chest),
      biceps: parseFloat(biceps),
      hips: parseFloat(hips),
      photos
    };

    StorageManager.saveWeeklyLog(entry);

    const previousWeight = lastLog.weight || parseFloat(profile.weight);
    const weightDiff = previousWeight - parseFloat(weight);

    if (weightDiff <= 0.1) {
      setShowAdaptiveAlert(true);
    } else {
      setIsSaved(true);
    }
  };

  const applyCalorieAdjustment = () => {
    const updatedProfile = { ...profile };
    if (updatedProfile.kbju) {
      updatedProfile.kbju.targetCalories = Math.max(1400, updatedProfile.kbju.targetCalories - 100);
      updatedProfile.kbju.carbGrams = Math.max(80, updatedProfile.kbju.carbGrams - 25);
    }
    StorageManager.saveUserProfile(updatedProfile);
    onUpdateProfile(updatedProfile);
    setShowAdaptiveAlert(false);
    setIsSaved(true);
  };

  return (
    <div className="animate-fade-in" style={{ padding: '16px 18px 20px', width: '100%' }}>
      {/* Title & Subtabs Switcher */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-main)' }}>Активность</h2>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Май 12 – Май 18</span>
        </div>

        {/* Check-in Trigger Pill */}
        <button
          onClick={() => setActiveSubTab(activeSubTab === 'activity' ? 'checkin' : 'activity')}
          className="btn-liquid"
          style={{
            padding: '7px 14px',
            fontSize: '12px',
            color: activeSubTab === 'checkin' ? 'var(--primary-teal-dark)' : 'var(--text-main)',
            borderColor: activeSubTab === 'checkin' ? 'rgba(61, 175, 161, 0.4)' : 'rgba(0, 0, 0, 0.08)'
          }}
        >
          <Camera size={14} />
          <span>{activeSubTab === 'checkin' ? 'Графики' : 'Замеры (Чек-ин)'}</span>
        </button>
      </div>

      {activeSubTab === 'activity' ? (
        <>
          {/* Period Tabs */}
          <div style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '14px'
          }}>
            {['Day', 'Week', 'Month', 'Year'].map(p => {
              const labels = { Day: 'День', Week: 'Неделя', Month: 'Месяц', Year: '90 Дней' };
              const isActive = period === p;
              return (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`pill-tab ${isActive ? 'active' : ''}`}
                  style={{ flex: 1, textAlign: 'center' }}
                >
                  {labels[p]}
                </button>
              );
            })}
          </div>

          {/* CARD 1: Calories Burned & Spline Chart */}
          <div className="glass-card" style={{ padding: '18px 20px', marginBottom: '12px' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Сожжено калорий</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', margin: '4px 0 2px' }}>
              <span style={{ fontSize: '26px', fontWeight: 900, color: 'var(--text-main)' }}>2 450</span>
              <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 600 }}>ккал</span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--primary-teal-dark)', fontWeight: 700, marginBottom: '14px' }}>
              ▲ 12% больше, чем на прошлой неделе
            </div>

            {/* SVG Spline Chart */}
            <div style={{ width: '100%', height: '90px', position: 'relative' }}>
              <svg width="100%" height="90" viewBox="0 0 320 90" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGradPastel" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF705A" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#FF705A" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,70 Q50,55 100,60 T200,40 T260,20 T320,30 L320,90 L0,90 Z"
                  fill="url(#chartGradPastel)"
                />
                <path
                  d="M0,70 Q50,55 100,60 T200,40 T260,20 T320,30"
                  fill="none"
                  stroke="#FF705A"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle cx="260" cy="20" r="5" fill="#FFFFFF" stroke="#FF705A" strokeWidth="3" />
              </svg>
              <div style={{
                position: 'absolute',
                top: '0px',
                right: '48px',
                background: '#192838',
                color: '#FFFFFF',
                fontSize: '11px',
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: 'var(--radius-full)'
              }}>
                520
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '11px', color: 'var(--text-dim)' }}>
              <span>Пн</span><span>Вт</span><span>Ср</span><span>Чт</span><span>Пт</span><span>Сб</span><span>Вс</span>
            </div>
          </div>

          {/* CARD 2: Activity Rings */}
          <div className="glass-card" style={{ padding: '18px 20px', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 800, marginBottom: '14px', color: 'var(--text-main)' }}>
              Кольца активности
            </h3>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              {/* Concentric Rings */}
              <div style={{ position: 'relative', width: '92px', height: '92px', flexShrink: 0 }}>
                <svg width="92" height="92" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
                  {/* Outer Coral Ring */}
                  <circle cx="50" cy="50" r="42" fill="transparent" stroke="#FFEAE5" strokeWidth="7" />
                  <circle cx="50" cy="50" r="42" fill="transparent" stroke="#FF705A" strokeWidth="7" strokeDasharray="263" strokeDashoffset="55" strokeLinecap="round" />
                  
                  {/* Middle Teal Ring */}
                  <circle cx="50" cy="50" r="32" fill="transparent" stroke="#E3F5F2" strokeWidth="7" />
                  <circle cx="50" cy="50" r="32" fill="transparent" stroke="#3DAFA1" strokeWidth="7" strokeDasharray="201" strokeDashoffset="50" strokeLinecap="round" />

                  {/* Inner Purple Ring */}
                  <circle cx="50" cy="50" r="22" fill="transparent" stroke="#F0EDFE" strokeWidth="7" />
                  <circle cx="50" cy="50" r="22" fill="transparent" stroke="#8E7CF7" strokeWidth="7" strokeDasharray="138" strokeDashoffset="30" strokeLinecap="round" />
                </svg>
              </div>

              {/* Legend */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FF705A' }} />
                    Движение
                  </span>
                  <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>520 / 600 ккал</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3DAFA1' }} />
                    Тренировка
                  </span>
                  <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>45 / 60 мин</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#8E7CF7' }} />
                    Разминки
                  </span>
                  <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>10 / 12 ч</span>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 3: Steps Card */}
          <div className="glass-card" style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Шаги сегодня</div>
              <div style={{ fontSize: '22px', fontWeight: 900, color: 'var(--text-main)', marginTop: '2px' }}>
                8 752 <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)' }}>шагов</span>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--primary-teal-dark)', fontWeight: 700, marginTop: '2px' }}>
                ▲ 8% в последнюю неделю
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '32px' }}>
              {[16, 24, 30, 26, 32, 20, 28].map((h, i) => (
                <div
                  key={i}
                  style={{
                    width: '6px',
                    height: `${h}px`,
                    borderRadius: 'var(--radius-full)',
                    background: i === 4 ? '#FF705A' : '#3DAFA1'
                  }}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        /* WEEKLY CHECK-IN FORM */
        <div>
          {showAdaptiveAlert && (
            <div className="glass-card" style={{
              background: 'var(--amber-light)',
              borderColor: 'rgba(247, 163, 75, 0.4)',
              padding: '16px',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-amber)', fontWeight: 800, marginBottom: '6px' }}>
                <AlertCircle size={20} />
                <span>Плато веса: вес не снизился за неделю</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-main)', marginBottom: '14px' }}>
                Рекомендация: применить адаптивный дефицит <b>-100 ккал</b> для возобновления сжигания жира.
              </p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={applyCalorieAdjustment} className="btn-teal" style={{ padding: '10px', fontSize: '13px' }}>
                  Применить (-100 ккал)
                </button>
                <button onClick={() => setIsSaved(true)} className="btn-liquid" style={{ padding: '10px', fontSize: '13px' }}>
                  Оставить
                </button>
              </div>
            </div>
          )}

          {isSaved ? (
            <div className="glass-card" style={{ textAlign: 'center', padding: '28px 18px' }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                background: 'var(--primary-teal-light)',
                color: 'var(--primary-teal-dark)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px'
              }}>
                <Check size={26} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-main)' }}>Отчёт зафиксирован!</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '6px 0 16px' }}>
                Графики и стрик обновлены.
              </p>
              <button onClick={() => { setIsSaved(false); setActiveSubTab('activity'); }} className="btn-teal">
                Смотреть графики
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="glass-card" style={{ padding: '16px', marginBottom: '14px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-main)' }}>
                  <Scale size={16} color="var(--primary-teal)" />
                  <span>Замеры тела (см и кг)</span>
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {[
                    { label: 'Вес (кг)', val: weight, setter: setWeight },
                    { label: 'Талия (см)', val: waist, setter: setWaist },
                    { label: 'Грудь (см)', val: chest, setter: setChest },
                    { label: 'Бицепс (см)', val: biceps, setter: setBiceps }
                  ].map((field, idx) => (
                    <div key={idx}>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px' }}>
                        {field.label}
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={field.val}
                        onChange={(e) => field.setter(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '9px 12px',
                          background: '#FFFFFF',
                          border: '1px solid rgba(0, 0, 0, 0.08)',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '14px',
                          fontWeight: 700,
                          color: 'var(--text-main)',
                          outline: 'none'
                        }}
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Photo Fixation */}
              <div className="glass-card" style={{ padding: '16px', marginBottom: '18px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-main)' }}>
                  <Camera size={16} color="var(--accent-coral)" />
                  <span>Фото-фиксация (3 ракурса)</span>
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                  {[
                    { key: 'front', label: 'Спереди' },
                    { key: 'side', label: 'Сбоку' },
                    { key: 'back', label: 'Сзади' }
                  ].map(item => (
                    <label
                      key={item.key}
                      style={{
                        aspectRatio: '3/4',
                        borderRadius: 'var(--radius-sm)',
                        border: '2px dashed #C8D8D6',
                        background: photos[item.key] ? `url(${photos[item.key]}) center/cover` : '#FFFFFF',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        overflow: 'hidden',
                        textAlign: 'center',
                        padding: '4px'
                      }}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handlePhotoChange(item.key, e)}
                        style={{ display: 'none' }}
                      />
                      {!photos[item.key] && (
                        <>
                          <Camera size={16} color="var(--text-muted)" />
                          <span style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>{item.label}</span>
                        </>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              <button type="submit" className="btn-teal">
                Сохранить отчет за неделю
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
