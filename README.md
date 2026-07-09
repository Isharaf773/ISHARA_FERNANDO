# Ishara Fernando - Advanced Level Mathematics Platform

A full-stack modern web application built with the MERN stack (MongoDB, Express, React, Node.js) configured for an educational video platform. It uses standard Cloudinary and YouTube embed implementations to keep running costs optimized for a tutor's business model.

## Features
- **Student Public Views:** Minimalistic blue/white user interface displaying featured lessons, categorized courses, unlisted YouTube embeds, PDF downloads via Cloudinary URLs, and a contact form with WhatsApp integration.
- **Admin Dashboard:** Secured by JWT authentication. Displays statistics, read contact messages, and manage content.

## Prerequisites
- Node.js (v18+ recommended)
- MongoDB account (Atlas Free Tier ideal)
- Cloudinary account (Free Tier)
- YouTube account (For uploading unlisted videos)

## Local Development Setup

### 1. Backend Setup
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file using the provided `.env.example`:
   ```bash
   cp .env.example .env
   ```
4. Fill in the `.env` variables with your MongoDB connection string and a secret string for JWT.
5. (Optional) Run the seed script to import sample data and an initial admin user:
   ```bash
   npm run seed
   ```
   *Note: Default Admin user created by seed script is `admin` with password `admin123`.*
6. Start the server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file using the `.env.example` pattern:
   ```bash
   cp .env.example .env
   ```
   Set `VITE_API_URL` to your backend endpoint (e.g., `http://localhost:5000/api`).
4. Start the frontend development server:
   ```bash
   npm run dev
   ```

## Production Deployment Guide

### Deploying the Backend (Render / Heroku)
1. Push your repository to GitHub.
2. Create a new Web Service on Render connect your repository, and set the root directory to `backend`.
3. Set the build command to `npm install` and start command to `node server.js`.
4. Add Environment Variables inside Render (match your `.env` variables, including production connections for MongoDB Atlas).

### Deploying the Frontend (Vercel)
1. Import your repository into Vercel and set the root directory to `frontend`.
2. Framework preset will automatically detect Vite. 
3. Expand Environment Variables and set `VITE_API_URL` to your Render backend URL (e.g., `https://ishara-backend.onrender.com/api`).
4. Deploy.

## Architecture Decisions
- **Videos:** Long videos exceed cheap hosting limits very fast. Instead of direct video upload hosting, the admin copies the embed link from an Unlisted YouTube video and saves it in the database. 
- **Files/Thumbnails:** Instead of heavy local storage, images and small PDFs are stored on Cloudinary. The admin dashboard can integrate unsigned preset uploads via Cloudinary widget, or simply paste the direct URL.
- **Styling:** Vanilla TailwindCSS via Vite v6 plugin.
