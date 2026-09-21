# VORTEX Global Technologies — Project Architecture Audit

## Goal

Analyze my **entire existing VORTEX Global Technologies website project** and create a complete technical map of how the current project works.

**Important:** Do NOT modify, refactor, rename, delete, or create any project files.

This is an **analysis-only task**.

I will use your report to plan SEO improvements later, so I need you to understand the existing architecture before recommending any SEO changes.

---

# 1. Project Overview

First identify:

* Framework/library
* Build tool
* Programming language
* CSS/UI framework
* Routing solution
* Main dependencies
* Deployment platform
* Entry point
* Overall application architecture

Read `package.json` and the relevant configuration files to determine this accurately.

---

# 2. Complete Folder Structure

Analyze the project structure.

Show the important parts of:

```text
src/
public/
```

and other important root-level files/folders.

Do not dump unnecessary files such as:

```text
node_modules/
.git/
dist/
build/
.cache/
```

Focus on source code and configuration that affects the website.

Example:

```text
src/
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   └── ...
├── pages/
│   ├── ...
├── data/
│   └── services.ts
├── hooks/
│   └── ...
├── App.tsx
└── main.tsx
```

---

# 3. Application Entry Flow

Trace exactly how the application starts.

Explain:

```text
index.html
   ↓
main.tsx
   ↓
App.tsx
   ↓
Router / Routes
   ↓
Page Components
   ↓
Section Components
   ↓
Reusable Components
```

Use the actual filenames from the project.

If the project does not use routing, clearly state that.

---

# 4. Routes / Pages

Find every actual route/page in the project.

Create a table:

| Route  | Page Component | Main Purpose | Important Components |
| ------ | -------------- | ------------ | -------------------- |
| `/`    | ...            | ...          | ...                  |
| `/...` | ...            | ...          | ...                  |

For each page explain:

* What the page is for
* Which component renders it
* Which major sections it contains
* Which reusable components it uses
* Whether the content is static or dynamic

Do not invent routes.

Only report routes that actually exist.

---

# 5. Homepage Architecture

Analyze the homepage in detail.

Map it like:

```text
Homepage
│
├── Navbar
├── Hero
├── Section
│   ├── Component
│   └── Component
├── Services
│   └── Service Cards
├── ...
├── Contact
└── Footer
```

For every major section provide:

* Component filename
* What it displays
* Where its content comes from
* Whether it is reusable
* Whether it contains important text that search engines should understand

---

# 6. Navigation

Analyze the Navbar and navigation system.

Tell me:

* Where navbar links are defined
* Whether they use React Router
* Whether they use anchor links such as `#services`
* Which links point to actual pages
* Which links scroll to sections
* Which links open modals
* Which links are external
* Mobile navigation behavior

Create a simple map:

```text
Navbar
├── Home → ...
├── Services → ...
├── ...
└── Contact → ...
```

---

# 7. Services Architecture

Find exactly how services are implemented.

I know the project contains:

```text
src/data/services.ts
```

Analyze how this data connects to the UI.

Explain:

```text
services.ts
     ↓
Component
     ↓
Service Card
     ↓
Service Detail / Modal / Page
```

Determine:

* Number of services
* Service names
* Service descriptions
* Service images
* Whether each service has a dedicated page
* Whether services are rendered dynamically
* Whether services use modals
* Whether service content exists only in JavaScript data

Show the actual connection.

---

# 8. Institute / Training Section

Analyze all institute/training-related components.

I know the project contains:

```text
InstitutePage.tsx
InstituteModal.tsx
```

Find:

* How these components are connected
* Where they are rendered
* Whether the institute has a dedicated URL
* Whether it is a section, modal, or page
* Where the institute content comes from
* Whether navigation can reach it directly
* Whether it is indexable as a standalone page

---

# 9. Component Dependency Map

Create a useful dependency map for the main website.

Example:

```text
App
│
├── Navbar
│   ├── Menu
│   └── Navigation
│
├── Home
│   ├── Hero
│   ├── Services
│   │   └── ServiceCard
│   ├── About
│   └── ...
│
├── InstitutePage
│   └── InstituteModal
│
└── Footer
```

Use the real project structure.

Focus on important components rather than every tiny UI component.

---

# 10. Content Sources

Determine where website content comes from.

For each important section identify whether content is:

* Hardcoded JSX
* TypeScript/JavaScript data
* JSON
* API
* CMS
* Props
* State
* URL parameters

Example:

| Content      | Source      | File                   |
| ------------ | ----------- | ---------------------- |
| Services     | Static data | `src/data/services.ts` |
| Navbar links | Component   | `Navbar.tsx`           |
| Hero text    | JSX         | `Hero.tsx`             |

