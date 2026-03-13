const Database = require('better-sqlite3');
const path = require('path');

// Store the DB next to this file — always writable on Render and locally
const dbPath = path.join(__dirname, 'data.db');

const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS counters (
    name  TEXT PRIMARY KEY,
    value INTEGER NOT NULL DEFAULT 0
  )
`);

// Seed rows so they always exist
const init = db.prepare('INSERT OR IGNORE INTO counters (name, value) VALUES (?, 0)');
init.run('rocket');
init.run('whiskey');

module.exports = db;
