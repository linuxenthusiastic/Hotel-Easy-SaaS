import { IRoomRepository } from '../interfaces/IRoomRepository';
import { IRoomWithType } from '../models/IRoom';
import { getDatabase } from '../databases/database';

const SELECT_WITH_TYPE = `
  SELECT r.*, tr.name AS type_name, tr.price_per_night, tr.capacity
  FROM Room r
  JOIN TypeRoom tr ON r.type_room_id = tr.id
`;

export class RoomRepository implements IRoomRepository {
  findAll(): IRoomWithType[] {
    const db = getDatabase();
    return db.prepare(`${SELECT_WITH_TYPE} ORDER BY r.number`).all() as IRoomWithType[];
  }

  findAvailable(): IRoomWithType[] {
    const db = getDatabase();
    return db
      .prepare(`${SELECT_WITH_TYPE} WHERE r.available = 1 ORDER BY r.number`)
      .all() as IRoomWithType[];
  }

  findById(id: number): IRoomWithType | undefined {
    const db = getDatabase();
    return db
      .prepare(`${SELECT_WITH_TYPE} WHERE r.id = ?`)
      .get(id) as IRoomWithType | undefined;
  }

  findAvailableBetween(start: string, end: string): IRoomWithType[] {
    const db = getDatabase();
    return db
      .prepare(
        `${SELECT_WITH_TYPE}
        WHERE r.id NOT IN (
          SELECT room_id FROM Stay
          WHERE status = 'Activa'
            AND start_date < ?
            AND end_date > ?
        )
        ORDER BY r.number`
      )
      .all(end, start) as IRoomWithType[];
  }

  setAvailability(id: number, available: 0 | 1): void {
    const db = getDatabase();
    db.prepare('UPDATE Room SET available = ? WHERE id = ?').run(available, id);
  }
}
