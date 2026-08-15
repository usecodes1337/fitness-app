import React, { useState } from 'react';
import { BookOpen, Moon, Pill, Zap, ChevronRight, X, Sparkles } from 'lucide-react';

const ARTICLES = [
  {
    id: 1,
    title: '🔥 Главный секрет сушки: Реальный дефицит vs Замедление метаболизма',
    category: 'Сушка & Калории',
    icon: Zap,
    badgeColor: 'badge-teal',
    content: `Жир горит ТОЛЬКО при дефиците калорий. Однако слишком жесткий дефицит (>30%) заставляет организм сжигать мышечную ткань и замедлять обмен веществ.

Ключевые правила:
1. Держи дефицит на уровне 15-20% от TDEE.
2. Белок 1.8-2.2г на кг веса сохраняет мышцы и дает длительное насыщение.
3. Еженедельно отслеживай вес. Если вес стоит 2 недели подряд — урезай калораж на 5-7% (100 ккал).`
  },
  {
    id: 2,
    title: '😴 Сон 7-8 часов: Гормон роста и контроль кортизола',
    category: 'Восстановление',
    icon: Moon,
    badgeColor: 'badge-purple',
    content: `При хроническом недосыпе (<6 часов):
- Уровень кортизола возрастает, провоцируя отечность и задержку воды.
- Снижается чувствительность к инсулину, появляется тяга к простым сахарам.
- Снижается секреция соматотропина (гормона роста), сжигающего жир ночью.

Лайфхак: за 1 час до сна отключай синий свет смартфона или переводи экран в теплый режим.`
  },
  {
    id: 3,
    title: '💊 Гайд по БАДам для рельефа: Что реально работает',
    category: 'Спортивное питание',
    icon: Pill,
    badgeColor: 'badge-coral',
    content: `ТОП рабочих добавок:
1. Креатин моногидрат (3-5г в день) — сохраняет силовые показатели и объем мышц на дефиците.
2. Протеин (сывороточный / изолят) — удобный способ добрать норму белка.
3. Омега-3 (1.5-2г EPA/DHA) — снижает воспаления, поддерживает суставы.
4. Магний B6 (на ночь) — улучшает фазу глубокого сна и снимает напряжение.`
  }
];

export default function KnowledgeBase() {
  const [activeArticle, setActiveArticle] = useState(null);

  return (
    <div className="animate-fade-in" style={{ padding: '16px 18px 20px', width: '100%' }}>
      <div style={{ marginBottom: '16px' }}>
        <h2 style={{ fontSize: '26px', fontWeight: 800 }}>База знаний</h2>
        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
          Научные гайды по сушке, сну и добавкам
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {ARTICLES.map(art => {
          const Icon = art.icon;
          return (
            <div
              key={art.id}
              onClick={() => setActiveArticle(art)}
              className="glass-card"
              style={{
                padding: '16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '14px'
              }}
            >
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '14px',
                background: 'var(--teal-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                color: 'var(--primary-teal-dark)'
              }}>
                <Icon size={20} />
              </div>

              <div style={{ flex: 1 }}>
                <span className={`badge ${art.badgeColor}`} style={{ fontSize: '10px', padding: '2px 8px', marginBottom: '4px' }}>
                  {art.category}
                </span>
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.3 }}>
                  {art.title}
                </h3>
              </div>

              <ChevronRight size={18} color="var(--text-dim)" />
            </div>
          );
        })}
      </div>

      {/* Article Detail Modal */}
      {activeArticle && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 200,
          background: 'rgba(20, 35, 50, 0.65)',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div className="glass-card animate-fade-in" style={{
            width: '100%',
            maxWidth: '420px',
            maxHeight: '85vh',
            overflowY: 'auto',
            padding: '24px',
            background: '#FFFFFF'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span className={`badge ${activeArticle.badgeColor}`}>{activeArticle.category}</span>
              <button onClick={() => setActiveArticle(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '14px', lineHeight: 1.3 }}>
              {activeArticle.title}
            </h3>
            
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', whiteSpace: 'pre-line', lineHeight: 1.6 }}>
              {activeArticle.content}
            </div>

            <button onClick={() => setActiveArticle(null)} className="btn-primary" style={{ marginTop: '20px' }}>
              Понятно
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
