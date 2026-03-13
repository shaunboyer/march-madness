const Database = require('better-sqlite3');
const path = require('path');
const fs   = require('fs');

// On Render with persistent disk, use /var/data; otherwise use local file
const dbPath =
  process.env.NODE_ENV === 'production'
    ? '/var/data/march-madness.db'
    : path.join(__dirname, 'data.db');

// Ensure the directory exists (important on Render before the disk is mounted)
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

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
