📝 Full-Stack CRUD Application with Node.js, Express, MongoDB & Prisma 🚀
Welcome to the Full-Stack CRUD Application built with Node.js, Express, and MongoDB for the backend, and Prisma for handling the database interactions. This app allows users to register, login, create, read, update, and delete blog posts, along with features like profile management, JWT-based authentication, and more! 😎

🔥 Key Features 🔥
User Registration & Login: 🔐
Register using email & password, and login with JWT-based authentication. 💻
User Profile: 👤
View and manage your user profile. 🌟
Blog CRUD Operations: 📝
Create, Read, Update, and Delete your blog posts easily! 📚
Image Upload: 🖼️
Upload images for your blog posts and make them more interactive! 💥
Tags: 🔖
Categorize your blogs with tags for easy searching. 🔍
Authentication Middleware: 🛡️
Protect routes using JWT tokens to keep your data secure. 🔑
💻 Installation 💻
Step 1: Clone the Repository
bash
Copy
Edit
git clone <repository_url> 🚀
Step 2: Install Dependencies
bash
Copy
Edit
npm install 🧑‍💻
Step 3: Configure Environment Variables
Create a .env file in the root directory of the project and configure the following environment variables:

bash
Copy
Edit
JWT_SECRET=<your_jwt_secret> 💬
MONGO_URI=<your_mongo_database_uri> 🌱
Step 4: Start the Server
bash
Copy
Edit
npm run dev 🚀
📜 Available Routes 📜
POST /register 📧: Register a new user.
POST /login 🔑: Login with email and password.
POST /logout ❌: Logout the user.
GET /viewprofile/:id 👤: View the user profile.
POST /createBlog 📝: Create a new blog post.
GET /getAllBlogs 📚: Get all blog posts.
🌟 Technologies Used 🌟
Node.js 🟩
Express.js ⚡
MongoDB 🍃
Prisma 🔗
JWT Authentication 🔐
💥 Echo Commands 💥
Here are the echo commands for adding the required environment variables to your .env file:

bash
Copy
Edit
echo JWT_SECRET=<your_jwt_secret> >> .env 🔑
echo MONGO_URI=<your_mongo_database_uri> >> .env 🌱
This will set up your environment variables quickly! 😎

⚙️ Development Setup ⚙️
Run the app:

bash
Copy
Edit
npm run dev 🚀
Access the routes:

Open http://localhost:5000 and access the routes for registration, login, blog operations, and more! 🌍
🙌 Contribute to the Project 🙌
We welcome any contributions! Feel free to open an issue, create a pull request, or just give us a star if you like what you see! ⭐

