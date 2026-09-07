import { useReveal } from '@/hooks/useReveal';
import { Image } from '@/components/ui/image';
import { useLang } from '@/i18n/LanguageContext';

const IMG = 'https://media.base44.com/images/public/6a9847b2923d3b4ff598cb9a/0734e5452_high-level-description-a-noir-photograph_SaRKUzGnWjimZOsPXMaoIw_tE888KtFRvqEdJB06Y_n6w1.png';

const BIO = {
  ru: [
    'Выпускник МГУ им. М.В. Ломоносова',
    'Кандидат философских наук и религиоведения',
    'Психолог',
    'Основатель Международного Исследовательского Центра Русален',
    'Основатель Научно-Исследовательского поселения психологов PSYTY',
    'Основатель Научно-исследовательского института изучения природы Денег (НИИ Денег)',
    'Инструктор йоги и учитель Дхармы',
    'Социальный предприниматель.',
  ],
  en: [
    'Graduate of Lomonosov Moscow State University',
    'Candidate of Sciences in Philosophy and Religious Studies',
    'Psychologist',
    'Founder of the International Research Center Rusalen',
    'Founder of the PSYTY Research Settlement of Psychologists',
    'Founder of the Research Institute for the Study of the Nature of Money',
    'Yoga instructor and Dharma teacher',
    'Social entrepreneur.',
  ],
};

export default function About() {
  const [ref, visible] = useReveal();
  const { lang } = useLang();
  const en = lang === 'en';
  const bio = BIO[lang];

  return (
    <section id="about" ref={ref} className="relative bg-void overflow-hidden">
      <div className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <Image src={IMG} alt="ШВАРЦ ЧÖРНЫЙ" fittingType="fill" quality={55} className="w-full h-full object-cover grayscale contrast-125 opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-r from-void via-void/70 to-void/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/40" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-10 py-24 w-full">
          <div className={`max-w-2xl reveal ${visible ? 'is-visible' : ''}`}>
            <h2 className="text-bone font-black tracking-tightest leading-[0.9] whitespace-nowrap" style={{ fontSize: 'clamp(2rem, 6vw, 6rem)', textShadow: '0 4px 30px rgba(0,0,0,0.9)' }}>
              {en ? 'SHVARTS BLACK' : 'ШВАРЦ ЧÖРНЫЙ'}
            </h2>
            <p className="mt-4 font-serif-display text-bone/80 text-lg md:text-xl leading-snug" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.9)' }}>
              {en ? (
                <>
                  <span className="lg:whitespace-nowrap">A long-standing practitioner of managing personal, business, reputational, relational</span>{' '}
                  and existential crises.
                </>
              ) : (
                <>
                  <span className="lg:whitespace-nowrap">Многолетний практик управления личностными, деловыми, репутационными, отношенческими</span>{' '}
                  и экзистенциальными кризисами.
                </>
              )}
            </p>
          </div>
          <ul className="mt-10 max-w-2xl divide-y divide-border/60 border-y border-border/60">
            {bio.map((line, i) => (
              <li
                key={i}
                className={`group py-4 flex items-start gap-5 reveal ${visible ? 'is-visible' : ''}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className="pt-1 w-6 shrink-0 flex justify-center">
                  <svg width="10" height="10" viewBox="0 0 10 10" className="text-steel group-hover:text-gold transition-colors duration-500 animate-spin-slow" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <rect x="0.6" y="0.6" width="8.8" height="8.8" transform="rotate(45 5 5)" />
                  </svg>
                </span>
                <span className="text-bone text-base md:text-lg leading-snug" style={{ textShadow: '0 2px 16px rgba(0,0,0,0.9)' }}>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}