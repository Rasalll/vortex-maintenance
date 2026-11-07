import { useCallback, useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp, ImagePlus, LogOut, Plus, Save, ShieldAlert, Trash2, X } from 'lucide-react';
import type { Session } from '@supabase/supabase-js';
import { imageExtensionForMime, MAX_IMAGE_SIZE_BYTES, prepareImageForUpload } from '@/lib/imageUpload';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';

type SectionKey = 'meetings' | 'companies' | 'projects' | 'products';
type InputKind = 'text' | 'textarea' | 'url';
type FieldSpec = { key: string; label: string; kind: InputKind; required?: boolean; placeholder?: string };
type ImageItem = { id?: string; image_url?: string; alt_text: string; file?: File };
type CmsRecord = { id: string; [key: string]: unknown };

const SECTIONS: Record<SectionKey, { label: string; table: string; titleKey: string; descriptionKey?: string; imageRelation?: string; imageForeignKey?: string; folder: string; hasDisplayOrder?: boolean; fields: FieldSpec[] }> = {
  meetings: {
    label: 'Meeting Highlights', table: 'meeting_highlights', titleKey: 'title', imageRelation: 'meeting_highlight_images', imageForeignKey: 'meeting_id', folder: 'meetings',
    fields: [{ key: 'title', label: 'Title', kind: 'text', required: true }],
  },
  companies: {
    label: 'Associated Companies', table: 'associated_companies', titleKey: 'name', folder: 'companies',
    fields: [
      { key: 'name', label: 'Company name', kind: 'text', required: true },
    ],
  },
  projects: {
    label: 'Client Projects', table: 'client_projects', titleKey: 'project_name', descriptionKey: 'description', imageRelation: 'client_project_images', imageForeignKey: 'project_id', folder: 'client-projects', hasDisplayOrder: true,
    fields: [
      { key: 'project_name', label: 'Project name', kind: 'text', required: true },
      { key: 'company_name', label: 'Company or client', kind: 'text', required: true },
      { key: 'description', label: 'Description', kind: 'textarea' },
      { key: 'project_url', label: 'Project URL', kind: 'url', placeholder: 'https://' },
    ],
  },
  products: {
    label: 'Products', table: 'products', titleKey: 'name', descriptionKey: 'description', imageRelation: 'product_images', imageForeignKey: 'product_id', folder: 'products', hasDisplayOrder: true,
    fields: [
      { key: 'name', label: 'Product name', kind: 'text', required: true },
      { key: 'description', label: 'Description', kind: 'textarea' },
      { key: 'product_url', label: 'Product or demo URL', kind: 'url', placeholder: 'https://' },
    ],
  },
};

const NAV_ORDER: SectionKey[] = ['meetings', 'companies', 'projects', 'products'];
const BUCKET = 'it-solutions-media';
const MAX_IMAGE_COUNT = 12;

function friendlyError(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'object' && error && 'message' in error) return String(error.message);
  return 'Something went wrong. Please try again.';
}

function publicUrlToPath(url: string | null | undefined): string | null {
  if (!url) return null;
  const marker = `/storage/v1/object/public/${BUCKET}/`;
  const index = url.indexOf(marker);
  if (index < 0) return null;
  try { return decodeURIComponent(url.slice(index + marker.length)); } catch { return url.slice(index + marker.length); }
}

function RecordTitle({ record, titleKey }: { record: CmsRecord; titleKey: string }) {
  return <>{String(record[titleKey] || 'Untitled')}</>;
}

