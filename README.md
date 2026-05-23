# 🩺 DocAppoint

## 🌐 Live Site URL
**[Visit DocAppoint Live](https://doc-appointment-silk.vercel.app/)** 
## 📖 Project Overview
DocAppoint is a full-stack, highly responsive web application designed to bridge the gap between patients and healthcare professionals. It provides a seamless doctor appointment booking experience with robust security, a dedicated user dashboard, and a modern user interface.

## ✨ Key Features
* **🔐 Secure JWT Authentication:** Integrated Better-Auth with JSON Web Tokens (JWT) for safe login, registration, and secure, protected API routes.
* **🔍 Dynamic Doctor Search:** A fast, real-time search functionality allowing patients to easily find doctors by name or specialty without reloading the page.
* **📊 Interactive User Dashboard:** A personalized, private portal for users to view, update, and delete their upcoming appointments and manage their profile.
* **⚡ Optimistic UI Updates:** Experience zero-delay interactions when modifying or canceling appointments, providing a lightning-fast user experience without waiting for server reloads.
* **⭐ Top-Rated Showcase:** Automatically fetches and highlights the top highest-rated doctors directly on the homepage based on database metrics.
* **📱 Fully Responsive Design:** A mobile-first, pixel-perfect user interface crafted with Tailwind CSS to ensure flawless accessibility across desktops, tablets, and mobile devices.

## 🛠️ Technology Stack
* **Frontend:** Next.js (App Router), React, Tailwind CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Security/Auth:** Better-Auth, JSON Web Tokens (JWT)

## 🚀 Local Run Instructions
1. Clone the repository to your local machine.
2. Open the terminal and run `npm install` to install all necessary dependencies.
3. Create a `.env.local` file in the root directory and configure your environment variables (e.g., `NEXT_PUBLIC_SERVER_URL=http://localhost:8080`).
4. Run `npm run dev` to start the development server.
5. Open `http://localhost:3000` in your browser to view the application.
