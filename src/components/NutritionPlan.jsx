import React, { useState } from 'react';
import {
  Utensils, Flame, Check, Plus, ShoppingBag, ArrowLeft,
  ChevronRight, Sparkles, BookOpen
} from 'lucide-react';

export default function NutritionPlan({ profile }) {
  const targetCals = profile?.kbju?.targetCalories || 1950;
  const p = profile?.kbju?.proteinGrams || 140;
  const f = profile?.kbju?.fatGrams || 60;
  const c = profile?.kbju?.carbGrams || 180;

  const [meals, setMeals] = useState([
    {
      id: 'm1',
      type: 'Завтрак',
      name: 'Овсяноблин с ягодами и яйца всмятку',
      calories: 450,
      image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=150&q=80',
      checked: true
    },
    {
      id: 'm2',
      type: 'Обед',
      name: 'Филе индейки с гречкой и свежим салатом',
      calories: 550,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=150&q=80',
      checked: true
    },
    {
      id: 'm3',
      type: 'Ужин',
      name: 'Запеченная горбуша со стручковой фасолью',
      calories: 450,
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=150&q=80',
      checked: false
    },
    {
      id: 'm4',
      type: 'Перекус',
      name: 'Греческий йогурт 2% с миндалем',
      calories: 150,
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=150&q=80',
      checked: false
    }
  ]);

  const loggedCalories = meals.filter(m => m.checked).reduce((sum, m) => sum + m.calories, 0);
  const progressPercent = Math.min(100, Math.round((loggedCalories / targetCals) * 100));

  const toggleMeal = (id) => {
    setMeals(prev => prev.map(m => m.id === id ? { ...m, checked: !m.checked } : m));
  };

  return (
    <div className="animate-fade-in" style={{ padding: '16px 18px 20px', width: '100%' }}>
      {/* Title */}
      <div style={{ marginBottom: '14px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-main)' }}>Питание</h2>
        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          Дневной рацион под дефицит калорий
        </span>
      </div>

      {/* CARD 1: Calorie Goal */}
      <div className="glass-card" style={{ padding: '16px 18px', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>Цель калорий</span>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>
            {loggedCalories.toLocaleString('ru-RU')} / {targetCals.toLocaleString('ru-RU')}
          </span>
        </div>

        <div style={{ fontSize: '24px', fontWeight: 900, color: 'var(--text-main)', marginBottom: '10px' }}>
          {targetCals.toLocaleString('ru-RU')} <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-muted)' }}>ккал</span>
        </div>

        {/* Progress Bar */}
        <div style={{ width: '100%', height: '7px', background: '#E2EBEA', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{
            width: `${progressPercent}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #FF8471 0%, #FF705A 100%)',
            borderRadius: '4px',
            transition: 'width 0.4s ease'
          }} />
        </div>
      </div>

      {/* CARD 2: 3 Macro Mini Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '16px' }}>
        {/* Carbs */}
        <div className="glass-card" style={{ padding: '10px 8px', textAlign: 'center' }}>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 600 }}>Углеводы</div>
          <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-main)', margin: '2px 0 4px' }}>
            {c}г
          </div>
          <span className="badge badge-teal" style={{ fontSize: '9px', padding: '1px 6px' }}>
            45%
          </span>
        </div>

        {/* Protein */}
        <div className="glass-card" style={{ padding: '10px 8px', textAlign: 'center' }}>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 600 }}>Белки</div>
          <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-main)', margin: '2px 0 4px' }}>
            {p}г
          </div>
          <span className="badge badge-coral" style={{ fontSize: '9px', padding: '1px 6px' }}>
            30%
          </span>
        </div>

        {/* Fats */}
        <div className="glass-card" style={{ padding: '10px 8px', textAlign: 'center' }}>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 600 }}>Жиры</div>
          <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-main)', margin: '2px 0 4px' }}>
            {f}г
          </div>
          <span className="badge badge-amber" style={{ fontSize: '9px', padding: '1px 6px' }}>
            25%
          </span>
        </div>
      </div>

      {/* CARD 3: Today's Meals */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-main)' }}>Приемы пищи на сегодня</h3>
          <span style={{ fontSize: '11px', color: 'var(--primary-teal-dark)', fontWeight: 700 }}>
            {meals.filter(m => m.checked).length} из 4 съедено
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {meals.map(meal => (
            <div
              key={meal.id}
              onClick={() => toggleMeal(meal.id)}
              className="glass-card"
              style={{
                padding: '10px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer'
              }}
            >
              <img
                src={meal.image}
                alt={meal.name}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: 'var(--radius-sm)',
                  objectFit: 'cover'
                }}
              />

              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  {meal.type}
                </div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.2 }}>
                  {meal.name}
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  {meal.calories} ккал
                </div>
              </div>

              {/* Round checkmark */}
              <div style={{
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                background: meal.checked ? 'var(--primary-teal)' : '#FFFFFF',
                border: meal.checked ? 'none' : '2px solid #C8D8D6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {meal.checked && <Check size={12} color="#FFFFFF" strokeWidth={3} />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Button */}
      <button
        onClick={() => alert('🛒 Список продуктов: Курица/индейка (800г), Творог 2% (400г), Яйца (1 дес.), Овсянка, Гречка, Овощи, Авокадо.')}
        className="btn-coral"
        style={{ padding: '14px', fontSize: '14px' }}
      >
        <Plus size={18} />
        <span>Список покупок & Рецепты</span>
      </button>
    </div>
  );
}
