import React, { useState } from 'react';
import {
  Search, SlidersHorizontal, ChevronRight, Play, ArrowLeft,
  RefreshCw, Check, Clock, Flame, ShieldCheck, Dumbbell, Sparkles, X
} from 'lucide-react';
import { EXERCISE_DATABASE } from '../utils/storage';

export default function WorkoutProgram({ profile, onCompleteSession }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [activeSwapExercise, setActiveSwapExercise] = useState(null);
  const [isWorkoutCompleted, setIsWorkoutCompleted] = useState(false);

  const [workoutPlans, setWorkoutPlans] = useState([
    {
      id: 'w1',
      title: 'Full Body Strength',
      category: 'Strength',
      location: 'Gym',
      duration: '45 мин',
      calories: '320 ккал',
      level: 'Средний',
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80',
      exercises: [
        { name: 'Кубковые приседания (Goblet Squat)', sets: '4 подхода x 12 повторений', image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=150&q=80', alternatives: ['Ягодичный мостик с весом', 'Выпады на месте без веса'] },
        { name: 'Отжимания от пола / с колен', sets: '4 подхода x 15 повторений', image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=150&q=80', alternatives: ['Жим гантелей лежа', 'Отжимания от возвышения'] },
        { name: 'Тяга гантелей к поясу в наклоне', sets: '4 подхода x 12 повторений', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=150&q=80', alternatives: ['Тяга фитнес-резинки', 'Гиперэкстензия на полу'] },
        { name: 'Планка на предплечьях', sets: '3 подхода x 45 секунд', image: 'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?auto=format&fit=crop&w=150&q=80', alternatives: ['Мертвый жук (Deadbug)', 'Боковая планка'] }
      ]
    },
    {
      id: 'w2',
      title: 'HIIT Fat Burn',
      category: 'HIIT',
      location: 'Home',
      duration: '25 мин',
      calories: '300 ккал',
      level: 'Интенсивный',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80',
      exercises: [
        { name: 'Динамическая планка', sets: '4 раунда x 40 сек', image: 'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?auto=format&fit=crop&w=150&q=80', alternatives: ['Классическая планка', 'Плечевые касания'] },
        { name: 'Воздушные приседания в темпе', sets: '4 раунда x 20 повторений', image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=150&q=80', alternatives: ['Ягодичный мостик', 'Шаги на возвышение'] },
        { name: 'Боковые выпады', sets: '4 раунда x 15 на сторону', image: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=150&q=80', alternatives: ['Отведение ноги стоя', 'Махи назад'] }
      ]
    },
    {
      id: 'w3',
      title: 'Core Crusher (Пресс)',
      category: 'Cardio',
      location: 'Home',
      duration: '20 мин',
      calories: '180 ккал',
      level: 'Начальный',
      image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=600&q=80',
      exercises: [
        { name: 'Скручивания на пресс', sets: '4 подхода x 20 повторений', image: 'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?auto=format&fit=crop&w=150&q=80', alternatives: ['Вакуум живота', 'Мертвый жук'] },
        { name: 'Подъемы ног лежа', sets: '4 подхода x 15 повторений', image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=150&q=80', alternatives: ['Обратные скручивания', 'Ножницы'] }
      ]
    }
  ]);

  const handleSwapExercise = (exerciseToSwap, newName) => {
    setWorkoutPlans(prev => prev.map(w => {
      if (w.id === activeWorkout.id) {
        const updatedEx = w.exercises.map(ex => ex.name === exerciseToSwap.name ? { ...ex, name: newName } : ex);
        const updatedWorkout = { ...w, exercises: updatedEx };
        setActiveWorkout(updatedWorkout);
        return updatedWorkout;
      }
      return w;
    }));
    setActiveSwapExercise(null);
  };

  // SINGLE WORKOUT DETAIL VIEW
  if (activeWorkout) {
    return (
      <div className="animate-fade-in" style={{ padding: '16px 18px 20px', width: '100%' }}>
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <button
            onClick={() => setActiveWorkout(null)}
            className="btn-liquid"
            style={{ width: '38px', height: '38px', padding: 0, borderRadius: '50%' }}
          >
            <ArrowLeft size={18} color="var(--text-main)" />
          </button>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-main)' }}>{activeWorkout.title}</h2>
          <div style={{ width: '38px' }} />
        </div>

        {/* Hero Workout Banner */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '180px',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          marginBottom: '14px',
          boxShadow: '0 12px 28px rgba(24, 40, 56, 0.1)'
        }}>
          <img
            src={activeWorkout.image}
            alt={activeWorkout.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(25, 40, 56, 0.6) 0%, rgba(0, 0, 0, 0.1) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary-teal)',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
              cursor: 'pointer'
            }}>
              <Play size={24} fill="var(--primary-teal)" />
            </div>
          </div>
        </div>

        {/* 3 Metric Pills */}
        <div className="glass-card" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '8px',
          padding: '14px 16px',
          marginBottom: '16px',
          textAlign: 'center'
        }}>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Длительность</div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-main)', marginTop: '2px' }}>
              {activeWorkout.duration}
            </div>
          </div>
          <div style={{ borderLeft: '1px solid rgba(0, 0, 0, 0.06)', borderRight: '1px solid rgba(0, 0, 0, 0.06)' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Калории</div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--accent-coral)', marginTop: '2px' }}>
              {activeWorkout.calories}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Уровень</div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary-teal-dark)', marginTop: '2px' }}>
              {activeWorkout.level}
            </div>
          </div>
        </div>

        {/* Exercises Section */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-main)' }}>Список упражнений ({activeWorkout.exercises.length})</h3>
            <span className="badge badge-teal" style={{ fontSize: '11px' }}>
              GIF + Текст
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {activeWorkout.exercises.map((ex, i) => (
              <div
                key={i}
                className="glass-card"
                style={{
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <img
                  src={ex.image}
                  alt={ex.name}
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: 'var(--radius-sm)',
                    objectFit: 'cover'
                  }}
                />

                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.25 }}>
                    {ex.name}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {ex.sets}
                  </div>
                </div>

                {/* Swap Button */}
                <button
                  onClick={() => setActiveSwapExercise(ex)}
                  className="btn-liquid"
                  style={{
                    padding: '5px 10px',
                    fontSize: '11px',
                    color: 'var(--primary-teal-dark)',
                    borderColor: 'rgba(61, 175, 161, 0.3)'
                  }}
                >
                  <RefreshCw size={11} />
                  <span>Замена</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Start / Finish Workout Button */}
        <button
          onClick={() => {
            setIsWorkoutCompleted(true);
            if (onCompleteSession) onCompleteSession();
            alert('🎉 Тренировка выполнена и зачтена в чек-лист дня!');
          }}
          className={isWorkoutCompleted ? 'btn-liquid' : 'btn-teal'}
          style={{ padding: '15px', fontSize: '15px' }}
        >
          {isWorkoutCompleted ? (
            <>
              <Check size={18} color="var(--primary-teal-dark)" />
              <span>Тренировка завершена ✅</span>
            </>
          ) : (
            <span>Завершить тренировку (+320 ккал)</span>
          )}
        </button>

        {/* Swap Modal */}
        {activeSwapExercise && (
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
            <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '380px', padding: '24px', background: '#FFFFFF' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-main)' }}>Заменить упражнение</h3>
                <button onClick={() => setActiveSwapExercise(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  <X size={18} />
                </button>
              </div>

              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '14px' }}>
                Безопасные альтернативы для <b>{activeSwapExercise.name}</b>:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                {activeSwapExercise.alternatives.map((altName, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSwapExercise(activeSwapExercise, altName)}
                    className="btn-liquid"
                    style={{
                      padding: '12px 14px',
                      justifyContent: 'space-between',
                      fontSize: '13px',
                      textAlign: 'left'
                    }}
                  >
                    <span>{altName}</span>
                    <ChevronRight size={16} color="var(--primary-teal)" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // WORKOUTS LIST VIEW
  const filteredWorkouts = workoutPlans.filter(w => {
    if (selectedCategory !== 'All' && w.category !== selectedCategory) return false;
    if (searchQuery && !w.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="animate-fade-in" style={{ padding: '16px 18px 20px', width: '100%' }}>
      <div style={{ marginBottom: '16px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-main)' }}>Тренировки</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
          Адаптировано: {profile?.workoutLocation === 'home' ? 'Дома' : 'В зале'} • Без осевых нагрузок
        </p>
      </div>

      {/* Search Bar in Glass */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
        <div className="glass-card" style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '10px 16px',
          borderRadius: 'var(--radius-full)'
        }}>
          <Search size={18} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Поиск тренировок..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              border: 'none',
              background: 'transparent',
              outline: 'none',
              width: '100%',
              fontSize: '14px',
              color: 'var(--text-main)'
            }}
          />
        </div>
        <button className="btn-liquid" style={{ width: '42px', height: '42px', padding: 0, borderRadius: '50%' }}>
          <SlidersHorizontal size={18} color="var(--text-main)" />
        </button>
      </div>

      {/* Pill Category Tabs */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '6px', marginBottom: '14px' }}>
        {['All', 'Strength', 'Cardio', 'HIIT'].map(cat => {
          const labels = { All: 'Все', Strength: 'Силовые', Cardio: 'Кардио', HIIT: 'Жиросжигание' };
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`pill-tab ${isActive ? 'active' : ''}`}
            >
              {labels[cat]}
            </button>
          );
        })}
      </div>

      {/* Workout Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredWorkouts.map(workout => (
          <div
            key={workout.id}
            onClick={() => setActiveWorkout(workout)}
            className="glass-card"
            style={{
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '14px',
              cursor: 'pointer'
            }}
          >
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-main)' }}>
                {workout.title}
              </h3>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '4px 0 10px' }}>
                {workout.duration} / {workout.calories}
              </div>
              
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'var(--primary-teal-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary-teal-dark)'
              }}>
                <ChevronRight size={16} />
              </div>
            </div>

            <img
              src={workout.image}
              alt={workout.title}
              style={{
                width: '105px',
                height: '90px',
                borderRadius: 'var(--radius-md)',
                objectFit: 'cover'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
