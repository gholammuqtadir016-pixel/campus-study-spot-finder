# 📚 Campus Study Spot Finder

A full-stack web application that helps students discover,
search, filter and manage study locations around their campus.

## 🚀 Features

- 🔍 Search study spots
- 🎛️ Filter by:
  - Wi-Fi
  - Power outlets
  - Quiet environment
  - Rating
  - Crowd level
- 🗺️ Interactive Google Maps
- 📍 Location markers
- ➕ Add study spots
- ✏️ Edit study spots
- 🗑️ Delete study spots
- ⭐ Study spot ratings
- 📱 Responsive design
- 🗄️ PostgreSQL database
- 🔥 Prisma ORM
- ⚡ Next.js API routes

## 🛠️ Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend

- Next.js API Routes
- Prisma ORM

### Database

- PostgreSQL

### Maps

- Google Maps JavaScript API
- @vis.gl/react-google-maps

## 📁 Project Structure

```text
app/
├── api/
│   └── study-spots/
├── add-spot/
├── edit-spot/
├── spots/
├── page.tsx
└── layout.tsx

components/
├── Navbar.tsx
├── Footer.tsx
├── StudyMap.tsx
└── StudySpotCard.tsx

lib/
└── prisma.ts

prisma/
├── schema.prisma
└── seed.ts