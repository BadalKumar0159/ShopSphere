# 🛍️ E-Commerce Application

A full-stack **E-Commerce Application** with a dedicated **Admin Panel** and **User Frontend**, built using **React.js**, **Node.js**, **Express.js**, and **MongoDB**.

The application allows customers to browse products, manage their shopping cart, and place orders using **Cash on Delivery (COD), Stripe, or Razorpay**, while administrators can securely manage products and customer orders through a dedicated dashboard.

---

## Table of Contents

- Features
- Technologies Used
- Setup Instructions
- Environment Variables

---

## ✨ Features

### Admin Panel

- Secure admin authentication
- Add, update, view, and remove products
- Upload multiple product images
- Manage customer orders
- Update order status

### User Frontend

- User registration and login
- Browse product catalog
- Search products
- Filter by category and sub-category
- Sort products
- Shopping cart management
- Cash on Delivery (COD)
- Stripe payment integration
- Razorpay payment integration
- Order history
- About, Contact, and Newsletter pages

---

## 🛠️ Technologies Used

### Frontend

| Technology | Purpose |
|------------|---------|
| React.js | Frontend Framework |
| Vite | Build Tool |
| Tailwind CSS | Styling |
| React Router DOM | Routing |
| Axios | API Requests |
| React Toastify | Notifications |

### Backend

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime Environment |
| Express.js | Backend Framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| Bcrypt | Password Hashing |
| Cloudinary | Image Storage |
| Multer | File Uploads |
| Stripe | Payment Gateway |
| Razorpay | Payment Gateway |

---

## ⚙️ Setup

### Backend

```bash
git clone <repository_url>
cd backend
npm install
```

Create `.env`

```env
STRIPE_SECRET_KEY=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

MONGODB_URI=

CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

JWT_SECRET=

ADMIN_EMAIL=
ADMIN_PASSWORD=

PORT=3000
```

Start the server

```bash
npm start
```

---

### Admin

```bash
cd admin
npm install
npm run dev
```

`.env`

```env
VITE_BACKEND_URL=http://localhost:3000
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

`.env`

```env
VITE_BACKEND_URL=http://localhost:3000
```

---

## 🔐 Environment Variables

### Backend

| Variable | Description |
|----------|-------------|
| STRIPE_SECRET_KEY | Stripe Secret Key |
| RAZORPAY_KEY_ID | Razorpay Key ID |
| RAZORPAY_KEY_SECRET | Razorpay Secret Key |
| MONGODB_URI | MongoDB Connection String |
| CLOUDINARY_NAME | Cloudinary Cloud Name |
| CLOUDINARY_API_KEY | Cloudinary API Key |
| CLOUDINARY_API_SECRET | Cloudinary API Secret |
| JWT_SECRET | JWT Secret |
| ADMIN_EMAIL | Admin Email |
| ADMIN_PASSWORD | Admin Password |
| PORT | Backend Port |

### Frontend

| Variable | Description |
|----------|-------------|
| VITE_BACKEND_URL | Backend Server URL |

---

## Key Highlights

- Full-stack MERN architecture
- JWT Authentication
- Product & Order Management
- Stripe & Razorpay Integration
- Cloudinary Image Upload
- Responsive UI
- Secure REST APIs

---

⭐ If you found this project useful, consider giving it a star!
