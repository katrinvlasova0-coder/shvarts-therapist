import { useEffect, useState } from 'react';
import { Image } from '@/components/ui/image';

const HERO_IMG = 'https://media.base44.com/images/public/6a9847b2923d3b4ff598cb9a/2f133727f_sdelai-vse-cherno-belym_N8EeXy1oURK0qUkfY9j2ug_lJOqrI8jTU-EzNIg0s1zlg_cover.png';

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 14;
      setOffset(x);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="relative min-h-[100svh] w-full overflow-hidden bg-void">
      <div
        className="absolute inset-0 transition-opacity duration-[2000ms]"
        style={{ opacity: loaded ? 1 : 0 }}
      >
        <div className="absolute inset-0 animate-slow-zoom">
          <Image
            src={HERO_IMG}
            alt="ШВАРЦ ЧÖРНЫЙ — портрет"
            fittingType="fill"
            className="w-full h-full object-cover grayscale contrast-125"
            quality={60}
            onLoad={() => setLoaded(true)}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-void via-void/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/30 to-void/60" />
      </div>

      <div className="relative z-10 min-h-[100svh] flex flex-col justify-between px-5 md:px-10 pt-14 md:pt-24 pb-10">
        <div className="flex-1 flex flex-col justify-center max-w-[1400px]">
          <div className="overflow-hidden">
            <h1
              className="text-bone font-black tracking-mega leading-[0.85] animate-fade-in whitespace-nowrap"
              style={{ fontSize: 'clamp(1.6rem, 9vw, 9rem)' }}
            >
              <span className="block md:inline">ШВАРЦ</span>
              <span className="block md:inline md:ml-6 mt-2 md:mt-0">ЧÖРНЫЙ</span>
            </h1>
          </div>

          <div className="mt-4 md:mt-8 overflow-hidden">
            <p
              className="text-bone/80 text-xl md:text-3xl animate-fade-in"
              style={{ animationDelay: '250ms', opacity: 0 }}
            >
              Брутальный психолог
              <br />
              Для экстремальных запросов.
            </p>
          </div>

          <div className="mt-24 md:mt-32 overflow-hidden">
            <h2
              className="font-serif-display text-bone"
              style={{ fontSize: 'clamp(1.6rem, 9vw, 9rem)', animationDelay: '600ms', lineHeight: '0.9' }}
            >
              Программа:
              <br />
              Выйди из Тени.
            </h2>
          </div>

          <p
            className="mt-6 md:mt-8 max-w-xl text-bone/90 text-lg md:text-xl leading-relaxed animate-fade-in"
            style={{ animationDelay: '600ms', opacity: 0, textShadow: '0 2px 18px rgba(0,0,0,0.95), 0 0 40px rgba(0,0,0,0.85)' }}
          >
            Работа с негативными, табуированными и деструктивными сторонами Личности.
            <br className="hidden md:block" />
            Кризисными и терминальными фазами в жизни, отношениях, бизнесе.
          </p>

          <div
            className="mt-16 md:mt-20 flex flex-col sm:flex-row gap-4 animate-fade-in"
            style={{ animationDelay: '900ms', opacity: 0 }}
          >
            <button onClick={() => scrollTo('case-form')} className="btn-monolith btn-monolith-solid">
              Записаться на консультацию
            </button>
            <button onClick={() => scrollTo('case-form')} className="btn-monolith">
              Поделиться кейсом
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}