export default function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer id="contacts" className="relative bg-void border-t border-border px-5 md:px-10 pt-24 pb-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-bone font-black tracking-tightest leading-[0.85] whitespace-nowrap md:whitespace-normal" style={{ fontSize: 'clamp(1.5rem, 9vw, 9rem)' }}>
              ШВАРЦ
              <span className="md:hidden"> </span>
              <span className="hidden md:block mt-4">ЧÖРНЫЙ</span>
              <span className="md:hidden">ЧÖРНЫЙ</span>
            </h2>
            <p className="mt-8 font-serif-display text-bone/70 text-xl md:text-2xl">Выйди из Тени.</p>
          </div>

          <div className="flex flex-col justify-between gap-12">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-steel">Разделы</span>
                <ul className="mt-5 space-y-3">
                  {[['Главная','hero'],['Программа','shadow'],['Вектора терапии','cases'],['Амальгама','amalgam'],['Автор','about'],['Проекты','projects'],['Публикации','publications'],['Контакты','contacts']].map(([l,id]) => (
                    <li key={id}>
                      <button onClick={() => scrollTo(id)} className="text-bone/80 hover:text-bone text-sm transition-colors">{l}</button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-steel">Контакты</span>
                <ul className="mt-5 space-y-3 text-bone/80 text-sm">
                  <li className="whitespace-nowrap">
                    <a href="https://t.me/ShvartsBlack" target="_blank" rel="noreferrer" className="text-steel hover:text-bone transition-colors">Telegram: @ShvartsBlack</a>
                  </li>
                  <li className="whitespace-nowrap">
                    <a href="https://wa.me/79958998990" target="_blank" rel="noreferrer" className="text-steel hover:text-bone transition-colors">WhatsApp: +7 995 899 89 90</a>
                  </li>
                  <li className="whitespace-nowrap">
                    <a href="https://instagram.com/shvarts.black" target="_blank" rel="noreferrer" className="text-steel hover:text-bone transition-colors">Instagram: @shvarts.black</a>
                  </li>
                  <li className="whitespace-nowrap">
                    <a href="mailto:psy@shvarts.black" className="text-steel hover:text-bone transition-colors">Email: psy@shvarts.black</a>
                  </li>
                  <li className="text-steel">
                    <span className="text-bone">F2F:</span>
                    <ul className="mt-2 space-y-1">
                      {['Москва','Лондон','Цюрих','Дубай','Тель-Авив'].map((city) => (
                        <li key={city} className="flex items-center gap-2">
                          <svg width="8" height="8" viewBox="0 0 10 10" className="text-gold animate-spin-slow shrink-0" fill="none" stroke="currentColor" strokeWidth="1.2">
                            <rect x="0.6" y="0.6" width="8.8" height="8.8" transform="rotate(45 5 5)" />
                          </svg>
                          <span className="hover:text-bone transition-colors duration-500">{city}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </div>
            </div>

            <button onClick={() => scrollTo('case-form')} className="btn-monolith self-start mt-8 md:mt-0">
              Записаться на консультацию
            </button>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-[0.25em] text-steel">
          <span>© {new Date().getFullYear()} ШВАРЦ ЧÖРНЫЙ — Выйди из Тени</span>
          <span>RU / EN</span>
          <span className="gold-shimmer">ВХОД СТРОГО ДЛЯ АЛЬФ.</span>
        </div>
      </div>
    </footer>
  );
}