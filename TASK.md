# 📋 TASK.md — Personal Web Portfolio (Next.js & Sanity)

> Development breakdown dari setup awal hingga deployment produksi.
> Ikuti urutan ini secara berurutan. Tandai status: `[ ]` belum, `[/]` in-progress, `[x]` selesai.

---

## FASE 1 — Project Setup & Environment

**Prioritas: Kritis | Dependensi: Tidak ada**

### 1.1 Inisialisasi Next.js Project

- [x] Jalankan `npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir` <!-- id: 1.1 -->
- [x] Verifikasi struktur direktori: `src/app/`, `src/components/`, dll. <!-- id: 1.2 -->
- [x] Hapus file boilerplate default (`page.tsx`, `globals.css` bawaan) <!-- id: 1.3 -->
- [x] Buat struktur folder manual <!-- id: 1.4 -->
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

- [x] Instal Framer Motion: `npm install framer-motion` <!-- id: 1.5 -->
- [x] Instal Sanity SDK: `npm install next-sanity @sanity/image-url @portabletext/react` <!-- id: 1.6 -->
- [x] Instal Sanity CLI (global): `npm install -g @sanity/cli` <!-- id: 1.7 -->
- [x] Verifikasi semua packages di `package.json` <!-- id: 1.8 -->

### 1.3 Setup Environment Variables

- [X] Buat file `.env.local` di root project <!-- id: 1.9 -->
- [X] Tambahkan variabel berikut <!-- id: 1.10 -->
- [X] Tambahkan `.env.local` ke `.gitignore` <!-- id: 1.11 -->
- [x] Perbaiki sintaks Tailwind CSS v4 di `globals.css` <!-- id: 1.12 -->

---

## FASE 2 — Sanity CMS Configuration

**Prioritas: Kritis | Dependensi: Fase 1**

### 2.1 Buat Sanity Project

- [x] Login ke [sanity.io](https://www.sanity.io/) dan buat project baru <!-- id: 2.1 -->
- [x] Catat `projectId` dan `dataset` name <!-- id: 2.2 -->
- [x] Isikan ke `.env.local` <!-- id: 2.3 -->

### 2.2 Konfigurasi Sanity Client

- [x] Buat file `src/sanity/lib/client.ts` <!-- id: 2.4 -->
- [x] Buat file `src/sanity/lib/queries.ts` <!-- id: 2.5 -->
- [x] Buat file `src/sanity/lib/image.ts` <!-- id: 2.6 -->

### 2.3 Definisikan Sanity Schema

- [x] Buat `src/sanity/schemas/project.ts` <!-- id: 2.7 -->
- [x] Buat `src/sanity/schemas/author.ts` <!-- id: 2.8 -->
- [x] Buat `src/sanity/schemas/index.ts` <!-- id: 2.9 -->
- [x] Buat `src/sanity/sanity.config.ts` <!-- id: 2.10 -->
- [x] Buat `src/app/admin/[[...index]]/page.tsx` untuk render Studio <!-- id: 2.11 -->

### 2.4 Deploy & Populasi Data di Sanity Studio

- [x] Jalankan Sanity Studio lokal: `npx sanity dev` <!-- id: 2.12 -->
- [x] Buat minimal 1 entri `author` (profil sendiri) <!-- id: 2.13 -->
- [x] Buat minimal 3 entri `project` untuk testing <!-- id: 2.14 -->
- [x] Upload gambar cover untuk setiap project <!-- id: 2.15 -->

---

## FASE 3 — UI/UX Foundation

**Prioritas: Tinggi | Dependensi: Fase 1**

### 3.1 Design System (Tailwind v4 CSS)

- [x] Edit `src/app/globals.css` <!-- id: 3.1 -->
  - Tambahkan custom theme variables (slate/zinc + cyan/indigo)
  - Konfigurasi font (Outfit/Inter via next/font)
- [x] Definisikan utility classes tambahan jika diperlukan <!-- id: 3.2 -->

### 3.2 Root Layout (`src/app/layout.tsx`)

- [x] Setup `<html>` dengan `dark` class default <!-- id: 3.3 -->
- [x] Tambahkan Google Fonts (Outfit) <!-- id: 3.4 -->
- [x] Tambahkan Metadata SEO global <!-- id: 3.5 -->
- [x] Buat strukur layout dengan `<Navbar />` dan `<Footer />` <!-- id: 3.6 -->

### 3.3 Komponen UI Dasar (`src/components/ui/`)

- [x] `Button.tsx` — Glassmorphism style <!-- id: 3.7 -->
- [x] `Card.tsx` — Glassmorphism card <!-- id: 3.8 -->
- [x] `Badge.tsx` — Tech stack label <!-- id: 3.9 -->
- [x] `Navbar.tsx` — Sticky, blur effect <!-- id: 3.10 -->
- [x] `Footer.tsx` — Social links <!-- id: 3.11 -->

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
[x] Fase 1: Setup & Environment
[x] Fase 2: Sanity CMS
[/] Fase 3: UI Foundation
[ ] Fase 4: Homepage
[ ] Fase 5: Projects Pages
[ ] Fase 6: About Page
[ ] Fase 7: ISR Webhook
[ ] Fase 8: Deployment
[ ] Fase 9: Polish & QA
```
