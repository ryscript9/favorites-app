# 🎬 Favorites Movies & TV Shows App

Manage your favorite movies and TV shows with this full-stack app!

✅ Features:
- Add new movies or TV shows
- Edit and delete entries
- Infinite scroll for viewing entries
- Search and filter by type or title
- Built with modern tech stack:
  - Frontend: React + Vite + TypeScript + TailwindCSS + Shadcn UI
  - Backend: Node.js + Express + Prisma ORM + Zod validation
  - Database: MySQL

---

## 🚀 Local Development

Below are step-by-step instructions to run the app locally.

---

# 📦 Backend Setup

## 1. Navigate to backend folder

```bash
cd backend
```

## 2. Configure Environment Variables
Create a .env file in /backend:
DATABASE_URL="mysql://root:@localhost:3306/favorites"
PORT=4000

## 3. Install dependencies
```bash
npm install
```

## 4. Initialize Prisma & Seed Data
```bash
npx prisma migrate dev --name init
npm run seed
```

## 5. Run the Backend
```bash
npm run dev
```

---

# 💻 Frontend Setup

## 1. Navigate to the frontend folder
```bash
cd frontend
```

## 2. Install dependencies
```bash
npm install
```

## 3. Configure Environment Variables
Create a .env file in /frontend:
VITE_API_URL=http://localhost:4000

## 4. Run the Frontend
```bash
npm run dev
```

🌐 Development Workflow
# Terminal 1
```bash
cd backend
npm run dev
```

# Terminal 2
```bash
cd frontend
npm run dev
```
