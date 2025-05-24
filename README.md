# Next.js 15 REST API

This is a beginner-friendly REST API built using **Next.js 15**. The project uses the **App Router** and **Route Handlers**, following modern best practices in the latest version of Next.js.

## 🚀 Tech Stack

* **Next.js 15 (App Router)**
* **Route Handlers** for API endpoints
* Optional: TypeScript, ESLint, Prettier

## 🔧 Features

* RESTful API with full CRUD support
* API routes in `app/api/` using file-based routing
* Clean and modular structure
* Easily extendable with databases like MongoDB or PostgreSQL

## 📁 Project Structure

```
app/
├── api/
│   └── items/
│       ├── route.ts       # GET (all items), POST (create item)
│       └── [id]/route.ts  # GET, PUT, DELETE by ID
├── layout.tsx
├── page.tsx               # Optional frontend landing
```

## 🧠 Key Concepts Learned

* Creating RESTful APIs with the new App Router in Next.js 15
* Handling different HTTP methods in route files
* Sending JSON responses with proper status codes
* Modular API structure and scalable endpoints

## 💻 Getting Started

```bash
git clone https://github.com/your-username/next15-rest-api.git
cd next15-rest-api
npm install
npm run dev
```

Visit: `http://localhost:3000/api/[items]` to test the API.