function DraftPreview({ image }: { image: ImageItem }) {
  const [src, setSrc] = useState(image.image_url || '');
  useEffect(() => {
    if (!image.file) { setSrc(image.image_url || ''); return; }
    const objectUrl = URL.createObjectURL(image.file);
    setSrc(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [image.file, image.image_url]);
  return <img src={src} alt={image.alt_text || 'Selected image preview'} className="h-20 w-24 shrink-0 bg-slate-100 object-cover" />;
}

function LoginScreen({ onSignedIn }: { onSignedIn: (session: Session) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!supabase) return;
    setSubmitting(true);
    setError('');
    const { data, error: signInError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setSubmitting(false);
    if (signInError || !data.session) {
      setError('Email or password is incorrect.');
      return;
    }
    onSignedIn(data.session);
  }

  return <main className="grid min-h-screen place-items-center bg-slate-50 px-4 py-10 text-slate-900">
    <form onSubmit={submit} className="w-full max-w-md border border-slate-200 bg-white p-7 shadow-[0_24px_70px_-45px_rgba(15,23,42,.4)] sm:p-9">
      <a href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-violet-700"><ArrowLeft size={16} /> Back to website</a>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">VORTEX CMS</p>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">Admin sign in</h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">Use the admin account created for the VORTEX website.</p>
      <label className="mt-7 block text-sm font-semibold" htmlFor="admin-email">Email</label>
      <input id="admin-email" type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full border border-slate-200 px-3 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100" />
      <label className="mt-5 block text-sm font-semibold" htmlFor="admin-password">Password</label>
      <input id="admin-password" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full border border-slate-200 px-3 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100" />
      {error && <p role="alert" className="mt-4 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      <button type="submit" disabled={submitting} className="mt-6 w-full bg-violet-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-violet-700 disabled:cursor-wait disabled:opacity-60">{submitting ? 'Signing in…' : 'Sign in'}</button>
    </form>
  </main>;
}

export default function AdminDashboard() {
  const [session, setSession] = useState<Session | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [checkingAccess, setCheckingAccess] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [accessError, setAccessError] = useState('');
  const [activeSection, setActiveSection] = useState<SectionKey>('meetings');
  const [notice, setNotice] = useState<{ kind: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    if (!supabase) { setCheckingSession(false); return; }
    let mounted = true;
    void supabase.auth.getSession().then(({ data, error }) => {
      if (!mounted) return;
      if (error) setAccessError('Your session could not be restored. Please sign in again.');
      setSession(data.session);
      setCheckingSession(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!mounted) return;
      setSession(nextSession);
      setIsAdmin(false);
      setAccessError('');
      setCheckingSession(false);
    });
    return () => { mounted = false; subscription.unsubscribe(); };
  }, []);

  useEffect(() => {
    let active = true;
    async function checkAdmin() {
      if (!supabase || !session) { setIsAdmin(false); return; }
      setCheckingAccess(true);
      setAccessError('');
      const { data, error } = await supabase.from('admin_users').select('user_id').eq('user_id', session.user.id).maybeSingle();
      if (!active) return;
      setIsAdmin(Boolean(data?.user_id));
      if (error) setAccessError('Admin permission could not be verified. Please try again or contact the site owner.');
      setCheckingAccess(false);
    }
    void checkAdmin();
    return () => { active = false; };
  }, [session]);

  const signOut = useCallback(async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setSession(null);
    setIsAdmin(false);
  }, []);

  if (!isSupabaseConfigured || !supabase) return <main className="grid min-h-screen place-items-center bg-slate-50 px-6 text-center text-slate-800"><div className="max-w-lg"><ShieldAlert className="mx-auto text-amber-600" size={40} /><h1 className="mt-4 text-2xl font-bold">Supabase is not configured</h1><p className="mt-2 text-slate-600">Add the project URL and publishable key to your local environment, then restart the dev server.</p><a href="/" className="mt-5 inline-block font-semibold text-violet-700">Back to website</a></div></main>;
  if (checkingSession || (session && checkingAccess)) return <div className="grid min-h-screen place-items-center bg-slate-50 text-sm font-medium text-slate-600">Checking administrator access…</div>;
  if (!session) return <LoginScreen onSignedIn={(nextSession) => setSession(nextSession)} />;
  if (accessError || !isAdmin) return <main className="grid min-h-screen place-items-center bg-slate-50 px-6 text-center text-slate-800"><div className="max-w-lg border border-slate-200 bg-white p-8 shadow-sm"><ShieldAlert className="mx-auto text-amber-600" size={36} /><h1 className="mt-4 text-2xl font-bold">Administrator access required</h1><p role="alert" className="mt-2 text-slate-600">{accessError || 'This signed-in account is not authorized to manage website content.'}</p><button onClick={() => void signOut()} className="mt-6 inline-flex items-center gap-2 border border-slate-200 px-4 py-2 font-semibold hover:border-violet-400"><LogOut size={16} /> Sign out</button></div></main>;

  return <main className="min-h-screen bg-slate-50 text-slate-900">
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-8">
        <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-600">VORTEX CMS</p><h1 className="mt-1 text-xl font-bold">IT Solutions Content</h1></div>
        <div className="flex items-center gap-3"><a href="/it-solutions" className="hidden items-center gap-1 text-sm font-medium text-slate-600 hover:text-violet-700 sm:inline-flex"><ArrowLeft size={15} /> View site</a><button onClick={() => void signOut()} className="inline-flex items-center gap-2 border border-slate-200 px-3 py-2 text-sm font-semibold hover:border-violet-400"><LogOut size={15} /><span className="hidden sm:inline">Sign out</span></button></div>
      </div>
    </header>
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-8 sm:py-10">
      <nav aria-label="CMS content sections" className="mb-7 flex gap-2 overflow-x-auto pb-2">
        {NAV_ORDER.map((key) => <button key={key} type="button" onClick={() => setActiveSection(key)} className={`shrink-0 border px-4 py-2.5 text-sm font-semibold transition-colors ${activeSection === key ? 'border-violet-600 bg-violet-600 text-white' : 'border-slate-200 bg-white text-slate-600 hover:border-violet-300 hover:text-violet-700'}`}>{SECTIONS[key].label}</button>)}
      </nav>
      {notice && <div role="status" className={`mb-5 flex items-start justify-between gap-3 border px-4 py-3 text-sm ${notice.kind === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-red-200 bg-red-50 text-red-800'}`}><span>{notice.message}</span><button onClick={() => setNotice(null)} aria-label="Dismiss message"><X size={17} /></button></div>}
      <SectionManager section={activeSection} onNotice={(next) => setNotice(next)} />
    </div>
  </main>;
}

function SectionManager({ section, onNotice }: { section: SectionKey; onNotice: (notice: { kind: 'success' | 'error'; message: string }) => void }) {
  const config = SECTIONS[section];
  const [records, setRecords] = useState<CmsRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [editing, setEditing] = useState<CmsRecord | null>(null);

  const loadRecords = useCallback(async () => {
    if (!supabase) return;
    setLoading(true);
    setLoadError('');
    const selection = config.imageRelation ? `*,${config.imageRelation}(id,image_url,alt_text,display_order)` : '*';
    let query = supabase.from(config.table).select(selection);
    if (config.hasDisplayOrder) query = query.order('display_order', { ascending: true });
    const { data, error } = await query;
    if (error) setLoadError(error.message);
    setRecords((data || []) as unknown as CmsRecord[]);
    setLoading(false);
  }, [config]);

  useEffect(() => { void loadRecords(); }, [loadRecords]);

  async function togglePublished(record: CmsRecord) {
    if (!supabase) return;
    const { error } = await supabase.from(config.table).update({ is_published: !record.is_published, updated_at: new Date().toISOString() }).eq('id', record.id);
    if (error) onNotice({ kind: 'error', message: `Could not update publication status: ${error.message}` });
    else { onNotice({ kind: 'success', message: `${String(record[config.titleKey] || 'Content')} ${record.is_published ? 'unpublished' : 'published'}.` }); await loadRecords(); }
  }

  async function changeOrder(record: CmsRecord, direction: -1 | 1) {
    const client = supabase;
    if (!client) return;
    const index = records.findIndex((entry) => entry.id === record.id);
    if (index < 0 || !records[index + direction]) return;
    const reordered = [...records];
    [reordered[index], reordered[index + direction]] = [reordered[index + direction], reordered[index]];
    const responses = await Promise.all(reordered.map((entry, order) => client.from(config.table).update({ display_order: order }).eq('id', entry.id)));
    const error = responses.find((response) => response.error)?.error;
    if (error) onNotice({ kind: 'error', message: `Could not change display order: ${error.message}` });
    else await loadRecords();
  }

  async function deleteRecord(record: CmsRecord) {
    if (!supabase || !window.confirm(`Delete “${String(record[config.titleKey] || 'this item')}”? This cannot be undone.`)) return;
    const relatedImages = config.imageRelation ? (record[config.imageRelation] as CmsRecord[] | undefined) || [] : [];
    const urls = relatedImages.map((image) => String(image.image_url || '')).filter(Boolean);
    if (section === 'companies' && record.logo_url) urls.push(String(record.logo_url));
    const { error } = await supabase.from(config.table).delete().eq('id', record.id);
    if (error) { onNotice({ kind: 'error', message: `Could not delete this item: ${error.message}` }); return; }
    const paths = urls.map(publicUrlToPath).filter((path): path is string => Boolean(path));
    if (paths.length) {
      const { error: storageError } = await supabase.storage.from(BUCKET).remove(paths);
      if (storageError) onNotice({ kind: 'error', message: `The content was deleted, but some stored images could not be removed: ${storageError.message}` });
      else onNotice({ kind: 'success', message: 'Content and related images deleted.' });
    } else onNotice({ kind: 'success', message: 'Content deleted.' });
    await loadRecords();
  }

  const emptyMessage = useMemo(() => `No ${config.label.toLowerCase()} yet. Add the first item to get started.`, [config.label]);

  return <section>
    <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
      <div><h2 className="text-2xl font-bold">{config.label}</h2><p className="mt-1 text-sm text-slate-500">{config.hasDisplayOrder ? 'Manage content, publication, and display order.' : 'Manage content and publication.'}</p></div>
      <button type="button" onClick={() => setEditing({ id: '', is_published: false, ...(config.hasDisplayOrder ? { display_order: records.length } : {}) })} className="inline-flex items-center gap-2 bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-700"><Plus size={17} /> Add item</button>
    </div>
    {loadError && <p role="alert" className="mb-4 border border-red-200 bg-red-50 p-3 text-sm text-red-800">Could not load content: {loadError}</p>}
    {loading ? <p className="border border-slate-200 bg-white p-8 text-center text-slate-500">Loading content…</p>
      : records.length === 0 ? <p className="border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">{emptyMessage}</p>
      : <div className="space-y-3">{records.map((record, index) => {
        const imageValue = config.imageRelation ? (record[config.imageRelation] as CmsRecord[] | undefined)?.[0]?.image_url : record.logo_url;
        const published = Boolean(record.is_published);
        return <article key={record.id} className="flex flex-wrap items-center gap-4 border border-slate-200 bg-white p-4 sm:p-5">
          {Boolean(imageValue) && <img src={String(imageValue)} alt="" className="h-16 w-20 shrink-0 bg-slate-100 object-cover" />}
          <div className="min-w-0 flex-1"><h3 className="truncate font-semibold"><RecordTitle record={record} titleKey={config.titleKey} /></h3><p className="mt-1 line-clamp-2 text-sm text-slate-500">{String(record[config.descriptionKey || ''] || '')}</p><span className={`mt-2 inline-block text-xs font-semibold ${published ? 'text-emerald-700' : 'text-slate-500'}`}>{published ? 'Published' : 'Draft'}</span></div>
          <div className="flex flex-wrap items-center gap-2">
            {config.hasDisplayOrder && <>
              <button type="button" disabled={index === 0} onClick={() => void changeOrder(record, -1)} aria-label="Move up" className="border border-slate-200 p-2 text-slate-600 disabled:opacity-30"><ChevronUp size={17} /></button>
              <button type="button" disabled={index === records.length - 1} onClick={() => void changeOrder(record, 1)} aria-label="Move down" className="border border-slate-200 p-2 text-slate-600 disabled:opacity-30"><ChevronDown size={17} /></button>
            </>}
            <button type="button" onClick={() => void togglePublished(record)} className="border border-slate-200 px-3 py-2 text-xs font-semibold hover:border-violet-400">{published ? 'Unpublish' : 'Publish'}</button>
            <button type="button" onClick={() => setEditing(record)} className="border border-slate-200 px-3 py-2 text-xs font-semibold hover:border-violet-400">Edit</button>
            <button type="button" onClick={() => void deleteRecord(record)} aria-label={`Delete ${String(record[config.titleKey] || 'item')}`} className="border border-red-200 p-2 text-red-600 hover:bg-red-50"><Trash2 size={16} /></button>
          </div>
        </article>;
      })}</div>}
    {editing && <RecordEditor key={`${section}-${editing.id || 'new'}`} section={section} record={editing} onClose={() => setEditing(null)} onSaved={async (message) => { setEditing(null); onNotice({ kind: 'success', message }); await loadRecords(); }} onError={(message) => onNotice({ kind: 'error', message })} />}
  </section>;
}

function RecordEditor({ section, record, onClose, onSaved, onError }: { section: SectionKey; record: CmsRecord; onClose: () => void; onSaved: (message: string) => Promise<void>; onError: (message: string) => void }) {
  const config = SECTIONS[section];
  const [values, setValues] = useState<Record<string, string>>(() => Object.fromEntries(config.fields.map((field) => [field.key, String(record[field.key] ?? '')])));
  const existingImages = config.imageRelation ? ((record[config.imageRelation] as CmsRecord[] | undefined) || []).map((image) => ({ id: String(image.id), image_url: String(image.image_url), alt_text: String(image.alt_text || '') })) : [];
  const initialCompanyImage = section === 'companies' && record.logo_url ? [{ image_url: String(record.logo_url), alt_text: `${String(record.name || '')} logo` }] : [];
  const [images, setImages] = useState<ImageItem[]>(section === 'companies' ? initialCompanyImage : existingImages);
  const [isPublished, setIsPublished] = useState(Boolean(record.is_published));
  const [displayOrder, setDisplayOrder] = useState(String(record.display_order ?? 0));
  const [saving, setSaving] = useState(false);
  const isMultiple = section !== 'companies';

  function addFiles(files: FileList | null) {
    if (!files) return;
    const requestedFiles = Array.from(files);
    const oversized = requestedFiles.filter((file) => file.size > MAX_IMAGE_SIZE_BYTES);
    if (oversized.length) onError(`${oversized.map((file) => file.name).join(', ')} exceed${oversized.length === 1 ? 's' : ''} the 5 MiB limit and were not added.`);
    const selected = requestedFiles.filter((file) => file.size <= MAX_IMAGE_SIZE_BYTES);
    if (!selected.length) return;
    if (section === 'companies') {
      if (selected.length > 1) onError('Choose one company logo at a time.');
      const file = selected[0];
      if (file) setImages([{ file, alt_text: `${String(record.name || values.name || 'Company')} logo` }]);
      return;
    }
    const capacity = MAX_IMAGE_COUNT - images.length;
    if (selected.length > capacity) { onError(`You can add up to ${MAX_IMAGE_COUNT} images per item.`); }
    const nextFiles = selected.slice(0, Math.max(0, capacity));
    setImages((current) => [...current, ...nextFiles.map((file) => ({ file, alt_text: file.name.replace(/\.[^.]+$/, '') }))]);
  }

  function moveImage(index: number, direction: -1 | 1) {
    setImages((current) => {
      const next = [...current];
      const target = index + direction;
      if (target < 0 || target >= next.length) return current;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  async function save(event: FormEvent) {
    event.preventDefault();
    if (!supabase) return;
    setSaving(true);
    const payload: Record<string, unknown> = Object.fromEntries(config.fields.map((field) => [field.key, values[field.key]?.trim() || null]));
    for (const field of config.fields.filter((entry) => entry.required)) {
      if (!values[field.key]?.trim()) { setSaving(false); onError(`${field.label} is required.`); return; }
    }
    for (const field of config.fields.filter((entry) => entry.kind === 'url')) {
      const value = values[field.key]?.trim();
      if (value && !/^https?:\/\//i.test(value)) { setSaving(false); onError(`${field.label} must start with http:// or https://.`); return; }
    }
    if (config.hasDisplayOrder) payload.display_order = Math.max(0, Number.parseInt(displayOrder, 10) || 0);
    payload.is_published = Boolean(record.is_published);
    payload.updated_at = new Date().toISOString();
    if (section === 'companies') payload.logo_url = record.logo_url || null;

    let recordId = record.id;
    if (recordId) {
      const { error } = await supabase.from(config.table).update(payload).eq('id', recordId);
      if (error) { setSaving(false); onError(`Could not save changes: ${error.message}`); return; }
    } else {
      const { data, error } = await supabase.from(config.table).insert(payload).select('id').single();
      if (error || !data) { setSaving(false); onError(`Could not create this item: ${error?.message || 'No record returned.'}`); return; }
      recordId = data.id;
    }

    const uploadedPaths: string[] = [];
    let uploadsReferenced = false;
    let cleanupWarning = '';
    try {
      if (section === 'companies') {
        const nextImage = images[0];
        const nextLogoUrl = nextImage?.file ? await uploadFile(nextImage.file, config.folder, recordId, uploadedPaths) : nextImage?.image_url || null;
        if (nextLogoUrl !== (record.logo_url || null)) {
          const { error } = await supabase.from(config.table).update({ logo_url: nextLogoUrl, updated_at: new Date().toISOString() }).eq('id', recordId);
          if (error) throw error;
          uploadsReferenced = Boolean(nextImage?.file && nextLogoUrl);
          const previousPath = publicUrlToPath(String(record.logo_url || ''));
          if (previousPath && previousPath !== publicUrlToPath(nextLogoUrl)) {
            try { await removeStorageFiles([previousPath]); } catch { cleanupWarning = ' The previous logo file could not be removed.'; }
          }
        }
      } else {
        const keptIds = new Set(images.filter((image) => image.id).map((image) => image.id));
        const removed = existingImages.filter((image) => !keptIds.has(image.id!));
        const newRows: Record<string, unknown>[] = [];
        for (let index = 0; index < images.length; index += 1) {
          const image = images[index];
          if (image.file) {
            const url = await uploadFile(image.file, config.folder, recordId, uploadedPaths);
            newRows.push({ [config.imageForeignKey!]: recordId, image_url: url, alt_text: image.alt_text || null, display_order: index });
          } else if (image.id) {
            const { error } = await supabase.from(config.imageRelation!).update({ alt_text: image.alt_text || null, display_order: index }).eq('id', image.id);
            if (error) throw error;
          }
        }
        if (newRows.length) {
          const { error } = await supabase.from(config.imageRelation!).insert(newRows);
          if (error) throw error;
          uploadsReferenced = true;
        }
        if (removed.length) {
          const { error } = await supabase.from(config.imageRelation!).delete().in('id', removed.map((image) => image.id));
          if (error) throw error;
        }
        try {
          await removeStorageFiles(removed.map((image) => publicUrlToPath(image.image_url)).filter((path): path is string => Boolean(path)));
        } catch {
          cleanupWarning = ' Some removed image files could not be cleaned up.';
        }
      }
      const { error: publishError } = await supabase.from(config.table).update({ is_published: isPublished, updated_at: new Date().toISOString() }).eq('id', recordId);
      if (publishError) throw publishError;
      setSaving(false);
      await onSaved(`${String(payload[config.titleKey] || 'Content')} saved.${cleanupWarning}`);
    } catch (error) {
      if (uploadedPaths.length && !uploadsReferenced) {
        try { await removeStorageFiles(uploadedPaths); } catch { cleanupWarning = ' Uploaded files may need cleanup.'; }
      }
      setSaving(false);
      onError(`Some content fields may already be saved. Image changes did not finish: ${friendlyError(error)}.${cleanupWarning} Reopen the item and retry.`);
    }
  }

  async function uploadFile(file: File, folder: string, parentId: string, uploadedPaths: string[]) {
    const prepared = await prepareImageForUpload(file);
    if (prepared.size > MAX_IMAGE_SIZE_BYTES) throw new Error(`${file.name} exceeds the 5 MiB upload limit.`);
    const path = `${folder}/${parentId}/${crypto.randomUUID()}.${imageExtensionForMime(prepared.type)}`;
    const { error } = await supabase!.storage.from(BUCKET).upload(path, prepared, { contentType: prepared.type, upsert: false });
    if (error) throw error;
    uploadedPaths.push(path);
    return supabase!.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
  }

  async function removeStorageFiles(paths: string[]) {
    if (!paths.length) return;
    const { error } = await supabase!.storage.from(BUCKET).remove(paths);
    if (error) throw error;
  }

  return <div className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto bg-slate-950/50 p-3 backdrop-blur-sm sm:items-center sm:p-6" onClick={onClose}>
    <form onSubmit={save} onClick={(event) => event.stopPropagation()} className="my-3 w-full max-w-2xl bg-white shadow-2xl sm:my-8">
      <div className="flex items-start justify-between border-b border-slate-200 px-5 py-4 sm:px-7"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-600">{record.id ? 'Edit item' : 'New item'}</p><h2 className="mt-1 text-xl font-bold">{config.label}</h2></div><button type="button" onClick={onClose} aria-label="Close editor" className="p-1 text-slate-500 hover:text-slate-900"><X /></button></div>
      <div className="max-h-[72vh] space-y-5 overflow-y-auto px-5 py-5 sm:px-7">
        {config.fields.map((field) => <label key={field.key} className="block text-sm font-semibold text-slate-800">{field.label}{field.required && <span className="text-red-600"> *</span>}
          {field.kind === 'textarea' ? <textarea required={field.required} rows={4} value={values[field.key] || ''} onChange={(event) => setValues((current) => ({ ...current, [field.key]: event.target.value }))} className="mt-2 w-full border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100" />
            : <input type={field.kind === 'url' ? 'url' : 'text'} required={field.required} placeholder={field.placeholder} value={values[field.key] || ''} onChange={(event) => setValues((current) => ({ ...current, [field.key]: event.target.value }))} className="mt-2 w-full border border-slate-200 px-3 py-2.5 font-normal outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100" />}
        </label>)}
        <label className="block text-sm font-semibold text-slate-800">{section === 'companies' ? 'Company logo' : 'Images'}
          <span className="mt-2 flex cursor-pointer items-center justify-center gap-2 border border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-sm font-medium text-slate-600 hover:border-violet-400 hover:text-violet-700"><ImagePlus size={18} />{section === 'companies' ? 'Choose logo' : 'Add images'}<input type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif" multiple={isMultiple} onChange={(event) => { addFiles(event.target.files); event.target.value = ''; }} className="sr-only" /></span>
        </label>
        {images.length > 0 && <div className="space-y-3">{images.map((image, index) => <div key={image.id || `${image.file?.name}-${index}`} className="flex flex-wrap items-center gap-3 border border-slate-200 p-3"><DraftPreview image={image} /><div className="min-w-0 flex-1"><p className="truncate text-xs text-slate-500">{image.file?.name || image.image_url?.split('/').pop()}</p><label className="mt-1 block text-xs font-medium text-slate-600">Alt text<input value={image.alt_text} onChange={(event) => setImages((current) => current.map((entry, entryIndex) => entryIndex === index ? { ...entry, alt_text: event.target.value } : entry))} className="mt-1 w-full border border-slate-200 px-2 py-1.5 text-sm font-normal" /></label></div><div className="flex gap-1"><button type="button" disabled={index === 0} onClick={() => moveImage(index, -1)} aria-label="Move image up" className="border border-slate-200 p-2 disabled:opacity-30"><ChevronUp size={16} /></button><button type="button" disabled={index === images.length - 1} onClick={() => moveImage(index, 1)} aria-label="Move image down" className="border border-slate-200 p-2 disabled:opacity-30"><ChevronDown size={16} /></button><button type="button" onClick={() => setImages((current) => current.filter((_, entryIndex) => entryIndex !== index))} aria-label="Remove image" className="border border-red-200 p-2 text-red-600 hover:bg-red-50"><X size={16} /></button></div></div>)}</div>}
        <div className={`grid gap-4 ${config.hasDisplayOrder ? 'sm:grid-cols-2' : ''}`}>
          {config.hasDisplayOrder && <label className="text-sm font-semibold">Display order<input type="number" min={0} value={displayOrder} onChange={(event) => setDisplayOrder(event.target.value)} className="mt-2 w-full border border-slate-200 px-3 py-2.5 font-normal" /></label>}
          <label className="flex items-center gap-2 self-end border border-slate-200 px-3 py-3 text-sm font-semibold"><input type="checkbox" checked={isPublished} onChange={(event) => setIsPublished(event.target.checked)} className="h-4 w-4 accent-violet-600" /> Published on website</label>
        </div>
      </div>
      <div className="flex justify-end gap-3 border-t border-slate-200 px-5 py-4 sm:px-7"><button type="button" onClick={onClose} className="border border-slate-200 px-4 py-2.5 text-sm font-semibold">Cancel</button><button type="submit" disabled={saving} className="inline-flex items-center gap-2 bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-700 disabled:opacity-60">{saving ? 'Saving…' : <><Save size={16} /> Save item</>}</button></div>
    </form>
  </div>;
}
