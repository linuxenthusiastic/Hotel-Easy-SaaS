import { IServiceRepository } from '../interfaces/IServiceRepository';
import { IService } from '../models/IService';
import { getDatabase } from '../databases/database';

export class ServiceRepository implements IServiceRepository {
  findAll(): IService[] {
    const db = getDatabase();
    return db.prepare('SELECT * FROM Service ORDER BY name').all() as IService[];
  }

  findById(id: number): IService | undefined {
    const db = getDatabase();
    return db.prepare('SELECT * FROM Service WHERE id = ?').get(id) as IService | undefined;
  }
}
