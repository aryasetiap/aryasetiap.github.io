# SPESIFIKASI TEKNIS: PORTOFOLIO PERSONAL (NEXT.JS & SANITY)

## 1. Konteks Rekayasa Perangkat Lunak (RPL)

**Masalah yang Diselesaikan:** Pendekatan monolitik konvensional seringkali membebani performa peladen dan membuat pembaruan konten menjadi kaku. Sistem ini menyelesaikan masalah tersebut dengan memisahkan (decoupling) lapisan presentasi visual dari sistem pengelolaan basis data konten, sehingga memungkinkan performa tinggi dan skalabilitas pengelolaan data.

**Metode Pengembangan:** Menggunakan paradigma Jamstack (JavaScript, APIs, dan Markup) dengan arsitektur Headless CMS. Rendering dilakukan menggunakan Static Site Generation (SSG) dan Incremental Static Regeneration (ISR) untuk pembaruan data waktu nyata tanpa mengorbankan kecepatan muat halaman.

## 2. Arsitektur Sistem dan Aliran Data

Sistem terdiri dari tiga komponen utama yang saling berinteraksi melalui Application Programming Interface (API):

- **Sanity Studio (CMS):** Lingkungan kerja berbasis React tempat administrator memasukkan atau memperbarui data (proyek, artikel, profil). Data disimpan di infrastruktur awan (cloud) Sanity.

- **Lapisan Kueri (Query Layer):** Antarmuka Next.js meminta data dari Sanity menggunakan bahasa kueri GROQ (Graph-Relational Object Queries).

- **Next.js (Frontend):** Menerima data JSON dari Sanity, lalu melakukan rendering halaman menjadi HTML statis saat proses build, atau memperbarui halaman secara dinamis menggunakan ISR ketika terdapat webhook dari Sanity yang menandakan adanya pembaruan konten.

## 3. Tumpukan Teknologi (Tech Stack) Inti

- **Kerangka Kerja Frontend:** Next.js (disarankan menggunakan App Router untuk manajemen routing dan tata letak yang lebih efisien)
- **Bahasa Pemrograman:** TypeScript (memberikan pengetikan statis yang ketat untuk meminimalkan bug saat masa kompilasi)
- **Pengelolaan Gaya (Styling):** Tailwind CSS (untuk implementasi Dark Mode, Glassmorphism, dan Bento Grid)
- **Animasi Antarmuka:** Framer Motion (untuk menangani micro-interactions dan page transitions)
- **Manajemen Konten (CMS):** Sanity.io
- **Infrastruktur Deployment:** Vercel (untuk integrasi Continuous Integration / Continuous Deployment atau CI/CD)

## 4. Pemodelan Data (Sanity Schema)

### Entitas project (Proyek Portofolio)

- `title` (String): Nama proyek atau penelitian
- `slug` (Slug): URL unik pembeda (misal: sistem-pakar-diagnosa)
- `summary` (Text): Ringkasan singkat proyek
- `coverImage` (Image): Gambar utama atau tangkapan layar sistem
- `techStack` (Array of Strings): Teknologi yang digunakan (misal: "Python", "React", "TensorFlow")
- `repositoryUrl` (URL): Tautan menuju repositori kode (GitHub)
- `content` (Portable Text/Block Content): Penjelasan mendalam mengenai latar belakang masalah, metodologi pengembangan, dan hasil pengujian sistem

### Entitas author (Profil Pengguna)

- `name` (String): Nama lengkap
- `bio` (Block Content): Deskripsi latar belakang pendidikan dan fokus keahlian (Kecerdasan Buatan & RPL)
- `resume` (File): Berkas PDF untuk Curriculum Vitae
- `socialLinks` (Array of Objects): Tautan LinkedIn, GitHub, email

## 5. Struktur Direktori dan Navigasi (Next.js App Router)

```
src/
├── app/
│   ├── layout.tsx         # Tata letak utama (Navbar, Footer, inisialisasi Dark Mode)
│   ├── page.tsx           # Halaman Beranda (Hero section, ringkasan keahlian, Highlight proyek)
│   ├── projects/
│   │   ├── page.tsx       # Daftar seluruh proyek (Bento grid layout)
│   │   └── [slug]/
│   │       └── page.tsx   # Halaman detail spesifik untuk satu proyek (Dihasilkan dinamis via parameter slug)
│   ├── about/
│   │   └── page.tsx       # Halaman profil lengkap dan tautan unduh CV
│   └── api/
│       └── revalidate/    # Route handler untuk menerima Webhook dari Sanity (Keperluan ISR)
├── components/            # Komponen modular yang dapat digunakan ulang (Reusable UI)
│   ├── ui/                # Tombol, Kartu, Input (glassmorphism styles)
│   └── sanity/            # Komponen khusus untuk merender Portable Text Sanity
└── sanity/                # Direktori konfigurasi Sanity Studio (jika menggunakan pendekatan embedded studio)
    ├── schemas/           # Definisi struktur data (project.ts, author.ts)
    └── lib/               # Klien Sanity, konfigurasi kueri GROQ
```

## 6. Spesifikasi Interaksi dan Antarmuka (UI/UX)

**Tema:** Palet warna bernuansa gelap (slate/zinc) dengan aksen warna primer teknis (seperti cyan atau indigo)

**Efek Visual:** Penggunaan utilitas backdrop-blur pada Tailwind CSS untuk komponen navigasi (menciptakan efek Web3/premium)

**Animasi Fungsional:**

- Teks "Hero" pada beranda muncul dengan efek fade-in up saat dimuat pertama kali
- Kartu proyek pada halaman /projects menggunakan staggered animation (muncul berurutan secara sistematis)

## 7. Protokol Deployment (CI/CD)

1. Repositori lokal dihubungkan dengan GitHub
2. Vercel dikonfigurasi untuk mendengarkan perubahan pada cabang utama (main atau master)
3. Setiap commit yang di-push akan memicu proses build otomatis di Vercel
4. Sanity Webhook diatur untuk menembak endpoint /api/revalidate di Next.js setiap kali dokumen tipe project atau author dipublikasikan. Ini memastikan situs tetap berstatus statis (cepat), namun data selalu sinkron dengan basis data Sanity
