# PRD: VORTEX AI Integrated IT Solutions — Supabase CMS & Admin Dashboard

## 1. Project Overview

Extend the existing VORTEX Global Technologies website with a database-backed content management system for the **AI Integrated IT Solutions** service page.

Implement this in the existing React + TypeScript + Vite repository. Do not rebuild the website or redesign unrelated sections.

**Supabase project**
- Name: `vortex-offical-website`
- URL: `https://ntxkdqynmjtvlwfcaiok.supabase.co`
- Project ref: `ntxkdqynmjtvlwfcaiok`

The schema and media bucket already exist. Inspect the current state before making changes; do not recreate existing resources.

## 2. Goals

1. Display dynamic content on the AI Integrated IT Solutions page from Supabase.
2. Provide secure admin login and a protected admin dashboard.
3. Let authorized admins create, edit, delete, publish/unpublish, and reorder content.
4. Support multiple images for meeting highlights, client projects, and in-house products.
5. Automatically compress images larger than 2 MiB before upload, enforcing a strict 5 MiB maximum per image.
6. Preserve the current website design system and unrelated functionality.

## 3. Technology

- Existing app: React + TypeScript + Vite.
- Database, authentication, and storage: Supabase.
- Client: `@supabase/supabase-js`.
- Compression: `browser-image-compression`.
- Reuse existing styling, routing, components, and conventions.

Install only if missing:
```bash
npm install @supabase/supabase-js browser-image-compression
```

## 4. Public Content Sections

### 4.1 Meeting Highlights
A simple visual gallery:
- Title
- Multiple images per highlight
- Image ordering
- Optional modal/lightbox using an existing project pattern
- Do not add dates, decisions, outcomes, company relationships, or long descriptions.

### 4.2 Associated Companies
Each company has:
- Company logo
- Company name
- Short description
- Optional website URL
- Display order
- Published/unpublished state

Do not add a collaboration/relationship field.

### 4.3 Client Projects
A visual project portfolio. Each project has:
- Project name
- Company/client name
- Short description/details
- Multiple images/screenshots
- Optional live project URL
- Display order
- Published/unpublished state

Show imagery prominently. Opening a project should show its details and additional images, using an existing modal/detail pattern where available.

### 4.4 Products
A visual portfolio for products built in-house by VORTEX, distinct from client work. Each product has:
- Product name
- Short description/details
- Multiple images/screenshots
- Optional product/demo URL
- Status: `live`, `in_development`, or `coming_soon`
- Display order
- Published/unpublished state

Use the same visual pattern as Client Projects where appropriate.

## 5. Existing Supabase Resources

These seven public-schema tables have already been created and verified.

### `meeting_highlights`
- `id uuid primary key`
- `title text not null`
- `display_order integer not null default 0`
- `is_published boolean not null default false`
- `created_at timestamptz`
- `updated_at timestamptz`

### `meeting_highlight_images`
- `id uuid primary key`
- `meeting_id uuid not null` → `meeting_highlights.id` with `ON DELETE CASCADE`
- `image_url text not null`
- `alt_text text nullable`
- `display_order integer not null default 0`
- `created_at timestamptz`

### `associated_companies`
- `id uuid primary key`
- `name text not null`
- `description text not null default ''`
- `logo_url text nullable`
- `website_url text nullable`
- `display_order integer not null default 0`
- `is_published boolean not null default false`
- `created_at timestamptz`
- `updated_at timestamptz`

### `client_projects`
- `id uuid primary key`
- `project_name text not null`
- `company_name text not null`
- `description text not null default ''`
- `project_url text nullable`
- `display_order integer not null default 0`
- `is_published boolean not null default false`
- `created_at timestamptz`
- `updated_at timestamptz`

### `client_project_images`
- `id uuid primary key`
- `project_id uuid not null` → `client_projects.id` with `ON DELETE CASCADE`
- `image_url text not null`
- `alt_text text nullable`
- `display_order integer not null default 0`
- `created_at timestamptz`

### `products`
- `id uuid primary key`
- `name text not null`
- `description text not null default ''`
- `product_url text nullable`
- `status text not null default 'in_development'`, constrained to `live`, `in_development`, `coming_soon`
- `display_order integer not null default 0`
- `is_published boolean not null default false`
- `created_at timestamptz`
- `updated_at timestamptz`

