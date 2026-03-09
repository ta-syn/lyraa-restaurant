# 🍽️ Lyraa — Fine Dining Restaurant Website

> A premium, dark-luxury fine dining restaurant website built with **Next.js 14**, featuring sophisticated animations, a working reservation system, and a stunning gold + black aesthetic.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer-Motion-purple?logo=framer)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/License-All%20Rights%20Reserved-red)]()
[![GitHub](https://img.shields.io/badge/GitHub-ta--syn%2Flyraa--restaurant-181717?logo=github)](https://github.com/ta-syn/lyraa-restaurant)

---

## ✨ Features

- 🌟 **Full-screen luxury hero** with candle-glow parallax effects and high-end typography
- 🍴 **Interactive menu** with category filters (Starters, Mains, Desserts, Drinks) & item modals
- ⏳ **Live countdown timer** for exclusive seasonal chef's tasting menu offer
- 🖼️ **Masonry photo gallery** with lightbox, keyboard navigation & swipe support
- 📋 **Working reservation form** with validation, Monday-closed logic & email notifications
- 💬 **Testimonials carousel** with swipe gestures and auto-advance
- 📱 **Fully responsive** — mobile, tablet, and desktop optimized
- ✨ **Premium dark luxury aesthetic** with gold accents, glassmorphism & micro-animations

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 14** (App Router) | Framework |
| **Tailwind CSS** | Styling |
| **Framer Motion** | Animations |
| **React Hook Form** | Form handling |
| **React Icons** | Icon library |
| **Nodemailer** | Reservation emails |
| **JavaScript** | Language |

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/ta-syn/lyraa-restaurant.git
cd lyraa-restaurant
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:
```env
# Email configuration for reservation form
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
EMAIL_TO=restaurant@lyraa.com
```

> **Note:** For Gmail, use an [App Password](https://support.google.com/accounts/answer/185833) instead of your regular password.

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
lyraa/
├── app/
│   ├── layout.js          # Root layout with fonts & metadata
│   ├── page.js            # Homepage (all sections assembled)
│   ├── globals.css        # Global styles & Tailwind directives
│   └── api/
│       └── reservation/   # Email API route (Nodemailer)
├── components/
│   ├── sections/
│   │   ├── Hero.js        # Full-screen hero section
│   │   ├── About.js       # Story, stats & chef section
│   │   ├── Menu.js        # Menu grid with item modal
│   │   ├── SpecialOffer.js # Countdown offer section
│   │   ├── Gallery.js     # Masonry gallery + lightbox
│   │   ├── Testimonials.js # Reviews carousel
│   │   ├── Reservation.js # Booking form
│   │   └── Contact.js     # Contact info & map
│   └── ui/
│       ├── Navbar.js      # Sticky nav with active section
│       ├── Footer.js      # Footer with links
│       └── PageLoader.js  # Luxury page loader
├── lib/
│   ├── data.js            # All static content (menu, gallery, etc.)
│   ├── imagePlaceholders.js # Gradient fallbacks for images
│   └── email-template.html # Luxury HTML reservation email
├── public/
│   └── images/            # All images (hero, menu, gallery, etc.)
├── tailwind.config.js     # Custom colors, fonts & animations
└── next.config.mjs        # Next.js configuration
```

---

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the [`ta-syn/lyraa-restaurant`](https://github.com/ta-syn/lyraa-restaurant) repository
4. Add your environment variables in the Vercel dashboard
5. Click **Deploy** — done! ✅

### Or via Vercel CLI
```bash
npx vercel
```

### Build for Production
```bash
npm run build
npm run start
```

---

## 🖼️ Screenshots

| Section | Preview |
|---|---|
| Hero | Full-screen luxury hero with animated gold title |
| Menu | Filter tabs + item modal with full image |
| Gallery | Masonry grid with lightbox |
| Reservation | Multi-field booking form |

---

## 📄 License

© 2024 Lyraa. All rights reserved.  
This project is proprietary. Unauthorized copying or redistribution is prohibited.

---

<div align="center">
  <p>Crafted with ♥ by <strong>Nishan</strong> for <strong>Lyraa Fine Dining</strong></p>
  <a href="https://github.com/ta-syn/lyraa-restaurant">⭐ Star this repo if you like it!</a>
</div>
