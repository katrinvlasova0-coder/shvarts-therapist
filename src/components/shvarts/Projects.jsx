import { useEffect, useState } from 'react';
import { useReveal } from '@/hooks/useReveal';
import { base44 } from '@/api/base44Client';
import { Image } from '@/components/ui/image';
import { ArrowUpRight } from 'lucide-react';
import { useLang } from '@/i18n/LanguageContext';

const DEFAULT_PROJECTS = {
  ru: [
    { title: 'Международный Исследовательский Центр Русален' },
    { title: 'Научно-Исследовательское поселение PSYTY' },
    { title: 'Научно-исследовательский институт изучения природы Денег (НИИ Денег)' },
  ],
  en: [
    { title: 'International Research Center Rusalen' },
    { title: 'PSYTY Research Settlement' },
    { title: 'Research Institute for the Study of the Nature of Money' },
  ],
};

export default function Projects() {
  const [ref, visible] = useReveal();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { lang } = useLang();
  const en = lang === 'en';

  useEffect(() => {
    base44.entities.Project.list('sort_order', 50)
      .then((data) => setProjects(Array.isArray(data) ? data : []))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="projects" ref={ref} className="relative bg-void py-24 md:py-40 px-5 md:px-10 border-t border-border">
      <div className="max-w-[1400px] mx-auto">
        <div className={`reveal ${visible ? 'is-visible' : ''}`}>
          <h2 className="text-bone font-black tracking-tightest leading-[0.9]" style={{ fontSize: 'clamp(2rem, 7vw, 7rem)' }}>
            {en ? 'RESEARCH PROJECTS' : 'ИССЛЕДОВАТЕЛЬСКИЕ ПРОЕКТЫ'}
          </h2>
        </div>

        {loading ? (
          <div className="mt-16 h-64 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-border border-t-bone rounded-full animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-px bg-border border border-border">
            {DEFAULT_PROJECTS[lang].map((p, i) => (
              <ProjectCard key={i} {...p} en={en} />
            ))}
          </div>
        ) : (
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-px bg-border border border-border">
            {projects.map((p) => (
              <ProjectCard key={p.id} title={en ? (p.title_en || p.title) : p.title} image_url={p.image_url} description={en ? (p.description_en || p.description) : p.description} external_url={p.external_url} en={en} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ title, image_url, description, external_url, en }) {
  return (
    <div className="bg-void p-8 md:p-10 flex flex-col">
      {image_url ? (
        <div className="relative aspect-[4/3] overflow-hidden mb-6">
          <Image src={image_url} alt={title} fittingType="fill" quality={60} className="w-full h-full object-cover grayscale contrast-125" />
        </div>
      ) : (
        <div className="relative aspect-[4/3] mb-6 bg-shadow-1 flex items-center justify-center">
          <span className="text-steel text-[10px] tracking-[0.3em] uppercase">{en ? '[ Image to be added ]' : '[ Изображение будет добавлено ]'}</span>
        </div>
      )}
      <h3 className="text-bone text-xl md:text-2xl font-bold tracking-tight leading-tight">{title}</h3>
      <p className="mt-4 text-steel text-sm leading-relaxed flex-1">
        {description || (en ? '[ Text to be added by the author ]' : '[Текст будет добавлен автором]')}
      </p>
      {external_url ? (
        <a
          href={external_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-bone hover:text-gold transition-colors"
        >
          {en ? 'Details' : 'Подробнее'} <ArrowUpRight size={14} />
        </a>
      ) : (
        <span className="mt-6 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-steel/50">
          {en ? 'Details' : 'Подробнее'}
        </span>
      )}
    </div>
  );
}