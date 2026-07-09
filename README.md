# NEXUS - Neural District Sneaker Store

> Shopping in 2077. Shoes aren't bought here - they're acquired.

A cyberpunk-themed sneaker e-commerce platform built with Next.js 15, Firebase, and Google Gemini AI. Set in the fictional "Neural District," Nexus wraps a fully functional storefront - real-time cart sync, Firebase Auth, AI recommendations, and simulated checkout - inside a dark neon sci-fi interface.

**[Live Demo](https://nexus-sneakers.netlify.app)**

---

![Nexus Home](docs/screenshot-home.png)

---

## What It Does

| Page | Description |
|------|-------------|
| `/` | Hero section with floating sneaker, horizontal-scroll Drops Showcase, sortable product Catalogue, embedded Sneaker Stories videos, and sign-up CTA |
| `/login` | Firebase Auth (email/password) styled as a sci-fi "Neural Access Portal" with sign-in/sign-up toggle |
| `/cart` | Full cart with quantity controls - Firestore sync for logged-in users, localStorage for guests, auto-merge on login |
| `/checkout` | Simulated payment form that records orders to Firestore with batch writes |
| `/lab` | **Neural Lab** - AI recommendation engine powered by Google Genkit + Gemini. Describe what you want, get matched shoes |

---

## Tech Stack

```
Framework     Next.js 15 (App Router + Turbopack)
Auth + DB     Firebase Auth + Firestore (real-time listeners)
AI            Google Genkit with Gemini
UI            Tailwind CSS + ShadCN / Radix UI primitives
Fonts         Audiowide + Orbitron (Google Fonts via next/font)
Deployment    Firebase App Hosting (apphosting.yaml configured)
Currency      Indian Rupees - targeting the Indian market
```

---

## Key Features

**Real-time cart sync**
Anonymous users get localStorage. Authenticated users get Firestore with real-time listeners. On login, both carts merge automatically - nothing gets lost.

**Neural Lab AI recommendations**
Users describe what they're looking for in plain language. Gemini processes the input against the product catalogue and returns ranked suggestions with explanations. Responses stream to the UI.

**Admin inline editing**
A hardcoded admin role can edit product names and prices directly inline on the catalogue page - no separate admin panel needed.

**Cyberpunk aesthetic**
Glassmorphism cards, scanline hover animations, 3D tilt effects, floating product images, neon cyan glow (#00F2FF), and military/sci-fi terminology throughout. The cart is a "Cargo Manifest." Authentication is "Neural Access."

---

## Architecture Notes

**Non-blocking writes** - Cart updates use debounced Firestore writes so rapid quantity changes don't hammer the database.

**Listener cleanup** - All onSnapshot listeners are wrapped in a custom useFirestoreListener hook that unsubscribes on component unmount, preventing memory leaks.

**Image optimization** - Next.js Image with WebP/AVIF format conversion, priority on hero images, and lazy loading on catalogue grid.

**YouTube facade** - Sneaker Stories videos load a thumbnail + play button instead of a blocking iframe. The actual iframe only mounts when the user clicks play.

**Firestore security rules** - Full DBAC implementation with isSignedIn(), isOwner(), isAdmin() helpers, path-based authorization, and subcollection isolation. Rules are in firestore.rules.

---

## Getting Started

### Prerequisites
- Node.js 18+
- A Firebase project with Auth + Firestore enabled
- A Google AI API key (for Neural Lab)

### Setup

```bash
# Clone
git clone https://github.com/harshavardhan0401/Nexus.git
cd Nexus

# Install
npm install

# Environment variables
cp .env.example .env.local
# Fill in your Firebase config and Gemini API key

# Run
npm run dev
```

Open http://localhost:9002

### Environment Variables

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
GOOGLE_GENAI_API_KEY=
```

---

## Project Structure

```
src/
app/
    page.tsx          # Home - hero, drops, catalogue, videos
    cart/             # Cargo Manifest (cart)
    checkout/         # Payment simulation
    lab/              # Neural Lab AI recommendations
    login/            # Neural Access Portal
components/
    sections/         # Page-level sections (Hero, Catalogue, etc.)
    ui/               # ShadCN base components
hooks/
    useFirestoreListener.ts   # Safe Firestore listener with cleanup
lib/
    firebase.ts       # Firebase initialization
ai/                   # Genkit flows for Neural Lab
```

---

## Build

```bash
npm run build    # Production build
npm run dev      # Dev server (Turbopack, port 9002)
npm run lint     # ESLint
```

---

## Screenshots

| Home | Neural Lab | Cart |
|------|------------|------|
| ![Home](docs/screenshot-home.png) | ![Lab](docs/screenshot-lab.png) | ![Cart](docs/screenshot-cart.png) |

---

## License

MIT
