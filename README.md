# 🌌 Personal Web Portfolio — Next.js & Sanity

<p align="center">
  <img src="https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Sanity-F03E2F?style=for-the-badge&logo=sanity&logoColor=white" alt="Sanity" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</p>

<p align="center">
  <strong>A premium, high-performance personal portfolio built with the modern Jamstack architecture.</strong><br/>
  Decoupled presentation layer from content management — fast, scalable, and always in sync.
</p>

---

## ✨ Features

- 🏎️ **Ultra Fast Performance:** Static Site Generation (SSG) + Incremental Static Regeneration (ISR) via Sanity Webhooks.
- 🎨 **Premium UI/UX:** Dark mode (slate/zinc palette), glassmorphism navbar, and bento grid layouts.
- 🛠️ **Headless CMS:** Real-time content management via **Sanity.io** — no redeployment needed on content changes.
- 🎭 **Smooth Animations:** Hero fade-in, staggered project card reveals, and micro-interactions via **Framer Motion**.
- 📱 **Fully Responsive:** Optimized for all devices from mobile to ultra-wide desktops.
- 🔍 **SEO Optimized:** Best practices for search engine visibility and accessibility baked in.

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | [Next.js](https://nextjs.org/) (App Router) | Routing, SSG, ISR, API Routes |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Static typing, compile-time safety |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Dark mode, glassmorphism, bento grid |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) | Micro-interactions, page transitions |
| **CMS** | [Sanity.io](https://www.sanity.io/) | Headless content management |
| **Deployment** | [Vercel](https://vercel.com/) | CI/CD, auto-deploy on push |

---

## 🏗️ Architecture & Data Flow

The system uses a modern **decoupled (Jamstack)** architecture with three main layers:

1. **Sanity Studio (CMS):** A React-based workspace where the admin manages project entries, author profile, and articles. Data is stored on Sanity's cloud.
2. **GROQ Query Layer:** Next.js fetches structured JSON data from Sanity using GROQ _(Graph-Relational Object Queries)_.
3. **Next.js Frontend:** Renders data into optimized static HTML at build time (SSG), or updates pages on-demand via ISR when a Sanity Webhook fires on content publish.

---

## 📂 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout (Navbar, Footer, Dark Mode init)
│   ├── page.tsx            # Homepage (Hero, Skills, Project Highlights)
│   ├── projects/
│   │   ├── page.tsx        # All Projects page (Bento grid layout)
│   │   └── [slug]/
│   │       └── page.tsx    # Dynamic Project Detail page
│   ├── about/
│   │   └── page.tsx        # About page (Full profile + CV download)
│   └── api/
│       └── revalidate/     # ISR Webhook handler from Sanity
├── components/
│   ├── ui/                 # Buttons, Cards, Inputs (glassmorphism styles)
│   └── sanity/             # Portable Text renderer for Sanity content
└── sanity/
    ├── schemas/            # Data model definitions (project.ts, author.ts)
    └── lib/                # Sanity client, GROQ query configs
```

---

## 🗄️ Content Model (Sanity Schema)

### `project` — Portfolio Projects
| Field | Type | Description |
|---|---|---|
| `title` | String | Project or research name |
| `slug` | Slug | Unique URL identifier (e.g. `sistem-pakar-diagnosa`) |
| `summary` | Text | Short project summary |
| `coverImage` | Image | Main screenshot / banner |
| `techStack` | String[] | Technologies used (e.g. `"Python"`, `"React"`) |
| `repositoryUrl` | URL | GitHub repository link |
| `content` | Portable Text | Deep-dive: background, methodology, test results |

### `author` — Owner Profile
| Field | Type | Description |
|---|---|---|
| `name` | String | Full name |
| `bio` | Block Content | Education background and expertise (AI & SE) |
| `resume` | File | PDF Curriculum Vitae |
| `socialLinks` | Object[] | LinkedIn, GitHub, Email links |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or later
- A [Sanity.io](https://www.sanity.io/) account

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/aryasetiap/aryasetiap.github.io.git
   cd aryasetiap.github.io
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env.local` file at the root:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your_api_token
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

---

## 🚢 Deployment (CI/CD)

This project uses a zero-downtime, fully automated deployment pipeline:

1. **GitHub** holds the main branch as source of truth.
2. **Vercel** listens on `main` — every `git push` triggers an automatic build.
3. **Sanity Webhook** fires a `POST` to `/api/revalidate` every time a `project` or `author` document is published, triggering ISR to refresh only the affected pages — keeping the site fast and data always in sync.

---

## 🌐 Connect with Me

<p align="left">
  <a href="https://linkedin.com/in/aryasetiap"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
  <a href="https://github.com/aryasetiap"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /></a>
  <a href="mailto:aryasetiap.code@gmail.com"><img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" /></a>
</p>

<p align="center">Made with ❤️ by <strong>Arya Setia Pratama</strong></p>


