import { useState } from 'react';
import { useReveal } from '@/hooks/useReveal';
import { base44 } from '@/api/base44Client';
import { submitForm } from '@/lib/submitForm';
import { Paperclip, Loader2, Check } from 'lucide-react';
import { useLang } from '@/i18n/LanguageContext';

const REQUEST_TYPES = [
  { value: 'Индивидуальная консультация', label_en: 'Individual consultation' },
  { value: 'Работа с парой', label_en: 'Work with a couple' },
  { value: 'Работа с бизнес-кейсом', label_en: 'Work on a business case' },
  { value: 'Медиация', label_en: 'Mediation' },
  { value: 'Долгосрочное сопровождение', label_en: 'Long-term support' },
  { value: 'Другой запрос', label_en: 'Other request' },
];

const CONTACT_METHODS = [
  { value: 'Telegram', label_en: 'Telegram' },
  { value: 'WhatsApp', label_en: 'WhatsApp' },
  { value: 'Email', label_en: 'Email' },
  { value: 'Телефон', label_en: 'Phone' },
  { value: 'Другое', label_en: 'Other' },
];

export default function CaseForm() {
  const [ref, visible] = useReveal();
  const { lang } = useLang();
  const en = lang === 'en';
  const L = {
    title: en ? 'CAST OFF YOUR SHADOW' : 'ОТБРОСЬ СВОЮ ТЕНЬ',
    subtitle: en ? '(Share a case):' : '(Поделиться кейсом):',
    name: en ? 'Name / alias *' : 'Имя / псевдоним *',
    alias: en ? 'Alias' : 'Псевдоним',
    contact: en ? 'Contact *' : 'Контакт *',
    method: en ? 'Preferred contact method' : 'Предпочтительный способ связи',
    requestType: en ? 'Request type' : 'Тип запроса',
    caseText: en ? 'Case text' : 'Текст кейса',
    casePlaceholder: en ? 'A free, detailed description of your situation' : 'Свободное подробное описание ситуации',
    attach: en ? 'Attach a file' : 'Приложить файл',
    chooseFile: en ? 'Choose file' : 'Выбрать файл',
    consent: en ? 'I consent to the processing of personal data' : 'Согласен с обработкой персональных данных',
    submit: en ? 'SUBMIT' : 'ОТПРАВИТЬ',
    sending: en ? 'Sending…' : 'Отправка…',
    doneTitle: en ? 'Thank you for reaching out. See you soon. Shvarts.' : 'Спасибо за обращение. До скорого. Шварц.',
    another: en ? 'Send another one' : 'Отправить ещё один',
    errUpload: en ? 'Failed to upload the file' : 'Не удалось загрузить файл',
    errConsent: en ? 'Consent to personal data processing is required' : 'Необходимо согласие на обработку персональных данных',
    errFields: en ? 'Fill in the required fields' : 'Заполните обязательные поля',
    errSend: en ? 'Sending failed. Try again.' : 'Ошибка отправки. Попробуйте ещё раз.',
  };
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
      setError(L.errUpload);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.consent) { setError(L.errConsent); return; }
    if (!form.name || !form.contact || !form.request_type) { setError(L.errFields); return; }
    setSubmitting(true);
    try {
      const messageParts = [
        form.contact_method ? `Способ связи: ${form.contact_method}` : '',
        form.alias ? `Псевдоним: ${form.alias}` : '',
        form.case_text?.trim() || '',
        fileUrl ? `Файл: ${fileUrl}` : '',
      ].filter(Boolean);

      await submitForm({
        type: 'case',
        name: form.name,
        email: form.contact,
        subject: form.request_type,
        message: messageParts.join('\n\n'),
      });

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
      setError(L.errSend);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="case-form" ref={ref} className="relative bg-void py-24 md:py-40 px-5 md:px-10 border-t border-border">
      <div className="max-w-[1400px] mx-auto">
        <div className={`reveal ${visible ? 'is-visible' : ''}`}>
          <h2 className="text-bone font-black tracking-tightest leading-[0.9] whitespace-nowrap" style={{ fontSize: 'clamp(1.67rem, 6vw, 6rem)' }}>
            {L.title}
          </h2>
          <p className="mt-4 text-steel text-xl md:text-3xl tracking-wide">{L.subtitle}</p>
        </div>

        {done ? (
          <div className="mt-20 py-24 text-center border border-border animate-fade-in">
            <Check size={40} className="mx-auto text-bone" />
            <p className="mt-8 text-bone text-2xl md:text-3xl font-serif-display">{L.doneTitle}</p>
            <button onClick={() => { setDone(false); setForm({ name: '', alias: '', contact: '', contact_method: 'Telegram', request_type: 'Индивидуальная консультация', case_text: '', consent: false }); setFile(null); setFileUrl(''); }} className="mt-10 text-[10px] uppercase tracking-[0.25em] text-steel hover:text-bone transition-colors">
              {L.another}
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-16 space-y-10">
            <div className="grid md:grid-cols-2 gap-8">
              <Field label={L.name}>
                <input className="field-underline" value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="—" />
              </Field>
              <Field label={L.alias}>
                <input className="field-underline" value={form.alias} onChange={(e) => set('alias', e.target.value)} placeholder="—" />
              </Field>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Field label={L.contact}>
                <input className="field-underline" value={form.contact} onChange={(e) => set('contact', e.target.value)} placeholder="—" />
              </Field>
              <Field label={L.method}>
                <select className="field-underline" value={form.contact_method} onChange={(e) => set('contact_method', e.target.value)}>
                  {CONTACT_METHODS.map((m) => (
                    <option key={m.value} value={m.value} className="bg-void text-bone">{en ? m.label_en : m.value}</option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label={L.requestType}>
              <div className="flex flex-wrap gap-2 pt-2">
                {REQUEST_TYPES.map((t) => (
                  <button
                    type="button"
                    key={t.value}
                    onClick={() => set('request_type', t.value)}
                    className={`px-4 py-2 text-xs tracking-tight border transition-all duration-300 ${form.request_type === t.value ? 'border-bone text-bone bg-bone/5' : 'border-border text-steel hover:text-bone'}`}
                  >
                    {en ? t.label_en : t.value}
                  </button>
                ))}
              </div>
            </Field>

            <Field label={L.caseText}>
              <textarea
                className="field-underline resize-none min-h-[160px]"
                value={form.case_text}
                onChange={(e) => set('case_text', e.target.value)}
                placeholder={L.casePlaceholder}
              />
            </Field>

            <Field label={L.attach}>
              <label className="flex items-center gap-3 cursor-pointer text-steel hover:text-bone transition-colors">
                <Paperclip size={16} />
                <span className="text-sm">{file ? file.name : L.chooseFile}</span>
                <input type="file" className="hidden" onChange={handleFile} />
              </label>
            </Field>

            <label className="flex items-start gap-4 cursor-pointer">
              <input type="checkbox" checked={form.consent} onChange={(e) => set('consent', e.target.checked)} className="mt-1 accent-bone" />
              <span className="text-steel text-sm leading-relaxed">{L.consent}</span>
            </label>

            {error && <p className="text-blood text-sm">{error}</p>}

            <button type="submit" disabled={submitting} className="btn-monolith w-full md:w-auto disabled:opacity-50 mt-8 md:mt-0">
              {submitting ? <><Loader2 size={14} className="animate-spin" /> {L.sending}</> : L.submit}
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