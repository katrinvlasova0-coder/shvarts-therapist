import { useEffect, useState } from 'react';
import { useReveal } from '@/hooks/useReveal';
import { base44 } from '@/api/base44Client';

const FALLBACK_REVIEWS = [
  {
    author: 'Аноним',
    role: 'CEO, финтех',
    text: 'ШВАРЦ не «лечит». Он реструктурирует. За три сессии я разобрал созависимость, которая тянулась годами, и закрыл сделку, которую откладывал полгода.',
  },
  {
    author: 'Клиент под псевдонимом «Вектор»',
    role: 'Основатель холдинга',
    text: 'Это не психотерапия в привычном смысле. Это аудит Личности. Жёстко, точно, без жалости к себе. После — ясно, как на рассвете.',
  },
  {
    author: 'Пара, 11 лет в браке',
    role: 'Сопровождение отношений',
    text: 'Мы пришли на медиацию перед разводом. Ушли с пересобранной сделкой жизни. Амальгама работает там, где юристы и психологи разводят руками.',
  },
];

export default function Reviews() {
  const [ref, visible] = useReveal();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Review.filter({ is_published: true }, 'sort_order', 50)
      .then((data) => setReviews(Array.isArray(data) ? data : []))
      .catch(() => setReviews([]))
      .finally(() => setLoading(false));
  }, []);

  const items = reviews.length > 0 ? reviews : FALLBACK_REVIEWS;

  return (
    <section id="reviews" ref={ref} className="relative bg-void py-24 md:py-40 px-5 md:px-10 border-t border-border">
      <div className="max-w-[1400px] mx-auto">
        <div className={`reveal ${visible ? 'is-visible' : ''}`}>
          <span className="text-[10px] uppercase tracking-[0.3em] text-steel">Кейсы / отзывы</span>
          <h2
            className="mt-6 text-bone font-black tracking-tightest leading-[0.9]"
            style={{ fontSize: 'clamp(2rem, 7vw, 7rem)' }}
          >
            СЛОВА ТЕХ, КТО
            <br />
            ВЫШЕЛ ИЗ ТЕНИ
          </h2>
        </div>

        {loading ? (
          <div className="mt-16 h-32 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-border border-t-bone rounded-full animate-spin" />
          </div>
        ) : (
          <div className="mt-16 md:mt-24 relative overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-void to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-void to-transparent z-10 pointer-events-none" />
            <div className="flex w-max animate-marquee-rtl marquee-track">
              {[...items, ...items].map((r, i) => (
                <ReviewCard key={i} review={r} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function ReviewCard({ review }) {
  return (
    <div className="shrink-0 w-[80vw] sm:w-[420px] md:w-[460px] mx-3 md:mx-4 border border-border bg-shadow-1 p-8 md:p-10 flex flex-col h-full">
      <span className="text-gold font-serif-display text-5xl leading-none select-none" aria-hidden>«</span>
      <p className="mt-4 text-bone font-medium leading-relaxed tracking-tight flex-1" style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)' }}>
        {review.text}
      </p>
      <div className="mt-8 pt-6 border-t border-border">
        <p className="text-bone text-sm md:text-base uppercase tracking-[0.15em] font-semibold">{review.author}</p>
        {review.role ? (
          <p className="mt-1 text-steel text-xs uppercase tracking-[0.2em]">{review.role}</p>
        ) : null}
      </div>
    </div>
  );
}