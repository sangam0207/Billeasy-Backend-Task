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
git clone https://github.com/yourusername/book-review-api.git
cd book-review-api
