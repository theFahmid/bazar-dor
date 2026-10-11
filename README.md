# 🛒 বাজার দর | BazarDor

**A modern, responsive daily market price tracker for essential commodities in Bangladesh.**

BazarDor helps users explore the latest prices of everyday essentials — চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলা — compare daily price changes, browse products by category, and view market-wise price details with minimum / maximum / average breakdowns, all in Bengali numerals.

## ✨ Features

1. **Live price ticker (marquee)** — infinite scrolling strip below the navbar showing `emoji + name + দাম টাকা/একক + ▲/▼ %` for every product.
2. **Home price sections** — Top 6 risers (`আজ দাম বেড়েছে`), Top 6 fallers (`আজ দাম কমেছে`), and all products (`সব পণ্য`) as responsive cards with emoji, Bengali-digit prices, and change badges.
3. **Product detail pages (login-protected)** — hero header with price + trend, price summary (minimum / maximum / average), and a market-wise price table sorted by average, all in Bengali numerals.
4. **Category pages with sorting** — category title + icon, sort control (`ডিফল্ট | দাম: কম থেকে বেশি | দাম: বেশি থেকে কম`, numeric sort), loading states, and friendly 404 + “home” CTA for invalid slugs.
5. **BetterAuth authentication** — email/password sign-up & sign-in, session-aware navbar (`আমার প্রোফাইল` / `লগ আউট` when logged in), middleware + client-side gates protecting product pages, and a profile page with name updates.
6. **Fully responsive UI** — mobile → tablet → desktop (collapsing grids, stacking hero, scrollable category nav), styled with Tailwind CSS + DaisyUI and Bengali typography.

## 🛠️ Technologies Used

| Technology | Purpose |
| --- | --- |
| Next.js 16 (App Router) | UI, routing, Cache Components + Partial Prerendering |
| React 19 | Components & client interactivity |
| TypeScript | Type safety |
| Tailwind CSS + DaisyUI | Styling & responsive design |
| BetterAuth + MongoDB (`mongodb`, `@better-auth/mongo-adapter`) | Email/password auth, sessions, profile updates |
| `react-fast-marquee` | Price ticker strip |

## 🚀 Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

Environment variables (see `.env`):

```
MAIN_API_URL=https://openapi.programming-hero.com/api/bazardor
BETTER_AUTH_SECRET=your-secret
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URL=your-mongodb-connection-string
```

## 🗺️ Routes

| Route | Access |
| --- | --- |
| `/` | Public — hero, risers, fallers, all products |
| `/category/{slug}` | Public — category products + sort |
| `/products/{slug}` | Login required — product detail + market prices |
| `/signin`, `/signup` | Public — auth forms |
| `/profile` | Login required — view & update name |
| Unknown routes / invalid slugs | Friendly 404 page |
