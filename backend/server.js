require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const db      = require('./db');

const app  = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── DB helpers (promise wrappers over callback-based sqlite3) ────────────────
const dbAll = (sql, params = []) =>
  new Promise((resolve, reject) =>
    db.all(sql, params, (err, rows) => err ? reject(err) : resolve(rows))
  );

const dbGet = (sql, params = []) =>
  new Promise((resolve, reject) =>
    db.get(sql, params, (err, row) => err ? reject(err) : resolve(row))
  );

const dbRun = (sql, params = []) =>
  new Promise((resolve, reject) =>
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve({ lastID: this.lastID, changes: this.changes });
    })
  );

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// ─── CREATE — POST /sets ──────────────────────────────────────────────────────
// Receives: { exercise, weight_kg, reps, notes }
// Returns:  the newly created set record
app.post('/sets', async (req, res) => {
  const { exercise, weight_kg, reps, notes = '' } = req.body;

  if (!exercise || exercise.trim() === '')
    return res.status(400).json({ error: 'Exercise name is required.' });
  if (weight_kg === undefined || isNaN(Number(weight_kg)) || Number(weight_kg) < 0)
    return res.status(400).json({ error: 'Valid weight (kg) is required.' });
  if (!reps || isNaN(Number(reps)) || Number(reps) < 1)
    return res.status(400).json({ error: 'Reps must be a positive number.' });

  try {
    const result = await dbRun(
      `INSERT INTO sets (exercise, weight_kg, reps, notes, logged_at)
       VALUES (?, ?, ?, ?, datetime('now'))`,
      [exercise.trim(), Number(weight_kg), Number(reps), notes.trim()]
    );
    const newSet = await dbGet('SELECT * FROM sets WHERE id = ?', [result.lastID]);
    res.status(201).json(newSet);
  } catch (err) {
    console.error('POST /sets error:', err);
    res.status(500).json({ error: 'Failed to log set.' });
  }
});

// ─── READ — GET /sets ─────────────────────────────────────────────────────────
// Returns: all sets ordered by most recent first
app.get('/sets', async (req, res) => {
  try {
    const sets = await dbAll('SELECT * FROM sets ORDER BY logged_at DESC, id DESC');
    res.json(sets);
  } catch (err) {
    console.error('GET /sets error:', err);
    res.status(500).json({ error: 'Failed to fetch sets.' });
  }
});

// ─── UPDATE — PUT /sets/:id ───────────────────────────────────────────────────
// Receives: { exercise, weight_kg, reps, notes }
// Returns:  the updated set record
app.put('/sets/:id', async (req, res) => {
  const { id } = req.params;
  const { exercise, weight_kg, reps, notes = '' } = req.body;

  if (!exercise || exercise.trim() === '')
    return res.status(400).json({ error: 'Exercise name is required.' });
  if (weight_kg === undefined || isNaN(Number(weight_kg)) || Number(weight_kg) < 0)
    return res.status(400).json({ error: 'Valid weight (kg) is required.' });
  if (!reps || isNaN(Number(reps)) || Number(reps) < 1)
    return res.status(400).json({ error: 'Reps must be a positive number.' });

  try {
    const existing = await dbGet('SELECT id FROM sets WHERE id = ?', [id]);
    if (!existing)
      return res.status(404).json({ error: `Set with id ${id} not found.` });

    await dbRun(
      `UPDATE sets SET exercise = ?, weight_kg = ?, reps = ?, notes = ? WHERE id = ?`,
      [exercise.trim(), Number(weight_kg), Number(reps), notes.trim(), id]
    );
    const updated = await dbGet('SELECT * FROM sets WHERE id = ?', [id]);
    res.json(updated);
  } catch (err) {
    console.error('PUT /sets/:id error:', err);
    res.status(500).json({ error: 'Failed to update set.' });
  }
});

// ─── DELETE — DELETE /sets/:id ────────────────────────────────────────────────
// Returns: { message: 'Deleted successfully', id }
app.delete('/sets/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const existing = await dbGet('SELECT id FROM sets WHERE id = ?', [id]);
    if (!existing)
      return res.status(404).json({ error: `Set with id ${id} not found.` });

    await dbRun('DELETE FROM sets WHERE id = ?', [id]);
    res.json({ message: 'Set deleted successfully.', id: Number(id) });
  } catch (err) {
    console.error('DELETE /sets/:id error:', err);
    res.status(500).json({ error: 'Failed to delete set.' });
  }
});

// ─── 404 Catch-all ────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🏋️  Gym Set Tracker API running on http://localhost:${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/health`);
});
