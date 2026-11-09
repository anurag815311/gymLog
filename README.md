# GymLog — Never Forget Your Last Weight

## What It Is

A web app to log and track your gym sets — exercises, weights in kg, and reps — so you always know exactly where you left off.

## The Problem It Solves

I kept forgetting what weight I lifted last session and always had to guess at the rack, which wasted time and broke my progressive overload. This app records every set so I always know my exact starting weight for every exercise the moment I walk into the gym.

## What I Intentionally Excluded

- **User Authentication**: Adding login would require session management or JWT tokens, significantly increasing complexity for an MVP that only one person needs to use. All data is accessible without login by design.
- **Charts / Progress Graphs**: Visualising weight progression over time would require a charting library and more complex queries. The raw log already answers the core question ("what did I lift last time?") — graphs are a future enhancement.
- **Sets per Workout Grouping**: Grouping sets by session/date would need a separate `workouts` table and relational queries, adding complexity without solving the immediate problem.

## Project Structure

```
gymlog/
├── backend/
│   ├── server.js        ← Express app: 4 CRUD routes + /health
│   ├── db.js            ← SQLite database setup & table creation
│   ├── package.json     ← Dependencies (express, cors, dotenv, sqlite3)
│   ├── .env             ← Local env vars — NOT committed
│   ├── .env.example     ← Safe template to commit
│   └── .gitignore       ← Excludes node_modules/, .env, *.db
└── frontend/
    └── index.html       ← Single-page app (Vanilla JS + CSS, no frameworks)
```

## Tech Stack

- **Backend**: Node.js + Express + SQLite (via `sqlite3`)
- **Frontend**: Vanilla JS + CSS (no frameworks)
- **Deployed**: Render (backend) + Netlify (frontend)

## Live Deployment

**Frontend:** `https://your-site.netlify.app` ← _Replace after Netlify deploy_  
**Backend:** `https://your-app.onrender.com` ← _Replace after Render deploy_

## API Endpoints

| Method | Route        | Description                    |
|--------|--------------|--------------------------------|
| GET    | `/health`    | Health check — returns `{status: "ok"}` |
| POST   | `/sets`      | Log a new gym set              |
| GET    | `/sets`      | Fetch all sets (newest first)  |
| PUT    | `/sets/:id`  | Update a set by ID             |
| DELETE | `/sets/:id`  | Delete a set by ID             |

## Running Locally

```bash
# 1. Clone the repo
git clone https://github.com/your-username/gymlog.git
cd gymlog

# 2. Install backend dependencies
cd backend
npm install

# 3. Create your .env (copy the example)
cp .env.example .env

# 4. Start the backend
node server.js
# → Running at http://localhost:3000
# → Health check: http://localhost:3000/health

# 5. Open the frontend
# Just open frontend/index.html in your browser
# (the frontend auto-detects localhost and uses http://localhost:3000)
```

## Deployment Guide

### Backend → Render
1. Push repo to GitHub (confirm `.env` is in `.gitignore`)
2. Go to [render.com](https://render.com) → **New Web Service**
3. Connect your GitHub repo
4. Set:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Environment Variable**: `PORT=3000`
5. Deploy → wait 2–4 min → test `/health`

### Frontend → Netlify
1. Go to [netlify.com](https://netlify.com) → **Add new site → Deploy manually**
2. Drag the `frontend/` folder into the drop zone
3. **Before deploying**, update `BACKEND_URL` in `frontend/index.html`:
   ```js
   const BACKEND_URL = 'https://your-app.onrender.com';
   ```

## Security Note

`.env` is listed in `.gitignore` and was **not committed** to this repository.  
Confirm: `git status` should not show `.env` in tracked files.
