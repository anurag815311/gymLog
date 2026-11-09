# GymLog — Git Setup & Deployment Checklist
# Run these commands from the DPE/ folder

# ── 1. Initialize git ───────────────────────
git init
git add .
git commit -m "feat: GymLog — log and track gym sets so you never forget your last weight"

# ── 2. Create GitHub repo (do this on github.com first, then:) ─
git remote add origin https://github.com/YOUR_USERNAME/gymlog.git
git branch -M main
git push -u origin main

# ── 3. Create the PR branch ─────────────────
git checkout -b crud-ship
git push origin crud-ship

# ── 4. After Render deploy, update frontend/index.html ──
# Change line:
#   'https://your-app.onrender.com'
# To your actual Render URL, then:
git add frontend/index.html
git commit -m "chore: update backend URL to Render deployment"
git push origin crud-ship

# ── 5. Open PR on GitHub ─────────────────────
# Title: feat: GymLog — log and track gym sets so you never forget your last weight
# Body:
#   The problem: I kept forgetting what weight I lifted last session.
#   Frontend: https://your-site.netlify.app
#   Backend:  https://your-app.onrender.com
#   .env is NOT committed (see .gitignore)
