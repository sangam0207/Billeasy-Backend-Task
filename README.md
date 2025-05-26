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


🔐 Authentication
➕ Signup

curl -X POST http://localhost:5000/signup \
-H "Content-Type: application/json" \
-d '{
  "name": "Alice",
  "email": "alice@example.com",
  "password": "password123",
  "role": "admin"
}'

Login:

curl -X POST http://localhost:5000/login \
-H "Content-Type: application/json" \
-d '{
  "email": "alice@example.com",
  "password": "password123"
}'


📚 Books
📘 Add Book (Admin Only)

curl -X POST http://localhost:5000/v1/book \
-H "Authorization: Bearer <ADMIN_TOKEN>" \
-H "Content-Type: application/json" \
-d '{
  "title": "Atomic Habits",
  "author": "James Clear",
  "genre": "Self-Help",
  "description": "An Easy & Proven Way to Build Good Habits",
  "publishedYear": 2018
}'

Get All Books (with Pagination, Search, Sorting)

curl -X GET "http://localhost:5000/v1/book?pageIndex=1&pageSize=5&search=harry&sort[key]=title&sort[order]=asc"

📌 Explanation:

pageIndex=1: Fetch the first page

pageSize=5: Return 5 books per page

search=harry: Search books with "harry" in title, author, or genre

sort[key]=title: Sort by the title

sort[order]=asc: Sort in ascending order


📗 Get Book by ID

curl -X GET http://localhost:5000/v1/book/<BOOK_ID>

🌟 Reviews
➕ Add Review to Book

curl -X POST http://localhost:5000/v1/review/add/<BOOK_ID> \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <JWT_TOKEN>" \
-d '{
  "rating": 5,
  "comment": "Amazing book! Highly recommended."
}'

✏️ Update Your Review

curl -X PUT http://localhost:5000/v1/review/update/<REVIEW_ID> \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <JWT_TOKEN>" \
-d '{
  "rating": 4,
  "comment": "Updated review: Still great, but noticed a few flaws."
}'


❌ Delete Your Review
curl -X DELETE http://localhost:5000/v1/review/delete/<REVIEW_ID> \
-H "Authorization: Bearer <JWT_TOKEN>"

