import { IRoom, IRoomWithType } from '../models/IRoom';

export interface IRoomRepository {
  findAll(): IRoomWithType[];
  findAvailable(): IRoomWithType[];
  findById(id: number): IRoomWithType | undefined;
  findAvailableBetween(start: string, end: string): IRoomWithType[];
  setAvailability(id: number, available: 0 | 1): void;
}
