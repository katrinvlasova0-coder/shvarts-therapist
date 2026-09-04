import { useState } from 'react';
import { useReveal } from '@/hooks/useReveal';
import { base44 } from '@/api/base44Client';
import { Paperclip, Loader2, Check } from 'lucide-react';

const REQUEST_TYPES = [
  'Индивидуальная консультация',
  'Работа с парой',
  'Работа с бизнес-кейсом',
  'Медиация',
  'Долгосрочное сопровождение',
  'Другой запрос',
];

const CONTACT_METHODS = ['Telegram', 'WhatsApp', 'Email', 'Телефон', 'Другое'];

export default function CaseForm() {
  const [ref, visible] = useReveal();
  const [form, setForm] = useState({
    name: '', alias: '', contact: '', contact_method: 'Telegram', request_type: 'Индивидуальная консультация', case_text: '', consent: false,
  });
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleFile = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file: f });
      setFileUrl(file_url);
    } catch {
      setError('Не удалось загрузить файл');
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.consent) { setError('Необходимо согласие на обработку персональных данных'); return; }
    if (!form.name || !form.contact || !form.request_type) { setError('Заполните обязательные поля'); return; }
    setSubmitting(true);
    try {
      await base44.entities.CaseRequest.create({
        name: form.name,
        alias: form.alias,
        contact: form.contact,
        contact_method: form.contact_method,
        request_type: form.request_type,
        case_text: form.case_text,
        file_url: fileUrl,
        status: 'NEW',
      });
      setDone(true);
    } catch (err) {
      setError('Ошибка отправки. Попробуйте ещё раз.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="case-form" ref={ref} className="relative bg-void py-24 md:py-40 px-5 md:px-10 border-t border-border">
      <div className="max-w-[1400px] mx-auto">
        <div className={`reveal ${visible ? 'is-visible' : ''}`}>
          <h2 className="text-bone font-black tracking-tightest leading-[0.9] whitespace-nowrap" style={{ fontSize: 'clamp(1.67rem, 6vw, 6rem)' }}>
            ПОДЕЛИТЬСЯ КЕЙСОМ
          </h2>
        </div>

        {done ? (
          <div className="mt-20 py-24 text-center border border-border animate-fade-in">
            <Check size={40} className="mx-auto text-bone" />
            <p className="mt-8 text-bone text-2xl md:text-3xl font-serif-display">Кейс принят. Ожидайте решения.</p>
            <button onClick={() => { setDone(false); setForm({ name: '', alias: '', contact: '', contact_method: 'Telegram', request_type: 'Индивидуальная консультация', case_text: '', consent: false }); setFile(null); setFileUrl(''); }} className="mt-10 text-[10px] uppercase tracking-[0.25em] text-steel hover:text-bone transition-colors">
              Отправить ещё один
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-16 space-y-10">
            <div className="grid md:grid-cols-2 gap-8">
              <Field label="Имя / псевдоним *">
                <input className="field-underline" value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="—" />
              </Field>
              <Field label="Псевдоним">
                <input className="field-underline" value={form.alias} onChange={(e) => set('alias', e.target.value)} placeholder="—" />
              </Field>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Field label="Контакт *">
                <input className="field-underline" value={form.contact} onChange={(e) => set('contact', e.target.value)} placeholder="—" />
              </Field>
              <Field label="Предпочтительный способ связи">
                <select className="field-underline" value={form.contact_method} onChange={(e) => set('contact_method', e.target.value)}>
                  {CONTACT_METHODS.map((m) => <option key={m} value={m} className="bg-void text-bone">{m}</option>)}
                </select>
              </Field>
            </div>

            <Field label="Тип запроса">
              <div className="flex flex-wrap gap-2 pt-2">
                {REQUEST_TYPES.map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => set('request_type', t)}
                    className={`px-4 py-2 text-xs tracking-tight border transition-all duration-300 ${form.request_type === t ? 'border-bone text-bone bg-bone/5' : 'border-border text-steel hover:text-bone'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Текст кейса">
              <textarea
                className="field-underline resize-none min-h-[160px]"
                value={form.case_text}
                onChange={(e) => set('case_text', e.target.value)}
                placeholder="Свободное подробное описание ситуации"
              />
            </Field>

            <Field label="Приложить файл">
              <label className="flex items-center gap-3 cursor-pointer text-steel hover:text-bone transition-colors">
                <Paperclip size={16} />
                <span className="text-sm">{file ? file.name : 'Выбрать файл'}</span>
                <input type="file" className="hidden" onChange={handleFile} />
              </label>
            </Field>

            <label className="flex items-start gap-4 cursor-pointer">
              <input type="checkbox" checked={form.consent} onChange={(e) => set('consent', e.target.checked)} className="mt-1 accent-bone" />
              <span className="text-steel text-sm leading-relaxed">Согласен с обработкой персональных данных</span>
            </label>

            {error && <p className="text-blood text-sm">{error}</p>}

            <button type="submit" disabled={submitting} className="btn-monolith w-full md:w-auto disabled:opacity-50 mt-8 md:mt-0">
              {submitting ? <><Loader2 size={14} className="animate-spin" /> Отправка…</> : 'ОТПРАВИТЬ'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.25em] text-steel mb-1">{label}</label>
      {children}
    </div>
  );
}