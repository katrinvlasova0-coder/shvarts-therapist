import { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';

const TABS = [
  { id: 'requests', label: 'Заявки' },
  { id: 'projects', label: 'Проекты' },
  { id: 'publications', label: 'Публикации' },
  { id: 'formats', label: 'Форматы' },
  { id: 'reviews', label: 'Отзывы' },
  { id: 'content', label: 'Контент' },
];

const STATUSES = ['NEW', 'CONTACTED', 'ACCEPTED', 'IN_WORK', 'CLOSED', 'DECLINED'];

export default function Admin() {
  const [tab, setTab] = useState('requests');

  return (
    <div className="min-h-screen bg-void text-bone">
      <header className="border-b border-border px-5 md:px-10 py-6 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold tracking-tightest">ШВАРЦ ЧÖРНЫЙ — Admin</h1>
          <p className="text-[10px] uppercase tracking-[0.25em] text-steel mt-1">CMS + CRM</p>
        </div>
        <a href="/" className="text-[10px] uppercase tracking-[0.25em] text-steel hover:text-bone transition-colors">← На сайт</a>
      </header>

      <nav className="border-b border-border px-5 md:px-10 flex gap-6 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`py-4 text-xs uppercase tracking-[0.2em] whitespace-nowrap border-b-2 transition-colors ${tab === t.id ? 'border-bone text-bone' : 'border-transparent text-steel hover:text-bone'}`}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <main className="p-5 md:p-10">
        {tab === 'requests' && <RequestsTab />}
        {tab === 'projects' && <ProjectsTab />}
        {tab === 'publications' && <PublicationsTab />}
        {tab === 'formats' && <FormatsTab />}
        {tab === 'reviews' && <ReviewsTab />}
        {tab === 'content' && <ContentTab />}
      </main>
    </div>
  );
}

/* ---------- Заявки (CRM) ---------- */
function RequestsTab() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    base44.entities.CaseRequest.list('-created_date', 100)
      .then((d) => setItems(Array.isArray(d) ? d : []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const update = async (id, data) => {
    await base44.entities.CaseRequest.update(id, data);
    load();
  };

  if (loading) return <Spinner />;
  if (!items.length) return <Empty label="Заявок пока нет" />;

  return (
    <div className="space-y-4">
      {items.map((r) => (
        <div key={r.id} className="border border-border p-5 md:p-6 bg-shadow-1">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-bone font-bold text-lg">{r.name}{r.alias ? ` (${r.alias})` : ''}</p>
              <p className="text-steel text-sm mt-1">{r.contact} · {r.contact_method}</p>
              <p className="text-gold text-[10px] uppercase tracking-[0.2em] mt-2">{r.request_type}</p>
              <p className="text-steel/60 text-xs mt-1">{new Date(r.created_date).toLocaleString('ru-RU')}</p>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <select
                value={r.status}
                onChange={(e) => update(r.id, { status: e.target.value })}
                className="bg-void border border-border text-bone text-xs px-3 py-2 focus:outline-none focus:border-bone"
              >
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              {r.file_url && <a href={r.file_url} target="_blank" rel="noreferrer" className="text-[10px] uppercase tracking-[0.2em] text-steel hover:text-bone">Файл →</a>}
            </div>
          </div>
          {r.case_text && <p className="mt-4 text-bone/80 text-sm leading-relaxed whitespace-pre-wrap border-t border-border pt-4">{r.case_text}</p>}
          <input
            defaultValue={r.admin_comment || ''}
            onBlur={(e) => e.target.value !== (r.admin_comment || '') && update(r.id, { admin_comment: e.target.value })}
            placeholder="Комментарий администратора…"
            className="field-underline mt-4 text-sm"
          />
        </div>
      ))}
    </div>
  );
}

/* ---------- Проекты ---------- */
function ProjectsTab() {
  return <CrudList entity="Project" fields={[['title','Название','text'],['description','Описание','textarea'],['image_url','URL изображения','text'],['external_url','Внешний URL','text'],['sort_order','Порядок','number']]} />;
}

function PublicationsTab() {
  return <CrudList entity="Publication" fields={[['title','Название','text'],['type','Тип','select:Статья,Эссе,Исследование,Интервью,Видео,Аудио,Подкаст,Публикация в СМИ,Книга,Другое'],['description','Описание','textarea'],['url','Ссылка','text'],['media_url','Медиа URL','text'],['published_date','Дата','date'],['sort_order','Порядок','number']]} />;
}

function FormatsTab() {
  return <CrudList entity="ConsultationFormat" fields={[['title','Название','text'],['price','Стоимость','text'],['duration','Продолжительность','text'],['description','Описание','textarea'],['sort_order','Порядок','number']]} />;
}

function ReviewsTab() {
  return <CrudList entity="Review" fields={[['author','Автор','text'],['role','Контекст','text'],['text','Текст','textarea'],['is_published','Опубликован','checkbox'],['sort_order','Порядок','number']]} />;
}

function ContentTab() {
  return <CrudList entity="SiteContent" fields={[['key','Ключ','text'],['section','Раздел','text'],['value','Значение','textarea']]} />;
}

/* ---------- Generic CRUD ---------- */
function CrudList({ entity, fields }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  const load = () => {
    setLoading(true);
    base44.entities[entity].list('sort_order', 100)
      .then((d) => setItems(Array.isArray(d) ? d : []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  };
  useEffect(load, [entity]);

  const save = async (data) => {
    if (editing.id) {
      await base44.entities[entity].update(editing.id, data);
    } else {
      await base44.entities[entity].create(data);
    }
    setEditing(null);
    load();
  };

  const remove = async (id) => {
    if (!confirm('Удалить запись?')) return;
    await base44.entities[entity].delete(id);
    load();
  };

  if (loading) return <Spinner />;
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <span className="text-steel text-xs uppercase tracking-[0.2em]">{items.length} записей</span>
        <button onClick={() => setEditing({})} className="btn-monolith text-[10px] px-5 py-2">+ Добавить</button>
      </div>

      {editing && <EditForm fields={fields} initial={editing} onSave={save} onCancel={() => setEditing(null)} />}

      <div className="space-y-2">
        {items.map((it) => (
          <div key={it.id} className="border border-border p-4 flex items-center justify-between gap-4 bg-shadow-1">
            <div className="min-w-0">
              <p className="text-bone truncate">{it.title || it.key || it.author || '—'}</p>
              {it.description && <p className="text-steel text-sm truncate mt-1">{it.description}</p>}
            </div>
            <div className="flex gap-3 shrink-0">
              <button onClick={() => setEditing(it)} className="text-[10px] uppercase tracking-[0.2em] text-steel hover:text-bone">Изменить</button>
              <button onClick={() => remove(it.id)} className="text-[10px] uppercase tracking-[0.2em] text-blood hover:opacity-80">Удалить</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EditForm({ fields, initial, onSave, onCancel }) {
  const [data, setData] = useState(initial);

  const set = (k, v) => setData((d) => ({ ...d, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    const clean = { ...data };
    delete clean.id; delete clean.created_date; delete clean.updated_date; delete clean.created_by_id;
    onSave(clean);
  };

  return (
    <form onSubmit={submit} className="border border-border p-6 mb-6 bg-shadow-1 space-y-5">
      <div className="grid md:grid-cols-2 gap-5">
        {fields.map(([key, label, type]) => (
          <div key={key} className={type === 'textarea' ? 'md:col-span-2' : ''}>
            <label className="block text-[10px] uppercase tracking-[0.2em] text-steel mb-2">{label}</label>
            {type === 'textarea' ? (
              <textarea className="field-underline resize-none min-h-[100px]" value={data[key] || ''} onChange={(e) => set(key, e.target.value)} />
            ) : type.startsWith('select:') ? (
              <select className="field-underline" value={data[key] || ''} onChange={(e) => set(key, e.target.value)}>
                {type.slice(7).split(',').map((o) => <option key={o} value={o} className="bg-void">{o}</option>)}
              </select>
            ) : type === 'checkbox' ? (
              <input type="checkbox" checked={!!data[key]} onChange={(e) => set(key, e.target.checked)} className="accent-bone w-5 h-5" />
            ) : (
              <input type={type === 'number' ? 'number' : type === 'date' ? 'date' : 'text'} className="field-underline" value={data[key] ?? ''} onChange={(e) => set(key, type === 'number' ? Number(e.target.value) : e.target.value)} />
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-4">
        <button type="submit" className="btn-monolith btn-monolith-solid text-[10px] px-6 py-3">Сохранить</button>
        <button type="button" onClick={onCancel} className="btn-monolith text-[10px] px-6 py-3">Отмена</button>
      </div>
    </form>
  );
}

function Spinner() {
  return <div className="h-40 flex items-center justify-center"><div className="w-6 h-6 border-2 border-border border-t-bone rounded-full animate-spin" /></div>;
}
function Empty({ label }) {
  return <p className="text-steel text-sm">{label}</p>;
}