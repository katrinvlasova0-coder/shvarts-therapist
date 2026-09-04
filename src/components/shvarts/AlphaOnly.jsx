import { useReveal } from '@/hooks/useReveal';

export default function AlphaOnly() {
  const [ref, visible] = useReveal();

  return (
    <section ref={ref} className="relative bg-void min-h-[100vh] flex items-center justify-center overflow-hidden px-5">
      <div className={`text-center reveal ${visible ? 'is-visible' : ''}`}>
        <span className="text-[10px] uppercase tracking-[0.5em] text-steel">SHVARTS BLACK</span>
        <h2
          className="mt-12 text-bone font-black tracking-tightest leading-[0.85]"
          style={{ fontSize: 'clamp(2.2rem, 10vw, 10rem)' }}
        >
          ВХОД СТРОГО
          <br />
          ДЛЯ АЛЬФ.
        </h2>
        <div className="mt-12 mx-auto w-32 h-px bg-steel/40 animate-line-grow" />
      </div>
    </section>
  );
}