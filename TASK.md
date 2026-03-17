# 📋 TASK.md — Personal Web Portfolio (Next.js & Sanity)

> Development breakdown dari setup awal hingga deployment produksi.
> Ikuti urutan ini secara berurutan. Tandai status: `[ ]` belum, `[/]` in-progress, `[x]` selesai.

---

## FASE 1 — Project Setup & Environment

**Prioritas: Kritis | Dependensi: Tidak ada**

### 1.1 Inisialisasi Next.js Project

- [ ] Jalankan `npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir`
- [ ] Verifikasi struktur direktori: `src/app/`, `src/components/`, dll.
- [ ] Hapus file boilerplate default (`page.tsx`, `globals.css` bawaan)
- [ ] Buat struktur folder manual:
  ```
  src/
  ├── app/
  │   ├── about/
  │   ├── projects/[slug]/
  │   └── api/revalidate/
  ├── components/
  │   ├── ui/
  │   └── sanity/
  └── sanity/
      ├── schemas/
      └── lib/
  ```

### 1.2 Instalasi Dependensi Utama

- [ ] Instal Framer Motion: `npm install framer-motion`
- [ ] Instal Sanity SDK: `npm install next-sanity @sanity/image-url @portabletext/react`
- [ ] Instal Sanity CLI (global): `npm install -g @sanity/cli`
- [ ] Verifikasi semua packages di `package.json`

### 1.3 Setup Environment Variables

- [ ] Buat file `.env.local` di root project
- [ ] Tambahkan variabel berikut:
  ```env
  NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
  NEXT_PUBLIC_SANITY_DATASET=production
  SANITY_API_TOKEN=your_api_token
  SANITY_REVALIDATE_SECRET=your_webhook_secret
  ```
- [ ] Tambahkan `.env.local` ke `.gitignore`

---

## FASE 2 — Sanity CMS Configuration

**Prioritas: Kritis | Dependensi: Fase 1**

### 2.1 Buat Sanity Project

