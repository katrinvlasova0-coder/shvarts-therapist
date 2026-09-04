import { useReveal } from '@/hooks/useReveal';
import { Image } from '@/components/ui/image';

const IMG = 'https://media.base44.com/images/public/6a9847b2923d3b4ff598cb9a/0fe9752ff_generated_24186f58.jpg';

export default function ExitShadow() {
  const [ref, visible] = useReveal();

  return (
    <section id="shadow" ref={ref} className="relative bg-void overflow-hidden">
      <div className="relative min-h-[100vh] flex items-center">
        <div className="absolute inset-0">
          <Image src={IMG} alt="Выйди из Тени" fittingType="fill" className="w-full h-full object-cover grayscale contrast-125 opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-b from-void via-transparent to-void" />
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 md:px-10 py-32">
          <div className={`reveal ${visible ? 'is-visible' : ''}`}>
            <span className="text-[10px] uppercase tracking-[0.3em] text-steel">03 — Тень</span>
            <h2
              className="mt-6 text-bone font-black tracking-mega leading-[0.82]"
              style={{ fontSize: 'clamp(3rem, 16vw, 16rem)' }}
            >
              Выйди
              <br />
              из Тени.
            </h2>
            <p className="mt-10 max-w-xl text-bone/70 text-lg md:text-xl leading-relaxed">
              Работа с негативными, табуированными и деструктивными сторонами Личности.
            </p>
          </div>

          <div className="mt-20 flex flex-col md:flex-row gap-8 md:gap-16 text-steel">
            <Phase label="ТЬМА" n="I" />
            <Phase label="ПОЛУТЕНЬ" n="II" />
            <Phase label="СВЕТ" n="III" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Phase({ label, n }) {
  return (
    <div className="flex-1">
      <span className="text-[10px] tracking-[0.3em] text-steel/60">{n}</span>
      <p className="mt-2 text-2xl md:text-4xl font-bold tracking-tight text-bone">{label}</p>
      <div className="mt-4 h-px w-full bg-border" />
    </div>
  );
}