### `product_images`
- `id uuid primary key`
- `product_id uuid not null` → `products.id` with `ON DELETE CASCADE`
- `image_url text not null`
- `alt_text text nullable`
- `display_order integer not null default 0`
- `created_at timestamptz`

Indexes for publication/order and child-image ordering are already present.

### Storage bucket

Bucket: `it-solutions-media`
- Public bucket for public website imagery.
- Maximum upload size: `5,242,880` bytes (5 MiB).
- Allowed MIME types: JPEG, PNG, WebP, GIF, AVIF.

The bucket already exists. Do not recreate it. Inspect current storage policies before changing them.

### Current RLS state

- RLS is enabled on all seven tables.
- Public SELECT policies allow anonymous/authenticated visitors to read published parent records and their associated images.
- Admin write policies have not yet been implemented.
- Never grant write access to `anon` or all authenticated users.
- Verify the actual current policies/schema before relying on this description.

## 6. Admin Authentication and Authorization

Use Supabase Auth email/password.

Requirements:
- No public admin registration/sign-up screen.
- The owner will add the admin email/user manually later; do not hardcode an email.
- A normal successful Supabase login must not automatically grant admin privileges.
- Add an explicit authorization mechanism, preferably `public.admin_users` keyed to `auth.users.id`.
- RLS must enforce admin authorization for all content insert/update/delete operations. React route guards alone are insufficient.
- Admin users will be created/invited manually later in Supabase Auth; their user ID will be added to the authorization table through a safe owner-only/manual process.
- Include sign out and session restoration using the Supabase SDK.
- Show loading, invalid-credentials, expired-session, and permission-denied states.
- Do not put a service-role key or database password in frontend code or any `VITE_` variable.
- Use only a Supabase publishable/anon key in the browser.

## 7. Admin Dashboard

Create a protected dashboard using the existing routing/layout conventions. If there is no router, choose the least disruptive solution; add a router only if necessary.

Dashboard sections:
1. Meeting Highlights
2. Associated Companies
3. Client Projects
4. Products

For each section provide:
- List records
- Add and edit
- Delete with confirmation
- Publish/unpublish
- Change display order
- Loading, empty, success, and error states

Forms:
- Meeting highlight: title + multiple image upload/reorder/remove.
- Associated company: name + short description + logo + optional website URL.
- Client project: project name + company/client name + description + optional project URL + multiple images.
- Product: name + description + optional product/demo URL + status + multiple images.

Unauthenticated users must be redirected to login. Signed-in non-admins must be denied. Do not build public registration.

## 8. Image Upload and Compression

Use `browser-image-compression` with a centralized reusable helper, such as `prepareImageForUpload(file: File): Promise<File>`.

For each individual image, including meeting images, company logos, client-project images, and product images:
- **≤ 2 MiB:** upload without compression.
- **> 2 MiB and ≤ 5 MiB:** automatically compress in the browser before upload.
- **> 5 MiB:** reject immediately with a clear error.
- Validate size again after compression. If output is still above 5 MiB, reject it.
- Supabase Storage's 5 MiB limit is the server-side backstop.
- Validate actual supported image MIME types; don't trust extensions alone.
- Handle compression and upload errors clearly.
- Preserve acceptable visual quality. Do not compress images already under 2 MiB.
- If compression fails for a file that requires compression, do not upload the original file.
- Support multiple selection, per-image preview, removal before saving, and ordering.
- Show original/resulting size when useful.
- Use unique, collision-resistant object names.
- Use folder prefixes: `meetings/`, `companies/`, `client-projects/`, `products/`.
- Save public URLs to the appropriate image table or `logo_url`.
- On replacements/deletions, clean up obsolete storage objects safely; do not delete the old image until the replacement/database update succeeds.
- The 5 MiB limit applies to each file, not the total selection.

## 9. Supabase Client and Environment

Create a reusable client module, e.g. `src/lib/supabase.ts`.

Environment variables:
```env
VITE_SUPABASE_URL=https://ntxkdqynmjtvlwfcaiok.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<publishable key from Supabase dashboard>
```

- Add/update `.env.example` with placeholders only.
- Ensure real `.env` files are gitignored.
- Never expose service-role keys or database passwords.
- If the publishable key is not available locally, tell the owner where to retrieve it; do not invent credentials.

## 10. Public Website Integration

