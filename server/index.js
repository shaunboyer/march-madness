const express = require('express');
const cors    = require('cors');
const path    = require('path');
const db      = require('./db');

const app  = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Serve built React app in production
app.use(express.static(path.join(__dirname, '../client/dist')));

// ── GET all counters ──────────────────────────────────────────────
app.get('/api/counters', (req, res) => {
  const rows = db.prepare('SELECT name, value FROM counters').all();
  const result = {};
  rows.forEach((r) => (result[r.name] = r.value));
  res.json(result);
});

// ── POST increment ────────────────────────────────────────────────
app.post('/api/counters/:name/increment', (req, res) => {
  const { name } = req.params;
  if (!['rocket', 'whiskey'].includes(name)) return res.status(400).json({ error: 'Unknown counter' });
  db.prepare('UPDATE counters SET value = value + 1 WHERE name = ?').run(name);
  const row = db.prepare('SELECT value FROM counters WHERE name = ?').get(name);
  res.json({ value: row.value });
});

// ── POST decrement (floor 0) ──────────────────────────────────────
app.post('/api/counters/:name/decrement', (req, res) => {
  const { name } = req.params;
  if (!['rocket', 'whiskey'].includes(name)) return res.status(400).json({ error: 'Unknown counter' });
  db.prepare('UPDATE counters SET value = MAX(0, value - 1) WHERE name = ?').run(name);
  const row = db.prepare('SELECT value FROM counters WHERE name = ?').get(name);
  res.json({ value: row.value });
});

// ── POST reset ────────────────────────────────────────────────────
app.post('/api/counters/:name/reset', (req, res) => {
  const { name } = req.params;
  if (!['rocket', 'whiskey'].includes(name)) return res.status(400).json({ error: 'Unknown counter' });
  db.prepare('UPDATE counters SET value = 0 WHERE name = ?').run(name);
  res.json({ value: 0 });
});

// Catch-all → React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
