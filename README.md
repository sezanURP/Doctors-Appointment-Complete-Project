# DocAppoint - Doctor Appointment Booking System

## 🌐 Live Site URL
**[Visit DocAppoint Live](https://your-live-site-url.vercel.app)** *(Note: Please replace this placeholder with your actual deployed Vercel/Netlify URL)*

## 🚀 Project Overview
DocAppoint is a modern, responsive, and secure full-stack web application designed to simplify the process of finding and booking appointments with specialized doctors. Built with Next.js and Express.js, it ensures a seamless experience for patients to manage their healthcare schedules effectively.

## ✨ Key Features
* **🔐 Secure Authentication & Profile Management:** Robust user login and registration system utilizing Better-Auth and JWT, complete with a personalized dashboard for updating user profiles.
* **🔍 Smart Doctor Search & Filtering:** Easily browse and search for doctors by name or specialty using a real-time, dynamic search bar integrated into the appointments directory.
* **⭐ Top-Rated Doctors Showcase:** The homepage automatically highlights the top 3 highest-rated doctors, fetched dynamically from the MongoDB database based on patient reviews.
* **📅 Comprehensive Booking Management:** A dedicated user dashboard allows patients to view, update, and delete their upcoming appointments seamlessly with instant optimistic UI updates (no page reloads).
* **🛡️ JWT Protected Routes:** Secure backend architecture where sensitive operations (fetching personal bookings, updating, deleting) are strictly protected by JSON Web Token (JWT) verification.
* **📱 Fully Responsive Modern UI:** Clean, professional, and user-friendly interface built with Tailwind CSS, ensuring perfect display and interactivity across mobile, tablet, and desktop devices.

## 🛠️ Technology Stack
**Frontend (Client-Side):**
* Next.js 15 (App Router)
* React.js
* Tailwind CSS
* Better-Auth (Authentication)
* React Hot Toast (Notifications)

**Backend (Server-Side):**
* Node.js
* Express.js
* MongoDB (Database)
* JWT (JSON Web Tokens)

## ⚙️ Local Setup Instructions
To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <your-client-repo-url>
    cd doc-appointment
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up environment variables:** Create a `.env.local` file in the root directory and add your configuration:
    ```env
    NEXT_PUBLIC_SERVER_URL=http://localhost:8080
    # Add your better-auth environment variables here
    ```
4.  **Run the development server:**
    ```bash
    npm run dev
    ```
5.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.