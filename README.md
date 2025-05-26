# 📚 Book Review API

A RESTful API built using Node.js and Express.js for managing books and reviews. This system includes role-based access control (admin/user), JWT-based authentication, and rich listing functionalities like search, pagination, and sorting.

---

## ✅ Features

- 🔒 **JWT-based user authentication** (Signup/Login)
- 🧠 **Role-based access control**: `admin`, `user` (default: user)
- 🛡️ **Only Admins can add books**
- 📚 **CRUD operations for Books** (only admin can create)
- 📝 **Review system** (one review per user per book)
- 🔍 **Advanced book listing** with search, pagination, sorting, filtering
- 🔐 **Secure password hashing** using bcrypt
- 🔁 **Standard success/error response handling**

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/sangam0207/Billeasy-Backend-Task.git
cd Billeasy-Backend-Task

Steps for local setup:

1- npm install

2- Create a .env File

APP_PORT=5000
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret
APP_ENV=development

3- Run Locally

npm run dev

Folder Structure: 

/Billeasy-Backend-Task
├── controllers/           # Business logic for routes
├── models/                # Mongoose models
├── routes/                # API endpoints
├── middleware/            # Auth & error handling
├── lib/                   # successRes & errorRes helpers
├── service/               # Token service
├── index.js              # Entry point
├── .env                   # Environment config
├── README.md              # Documentation


DB Design:

 User Schema:

| Field    | Type   | Required | Description      |
| -------- | ------ | -------- | ---------------- |
| name     | String | ✅        | User’s full name |
| email    | String | ✅        | Unique email     |
| password | String | ✅        | Hashed password  |
| role     | String | ❌        | user or admin    |

Book Schema:

| Field         | Type     | Required | Description              |
| ------------- | -------- | -------- | ------------------------ |
| title         | String   | ✅        | Title of the book        |
| author        | String   | ✅        | Book's author            |
| genre         | String   | ✅        | Genre                    |
| description   | String   | ❌        | Summary/overview         |
| publishedYear | Number   | ❌        | Year of publication      |


Review Schema:

| Field   | Type     | Required | Description           |
| ------- | -------- | -------- | --------------------- |
| bookId  | ObjectId | ✅        | Reference to the book |
| userId  | ObjectId | ✅        | Who posted the review |
| rating  | Number   | ✅        | 1 to 5                |
| comment | String   | ❌        | Text review           |


