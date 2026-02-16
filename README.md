# CRUD Blog Application

A full-stack CRUD Blog Application built with **React (TypeScript)**, **Express.js**, and **MongoDB Atlas**. It includes user authentication, OTP email verification, protected routes, and complete post & comment management (create, edit, delete).  

This was my **first project in 2nd semester**, which helped me understand backend integration and full-stack development.

## Folder Structure

CRUD-Blog-App/
frontend/ → React project
backend/ → Express + MongoDB project
README.md


## Features

- User Signup & Signin  
- OTP Email Verification  
- Protected Routes (only logged-in users can access blog/home)  
- Create, Edit, Delete Posts  
- Add, Edit, Delete Comments  

## Tech Stack

- Frontend: React.js (TypeScript)  
- Backend: Express.js (TypeScript)  
- Database: MongoDB Atlas  
- Email Verification: Nodemailer + Google OAuth  

## How to Run

1. Clone the repo:  
```bash
git clone https://github.com/sherry7901/Blogger-Spot.git
cd frontend
npm install
cd ../backend
npm install

# Backend
cd backend
npm run dev

# Frontend
cd ../frontend
npm start
