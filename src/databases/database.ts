import Database from 'better-sqlite3';
import path from 'path';

let instance: Database.Database | null = null;

export function getDatabase(): Database.Database {
  if (!instance) {
    const dbPath = path.join(__dirname, '..', '..', 'hotel.db');
    instance = new Database(dbPath);
    instance.pragma('journal_mode = WAL');
    instance.pragma('foreign_keys = ON');
  }
  return instance;
}
