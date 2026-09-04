import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const SECTIONS = [
  { label: 'Главная', id: 'hero' },
  { label: 'Программа', id: 'shadow' },
  { label: 'Вектора терапии', id: 'cases' },
  { label: 'Амальгама', id: 'amalgam' },
  { label: 'Автор', id: 'about' },
  { label: 'Проекты', id: 'projects' },
  { label: 'Публикации', id: 'publications' },
  { label: 'Контакты', id: 'contacts' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
            {SECTIONS.map((s) => (
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
            <button
              onClick={() => go('case-form')}
              className="hidden md:inline-flex text-[11px] uppercase tracking-[0.22em] text-bone hover:text-gold transition-colors duration-300"
            >
              Записаться
            </button>
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden text-bone p-1"
              aria-label="Меню"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] bg-void flex flex-col animate-fade-in">
          <div className="flex items-center justify-between px-5 py-5 border-b border-border">
            <span className="text-sm font-bold tracking-tightest text-bone">ШВАРЦ ЧÖРНЫЙ</span>
            <button onClick={() => setOpen(false)} className="text-bone p-1" aria-label="Закрыть">
              <X size={24} />
            </button>
          </div>
          <nav className="flex-1 flex flex-col justify-center px-8 gap-2">
            {SECTIONS.map((s, i) => (
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
              Записаться на консультацию
            </button>
          </div>
        </div>
      )}
    </>
  );
}