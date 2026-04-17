import { getDatabase } from './database';

export function initializeSchema(): void {
  const db = getDatabase();

  db.exec(`
    CREATE TABLE IF NOT EXISTS Hotel (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      address TEXT NOT NULL,
      phone TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS TypeRoom (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price_per_night REAL NOT NULL,
      capacity INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS Guest (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      document_number TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS Room (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      hotel_id INTEGER NOT NULL,
      type_room_id INTEGER NOT NULL,
      number TEXT NOT NULL,
      available INTEGER NOT NULL DEFAULT 1,
      FOREIGN KEY (hotel_id) REFERENCES Hotel(id),
      FOREIGN KEY (type_room_id) REFERENCES TypeRoom(id)
    );

    CREATE TABLE IF NOT EXISTS Stay (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      guest_id INTEGER NOT NULL,
      room_id INTEGER NOT NULL,
      start_date TEXT NOT NULL,
      end_date TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'Activa',
      checkin_at TEXT NOT NULL DEFAULT (datetime('now')),
      checkout_at TEXT,
      total REAL,
      FOREIGN KEY (guest_id) REFERENCES Guest(id),
      FOREIGN KEY (room_id) REFERENCES Room(id)
    );

    CREATE TABLE IF NOT EXISTS Service (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      hotel_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      FOREIGN KEY (hotel_id) REFERENCES Hotel(id)
    );
  `);

  // Seeds
  const insertHotel = db.prepare(
    'INSERT OR IGNORE INTO Hotel (id, name, address, phone) VALUES (1, ?, ?, ?)'
  );
  insertHotel.run('Hotel Central', 'Av. Principal 123', '591-70000000');

  const insertTypeRoom = db.prepare(
    'INSERT OR IGNORE INTO TypeRoom (id, name, price_per_night, capacity) VALUES (?, ?, ?, ?)'
  );
  insertTypeRoom.run(1, 'Simple', 50, 1);
  insertTypeRoom.run(2, 'Doble', 80, 2);
  insertTypeRoom.run(3, 'Suite', 150, 4);

  const insertRoom = db.prepare(
    'INSERT OR IGNORE INTO Room (id, hotel_id, type_room_id, number, available) VALUES (?, 1, ?, ?, 1)'
  );
  insertRoom.run(1, 1, '101');
  insertRoom.run(2, 1, '102');
  insertRoom.run(3, 2, '201');
  insertRoom.run(4, 2, '202');
  insertRoom.run(5, 3, '301');

  const insertService = db.prepare(
    'INSERT OR IGNORE INTO Service (id, hotel_id, name, price) VALUES (?, 1, ?, ?)'
  );
  insertService.run(1, 'Desayuno', 10);
  insertService.run(2, 'Almuerzo', 15);
  insertService.run(3, 'Cena', 20);
  insertService.run(4, 'Lavandería', 12);
}
