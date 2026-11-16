# Gouri Yadav — Personal Developer Portfolio & Backend Service

A premium, modern, creative, and fully responsive personal developer portfolio engineered for **Gouri Yadav – MERN Stack Developer**.

Designed with inspiration from the **editorial luxury aesthetic** ([Pinterest Inspiration](https://pin.it/58ZNmL7n7)), featuring a warm palette (**Primary Cream**, **Soft Beige**, **Coffee Brown**, **Forest Green**, and **Sage Green**), a custom **floating bottom dock navigation**, and an independent **Node.js/Express REST API backend** with **Nodemailer** for email delivery to `gouriy2414@gmail.com`.

---

## 🎨 Visual Identity & Color Palette

| Token | Hex | Role |
| :--- | :--- | :--- |
| **Primary Cream** | `#F8EFE3` | Main ambient background and canvas |
| **Soft Beige** | `#EAD8C4` | Elevated cards, secondary backgrounds, and subtle dividers |
| **Coffee Brown** | `#70452B` | Headings, outlines, and secondary buttons |
| **Ink / Coffee Dark** | `#231812` | High-contrast readable body typography |
| **Forest Green** | `#263B2D` | Primary action buttons, active navigation indicator, and footer |
| **Sage Green** | `#A3A58A` | Delicate accent borders, status indicators, and ambient glows |

---

## 🧭 Custom Bottom Navigation

As specifically requested, the main navigation is positioned at the **BOTTOM** of the viewport:
* **Floating Glassmorphic Dock**: Centered fixed dock with backdrop blur and soft shadow.
* **Active Section Indicator**: Spring-animated pill that dynamically tracks the visible section using `IntersectionObserver`.
* **Zero Content Overlap**: Every page and section maintains a `pb-28` safe space so the dock never covers buttons or text.
* **Top Area Identity**: The top is kept clean with a minimalist brand banner displaying Gouri's monogram, current designation, and live "Available for opportunities" indicator.

---

## 📁 Project Architecture

The repository enforces complete separation between the Next.js frontend and the Express backend:

```text
portfolio/
├── frontend/                     # Next.js 14 App Router + TypeScript + Tailwind CSS
│   ├── public/
│   │   ├── images/              # Portrait & project mockups
│   │   ├── icons/
│   │   └── resume/              # Gouri_Yadav_Resume.pdf
│   ├── src/
│   │   ├── app/                 # page.tsx, /about, /skills, /projects, /projects/[id], etc.
│   │   ├── components/
│   │   │   ├── layout/          # HeaderBanner, BottomNav, Footer
│   │   │   ├── sections/        # Hero, About, Skills, Projects, Experience, Education, Contact
│   │   │   ├── common/          # Card3D, MagneticButton, MarqueeTicker, ProjectModal, TechBadge
│   │   │   └── ui/
│   │   ├── data/
│   │   │   └── portfolio.ts     # ⭐ SINGLE SOURCE OF TRUTH (All resume data centralized)
│   │   ├── hooks/               # useActiveSection
│   │   ├── services/            # api.ts (Centralized REST API client)
│   │   ├── types/               # TypeScript interfaces
│   │   └── styles/              # globals.css
│   ├── .env.example
│   ├── package.json
│   └── tailwind.config.ts
│
├── backend/                      # Node.js + Express + TypeScript + Nodemailer
│   ├── src/
│   │   ├── config/              # db.ts (Mongoose), mailer.ts (Nodemailer), env.ts
│   │   ├── modules/contact/     # model, controller, service, routes, validator (Zod)
│   │   ├── middleware/          # rateLimiter, errorHandler, cors
│   │   ├── types/               # TypeScript interfaces
│   │   ├── app.ts               # Express configuration
│   │   └── server.ts            # Server entrypoint
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── README.md
└── .gitignore
```

---

## ⭐ Single Source of Truth (`frontend/src/data/portfolio.ts`)

To avoid content duplication, all professional data is stored in one centralized file:
- **Personal Details**: Name, designation, verified resume statement, phone (`+91-7805001521`), email (`gouriy2414@gmail.com`), location (`Indore, India`).
- **Social Profiles**: LinkedIn, GitHub, LeetCode, Email.
- **Skills**: Categorized into *Languages*, *Frontend*, *Backend*, *Databases*, and *Tools*.
- **Projects**:
  1. **Media Octus CRM** (Next.js 16, Node.js, Express, TypeScript, MongoDB, Tailwind, JWT, Zod).
  2. **Tyler Content Manager (TCM)** (Angular, Vaadin, Java, OData, OpenSearch, SQL Server, PDFTron).
  3. **Company HRMS / CRM Platform** (React, Node.js, Express, Socket.io, MongoDB, Nginx).
  4. **AI Code Debugging Assistant** (React.js, Node.js, Express, JavaScript, Tailwind, REST APIs).
- **Experience**: Binjwa IT Solutions (Jun 2026 – Present) & XenParkSolutions (Aug 2025 – Dec 2025).
- **Education**: B.Tech CSE (Sushila Devi Bansal College of Technology, RGPV University, CGPA 7.30), Class XII (79.6%), Class X (89.66%).
- **Achievements**: Debugging competition, Heritage Quiz, HackerRank certifications.

---

## ✉️ Real Working Contact Form & Nodemailer Flow

1. The visitor fills in **Name**, **Email**, **Subject**, and **Message**.
2. Frontend validates all fields.
3. A `POST /api/contact` request is sent to the Express backend.
4. Backend verifies input using **Zod** and enforces an IP **rate limit** (5 requests / 15 mins).
5. The message is persisted in **MongoDB** (`ContactMessage` collection).
6. **Nodemailer** sends a branded HTML email to `gouriy2414@gmail.com` with `replyTo` set to the visitor's email.
7. Frontend displays an animated success alert and clears the form.

---

## 🚀 Quickstart Guide

### 1. Prerequisites
- Node.js (v18+ or v20+)
- npm or pnpm

### 2. Backend Setup
```bash
cd backend
npm install

# Configure environment variables
cp .env.example .env
```

Edit `backend/.env` with your values:
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/gouri_portfolio
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_gmail_address@gmail.com
SMTP_PASS=your_16_character_google_app_password
MAIL_FROM=Gouri Yadav Portfolio <noreply@gouriyadav.dev>
MAIL_TO=gouriy2414@gmail.com
```

> **How to get a Gmail App Password:**
> 1. Go to your [Google Account](https://myaccount.google.com/) > Security.
> 2. Ensure **2-Step Verification** is turned ON.
> 3. Search for **App passwords**.
> 4. Generate a new App Password named "Portfolio Mailer" and paste the 16-letter code into `SMTP_PASS`.

Run the backend in development:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install

# Configure environment variables
cp .env.example .env.local
```

Run the frontend in development:
```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## 🌐 Production Deployment

### Frontend (Vercel)
1. Push this repository to GitHub.
2. In Vercel, import the repository and set the **Root Directory** to `frontend`.
3. Add the Environment Variable:
   - `NEXT_PUBLIC_API_URL`: Your deployed backend URL (e.g. `https://api.gouriyadav.dev/api` or `https://backend.onrender.com/api`).
4. Deploy.

### Backend (Render / Railway)
1. In Render or Railway, create a new Web Service and set the **Root Directory** to `backend`.
2. Build command: `npm run build`
3. Start command: `npm start`
4. Set the Environment Variables (`PORT`, `NODE_ENV=production`, `FRONTEND_URL`, `MONGODB_URI`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_TO`).
5. Deploy.

---

## 📜 License
MIT License. Crafted for **Gouri Yadav**.
