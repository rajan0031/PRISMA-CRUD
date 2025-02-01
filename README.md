# CRUD Application

This is a full-stack CRUD (Create, Read, Update, Delete) application built with **Node.js**, **Express**, and **MongoDB** for the backend, and it implements various key functionalities like user authentication, profile management, and blog post operations.

## Features

- **User Registration & Login**: Allows users to register with their email and password, and login using JWT-based authentication.
- **User Profile**: View and manage user profiles.
- **Blog CRUD Operations**: Users can create, read, update, and delete blog posts.
- **Image Upload**: Supports uploading images for blog posts.
- **Tags**: Allows users to categorize blog posts with tags.
- **Authentication Middleware**: Protects routes by verifying JWT tokens.

## Installation

1. Clone this repository:
   \\\ash
   git clone <repository_url>
   \\\

2. Install dependencies:
   \\\ash
   npm install
   \\\

3. Create a \.env\ file and configure your environment variables:
   \\\ash
   JWT_SECRET=<your_jwt_secret>
   MONGO_URI=<your_mongo_database_uri>
   \\\

4. Start the server:
   \\\ash
   npm run dev
   \\\

## Available Routes

- **POST** \/register\ - Register a new user.
- **POST** \/login\ - Login with email and password.
- **POST** \/logout\ - Logout the user.
- **GET** \/viewprofile/:id\ - View user profile.
- **POST** \/createBlog\ - Create a new blog post.
- **GET** \/getAllBlogs\ - Get all blog posts.

## Technologies Used

- Node.js
- Express.js
- MongoDB
-PRISMA 
