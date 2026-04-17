import { IStayRepository } from '../interfaces/IStayRepository';
import { IStay, IStayWithDetails } from '../models/IStay';
import { getDatabase } from '../databases/database';

const SELECT_WITH_DETAILS = `
  SELECT s.*, g.full_name, g.document_number, r.number AS room_number
  FROM Stay s
  JOIN Guest g ON s.guest_id = g.id
  JOIN Room r ON s.room_id = r.id
`;

export class StayRepository implements IStayRepository {
  findAll(): IStayWithDetails[] {
    const db = getDatabase();
    return db
      .prepare(`${SELECT_WITH_DETAILS} ORDER BY s.checkin_at DESC`)
      .all() as IStayWithDetails[];
  }

  findActive(): IStayWithDetails[] {
    const db = getDatabase();
    return db
      .prepare(`${SELECT_WITH_DETAILS} WHERE s.status = 'Activa' ORDER BY s.checkin_at DESC`)
      .all() as IStayWithDetails[];
  }

  findById(id: number): IStay | undefined {
    const db = getDatabase();
    return db.prepare('SELECT * FROM Stay WHERE id = ?').get(id) as IStay | undefined;
  }

  findActiveByGuestDocument(document_number: string): IStayWithDetails | undefined {
    const db = getDatabase();
    return db
      .prepare(
        `${SELECT_WITH_DETAILS}
        WHERE s.status = 'Activa' AND g.document_number = ?`
      )
      .get(document_number) as IStayWithDetails | undefined;
  }

  hasOverlap(room_id: number, start_date: string, end_date: string, excludeId?: number): boolean {
    const db = getDatabase();
    if (excludeId !== undefined) {
      const row = db
        .prepare(
          `SELECT COUNT(*) AS count FROM Stay
           WHERE room_id = ? AND status = 'Activa'
             AND start_date < ? AND end_date > ? AND id != ?`
        )
        .get(room_id, end_date, start_date, excludeId) as { count: number };
      return row.count > 0;
    }
    const row = db
      .prepare(
        `SELECT COUNT(*) AS count FROM Stay
         WHERE room_id = ? AND status = 'Activa'
           AND start_date < ? AND end_date > ?`
      )
      .get(room_id, end_date, start_date) as { count: number };
    return row.count > 0;
  }

  create(data: Omit<IStay, 'id' | 'checkout_at' | 'total'>): IStay {
    const db = getDatabase();
    const stmt = db.prepare(`
      INSERT INTO Stay (guest_id, room_id, start_date, end_date, status, checkin_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      data.guest_id,
      data.room_id,
      data.start_date,
      data.end_date,
      data.status,
      data.checkin_at
    );
    return this.findById(result.lastInsertRowid as number) as IStay;
  }

  checkout(id: number, checkout_at: string, total: number): IStay | undefined {
    const db = getDatabase();
    db.prepare(`
      UPDATE Stay SET status = 'Finalizada', checkout_at = ?, total = ? WHERE id = ?
    `).run(checkout_at, total, id);
    return this.findById(id);
  }
}
