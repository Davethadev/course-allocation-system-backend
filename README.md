# 🎓 Course Allocation System API

A RESTful API built with Node.js, Express, and MongoDB to manage course allocation for university lecturers. The API supports user authentication, role-based access (Admin & Lecturer), and endpoints to assign and manage courses across departments and faculties.

---

## 🚀 Features

- User registration and login
- JWT-based authentication and role-based access control
- Admin functionality to create courses, and allocate lecturers
- Lecturer functionality to view assigned courses
- MongoDB for persistent data storage
- Express middleware for route protection and validation

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB with Mongoose
- **Authentication:** JSON Web Tokens (JWT)
- **Environment Config:** dotenv

---

## 📁 Project Structure

```
├── controllers       # Business logic for routes
├── models            # Mongoose schemas
├── routes            # API endpoints
├── middleware        # Auth, error handling, etc.
├── utils             # Helper functions
├── .env.example      # Environment variable sample
├── server.js         # App entry point
```

---

## 📦 Getting Started Locally

### 1. Clone the Repository

```bash
git clone https://github.com/Davethadev/course-allocation-system-backend.git
cd course-allocation-system-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root and copy from `.env.example`:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 4. Start the Server

```bash
npm run dev
```

API will run at `http://localhost:5000`

---

## 📬 API Endpoints (Overview)

| Method | Endpoint                   | Description                          | Auth Role    |
|--------|----------------------------|--------------------------------------|--------------|
| POST   | `/api/auth/signup`         | Register a user                      | Public       |
| POST   | `/api/auth/login`          | Login and get JWT                    | Public       |
| GET    | `/api/courses`             | Get all courses                      | Authenticated|
| POST   | `/api/courses`             | Create new course                    | Admin Only   |
| POST   | `/api/allocate`            | Allocate course to lecturer          | Admin Only   |
| GET    | `/api/lecturer/courses`    | View allocated courses               | Lecturer Only|

> 🛡️ All protected routes require `Authorization: Bearer <token>`

---

## 🔒 Authentication & Authorization

- On login, users receive a JWT token.
- The token is required in the `Authorization` header to access protected routes.
- Admin and Lecturer roles determine route access and capabilities.

---

## 🧹 Future Improvements

- Department and faculty modules
- Email notifications for allocations
- Swagger/OpenAPI documentation
- Admin dashboard (frontend)
- Role management UI

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 🙋‍♂️ Author

- **David Umanah** – [@Davethadev](https://github.com/Davethadev)
