import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useReveal } from '@/hooks/useReveal';
import { useLang } from '@/i18n/LanguageContext';
import Nav from '@/components/shvarts/Nav';
import Footer from '@/components/shvarts/Footer';
import FilmGrain from '@/components/shvarts/FilmGrain';
import { Image } from '@/components/ui/image';

export default function Publications() {
  const [ref, visible] = useReveal();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { lang } = useLang();
  const en = lang === 'en';

  useEffect(() => {
    window.scrollTo(0, 0);
    base44.entities.Publication.list('sort_order', 100)
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-void min-h-screen">
      <FilmGrain />
      <Nav />
      <main id="publications" className="pt-32 md:pt-44 pb-24 md:pb-40 px-5 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <div className={`reveal ${visible ? 'is-visible' : ''}`}>
            <span className="text-[10px] uppercase tracking-[0.3em] text-steel">
              {en ? 'Selected materials' : 'Избранные материалы'}
            </span>
            <h1
              className="mt-4 text-bone font-black tracking-tightest leading-[0.85]"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 8rem)' }}
            >
              {en ? 'PUBLICATIONS' : 'ПУБЛИКАЦИИ'}
            </h1>
            <div className="mt-8 h-px w-24 bg-gold animate-line-grow" />
          </div>

          {loading ? (
            <div className="mt-24 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-border border-t-bone rounded-full animate-spin" />
            </div>
          ) : items.length === 0 ? (
            <p className="mt-24 text-steel text-sm uppercase tracking-[0.2em]">
              {en ? '[ Publications will be added by the author ]' : '[ Публикации будут добавлены автором ]'}
            </p>
          ) : (
            <div className="mt-16 md:mt-24 divide-y divide-border border-t border-border">
              {items.map((p) => (
                <PublicationRow key={p.id} p={p} en={en} lang={lang} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function PublicationRow({ p, en, lang }) {
  const date = p.published_date
    ? new Date(p.published_date).toLocaleDateString(lang === 'en' ? 'en-GB' : 'ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  const body = (
    <>
      <div className="flex items-baseline gap-4 text-[10px] uppercase tracking-[0.25em] text-steel">
        {p.type && <span className="text-gold">{p.type}</span>}
        {date && <span>{date}</span>}
      </div>
      <h2 className="mt-3 text-bone text-xl md:text-3xl font-bold tracking-tight leading-tight group-hover:text-gold transition-colors duration-500">
        {p.title}
      </h2>
      {p.description && (
        <p className="mt-3 text-steel text-sm md:text-base leading-relaxed max-w-3xl">{p.description}</p>
      )}
      {p.url && (
        <span className="mt-5 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-bone group-hover:text-gold transition-colors duration-500">
          {en ? 'Read' : 'Читать'} <ArrowUpRight size={14} />
        </span>
      )}
    </>
  );

  return p.url ? (
    <a
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-6 md:gap-10 py-8 md:py-12"
    >
      {p.media_url && (
        <div className="hidden md:block w-28 shrink-0 aspect-[3/4] overflow-hidden bg-shadow-1">
          <Image src={p.media_url} alt={p.title} fittingType="fill" quality={55} className="w-full h-full object-cover grayscale contrast-125" />
        </div>
      )}
      <div className="flex-1">{body}</div>
    </a>
  ) : (
    <div className="flex items-start gap-6 md:gap-10 py-8 md:py-12">
      {p.media_url && (
        <div className="hidden md:block w-28 shrink-0 aspect-[3/4] overflow-hidden bg-shadow-1">
          <Image src={p.media_url} alt={p.title} fittingType="fill" quality={55} className="w-full h-full object-cover grayscale contrast-125" />
        </div>
      )}
      <div className="flex-1">{body}</div>
    </div>
  );
}