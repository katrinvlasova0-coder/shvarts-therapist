import { useEffect, useState } from 'react';
import { useReveal } from '@/hooks/useReveal';
import { base44 } from '@/api/base44Client';

const DEFAULT_FORMATS = [
  { title: 'Индивидуальная консультация', price: '', duration: '' },
  { title: 'Работа с парой', price: '', duration: '' },
  { title: 'Работа с бизнес-кейсом', price: '', duration: '' },
  { title: 'Медиация', price: '', duration: '' },
  { title: 'Долгосрочное сопровождение', price: '', duration: '' },
  { title: 'Другой запрос', price: '', duration: '' },
];

export default function Formats() {
  const [ref, visible] = useReveal();
  const [formats, setFormats] = useState(DEFAULT_FORMATS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.ConsultationFormat.list('sort_order', 50)
      .then((data) => {
        if (Array.isArray(data) && data.length) setFormats(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section ref={ref} className="relative bg-void py-24 md:py-40 px-5 md:px-10 border-t border-border">
      <div className="max-w-[1400px] mx-auto">
        <div className={`reveal ${visible ? 'is-visible' : ''}`}>
          <span className="text-[10px] uppercase tracking-[0.3em] text-steel">09 — Форматы обращения</span>
          <h2 className="mt-6 text-bone font-black tracking-tightest leading-[0.9]" style={{ fontSize: 'clamp(2rem, 7vw, 7rem)' }}>
            Форматы
          </h2>
        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
          {formats.map((f, i) => (
            <button
              key={i}
              onClick={() => scrollTo('case-form')}
              className={`group bg-void p-8 md:p-10 text-left hover:bg-shadow-1 transition-colors duration-500 reveal ${visible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className="text-steel text-xs tracking-[0.2em]">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-6 text-bone text-xl md:text-2xl font-bold tracking-tight leading-tight">{f.title}</h3>
              <div className="mt-6 flex items-center gap-6 text-steel text-sm">
                {f.duration && <span>{f.duration}</span>}
                {f.price && <span className="text-bone">{f.price}</span>}
              </div>
              <span className="mt-8 inline-block text-[10px] uppercase tracking-[0.25em] text-steel group-hover:text-bone transition-colors">
                Записаться →
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}