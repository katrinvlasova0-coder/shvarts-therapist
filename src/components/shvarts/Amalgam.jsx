import { useReveal } from '@/hooks/useReveal';
import { Image } from '@/components/ui/image';
import { Link } from 'react-router-dom';
import { TRADITIONS } from './traditions';

const IMG = 'https://media.base44.com/images/public/6a9847b2923d3b4ff598cb9a/ca813cefe_generated_60ecee67.jpg';

export default function Amalgam() {
  const [ref, visible] = useReveal();

  return (
    <section id="amalgam" ref={ref} className="relative bg-void overflow-hidden py-24 md:py-40 px-5 md:px-10">
      <div className="absolute inset-0 opacity-25">
        <Image src={IMG} alt="Амальгама" fittingType="fill" quality={55} className="w-full h-full object-cover grayscale contrast-125" />
        <div className="absolute inset-0 bg-gradient-to-b from-void via-transparent to-void" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto">
        <div className={`reveal ${visible ? 'is-visible' : ''}`}>
          <h2
            className="text-bone font-black tracking-mega leading-[0.85]"
            style={{ fontSize: 'clamp(1.75rem, 6vw, 6rem)' }}
          >
            АВТОРСКИЙ МЕТОД:
          </h2>
          <h3
            className="mt-2 text-bone font-black tracking-mega leading-[0.82]"
            style={{ fontSize: 'clamp(2.5rem, 11vw, 10rem)' }}
          >
            АМАЛЬГАМА
          </h3>
        </div>

        <div className="mt-16 md:mt-24 grid md:grid-cols-2 gap-10 md:gap-20 items-start">
          <p className={`font-serif-display text-bone/85 text-2xl md:text-4xl leading-snug reveal ${visible ? 'is-visible' : ''}`} style={{ transitionDelay: '200ms' }}>
            Амальгама современных психотерапевтических школ и подходов, с вековыми традициями буддизма, суфизма, мистического иудаизма, синтоизма и дзен.
          </p>
          <div className={`reveal ${visible ? 'is-visible' : ''}`} style={{ transitionDelay: '400ms' }}>
            <span className="text-[10px] uppercase tracking-[0.3em] text-steel">Как это работает:</span>
            <ul className="mt-6 divide-y divide-border border-y border-border">
              {TRADITIONS.map((t, i) => (
                <li key={t.slug}>
                  <Link to={`/amalgam/${t.slug}`} className="group py-5 flex items-center justify-between">
                    <span className="text-bone text-lg md:text-xl tracking-tight transition-transform duration-500 group-hover:translate-x-2">{t.name}</span>
                    <span className="text-steel text-xs uppercase tracking-[0.2em] group-hover:text-gold transition-colors duration-500">Читать →</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}