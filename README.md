
# User Management System

## api

backend https://backend.usermanage.fwitech.com
frontend https://usermanage.fwitech.com
database mongodb+srv://vh12097it22:cokqNuSTX8BPbcBf@cluster81844.4salt.mongodb.net/

## 📌 1. Project Overview & Purpose

The **User Management System** is a full-stack web application designed to handle secure user authentication and role-based authorization. It allows users to register, log in, manage their profile, and access a personalized dashboard, while administrators can manage users and access admin-level controls.

**Key goals of the project:**

* Secure user authentication using JWT
* Role-based access control (`admin` and `user`)
* View and update user profiles
* Manage users from admin panel
* Production-ready structure for real deployments

This project can be used as a base for:

* SaaS dashboards
* Student portals
* Admin panels
* Internal company tools

---

## 🛠️ 2. Tech Stack Used

### 🔹 Frontend

* React.js
* React Router DOM
* Axios
* Bootstrap 

### 🔹 Backend

* Node.js
* Express.js
* MongoDB with Mongoose
* JSON Web Token (JWT)
* bcrypt for password hashing

### 🔹 Other Tools

* Postman for API testing
* Git & GitHub for version control
* Vite / Create React App for frontend build


## 🚀 3. Setup Instructions

### 🔧 Prerequisites

Make sure you have installed:

* Node.js (LTS recommended)
* MongoDB (local or Atlas cloud)
* Git



### 🖥️ Backend Setup

```bash
git clone https://github.com/sakthivel-fullstackdeveloper/user-management-system/
cd backend
npm install
```

Create `.env` file (refer environment variables section)

Start server:

```bash
npm run dev
```

or

```bash
node server.js
```

---

### 🌐 Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file and set backend URL.

Run app:

```bash
npm run dev
```

Great — here are the **next 2 sections** for your README.md.

---

## 🔐 4. Environment Variables

Create a `.env` file in both **backend** and **frontend**.

> ⚠️ Do **NOT** commit `.env` to GitHub.

### 🖥️ Backend `.env` variables (example list — do not add real values)

```
PORT=
MONGO_URI=
JWT_SECRET=
JWT_EXPIRES_IN=
```


---


## 🚢 5. Deployment Instructions

**generic deployment steps**  in cPanel.

---

### 🖥️ Backend Deployment

1. Push code to GitHub
2. Create MongoDB Atlas cluster
3. Create environment variables in hosting platform
4. Build & deploy backend

Example commands (local build):

```bash
cd backend
npm install
npm run build
```

Ensure:

* CORS is enabled
* Correct `PORT` is used
* Production logging enabled/disabled as needed

---

### 🌐 Frontend Deployment

You can deploy using **cPanel**.

1. Set API base URL in `.env`
2. Build project

```bash
npm run build
```

3. Upload `dist/` folder to hosting

---

### 🔁 Connect Frontend & Backend

* Set `VITE_BACKEND_URL` in frontend
* Allow frontend origin in backend CORS

 CORS whitelist:

```javascript
origin: "https://usermanage.fwitech.com"
```

---

### ☁  Deployment Flow

* Backend →  cPanel
* Frontend →  cPanel
* DB → MongoDB Atlas
* Domain → Cloudflare 



Great — here is a clean **API Documentation** section for your README, including:

* a placeholder for **Postman Collection link**
* **Example requests and responses** for all your major routes

You can paste this directly into README.md and later replace the link.

---

## 📌 6. API Documentation

### 🔗 Postman Collection

You can import the Postman API collection from the link below:

```
will be added
```

> Export from Postman → Share → Export Collection → Paste link here

---

## 📮 Auth APIs

### 🔐 Signup – `POST /auth/signup`

#### Request body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456",
  "role": "user"
}
```

#### Success response – **201 Created**

```json
{
  "message": "User registered successfully",
  "user": {
    "_id": "65ab23c9f9d210",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "status": "active"
  }
}
```

---

### 🔑 Login – `POST /auth/login`

#### Request body

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

#### Success response – **200 OK**

```json
{
  "message": "Login successful",
  "token": "<JWT_TOKEN>",
  "user": {
    "_id": "65ab23c9f9d210",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "status": "active"
  }
}
```

#### Error responses

| HTTP Code | Meaning             |
| --------- | ------------------- |
| 401       | Invalid credentials |
| 403       | Account deactivated |
| 400       | Missing fields      |

---

### 👤 Get Current User – `GET /auth/me`

Requires **Bearer Token**

#### Headers

```
Authorization: Bearer <JWT_TOKEN>
```

#### Success Response

```json
{
  "user": {
    "_id": "65ab23c9f9d210",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "status": "active"
  }
}
```

---

### 🚪 Logout – `POST /auth/logout`

Clears cookie / token on backend.

#### Response

```json
{
  "message": "Logged out successfully"
}
```

---

## 👤 User Profile APIs

### 👀 View My Profile – `GET /user/me`

```json
{
  "_id": "65ab23c9f9d210",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "status": "active"
}
```

---

### ✏️ Update My Profile – `PUT /user/me`

#### Request body

```json
{
  "name": "Updated Name",
  "email": "newemail@example.com"
}
```

#### Response

```json
{
  "message": "Profile updated successfully"
}
```

---

### 🔒 Change Password – `PATCH /user/me/password`

#### Request body

```json
{
  "oldPassword": "123456",
  "newPassword": "654321"
}
```

#### Response

```json
{
  "message": "Password updated successfully"
}
```

---

## 🛠️ Admin APIs

### 👥 List all users – `GET /admin/users`

Supports **pagination**

```
/admin/users?page=1&limit=10
```

#### Sample response

```json
{
  "total": 42,
  "page": 1,
  "limit": 10,
  "users": [
    {
      "_id": "65ab23c9f9d210",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "status": "active"
    }
  ]
}
```

---

### ✅ Activate User – `PATCH /admin/users/:id/activate`

#### Response

```json
{
  "message": "User activated successfully"
}
```

---

### ⛔ Deactivate User – `PATCH /admin/users/:id/deactivate`

#### Response

```json
{
  "message": "User deactivated successfully"
}
```

---


