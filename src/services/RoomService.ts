import { IRoomRepository } from '../interfaces/IRoomRepository';
import { IRoomWithType } from '../models/IRoom';

export class RoomService {
  constructor(private readonly roomRepository: IRoomRepository) {}

  getAll(): IRoomWithType[] {
    return this.roomRepository.findAll();
  }

  getAvailable(): IRoomWithType[] {
    return this.roomRepository.findAvailable();
  }

  getAvailableBetween(start: string, end: string): IRoomWithType[] {
    if (!start || !end) throw new Error('start and end query params are required');
    if (new Date(end) <= new Date(start)) throw new Error('end must be after start');
    return this.roomRepository.findAvailableBetween(start, end);
  }
}
