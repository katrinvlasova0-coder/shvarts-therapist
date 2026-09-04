import { useReveal } from '@/hooks/useReveal';
import { Image } from '@/components/ui/image';

const IMG = 'https://media.base44.com/images/public/6a9847b2923d3b4ff598cb9a/4e52b5dad_generated_d010af03.jpg';

export default function Confession() {
  const [ref, visible] = useReveal();

  return (
    <section ref={ref} className="relative bg-void overflow-hidden">
      <div className="relative h-[80vh] md:h-[100vh] w-full">
        <Image src={IMG} alt="Исповедь и Индульгенция" fittingType="fill" className="w-full h-full object-cover grayscale contrast-125" />
        <div className="absolute inset-0 bg-void/55" />
        <div className="absolute inset-0 flex items-center justify-center px-5">
          <div className={`text-center max-w-4xl reveal ${visible ? 'is-visible' : ''}`}>
            <span className="text-[10px] uppercase tracking-[0.4em] text-steel">02 — Ритуал</span>
            <h2
              className="mt-8 text-bone font-black tracking-tightest leading-[0.9]"
              style={{ fontSize: 'clamp(2.8rem, 11vw, 11rem)' }}
            >
              ИСПОВЕДЬ
              <br />
              <span className="font-serif-display font-medium text-bone/85">и</span> ИНДУЛЬГЕНЦИЯ
            </h2>
            <div className="mt-10 mx-auto w-24 h-px bg-steel/50 animate-line-grow" />
          </div>
        </div>
      </div>
    </section>
  );
}