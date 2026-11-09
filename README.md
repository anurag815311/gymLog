# GymLog — Never Forget Your Last Weight 💪

A simple gym workout tracking application that helps you log exercises, weights, and repetitions so you always know exactly what you lifted in your previous session.

## 🚀 Live Application

| Component | Deployment |
|---|---|
| Frontend | [GymLog – Netlify](https://lucent-unicorn-5c846a.netlify.app/) |
| Backend | [GymLog API – Render](https://gymlog-backend-ysbb.onrender.com) |
| Health Check | [API Health Status](https://gymlog-backend-ysbb.onrender.com/health) |

**Backend Status:** Deployed successfully and health endpoint verified.

---

## 📌 What Is GymLog?

GymLog is a lightweight web application designed to solve a simple but common problem: forgetting the weights and repetitions used during previous gym sessions.

Instead of guessing the weight at the rack, users can record every gym set and refer to their previous records whenever they need them.

The application provides CRUD functionality to create, view, update, and delete workout set records.

## 🎯 Problem Statement

Progressive overload is an important part of strength training. However, remembering the exact weight and repetitions performed during previous workouts can be difficult.

GymLog solves this problem by maintaining a digital record of gym sets, allowing users to:

- Record exercises performed during workouts.
- Store weights in kilograms.
- Track repetitions for each set.
- View previously recorded sets.
- Update incorrect or changed records.
- Delete unwanted entries.

## ✨ Key Features

- **Create:** Add a new gym set with exercise name, weight, and repetitions.
- **Read:** View previously recorded gym sets, with the newest records displayed first.
- **Update:** Modify existing workout records.
- **Delete:** Remove unwanted gym set records.
- **REST API:** Backend provides dedicated endpoints for CRUD operations.
- **SQLite Database:** Stores workout records using SQLite.
- **Responsive Frontend:** Built using standard HTML, CSS, and JavaScript.

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Backend | Node.js |
| Framework | Express.js |
| Database | SQLite |
| Database Driver | sqlite3 |
| Middleware | CORS, dotenv |
| Backend Hosting | Render |
| Frontend Hosting | Netlify |
| Version Control | Git and GitHub |

## 📂 Project Structure

```text
gymlog/
│
├── backend/
│   ├── server.js
│   ├── db.js
│   ├── package.json
│   ├── .env
│   ├── .env.example
│   └── .gitignore
│
├── frontend/
│   └── index.html
│
├── .gitignore
└── README.md
```

### Backend Files

- `server.js` – Express application, middleware configuration, health check, and CRUD API routes.
- `db.js` – SQLite database connection and table initialization.
- `package.json` – Backend dependencies and project configuration.
- `.env` – Local environment variables; excluded from version control.
- `.env.example` – Example environment configuration without secrets.

### Frontend Files

- `index.html` – Contains the complete user interface, styling, and JavaScript logic for communicating with the backend API.

## 🏗️ Application Architecture

GymLog follows a simple client-server architecture.

```text
       User
        |
        v
+-------------------+
|  Frontend         |
|  HTML, CSS, JS    |
|  Netlify          |
+-------------------+
        |
        | HTTP Requests
        | REST API
        v
+-------------------+
|  Backend          |
|  Node.js          |
|  Express.js       |
|  Render           |
+-------------------+
        |
        v
+-------------------+
|  SQLite Database  |
|  Gym Set Records  |
+-------------------+
```

The frontend sends HTTP requests to the Express backend. The backend processes these requests, interacts with the SQLite database, and returns JSON responses to the frontend.

## 🔌 API Documentation

**Base URL:**

```text
https://gymlog-backend-ysbb.onrender.com
```

### Available Endpoints

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Check backend health |
| POST | `/sets` | Create a new gym set |
| GET | `/sets` | Retrieve all gym sets |
| PUT | `/sets/:id` | Update an existing set |
| DELETE | `/sets/:id` | Delete a set |

### 1. Health Check

```http
GET /health
```

Checks whether the backend service is running.

### 2. Create a Gym Set

```http
POST /sets
Content-Type: application/json
```

Example request:

```json
{
  "exercise": "Bench Press",
  "weight": 40,
  "reps": 10
}
```

### 3. Retrieve Gym Sets

```http
GET /sets
```

Retrieves all recorded gym sets, ordered by newest first.

### 4. Update a Gym Set

```http
PUT /sets/:id
Content-Type: application/json
```

Updates an existing gym set using its unique ID.

### 5. Delete a Gym Set

```http
DELETE /sets/:id
```

Deletes the selected gym set.

*Note: The request and response examples describe the API contract. Exact response fields and status codes depend on the implementation in `server.js`.*

## 🗄️ Database Design

GymLog uses SQLite to store gym set records.

The application maintains a `sets` table containing the information associated with each recorded set.

| Field | Description |
|---|---|
| id | Unique identifier for each set |
| exercise | Name of the exercise |
| weight | Weight lifted in kilograms |
| reps | Number of repetitions |

The database is initialized automatically when the backend starts.

## 💻 Running the Project Locally

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- Git

### Step 1: Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/gymlog.git

cd gymlog
```

Replace `YOUR_USERNAME` with your GitHub username.

### Step 2: Install Backend Dependencies

```bash
cd backend

npm install
```

### Step 3: Configure Environment Variables

Create a local `.env` file using the example configuration.

On Windows:

```bash
copy .env.example .env
```

On macOS/Linux:

```bash
cp .env.example .env
```

### Step 4: Start the Backend

```bash
node server.js
```

The backend should start on:

```text
http://localhost:3000
```

Test the health endpoint:

```text
http://localhost:3000/health
```

### Step 5: Run the Frontend

Open `frontend/index.html` in your browser.

During local development, the frontend should communicate with the local backend at:

```text
http://localhost:3000
```

## ☁️ Deployment Guide

GymLog uses separate hosting platforms for the frontend and backend.

### Backend Deployment – Render

1. Push the project to GitHub.
2. Open [Render Dashboard](https://dashboard.render.com/).
3. Select **New → Web Service**.
4. Connect the GymLog GitHub repository.
5. Configure the following settings:

| Setting | Value |
|---|---|
| Runtime | Node |
| Root Directory | `backend` |
| Build Command | `npm install` |
| Start Command | `node server.js` |

6. Deploy the service.
7. Verify the backend using `/health`.

Render automatically provides the production port through `process.env.PORT`.

The application uses `3000` as its local fallback port.

### Frontend Deployment – Netlify

1. Open [Netlify](https://app.netlify.com/).
2. Select manual deployment.
3. Update the backend URL in `frontend/index.html`:

```javascript
const BACKEND_URL =
  "https://gymlog-backend-ysbb.onrender.com";
```

4. Upload the `frontend/` directory.
5. Wait for deployment to finish.
6. Open the live application and verify its connection with the backend.

## 🧪 Testing Checklist

The following operations should be verified on the deployed application:

- [ ] Backend health endpoint returns a successful response.
- [ ] Frontend loads successfully.
- [ ] A new gym set can be created.
- [ ] Existing gym sets can be retrieved.
- [ ] An existing gym set can be updated.
- [ ] A gym set can be deleted.
- [ ] Frontend communicates successfully with the deployed backend.

## 🧠 Design Decisions and Scope

GymLog was intentionally designed as a minimal CRUD application. The primary objective was to solve the problem of remembering previous workout weights without introducing unnecessary complexity.

### Features Intentionally Excluded

**1. User Authentication**

Authentication was excluded because the initial application was designed for individual use. Implementing login would introduce additional complexity involving user management, sessions, and authorization.

**2. Charts and Progress Graphs**

Charts were excluded to keep the application lightweight. The recorded workout history already provides the essential information needed to check previous weights.

**3. Workout Session Grouping**

A separate workout-session model and additional relational queries were not introduced. Each set is stored as an individual record to keep the initial database design simple.

These features can be considered for future iterations.

## 🔐 Security and Configuration

- `.env` is excluded from Git using `.gitignore`.
- `.env.example` provides a safe configuration template.
- `node_modules/` and local SQLite database files are excluded from version control.
- The backend uses Express middleware for JSON request parsing and CORS configuration.

**Deployment limitation:** The application currently uses SQLite on Render's free service. Its filesystem is ephemeral, so database records may be lost after service restarts or redeployments. Persistent database storage is outside the scope of this assessment deployment.

## 🚀 Future Enhancements

- User authentication and individual workout profiles.
- Workout session management.
- Exercise-wise progress tracking.
- Weight progression charts.
- Personal workout history and statistics.
- Export workout records.

## 👨‍💻 Author

**Anurag Kumar Singh**



GitHub: [anurag815311](https://github.com/anurag815311)

---

**GymLog – Never Forget Your Last Weight.** 💪
