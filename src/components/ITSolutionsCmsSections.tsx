import { useEffect, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import './AssociatedCompaniesMarquee.css';

type CmsImage = {
  id: string;
  image_url: string;
  alt_text: string | null;
  display_order: number;
};

type MeetingHighlight = {
  id: string;
  title: string;
  meeting_highlight_images: CmsImage[];
};

type Company = {
  id: string;
  name: string;
  logo_url: string | null;
};

type PortfolioItem = {
  id: string;
  project_name?: string;
  company_name?: string;
  name?: string;
  description: string;
  project_url?: string | null;
  product_url?: string | null;
  display_order: number;
  client_project_images?: CmsImage[];
  product_images?: CmsImage[];
};

type CmsContent = {
  meetings: MeetingHighlight[];
  companies: Company[];
  projects: PortfolioItem[];
  products: PortfolioItem[];
};

const EMPTY_CONTENT: CmsContent = { meetings: [], companies: [], projects: [], products: [] };

function orderedImages(images: CmsImage[] = []) {
  return [...images].sort((a, b) => a.display_order - b.display_order);
}

function FeaturedImage({ image, alt, className = '' }: { image?: CmsImage; alt: string; className?: string }) {
  return image ? (
    <img src={image.image_url} alt={image.alt_text || alt} className={`h-full w-full object-cover ${className}`} loading="lazy" />
  ) : (
    <div role="img" aria-label={`${alt} image unavailable`} className={`flex h-full min-h-44 items-center justify-center bg-gradient-to-br from-violet-100 via-slate-100 to-indigo-100 ${className}`} />
  );
}

function DetailModal({ item, type, onClose }: { item: PortfolioItem; type: 'project' | 'product'; onClose: () => void }) {
  const [imageIndex, setImageIndex] = useState(0);
  const images = orderedImages(type === 'project' ? item.client_project_images : item.product_images);
  const title = item.project_name || item.name || '';

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm" onClick={onClose}>
      <article className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <button type="button" onClick={onClose} aria-label="Close details" className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center bg-white/90 text-slate-700 shadow">
          <X size={20} />
        </button>
        <div className="relative aspect-[16/9] bg-slate-100">
          <FeaturedImage image={images[imageIndex]} alt={title} />
          {images.length > 1 && (
            <>
              <button type="button" aria-label="Previous image" onClick={() => setImageIndex((imageIndex + images.length - 1) % images.length)} className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center bg-white/90 text-slate-800 shadow"><ChevronLeft /></button>
              <button type="button" aria-label="Next image" onClick={() => setImageIndex((imageIndex + 1) % images.length)} className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center bg-white/90 text-slate-800 shadow"><ChevronRight /></button>
            </>
          )}
        </div>
        <div className="p-6 sm:p-8">
          {type === 'project' && <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600">{item.company_name}</p>}
          <h3 className="mt-2 font-display text-2xl font-bold text-slate-900 sm:text-3xl">{title}</h3>
          <p className="mt-4 whitespace-pre-wrap leading-relaxed text-slate-600">{item.description}</p>
          {(item.project_url || item.product_url) && (
            <a href={item.project_url || item.product_url || undefined} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 font-semibold text-violet-700 hover:text-violet-900">
              {type === 'project' ? 'View project' : 'View product'} <ArrowUpRight size={17} />
            </a>
          )}
        </div>
      </article>
    </div>
  );
}

export default function ITSolutionsCmsSections() {
  const [content, setContent] = useState<CmsContent>(EMPTY_CONTENT);
  const [loadError, setLoadError] = useState(false);
  const [selected, setSelected] = useState<{ item: PortfolioItem; type: 'project' | 'product' } | null>(null);

  useEffect(() => {
    if (!supabase) return;
    let active = true;

    async function loadContent() {
      const [meetings, companies, projects, products] = await Promise.all([
        supabase!.from('meeting_highlights').select('id,title,meeting_highlight_images(id,image_url,alt_text,display_order)').eq('is_published', true),
        supabase!.from('associated_companies').select('id,name,logo_url').eq('is_published', true),
        supabase!.from('client_projects').select('id,project_name,company_name,description,project_url,display_order,client_project_images(id,image_url,alt_text,display_order)').eq('is_published', true).order('display_order'),
        supabase!.from('products').select('id,name,description,product_url,display_order,product_images(id,image_url,alt_text,display_order)').eq('is_published', true).order('display_order'),
      ]);

      const errors = [meetings.error, companies.error, projects.error, products.error].filter(Boolean);
      if (errors.length) {
        console.error('Some IT Solutions CMS content could not be loaded.', errors);
      }
      if (!active) return;
      setLoadError(errors.length > 0);
      setContent({
        meetings: (meetings.data || []) as unknown as MeetingHighlight[],
        companies: (companies.data || []) as unknown as Company[],
        projects: (projects.data || []) as unknown as PortfolioItem[],
        products: (products.data || []) as unknown as PortfolioItem[],
      });
    }

    void loadContent();
    return () => { active = false; };
  }, []);

  const hasContent = content.meetings.length + content.companies.length + content.projects.length + content.products.length > 0;
  if (!hasContent && !loadError) return null;

  return (
    <div className="space-y-20">
      {loadError && <p role="status" className="border border-violet-200 bg-white px-5 py-4 text-center text-sm text-slate-600">Some IT Solutions content could not be loaded right now.</p>}
      {content.companies.length > 0 && (
        <section aria-labelledby="associated-companies-heading" className="vortex-associated-section relative left-1/2 isolate w-screen -translate-x-1/2 overflow-hidden bg-[#F8FAFC] py-8">
          <div className="vortex-associated-section__background" aria-hidden="true" />
          <div className="relative z-10">
            <h2 id="associated-companies-heading" className="mb-5 text-center font-medium text-xl tracking-tight text-slate-900 md:text-3xl">
              <span className="text-slate-600">Our Network.</span>
              <br />
              <span className="font-semibold">Associated Companies</span>
            </h2>
            <CompanyLogoMarquee companies={content.companies} />
          </div>
        </section>
      )}

      {content.projects.length > 0 && (
        <PortfolioSection title="Client Projects" eyebrow="Selected Work" items={content.projects} type="project" onSelect={(item) => setSelected({ item, type: 'project' })} />
      )}

      {content.products.length > 0 && (
        <PortfolioSection title="Products Built In-House" eyebrow="VORTEX Products" items={content.products} type="product" onSelect={(item) => setSelected({ item, type: 'product' })} />
      )}

      {content.meetings.length > 0 && (
        <section aria-labelledby="meeting-highlights-heading">
          <SectionHeading eyebrow="Inside VORTEX" title="Meeting Highlights" id="meeting-highlights-heading" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {content.meetings.map((meeting) => {
              const images = orderedImages(meeting.meeting_highlight_images);
              return <article key={meeting.id} className="overflow-hidden bg-white shadow-[0_16px_45px_-34px_rgba(15,23,42,.45)]">
                <div className="aspect-[4/3] bg-slate-100"><FeaturedImage image={images[0]} alt={meeting.title} /></div>
                <h3 className="px-5 py-4 font-display text-lg font-semibold text-slate-900">{meeting.title}</h3>
                {images.length > 1 && <div className="flex gap-2 overflow-x-auto px-5 pb-5">{images.slice(1).map((image) => <img key={image.id} src={image.image_url} alt={image.alt_text || meeting.title} className="h-16 w-20 shrink-0 object-cover" loading="lazy" />)}</div>}
              </article>;
            })}
          </div>
        </section>
      )}

      {selected && <DetailModal item={selected.item} type={selected.type} onClose={() => setSelected(null)} />}
    </div>
  );
}

function CompanyLogoMarquee({ companies }: { companies: Company[] }) {
  const repetitions = Math.max(2, Math.ceil(1500 / (companies.length * 220)));
  const repeatedCompanies = Array.from({ length: repetitions }, () => companies).flat();

  const renderLogos = (copy: 'first' | 'second') => (
    <div className="vortex-company-logo-cloud__group" aria-hidden={copy === 'second'}>
      {repeatedCompanies.map((company, index) => (
        <div className="vortex-company-logo-cloud__item" key={`${copy}-${company.id}-${index}`}>
          {company.logo_url && <img src={company.logo_url} alt={copy === 'first' ? `${company.name} logo` : ''} loading="lazy" />}
          <span>{company.name}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="vortex-company-logo-cloud">
      <div className="vortex-company-logo-cloud__rule" aria-hidden="true" />
      <div className="vortex-company-logo-cloud__viewport" aria-label="Associated company logos">
        <div className="vortex-company-logo-cloud__track">
          {renderLogos('first')}
          {renderLogos('second')}
        </div>
      </div>
      <div className="vortex-company-logo-cloud__rule" aria-hidden="true" />
    </div>
  );
}

function SectionHeading({ eyebrow, title, id }: { eyebrow: string; title: string; id: string }) {
  return <div className="mb-8 text-center">
    <h2 id={id} className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
  </div>;
}

function PortfolioSection({ title, eyebrow, items, type, onSelect }: { title: string; eyebrow: string; items: PortfolioItem[]; type: 'project' | 'product'; onSelect: (item: PortfolioItem) => void }) {
  return <section aria-labelledby={`${type}-portfolio-heading`}>
    <SectionHeading eyebrow={eyebrow} title={title} id={`${type}-portfolio-heading`} />
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const images = orderedImages(type === 'project' ? item.client_project_images : item.product_images);
        const itemTitle = item.project_name || item.name || '';
        return <button type="button" key={item.id} onClick={() => onSelect(item)} className="group overflow-hidden bg-white text-left shadow-[0_16px_45px_-34px_rgba(15,23,42,.45)] transition-transform hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-600">
          <div className="aspect-[4/3] overflow-hidden bg-slate-100"><FeaturedImage image={images[0]} alt={itemTitle} className="transition-transform duration-500 group-hover:scale-[1.03]" /></div>
          <div className="p-5">
            {type === 'project' && <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-600">{item.company_name}</p>}
            <h3 className="mt-2 font-display text-xl font-semibold text-slate-900">{itemTitle}</h3>
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">{item.description}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-violet-700">View details <ArrowUpRight size={15} /></span>
            <span className="sr-only">Includes {images.length} {images.length === 1 ? 'image' : 'images'}</span>
          </div>
        </button>;
      })}
    </div>
  </section>;
}
