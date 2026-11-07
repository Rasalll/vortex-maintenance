create table public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

revoke all privileges on table public.admin_users from anon, authenticated;
grant select on table public.admin_users to authenticated;

create policy "admins_can_read_own_authorization"
on public.admin_users
for select
to authenticated
using ((select auth.uid()) = user_id);

revoke all privileges on table
  public.meeting_highlights,
  public.meeting_highlight_images,
  public.associated_companies,
  public.client_projects,
  public.client_project_images,
  public.products,
  public.product_images
from anon, authenticated;

grant select on table
  public.meeting_highlights,
  public.meeting_highlight_images,
  public.associated_companies,
  public.client_projects,
  public.client_project_images,
  public.products,
  public.product_images
to anon;

grant select, insert, update, delete on table
  public.meeting_highlights,
  public.meeting_highlight_images,
  public.associated_companies,
  public.client_projects,
  public.client_project_images,
  public.products,
  public.product_images
to authenticated;

create policy "admins_manage_meeting_highlights"
on public.meeting_highlights
for all
to authenticated
using (exists (select 1 from public.admin_users au where au.user_id = (select auth.uid())))
with check (exists (select 1 from public.admin_users au where au.user_id = (select auth.uid())));

create policy "admins_manage_meeting_highlight_images"
on public.meeting_highlight_images
for all
to authenticated
using (exists (select 1 from public.admin_users au where au.user_id = (select auth.uid())))
with check (exists (select 1 from public.admin_users au where au.user_id = (select auth.uid())));

create policy "admins_manage_associated_companies"
on public.associated_companies
for all
to authenticated
using (exists (select 1 from public.admin_users au where au.user_id = (select auth.uid())))
with check (exists (select 1 from public.admin_users au where au.user_id = (select auth.uid())));

create policy "admins_manage_client_projects"
on public.client_projects
for all
to authenticated
using (exists (select 1 from public.admin_users au where au.user_id = (select auth.uid())))
with check (exists (select 1 from public.admin_users au where au.user_id = (select auth.uid())));

create policy "admins_manage_client_project_images"
on public.client_project_images
for all
to authenticated
using (exists (select 1 from public.admin_users au where au.user_id = (select auth.uid())))
with check (exists (select 1 from public.admin_users au where au.user_id = (select auth.uid())));

create policy "admins_manage_products"
on public.products
for all
to authenticated
using (exists (select 1 from public.admin_users au where au.user_id = (select auth.uid())))
with check (exists (select 1 from public.admin_users au where au.user_id = (select auth.uid())));

create policy "admins_manage_product_images"
on public.product_images
for all
to authenticated
using (exists (select 1 from public.admin_users au where au.user_id = (select auth.uid())))
with check (exists (select 1 from public.admin_users au where au.user_id = (select auth.uid())));

create policy "admins_can_list_it_solutions_media"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'it-solutions-media'
  and (storage.foldername(name))[1] = any (array['meetings', 'companies', 'client-projects', 'products'])
  and exists (select 1 from public.admin_users au where au.user_id = (select auth.uid()))
);

create policy "admins_can_upload_it_solutions_media"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'it-solutions-media'
  and (storage.foldername(name))[1] = any (array['meetings', 'companies', 'client-projects', 'products'])
  and exists (select 1 from public.admin_users au where au.user_id = (select auth.uid()))
);

create policy "admins_can_update_it_solutions_media"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'it-solutions-media'
  and (storage.foldername(name))[1] = any (array['meetings', 'companies', 'client-projects', 'products'])
  and exists (select 1 from public.admin_users au where au.user_id = (select auth.uid()))
)
with check (
  bucket_id = 'it-solutions-media'
  and (storage.foldername(name))[1] = any (array['meetings', 'companies', 'client-projects', 'products'])
  and exists (select 1 from public.admin_users au where au.user_id = (select auth.uid()))
);

create policy "admins_can_delete_it_solutions_media"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'it-solutions-media'
  and (storage.foldername(name))[1] = any (array['meetings', 'companies', 'client-projects', 'products'])
  and exists (select 1 from public.admin_users au where au.user_id = (select auth.uid()))
);