- Inspect the existing AI Integrated IT Solutions page and service data model before changing UI.
- Replace only the relevant static/placeholder content in these four sections with Supabase-driven content.
- Preserve the existing VORTEX purple theme, typography, animations, spacing, and responsive behavior.
- Do not redesign unrelated service pages, homepage, navbar, footer, chatbot, or other features.
- If no content is published, show a tasteful empty state or hide the section; do not invent demo content.
- Fetch only published records and sort by `display_order`.
- Client projects and products should have a detail/modal view with description and multiple images.
- Meeting Highlights remains a simple gallery with titles.
- Associated Companies shows logo, name, short description, and optional website link only.

## 11. Data and Error Handling

- Handle optional URLs and missing images/logos.
- Prevent duplicate submissions while saving.
- Show useful errors without leaking secrets.
- Parent deletion should cascade to child image rows.
- Delete only storage paths belonging to the relevant bucket/record.
- Do not silently ignore Supabase errors.
- Avoid logging credentials/tokens.
- Add TypeScript types for records and API responses.

## 12. Security Requirements

- Retain RLS on all seven content tables.
- Anonymous visitors can SELECT published content only.
- Only users whose `auth.uid()` exists in the explicit admin authorization table can write.
- Authenticated non-admins cannot write content.
- Do not use broad write policies such as `USING (true)`.
- Storage upload/update/delete policies must be restricted to `it-solutions-media` and require an authorized admin.
- Public media reads are allowed because the bucket is public; upload/delete operations remain restricted by Storage RLS.
- Never use the service-role key in browser code.
- Validate image ownership and parent relationships where applicable.
- Do not create a public RPC or client flow that lets users add themselves as admins.
- Admin authorization changes must be manual/owner-controlled, not part of normal content management.
- Run Supabase security advisors after migrations and address relevant findings.

## 13. Implementation Order

Work in small, verifiable steps. Inspect before editing.

### Step 1 — Inspect
Inspect package.json, entry points, routing, service page, styles, Supabase schema, RLS, storage bucket, and storage policies. Do not duplicate existing resources.

### Step 2 — Dependencies and client
Install missing packages, add the Supabase client and environment example, then build.

### Step 3 — Database authorization
Add `admin_users`, secure RLS policies for content and child image tables, and scoped Storage policies. Verify anonymous and non-admin writes are denied. Run security advisors.

### Step 4 — Image helper
Implement/test file type and size validation and compression:
- ≤2 MiB unchanged
- >2 MiB to ≤5 MiB compressed
- >5 MiB rejected
- post-compression size checked

### Step 5 — Authentication
Build login and protected dashboard shell. Test unauthenticated redirect, admin access, non-admin denial, and logout.

### Step 6 — Admin content management
Implement CRUD, publish/unpublish, ordering, and multi-image management for all four sections.

### Step 7 — Public integration
Connect the four public sections to Supabase and confirm only published content appears.

### Step 8 — Final verification
Run available lint, typecheck, and build scripts. Test responsive layouts, auth, RLS, and upload flows. Report changed files, migrations, test results, and manual owner steps.

## 14. Acceptance Criteria

- Existing website features remain intact.
- Supabase client uses environment variables; no secret key is exposed.
- Supabase Auth login works; there is no public registration.
- Admin authorization is enforced by database RLS.
- Admin can be added manually later without source-code changes.
- Public visitors see published content only.
- Admin can manage all four content types.
- Meeting highlights, client projects, and products accept multiple images.
- Associated companies accept one logo.
- Files ≤2 MiB upload uncompressed.
- Files >2 MiB and ≤5 MiB are compressed before upload.
- Files >5 MiB are rejected.
- Storage writes are limited to authorized admins.
- Available lint/typecheck/build checks pass.
- Codex reports verification results and remaining manual setup.

## 15. Codex Working Instructions

- Work directly in the existing repository.
- Do not stop after writing a plan; implement in the order above.
- Inspect before editing and keep changes focused.
- Reconcile this PRD with actual repository and Supabase state.
- Do not recreate tables or bucket already created.
- Do not add fake company/project/product content.
- Do not hardcode the admin email.
- Do not enable public sign-up or grant admin to every authenticated user.
- Do not use a service-role key in browser code.
- Do not claim deployment succeeded unless deployed and verified.
- At the end, report what changed, what was tested, what passed/failed, and the exact manual steps the owner must perform next.
