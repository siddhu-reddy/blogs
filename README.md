# 📝 Full Stack Blog Application

A responsive full-stack blog platform allowing users to create, read, update, and delete blog posts. Includes secure user authentication and role-based access to certain features.

---


---

## 📚 Features

- 🔐 User Authentication (Signup/Login using email & password)
- 📝 Blog CRUD (Create, Read, Update, Delete)
- 👀 Public blog listing & detail view (no login required)
- ✍️ Only blog authors can edit/delete their posts
- 🌐 RESTful API for all operations
- 📱 Fully responsive (works on mobile & desktop)
- 📄 Paginated blog list for performance

---

## 🛠️ Tech Stack

### Frontend

- React
- Axios
- React Router DOM
- Tailwind CSS (optional for styling)

### Backend

- Node.js
- Express.js
- MongoDB (using Mongoose)
- JWT for authentication
- Bcrypt for password hashing
- CORS & dotenv

### Deployment

- Frontend: **Vercel**
- Backend: **Render**
- Database: **MongoDB Atlas**

---

## 📁 Folder Structure

project-root/
│
├── backend/ # Express backend
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── config/
│ ├── .env
│ └── server.js
│
└── frontend/ # React frontend
├── src/
│ ├── pages/
│ ├── components/
│ ├── context/
│ ├── App.js
│ └── index.js
└── .env


---

## 🔧 Getting Started

### Prerequisites

- Node.js v16+
- MongoDB Atlas account (or local MongoDB)
- Git

---

## ⚙️ Backend Setup

1. Clone the repository and install dependencies:

```bash
cd backend
npm install
Create a .env file in /backend with the following:

PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
Start the backend server:

npm run dev
API will run at http://localhost:8000

Frontend Setup
Go to the frontend folder and install dependencies:


cd frontend
npm install
Create a .env file in /frontend:

REACT_APP_API_URL=https://your-backend-url.onrender.com/api
Start the frontend app:

npm run dev
Frontend runs at http://localhost:3000


API Endpoints
Auth
POST /api/auth/register — Register new user

POST /api/auth/login — Login and receive JWT

Blogs
GET /api/blogs — List all blogs (paginated)

GET /api/blogs/:id — Get blog by ID

POST /api/blogs — Create blog (auth required)

PUT /api/blogs/:id — Edit blog (author only)

DELETE /api/blogs/:id — Delete blog (author only)

