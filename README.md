
# ShopSphere 🛍️

ShopSphere is a full-stack product management application built with **React.js** and **Node.js**. It allows users to register, log in, and manage products through a clean and responsive interface.

The project uses **JWT-based authentication** with access and refresh tokens, while product data is stored in **MongoDB**.

## 🚀 Live Demo

**Frontend:**
https://assignment-12-shop-sphere.vercel.app/

## 📌 Features

* User registration and login
* JWT-based authentication
* Access token and refresh token system
* HTTP-only refresh token cookie
* Protected product routes
* Add new products
* View all products
* Edit products
* Delete products
* Product validation
* Responsive and clean UI
* MongoDB database integration
* Automatic access-token refresh
* Logout functionality

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* Axios
* Tailwind CSS
* Lucide React

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* express-validator
* cookie-parser
* CORS

### Deployment

* **Frontend:** Vercel
* **Backend:** Render
* **Database:** MongoDB Atlas

## 📁 Project Structure

```text
ShopSphere/
│
├── Client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── Server/
│   ├── src/
│   │   ├── app/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── ...
│   │
│   ├── server.js
│   └── package.json
│
└── README.md
```

## 🔐 Authentication

ShopSphere uses an access-token and refresh-token based authentication system.

### Access Token

The access token is used to authenticate API requests and is stored on the client side.

### Refresh Token

The refresh token is stored in an **HTTP-only cookie**. When the access token expires, the frontend requests a new access token using the refresh token.

This helps maintain the user's login session without requiring them to log in again frequently.

## 📦 Product Management

Authenticated users can manage products from the Products page.

Each product contains information such as:

* Product name
* Description
* Price
* Category
* Stock

Users can:

```text
Create → Add a new product
Read   → View available products
Update → Edit an existing product
Delete → Remove a product
```

## ⚙️ Environment Variables

### Frontend

Create a `.env` file inside the `Client` folder:

```env
VITE_API_URL=http://localhost:3000/api
```

For production, the frontend uses the deployed backend URL:

```env
VITE_API_URL=https://assignment-12-shopsphere.onrender.com/api
```

### Backend

The backend requires environment variables for things such as:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
FRONTEND_URL=http://localhost:5173
```

Do not commit `.env` files or secret values to GitHub.

## 💻 Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/adi0318/Assignment-12-ShopSphere.git
```

```bash
cd Assignment-12-ShopSphere
```

### 2. Install backend dependencies

```bash
cd Server
npm install
```

### 3. Configure backend environment variables

Create a `.env` file inside the `Server` folder and add your MongoDB and JWT configuration.

### 4. Start the backend

```bash
npm run dev
```

The backend will run locally on:

```text
http://localhost:3000
```

### 5. Install frontend dependencies

Open another terminal:

```bash
cd Client
npm install
```

### 6. Configure frontend environment variables

Create:

```text
Client/.env
```

and add:

```env
VITE_API_URL=http://localhost:3000/api
```

### 7. Start the frontend

```bash
npm run dev
```

The frontend will normally run on:

```text
http://localhost:5173
```

## 🌐 API Routes

### Authentication

| Method | Route                       | Description                 |
| ------ | --------------------------- | --------------------------- |
| POST   | `/api/auth/register`      | Register a new user         |
| POST   | `/api/auth/login`         | Login user                  |
| POST   | `/api/auth/refresh-token` | Generate a new access token |
| POST   | `/api/auth/logout`        | Logout user                 |
| GET    | `/api/auth/me`            | Get logged-in user          |

### Products

| Method | Route                 | Description      |
| ------ | --------------------- | ---------------- |
| GET    | `/api/products`     | Get all products |
| POST   | `/api/products`     | Create a product |
| PUT    | `/api/products/:id` | Update a product |
| DELETE | `/api/products/:id` | Delete a product |

## 🔄 Authentication Flow

The basic authentication flow works like this:

```text
User
 │
 ├── Register
 │      ↓
 │   Backend
 │      ↓
 │   MongoDB
 │
 ├── Login
 │      ↓
 │   Access Token
 │   Refresh Token
 │
 └── API Request
        ↓
   Access Token
        ↓
   If expired → Refresh Token
        ↓
   New Access Token
```

## 🎯 Project Purpose

ShopSphere was built to practice and understand full-stack web development concepts including:

* React application development
* REST APIs
* Express.js
* MongoDB and Mongoose
* Authentication and authorization
* JWT access and refresh tokens
* HTTP-only cookies
* Axios interceptors
* Protected routes
* Form validation
* Frontend and backend integration
* Deployment using Vercel and Render

## 👨‍💻 Author

**Aditya Soni**

B.Tech — Artificial Intelligence & Machine Learning

---

⭐ If you found this project useful, feel free to explore the code and try the live application.
