import { useReveal } from '@/hooks/useReveal';
import { Image } from '@/components/ui/image';

const IMG = 'https://media.base44.com/images/public/6a9847b2923d3b4ff598cb9a/2ef9eabd6_generated_68f7390e.jpg';

export default function Entrepreneur() {
  const [ref, visible] = useReveal();

  return (
    <section ref={ref} className="relative bg-void overflow-hidden">
      <div className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <Image src={IMG} alt="Предпринимательский опыт" fittingType="fill" quality={55} className="w-full h-full object-cover grayscale contrast-125 opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-void via-void/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-10 py-24 w-full">
          <div className={`max-w-2xl reveal ${visible ? 'is-visible' : ''}`}>
            <span className="text-[10px] uppercase tracking-[0.3em] text-steel">08 — Предпринимательский опыт</span>
            <h2 className="mt-6 text-bone font-black tracking-tightest leading-[0.9]" style={{ fontSize: 'clamp(2rem, 6vw, 6rem)' }}>
              Не кабинетный
              <br />
              психолог.
            </h2>
            <p className="mt-8 text-bone/70 text-lg md:text-xl leading-relaxed font-serif-display">
              Реальный предпринимательский бэкграунд, перенесённый в психологическую практику. Опыт кризисного управления, решений и сопровождения — в бизнесе, в семье, в парных отношениях.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}