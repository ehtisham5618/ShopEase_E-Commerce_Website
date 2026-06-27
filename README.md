# ShopEase — E-Commerce Website

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://shop-ease-e-commerce-website-inky.vercel.app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/ehtisham5618/ShopEase_E-Commerce_Website)

---

## 📖 About the Project

**ShopEase** is a fully functional, multi-page e-commerce frontend built as the capstone project of a web development internship. It simulates a real-world online shopping experience — from browsing a product catalogue to managing a cart and completing checkout — all without a backend, powered entirely by modern front-end technologies.

The project demonstrates proficiency in React, TypeScript, TanStack Router, component architecture, client-side state management (localStorage), real-time filtering/search, and deployment to Vercel.

---

## 🌐 Live Demo

🔗 **[https://shop-ease-e-commerce-website-inky.vercel.app/](https://shop-ease-e-commerce-website-inky.vercel.app/)**

---

## 🗂️ Pages

| Page | Route | Description |
|------|-------|-------------|
| **Home** | `/` | Hero banner, featured products, category highlights |
| **Shop** | `/shop` | Full product grid with search, filter, and sort |
| **Product Detail** | `/product/$id` | Dynamic product page loaded by product ID |
| **Cart** | `/cart` | Item management, quantity control, order summary |
| **Checkout** | `/checkout` | Validated form, order success flow |

---

## ✨ Features

### 🛒 Cart Management
- Add, remove, and update product quantities
- Cart state persisted in **localStorage** — survives page refreshes and navigation
- Live cart badge count updates across all pages automatically

### 🔍 Shop Page
- **Real-time search** by product name
- **Category filtering** (Electronics, Clothing, Accessories)
- **Price range slider** to filter by maximum price
- **Multi-criteria sorting** — price low→high, high→low, and name A→Z
- All filters, search, and sort work **simultaneously**

### 📦 Product Detail
- Loaded dynamically using TanStack Router's `$id` param
- Displays full description, rating, reviews, badge, and pricing
- "Add to Cart" with quantity selector

### ✅ Checkout
- Field-level validation:
  - Name (required)
  - Email (format regex)
  - Phone (numeric)
  - Address (required)
  - Card number (16 digits)
  - Expiry (MM/YY format)
  - CVV (3 digits)
- Inline error messages per field
- Order success modal → cart cleared → redirect to home

### 📱 Responsive Design
- Fully responsive across desktop, tablet, and mobile
- Dark navbar and footer for a premium look
- Hover animations and micro-interactions throughout

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 19** | Component-based UI framework |
| **TypeScript** | Type-safe development |
| **TanStack Router** | File-based routing with type-safe params |
| **TanStack Start** | Full-stack React framework (SSR-ready) |
| **Tailwind CSS v4** | Utility-first responsive styling |
| **Vite** | Lightning-fast dev server and build tool |
| **localStorage** | Client-side cart persistence |
| **Sonner** | Toast notifications |
| **Lucide React** | Icon library |
| **Vercel** | Deployment and hosting |
| **Git & GitHub** | Version control |

---

## 📁 Project Structure

```
Task_1/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx          # Sticky dark navbar with live cart badge
│   │   ├── Footer.tsx          # Dark footer with newsletter form
│   │   └── ProductCard.tsx     # Reusable product card with hover effects
│   ├── lib/
│   │   ├── products.ts         # Product catalogue data & helper functions
│   │   └── cart.ts             # Cart state management (localStorage)
│   └── routes/
│       ├── __root.tsx          # Root layout (Navbar, Footer, Toaster)
│       ├── index.tsx           # Home page
│       ├── shop.tsx            # Shop page with filters
│       ├── product.$id.tsx     # Dynamic product detail page
│       ├── cart.tsx            # Cart page
│       └── checkout.tsx        # Checkout form page
├── package.json
├── vite.config.ts              # Configured with Vercel preset
└── README.md
```

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/ehtisham5618/ShopEase_E-Commerce_Website.git

# 2. Navigate into the project directory
cd ShopEase_E-Commerce_Website

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open **[http://localhost:8080](http://localhost:8080)** in your browser to view the app.

### Build for Production

```bash
npm run build
```

---

## 🏗️ Deployment

This project is deployed on **Vercel**. The `vite.config.ts` is configured with the Vercel Nitro preset for seamless SSR-compatible deployment.

To deploy your own instance:
1. Fork this repository
2. Connect it to your [Vercel](https://vercel.com) account
3. Set the following in Vercel's project settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Install Command:** `npm install`
4. Click **Deploy** ✅

---

## 📸 Screenshots

| Home Page | Shop Page |
|-----------|-----------|
| Hero banner with featured products | Full grid with search & filters |

| Product Detail | Cart & Checkout |
|---------------|----------------|
| Dynamic product info loaded by ID | Cart management + validated checkout form |

---

## 🎯 Key Learning Outcomes

- Building multi-page applications with **file-based routing**
- Managing **shared client-side state** without a backend using localStorage
- Implementing **simultaneous multi-criteria filtering** through a single render function
- Writing **type-safe React components** with TypeScript
- Structuring a scalable front-end codebase with clear separation of concerns
- **Deploying** a production-ready app via Vercel CI/CD

---

## 👤 Author

**Ehtisham Abid**
- GitHub: [@ehtisham5618](https://github.com/ehtisham5618)

---

## 📄 License

This project was created as a capstone internship project. All rights reserved.

---
