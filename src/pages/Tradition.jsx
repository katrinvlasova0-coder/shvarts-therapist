import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { TRADITIONS } from '@/components/shvarts/traditions';
import { useReveal } from '@/hooks/useReveal';
import Nav from '@/components/shvarts/Nav';
import Footer from '@/components/shvarts/Footer';
import FilmGrain from '@/components/shvarts/FilmGrain';

export default function Tradition() {
  const { slug } = useParams();
  const tradition = TRADITIONS.find((t) => t.slug === slug);
  const [ref, visible] = useReveal();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!tradition) {
    return (
      <div className="min-h-screen bg-void text-bone flex items-center justify-center px-5">
        <div className="text-center">
          <p className="text-steel text-xs uppercase tracking-[0.3em] mb-6">404 — Текст не найден</p>
          <Link to="/#amalgam" className="btn-monolith">Назад к методу</Link>
        </div>
      </div>
    );
  }

  const paragraphs = tradition.text.split('\n\n');

  return (
    <div className="min-h-screen bg-void grain-overlay">
      <FilmGrain />
      <Nav />
      <main>
        <section ref={ref} className="relative bg-void pt-32 md:pt-48 pb-24 md:pb-40 px-5 md:px-10">
          <div className="max-w-[860px] mx-auto">
            <div className={`reveal ${visible ? 'is-visible' : ''}`}>
              <Link to="/#amalgam" className="text-[10px] uppercase tracking-[0.3em] text-steel hover:text-bone transition-colors">
                ← АВТОРСКИЙ МЕТОД
              </Link>
              <span className="block mt-6 text-[10px] uppercase tracking-[0.3em] text-steel">Традиция</span>
              <h1 className="mt-4 text-bone font-black tracking-tightest leading-[0.9]" style={{ fontSize: 'clamp(2.5rem, 10vw, 7rem)' }}>
                {tradition.name}
              </h1>
              <div className="mt-8 h-px bg-border" />
            </div>

            <article className="mt-10 md:mt-16">
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={`mb-8 text-bone/85 text-lg md:text-2xl leading-relaxed font-serif-display reveal ${visible ? 'is-visible' : ''}`}
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  {p}
                </p>
              ))}
            </article>

            <div className="mt-16 md:mt-24 pt-10 border-t border-border">
              <span className="text-[10px] uppercase tracking-[0.3em] text-steel">Другие традиции</span>
              <ul className="mt-6 divide-y divide-border border-y border-border">
                {TRADITIONS.filter((t) => t.slug !== tradition.slug).map((t, i) => (
                  <li key={t.slug}>
                    <Link to={`/amalgam/${t.slug}`} className="py-5 flex items-center justify-between group">
                      <span className="text-bone text-lg md:text-xl tracking-tight transition-transform duration-500 group-hover:translate-x-2">{t.name}</span>
                      <span className="text-steel text-xs uppercase tracking-[0.2em] group-hover:text-gold transition-colors duration-500">Читать →</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}