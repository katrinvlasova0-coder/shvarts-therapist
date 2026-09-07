import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLang } from '@/i18n/LanguageContext';

const SECTIONS = {
  ru: [
    { label: 'Главная', id: 'hero' },
    { label: 'Программа', id: 'shadow' },
    { label: 'Вектора терапии', id: 'cases' },
    { label: 'Амальгама', id: 'amalgam' },
    { label: 'Автор', id: 'about' },
    { label: 'Проекты', id: 'projects' },
    { label: 'Публикации', id: 'publications' },
    { label: 'Контакты', id: 'contacts' },
  ],
  en: [
    { label: 'Home', id: 'hero' },
    { label: 'Program', id: 'shadow' },
    { label: 'Therapy Vectors', id: 'cases' },
    { label: 'Amalgama', id: 'amalgam' },
    { label: 'Author', id: 'about' },
    { label: 'Projects', id: 'projects' },
    { label: 'Publications', id: 'publications' },
    { label: 'Contacts', id: 'contacts' },
  ],
};

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { lang, setLang } = useLang();
  const sections = SECTIONS[lang];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled ? 'bg-void/85 backdrop-blur-md border-b border-border' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-5 md:px-10 py-5">
          <nav className="hidden lg:flex items-center gap-7">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => go(s.id)}
                className="text-[11px] uppercase tracking-[0.22em] text-steel hover:text-bone transition-colors duration-300"
              >
                {s.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em]">
              <button
                onClick={() => setLang('ru')}
                className={`transition-colors duration-300 ${lang === 'ru' ? 'text-bone' : 'text-steel hover:text-bone'}`}
              >
                RU
              </button>
              <span className="text-steel/50">/</span>
              <button
                onClick={() => setLang('en')}
                className={`transition-colors duration-300 ${lang === 'en' ? 'text-bone' : 'text-steel hover:text-bone'}`}
              >
                EN
              </button>
            </span>
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden text-bone p-1"
              aria-label={lang === 'ru' ? 'Меню' : 'Menu'}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] bg-void flex flex-col animate-fade-in">
          <div className="flex items-center justify-between px-5 py-5 border-b border-border">
            <span className="text-sm font-bold tracking-tightest text-bone">{lang === 'en' ? 'SHVARTS BLACK' : 'ШВАРЦ ЧÖРНЫЙ'}</span>
            <button onClick={() => setOpen(false)} className="text-bone p-1" aria-label={lang === 'ru' ? 'Закрыть' : 'Close'}>
              <X size={24} />
            </button>
          </div>
          <nav className="flex-1 flex flex-col justify-center px-8 gap-2">
            {sections.map((s, i) => (
              <button
                key={s.id}
                onClick={() => go(s.id)}
                className="text-left text-base font-normal tracking-tightest text-bone hover:text-steel transition-colors duration-300 py-2"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {s.label}
              </button>
            ))}
          </nav>
          <div className="p-8 border-t border-border">
            <button onClick={() => go('case-form')} className="btn-monolith w-full">
              {lang === 'ru' ? 'Записаться на консультацию' : 'Book a consultation'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}