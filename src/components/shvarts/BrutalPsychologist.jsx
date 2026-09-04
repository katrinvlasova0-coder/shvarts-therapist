import { useReveal } from '@/hooks/useReveal';

const CASES = [
  'Антикризисный менеджмент Самости',
  'Реструктуризация непрофильных, проблемных и токсичных активов Личности',
  'Капитализация отношений, сопровождение их выхода на IPO',
  'Подготовка пар к пресейлам и экзитам',
  'Анализ и расторжение сделок слияния, поглощения, созависимости',
  'Управление конфликтами, медиация, кремация',
  'Идентификация бессознательных и полевых факторов влияния на бизнес',
  'Работа с терминальными фазами в жизни, отношениях и бизнесе',
];

const ACCENTS = ['Самости', 'IPO', 'пресейлам', 'экзитам', 'слияния', 'поглощения', 'созависимости', 'медиация', 'кремация', 'бизнес', 'терминальные фазы'];

function highlight(text) {
  let parts = [{ t: text, hit: false }];
  ACCENTS.forEach((word) => {
    parts = parts.flatMap((p) => {
      if (p.hit) return [p];
      const idx = p.t.toLowerCase().indexOf(word.toLowerCase());
      if (idx === -1) return [p];
      return [
        { t: p.t.slice(0, idx), hit: false },
        { t: p.t.slice(idx, idx + word.length), hit: true },
        { t: p.t.slice(idx + word.length), hit: false },
      ];
    });
  });
  return parts.map((p, i) =>
    p.hit ? (
      <span key={i} className="metallic-glint font-bold">{p.t}</span>
    ) : (
      <span key={i}>{p.t}</span>
    )
  );
}

export default function BrutalPsychologist() {
  const [ref, visible] = useReveal();

  return (
    <section id="cases" ref={ref} className="relative bg-void pt-2 md:pt-10 pb-24 md:pb-40 px-5 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <div className={`reveal ${visible ? 'is-visible' : ''} mt-24 md:mt-40`}>
          <h2 className="text-bone font-black tracking-tightest leading-[0.9] whitespace-nowrap" style={{ fontSize: 'clamp(1.5rem, 4vw, 4.5rem)' }}>
            ТЕРАПЕВТИЧЕСКИЕ
            <br className="md:hidden" />
            {' '}
            ВЕКТОРА:
          </h2>
        </div>

        <div className="mt-8 md:mt-20 divide-y divide-border border-y border-border">
          {CASES.map((c, i) => (
            <CaseRow key={i} index={i} text={c} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseRow({ index, text }) {
  const [ref, visible] = useReveal({ threshold: 0.2 });
  return (
    <div
      ref={ref}
      className={`reveal-blur group py-5 md:py-12 flex items-start gap-3 md:gap-12 transition-colors duration-500 hover:bg-shadow-1/50 ${visible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <span className="pt-2 md:pt-3 w-6 md:w-8 shrink-0 flex justify-center">
        <ShapeMarker index={index} />
      </span>
      <p
        className="flex-1 text-bone font-medium leading-[1.2] tracking-tight transition-transform duration-500 group-hover:translate-x-2"
        style={{ fontSize: 'clamp(0.875rem, 1.8vw, 1.75rem)' }}
      >
        {highlight(text)}
      </p>
    </div>
  );
}

const SHAPES = [
  // 0 — diamond square
  <rect x="1.5" y="1.5" width="7" height="7" />,
  // 1 — triangle
  <polygon points="5,1.2 8.8,8.2 1.2,8.2" />,
  // 2 — ring
  <circle cx="5" cy="5" r="3.4" />,
  // 3 — hexagon
  <polygon points="5,1.2 8.3,3.1 8.3,6.9 5,8.8 1.7,6.9 1.7,3.1" />,
  // 4 — star
  <polygon points="5,1 6.1,3.8 9,3.8 6.65,5.6 7.6,8.5 5,6.7 2.4,8.5 3.35,5.6 1,3.8 3.9,3.8" />,
  // 5 — plus
  <path d="M4.2 1.5 H5.8 V4.2 H8.5 V5.8 H5.8 V8.5 H4.2 V5.8 H1.5 V4.2 H4.2 Z" />,
  // 6 — pentagon
  <polygon points="5,1.2 8.8,4 7.35,8.2 2.65,8.2 1.2,4" />,
  // 7 — octagon
  <polygon points="3.2,1.2 6.8,1.2 8.8,3.2 8.8,6.8 6.8,8.8 3.2,8.8 1.2,6.8 1.2,3.2" />,
];

function ShapeMarker({ index }) {
  const rev = index % 2 === 1;
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 10 10"
      className={`text-steel group-hover:text-gold transition-colors duration-500 ${rev ? 'animate-spin-slow-rev' : 'animate-spin-slow'}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.9"
      strokeLinejoin="round"
    >
      {SHAPES[index % SHAPES.length]}
    </svg>
  );
}