---

# 11. SEO-Relevant Current Structure

Analyze the current project specifically from an SEO architecture perspective.

Identify:

### Existing pages

Which actual URLs can Google index?

### Sections

Which content exists only as sections on `/`?

### Modals

Which important content is hidden inside modals?

### JavaScript-rendered content

Which important text is generated through JavaScript/data?

### Head metadata

Find exactly where these are currently configured:

* title
* meta description
* canonical
* robots
* Open Graph
* Twitter cards
* JSON-LD
* favicon

Do not recommend changes yet.

Just document the current implementation.

---

# 12. Existing SEO Implementation

Inspect:

```text
index.html
public/robots.txt
public/sitemap.xml
```

and any other SEO-related files.

Document:

* Current title
* Current meta description
* Canonical
* OG tags
* Twitter tags
* JSON-LD schemas
* Sitemap URLs
* Robots rules

Compare the sitemap URLs against the actual routes.

Tell me if the sitemap contains URLs that don't actually exist.

---

# 13. Images and Assets

Analyze important images.

For major images identify:

* Filename
* Location
* Format
* Where it is used
* Whether it has alt text
* Whether it is loaded from `public`
* Whether it is imported into React
* Whether it is background-image/CSS
* Whether it is WebP

Pay particular attention to:

```text
logos
hero images
service images
project images
institute images
```

---

# 14. Existing Business Information

Find where the website currently mentions:

* Company name
* Location
* Address
* Phone
* Email
* Services
* Social media
* LinkedIn
* Instagram

Do not assume information that isn't present in the code.

---

# 15. Internal Linking

Map important internal links.

Tell me:

* Which pages link to which pages
* Which sections are reachable only through scrolling
* Which pages have no incoming links
* Whether important content is isolated inside modals

---

# 16. Technical SEO Constraints

Identify architectural limitations that could affect SEO.

For example:

* SPA routing
* Client-side rendering
* Missing server-side rendering
* Dynamic routes
* Hash navigation
* Modal-only content
* JavaScript-dependent content
* Duplicate content
* Missing page-level metadata
* Sitemap/route mismatch

Only report issues you can verify from the project.

---

# 17. SEO Improvement Opportunities

After completely understanding the project, provide a separate section:

## SEO Opportunities Based on Existing Architecture

For each opportunity explain:

1. What currently exists
2. What the limitation is
3. Which existing file/component would be involved
4. Whether a new page is actually necessary
5. Whether the change is small, medium, or large

IMPORTANT:

Do NOT automatically recommend creating new pages.

First determine whether the existing architecture already supports the required content.

---

# 18. Manjeri + Malappuram Context

The SEO strategy will primarily target:

### Primary

Manjeri

### Secondary

Malappuram

Do NOT expand the analysis to unrelated Kerala cities.

Identify where the existing website already mentions:

* Manjeri
* Malappuram
* Kerala

and where these locations could naturally fit based on the existing content structure.

Do not recommend keyword stuffing.

---

# 19. Final Architecture Summary

Finish with these exact sections:

## Current Architecture

```text
[actual architecture diagram]
```

## Current Pages

| URL | Component | Purpose |
| --- | --------- | ------- |

## Important Components

| Component | File | Used By | Purpose |
| --------- | ---- | ------- | ------- |

## Content Sources

| Content | Source | File |
| ------- | ------ | ---- |

## Current SEO Setup

| SEO Element | Current Implementation | Location |
| ----------- | ---------------------- | -------- |

## SEO Architecture Gaps

Only verified gaps.

## Recommended SEO Changes

Only recommendations that fit the existing project architecture.

---

# Important Rules

1. **Read the actual source code.**
2. Do not guess.
3. Do not invent pages or routes.
4. Do not modify any files.
5. Do not install dependencies.
6. Do not refactor anything.
7. Do not focus only on `index.html`.
8. Trace how components are actually connected.
9. Distinguish between pages, sections, components, and modals.
10. Keep Manjeri as the primary local SEO target and Malappuram as secondary.
11. Do not perform SEO changes yet.
12. This task is only to create an accurate architectural understanding of the current project.

## Output

Create a file in the project root:

```text
PROJECT_ARCHITECTURE_AUDIT.md
```

The file should contain the complete analysis described above.

At the end, provide a short summary in the terminal/chat saying:

* Number of actual routes
* Main page components
* Main service architecture
* Whether the site is SPA or multi-page
* Current SEO architecture
* Top 5 verified SEO opportunities
