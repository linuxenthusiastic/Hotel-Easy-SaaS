import { IGuestRepository } from '../interfaces/IGuestRepository';
import { IGuest } from '../models/IGuest';
import { getDatabase } from '../databases/database';

export class GuestRepository implements IGuestRepository {
  findAll(): IGuest[] {
    const db = getDatabase();
    return db.prepare('SELECT * FROM Guest ORDER BY created_at DESC').all() as IGuest[];
  }

  findById(id: number): IGuest | undefined {
    const db = getDatabase();
    return db.prepare('SELECT * FROM Guest WHERE id = ?').get(id) as IGuest | undefined;
  }

  findByDocument(document_number: string): IGuest | undefined {
    const db = getDatabase();
    return db
      .prepare('SELECT * FROM Guest WHERE document_number = ?')
      .get(document_number) as IGuest | undefined;
  }

  create(data: Omit<IGuest, 'id' | 'created_at'>): IGuest {
    const db = getDatabase();
    const stmt = db.prepare(
      'INSERT INTO Guest (full_name, document_number, email, phone) VALUES (?, ?, ?, ?)'
    );
    const result = stmt.run(data.full_name, data.document_number, data.email, data.phone);
    return this.findById(result.lastInsertRowid as number) as IGuest;
  }
}
