# City Event Tracker

A web application to explore, manage, and visualize urban events in Barcelona. Built as an academy project using React and Supabase.

## 🚀 Live Demo

[city-events-tracker.vercel.app](https://city-events-tracker.vercel.app)

---

## 📋 Features

- **Event listing** — Browse all events in a sortable, paginated table
- **Search** — Filter events by title, description, or location
- **Create & Edit events** — Full form with image upload and automatic geolocation via Nominatim
- **Interactive map** — View events on a Leaflet map and create new ones by clicking
- **Calendar** — Visualize events in a monthly/weekly/daily calendar view
- **Charts** — Donut chart showing event distribution by category

---

## 🛠 Tech Stack

| Category | Technology |
|---|---|
| Frontend | React 19, Vite 7 |
| Styling | Tailwind CSS 4, MUI |
| Routing | React Router v7 |
| Map | Leaflet, React Leaflet |
| Calendar | React Big Calendar |
| Charts | Chart.js, React Chartjs 2 |
| Backend | Supabase (PostgreSQL + Storage) |
| Deploy | Vercel |
| Testing | Vitest, Testing Library |

---

## ⚙️ Installation & Usage

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project with an `events` table and `event-images` storage bucket

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/triflip/city-events-tracker.git
   cd city-events-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm test` | Run tests with Vitest |

---

## 🗄 Database

The app uses a single Supabase table called `events` with the following fields:

| Field | Type |
|---|---|
| id | uuid |
| title | text |
| description | text |
| category | text |
| date | timestamptz |
| lat | float |
| lng | float |
| location | text |
| image_url | text |
| created_at | timestamptz |

---

## ☁️ Deploy

The app is deployed on **Vercel** with automatic deployments on every push to the `main` branch.

Environment variables (`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`) must be configured in the Vercel project settings under **Settings → Environment Variables**.

---

## 📁 Project Structure

```
src/
├── assets/          # Static assets (logo, images)
├── components/      # Reusable UI components
│   ├── charts/
│   ├── events/
│   └── ui/
├── context/         # React context (Search)
├── hooks/           # Custom hooks
├── layout/          # Page layout
├── lib/             # Supabase client and API functions
├── pages/           # Route pages
├── routes/          # App routing
└── testing/         # Unit and integration tests
```
