# 🚀 Personal Portfolio Website

A modern, full-stack personal portfolio website built using **React.js**, **Tailwind CSS**, **Node.js**, and **MongoDB**. It features a professional UI, an admin dashboard to manage content (projects, blogs, certificates, bio), cookie-based JWT authentication, file uploads using Multer + Cloudinary, and clean modular architecture.

---

## 🔗 Live Site

👉 [Visit Portfolio](https://sachinkathar.vercel.app)

---

## 📸 Preview

![Portfolio Screenshot]()

---

## 🛠️ Tech Stack

### ✨ Frontend
- React 19 + Vite
- Tailwind CSS + Shadcn/ui
- React Router DOM

### ⚙️ Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Multer (file upload)
- Cloudinary (image hosting)

### 🔐 Auth
- JWT (HttpOnly Cookies)
- Role-based Authorization (Admin access)

### 🚀 Deployment
- Frontend: Vercel / Netlify
- Backend: Render
- Database: MongoDB Atlas

---

## 📦 Features

- ⚡ Fast and responsive portfolio UI
- 🧑‍💼 Admin dashboard to:
  - Add/Edit/Delete Projects
  - Add/Edit/Delete Blogs
  - Upload Certificates
  - Update Profile & Bio
- 🖼️ File/image upload support via Multer + Cloudinary
- 🔐 Secure login with JWT cookies
- 🧩 Modular folder structure
- 🔍 SEO-friendly

---

## 🧑‍💻 Getting Started

### ⚡ Prerequisites

- Node.js
- MongoDB (Atlas or local)
- Cloudinary Account
- Git

### 🛠️ Installation

```bash
# 1. Clone the repo
git clone https://github.com/SACHINKATHAR2005/sachinkathar.git
cd portfolio

# 2. Install dependencies for backend
cd server
npm install

# 3. Create .env file inside /server and add:
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# 4. Start backend server
npm run dev

# 5. Setup frontend
cd ../client
npm install

# 6. Start frontend
npm run dev