- [ ] Login ke [sanity.io](https://www.sanity.io/) dan buat project baru
- [ ] Catat `projectId` dan `dataset` name
- [ ] Isikan ke `.env.local`

### 2.2 Konfigurasi Sanity Client

- [ ] Buat file `src/sanity/lib/client.ts`:
  - Konfigurasi `createClient` dengan `projectId`, `dataset`, `apiVersion`, `useCdn`
  - Aktifkan `stega` atau live preview jika diperlukan
- [ ] Buat file `src/sanity/lib/queries.ts`:
  - Definisikan GROQ query untuk list projects
  - Definisikan GROQ query untuk single project by slug
  - Definisikan GROQ query untuk author profile
- [ ] Buat file `src/sanity/lib/image.ts`:
  - Konfigurasi `imageUrlBuilder` untuk generate URL gambar Sanity

### 2.3 Definisikan Sanity Schema

- [ ] Buat `src/sanity/schemas/project.ts`:
  - `title` (string, required)
  - `slug` (slug, from title)
  - `summary` (text)
  - `coverImage` (image + alt)
  - `techStack` (array of strings)
  - `repositoryUrl` (url)
  - `content` (portableText/block content)
- [ ] Buat `src/sanity/schemas/author.ts`:
  - `name` (string, required)
  - `bio` (block content)
  - `resume` (file — PDF)
  - `socialLinks` (array of objects: {platform, url})
- [ ] Buat `src/sanity/schemas/index.ts`:
  - Export semua schema sebagai array
- [ ] Buat `src/sanity/sanity.config.ts`:
  - Daftarkan semua schema ke Sanity Studio config

### 2.4 Deploy & Populasi Data di Sanity Studio

- [ ] Jalankan Sanity Studio lokal: `npx sanity dev`
- [ ] Buat minimal 1 entri `author` (profil sendiri)
- [ ] Buat minimal 3 entri `project` untuk testing
- [ ] Upload gambar cover untuk setiap project

---

## FASE 3 — UI/UX Foundation

**Prioritas: Tinggi | Dependensi: Fase 1**

### 3.1 Design System (Tailwind Config)

- [ ] Edit `tailwind.config.ts`:
  - Aktifkan dark mode: `darkMode: 'class'`
  - Tambahkan custom color palette (berbasis slate/zinc + aksen cyan/indigo)
  - Tambahkan custom font (Inter atau Outfit dari Google Fonts)
- [ ] Edit `src/app/globals.css`:
  - Definisikan CSS variables untuk warna mode gelap/terang
  - Tambahkan base styles untuk body, scrollbar, dan selection

### 3.2 Root Layout (`src/app/layout.tsx`)

- [ ] Setup `<html>` dengan class `dark` untuk default dark mode
- [ ] Tambahkan `<Navbar />` komponen
- [ ] Tambahkan `<Footer />` komponen
- [ ] Tambahkan Google Fonts (via `next/font/google`)
- [ ] Tambahkan metadata SEO global (title template, description)

### 3.3 Komponen UI Dasar (`src/components/ui/`)

- [ ] `Button.tsx` — Glassmorphism style, variant: primary / ghost / outline
- [ ] `Card.tsx` — Glassmorphism card dengan `backdrop-blur`
- [ ] `Badge.tsx` — Untuk tampilkan tech stack label di project
- [ ] `Navbar.tsx` — Sticky, backdrop-blur, link ke `/projects` dan `/about`
- [ ] `Footer.tsx` — Social links, copyright

---

## FASE 4 — Halaman Utama (Homepage)

**Prioritas: Tinggi | Dependensi: Fase 2, Fase 3**

### 4.1 Hero Section

- [ ] Fetch data `author` dari Sanity (nama, bio)
- [ ] Implementasikan teks Hero dengan `framer-motion`:
  - `initial: { opacity: 0, y: 20 }` → `animate: { opacity: 1, y: 0 }`
  - Staggered delay untuk tiap baris teks
- [ ] Tambahkan CTA button: "View Projects" → `/projects`, "Download CV" → file Sanity

### 4.2 Skill / Tech Highlight Section

- [ ] Buat grid ikon teknologi yang dikuasai
- [ ] Animasi masuk: `whileInView` Framer Motion

### 4.3 Featured Projects Section

- [ ] Fetch 3 project terbaru dari Sanity
- [ ] Render sebagai kartu ringkasan horizontal/bento
- [ ] Tambahkan link "See All Projects" → `/projects`

---

## FASE 5 — Halaman Projects (`/projects`)

**Prioritas: Tinggi | Dependensi: Fase 2, Fase 3**

### 5.1 Project List Page (`src/app/projects/page.tsx`)

- [ ] Fetch semua project dari Sanity menggunakan GROQ
- [ ] Render dalam **Bento Grid layout** (responsive, variable card sizes)
- [ ] Implementasikan `staggered animation` untuk card:
  ```tsx
  variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
  ```
- [ ] Setiap card menampilkan: cover image, title, summary, tech stack badges, link ke detail

### 5.2 Project Detail Page (`src/app/projects/[slug]/page.tsx`)

- [ ] Implementasikan `generateStaticParams` untuk SSG semua slug
- [ ] Implementasikan `generateMetadata` untuk SEO per halaman
- [ ] Fetch single project by slug dari Sanity
- [ ] Render `content` (Portable Text) menggunakan `@portabletext/react`
- [ ] Tampilkan: cover image, tech stack, link GitHub, konten artikel

---

## FASE 6 — Halaman About (`/about`)

**Prioritas: Sedang | Dependensi: Fase 2, Fase 3**

- [ ] Fetch data `author` dari Sanity
- [ ] Tampilkan: nama, bio lengkap (Portable Text), foto profil
- [ ] Tombol "Download CV" yang link ke file PDF dari Sanity
- [ ] Social links (LinkedIn, GitHub, Email) menggunakan komponen `Button`

---

## FASE 7 — ISR Webhook Handler

**Prioritas: Tinggi | Dependensi: Fase 2, Fase 5**

### 7.1 API Route untuk Revalidasi

- [ ] Buat `src/app/api/revalidate/route.ts`:
  - Validasi `SANITY_REVALIDATE_SECRET` dari header/request
  - Jalankan `revalidatePath('/projects')` dan `revalidatePath('/about')` dan `revalidatePath('/')`
  - Return response `{ revalidated: true }`

### 7.2 Konfigurasi Webhook di Sanity

- [ ] Buka Sanity dashboard → API → Webhooks
- [ ] Buat webhook baru:
  - **URL:** `https://your-domain.vercel.app/api/revalidate`
  - **Trigger:** On publish (filter: `project` AND `author`)
  - **Secret:** sesuai `SANITY_REVALIDATE_SECRET`

---

## FASE 8 — Deployment & CI/CD

**Prioritas: Kritis | Dependensi: Semua fase sebelumnya**

### 8.1 Push ke GitHub

- [ ] Inisialisasi git: `git init`
- [ ] Buat repository baru di GitHub: `aryasetiap/aryasetiap.github.io`
- [ ] Tambahkan remote dan push: `git push -u origin main`

### 8.2 Konfigurasi Vercel

- [ ] Login ke [vercel.com](https://vercel.com/) dan import repository
- [ ] Tambahkan semua environment variables dari `.env.local` ke Vercel dashboard
- [ ] Verifikasi auto-deploy aktif pada push ke branch `main`

### 8.3 Update Webhook Sanity

- [ ] Update URL webhook Sanity ke URL produksi Vercel (bukan localhost)

### 8.4 Validasi Produksi

- [ ] Akses URL produksi dan verifikasi semua halaman: `/`, `/projects`, `/about`
- [ ] Uji ISR: ubah data di Sanity Studio, verifikasi perubahan muncul di site tanpa rebuild
- [ ] Jalankan Lighthouse audit, pastikan skor ≥ 90 untuk Performance dan SEO

---

## FASE 9 — Polish & QA

**Prioritas: Sedang | Dependensi: Fase 8**

- [ ] Pastikan semua animasi Framer Motion berjalan mulus di mobile
- [ ] Implementasikan `loading.tsx` di setiap route untuk Suspense fallback
- [ ] Tambahkan `error.tsx` untuk error boundary di setiap route
- [ ] Cek aksesibilitas: `aria-label`, warna kontras, keyboard navigation
- [ ] Test di resolusi mobile (375px), tablet (768px), dan desktop (1440px)
- [ ] Final review README.md dan SPEC.md

---

## ✅ Checklist Selesai

```
[ ] Fase 1: Setup & Environment
[ ] Fase 2: Sanity CMS
[ ] Fase 3: UI Foundation
[ ] Fase 4: Homepage
[ ] Fase 5: Projects Pages
[ ] Fase 6: About Page
[ ] Fase 7: ISR Webhook
[ ] Fase 8: Deployment
[ ] Fase 9: Polish & QA
```
