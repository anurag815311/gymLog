const sqlite3 = require('sqlite3').verbose();
const path    = require('path');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'gymsets.db');

// Open (or create) the database file
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Failed to open database:', err.message);
    process.exit(1);
  }
  console.log(`📦 SQLite database connected: ${DB_PATH}`);
});

// Enable WAL mode and create table
db.serialize(() => {
  db.run('PRAGMA journal_mode = WAL');
  db.run(`
    CREATE TABLE IF NOT EXISTS sets (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      exercise   TEXT    NOT NULL,
      weight_kg  REAL    NOT NULL,
      reps       INTEGER NOT NULL,
      notes      TEXT    DEFAULT '',
      logged_at  TEXT    NOT NULL DEFAULT (datetime('now'))
    )
  `, (err) => {
    if (err) console.error('Table creation error:', err.message);
    else console.log('✅ "sets" table ready.');
  });
});

module.exports = db;
