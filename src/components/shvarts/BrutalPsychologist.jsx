import { useReveal } from '@/hooks/useReveal';
import { useLang } from '@/i18n/LanguageContext';

const CASES = {
  ru: [
    {
      title: 'Антикризисный менеджмент Самости',
      desc: 'Работа с состояниями, в которых прежняя идентичность, система ценностей или жизненная стратегия перестала работать. Помощь в понимании происходящего и выработке решений в период личного, профессионального или экзистенциального кризиса',
    },
    {
      title: 'Реструктуризация непрофильных, проблемных и токсичных активов Личности',
      desc: 'Разбор привычек, внутренних конфликтов, отношений и моделей поведения, которые требуют слишком много ресурсов или уже причиняют ущерб. Определение того, что необходимо сохранить, изменить или прекратить',
    },
    {
      title: 'Капитализация отношений, сопровождение их выхода на IPO',
      desc: 'Работа с потенциалом отношений: доверием, близостью, договорённостями, ответственностью и совместными целями. Подходит парам, которые хотят не только сохранить отношения, но и понять, во что они могут развиваться',
    },
    {
      title: 'Перехват управления деструктивными отношениями (абъюз, газлайтинг, харасмент и прочее)',
      desc: 'Выявление механизмов давления, контроля, обесценивания, преследования и психологического насилия. Работа над восстановлением личных границ и контроля над собственной жизнью, разработку стратегии защиты, выхода из деструктивных отношений либо изменения сложившейся системы взаимодействия',
    },
    {
      title: 'Подготовка пар к пресейлам и экзитам',
      desc: 'Подготовка к серьёзному изменению формата отношений: браку, совместной жизни, расставанию или завершению общего этапа. Работа направлена на принятие решений без лишних иллюзий, манипуляций и разрушительной неопределённости',
    },
    {
      title: 'Анализ и расторжение сделок слияния, поглощения, созависимости',
      desc: 'Разбор отношений, в которых близость превратилась в зависимость, контроль, потерю собственных границ или борьбу за власть. Помощь в восстановлении автономии либо корректном завершении отношений',
    },
    {
      title: 'Управление конфликтами, медиация, кремация',
      desc: 'Работа с личными, семейными и деловыми конфликтами. В зависимости от ситуации — поиск договорённости, изменение способа взаимодействия или признание того, что отношения исчерпаны и должны быть завершены',
    },
    {
      title: 'Идентификация бессознательных и полевых факторов влияния на бизнес',
      desc: 'Анализ скрытых психологических мотивов, проекций, групповой динамики и неформальных отношений, влияющих на решения, переговоры, партнёрства и управление бизнесом',
    },
    {
      title: 'Работа с терминальными фазами в жизни, отношениях и бизнесе',
      desc: 'Сопровождение периодов, когда отношения, карьера, бизнес, прежний образ жизни или значимый жизненный этап\nприближаются к завершению. Помощь в признании реальности, проживании утраты и подготовке к следующему этапу',
    },
  ],
  en: [
    {
      title: 'Crisis management of the Self',
      desc: 'Working with states in which the former identity, value system or life strategy has stopped working. Help in understanding what is happening and developing decisions during a personal, professional or existential crisis',
    },
    {
      title: 'Restructuring of non-core, problem and toxic assets of the Personality',
      desc: 'Breaking down habits, inner conflicts, relationships and behaviour patterns that demand too many resources or are already causing damage. Determining what must be kept, changed or terminated',
    },
    {
      title: 'Capitalization of relationships, escorting them to IPO',
      desc: 'Working with the potential of relationships: trust, intimacy, agreements, responsibility and shared goals. Suits couples who want not only to preserve the relationship, but to understand what it can grow into',
    },
    {
      title: 'Takeover of control in destructive relationships (abuse, gaslighting, harassment, etc.)',
      desc: 'Identifying the mechanisms of pressure, control, devaluation, persecution and psychological violence. Work on restoring personal boundaries and control over one\'s own life, developing a strategy of defence, exiting destructive relationships or changing the established system of interaction',
    },
    {
      title: 'Preparing couples for pre-sales and exits',
      desc: 'Preparation for a serious change in the format of the relationship: marriage, living together, separation or the completion of a shared chapter. The work is aimed at making decisions without excess illusions, manipulation and destructive uncertainty',
    },
    {
      title: 'Analysis and termination of merger, acquisition and codependency deals',
      desc: 'Breaking down relationships in which intimacy has turned into dependency, control, loss of one\'s own boundaries or a struggle for power. Help in restoring autonomy or correctly ending the relationship',
    },
    {
      title: 'Conflict management, mediation, cremation',
      desc: 'Working with personal, family and business conflicts. Depending on the situation — finding agreement, changing the way of interacting, or recognizing that the relationship is exhausted and must be completed',
    },
    {
      title: 'Identification of unconscious and field factors influencing business',
      desc: 'Analysis of hidden psychological motives, projections, group dynamics and informal relationships that influence decisions, negotiations, partnerships and business management',
    },
    {
      title: 'Working with terminal phases in life, relationships and business',
      desc: 'Supporting periods when a relationship, career, business, former lifestyle or a significant life stage\nis approaching completion. Help in accepting reality, living through the loss and preparing for the next stage',
    },
  ],
};

const ACCENTS = {
  ru: ['Самости', 'IPO', 'пресейлам', 'экзитам', 'слияния', 'поглощения', 'созависимости', 'медиация', 'кремация', 'бизнес', 'терминальные фазы'],
  en: ['Self', 'IPO', 'pre-sales', 'exits', 'merger', 'acquisition', 'codependency', 'mediation', 'cremation', 'business', 'terminal phases'],
};

function highlight(text, accents) {
  let parts = [{ t: text, hit: false }];
  accents.forEach((word) => {
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
  const { lang } = useLang();
  const cases = CASES[lang];
  const accents = ACCENTS[lang];

  return (
    <section id="cases" ref={ref} className="relative bg-void pt-2 md:pt-10 pb-24 md:pb-40 px-5 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <div className={`reveal ${visible ? 'is-visible' : ''} mt-24 md:mt-40`}>
          <h2 className="text-bone font-black tracking-tightest leading-[0.9] whitespace-nowrap" style={{ fontSize: 'clamp(1.5rem, 4vw, 4.5rem)' }}>
            {lang === 'en' ? 'THERAPY VECTORS:' : 'ВЕКТОРА ТЕРАПИИ:'}
          </h2>
        </div>

        <div className="mt-8 md:mt-20 divide-y divide-border border-y border-border">
          {cases.map((c, i) => (
            <CaseRow key={i} index={i} text={c.title} desc={c.desc} accents={accents} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseRow({ index, text, desc, accents }) {
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
      <div className="flex-1 min-w-0">
        <p
          className="case-title text-bone font-medium leading-[1.2] tracking-tight transition-transform duration-500 group-hover:translate-x-2"
          style={{ fontSize: 'clamp(0.875rem, 1.8vw, 1.75rem)' }}
        >
          {highlight(text, accents)}
        </p>
        {desc && (
          <p className="mt-2 md:mt-3 max-w-3xl text-steel text-xs md:text-sm leading-relaxed whitespace-pre-line transition-transform duration-500 group-hover:translate-x-2">
            {desc}
          </p>
        )}
      </div>
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