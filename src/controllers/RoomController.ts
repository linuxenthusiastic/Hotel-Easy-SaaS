import { Request, Response } from 'express';
import { RoomService } from '../services/RoomService';

export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  getAll = (req: Request, res: Response): void => {
    try {
      res.json(this.roomService.getAll());
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  };

  getAvailable = (req: Request, res: Response): void => {
    try {
      res.json(this.roomService.getAvailable());
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  };

  getAvailableBetween = (req: Request, res: Response): void => {
    try {
      const { start, end } = req.query as { start: string; end: string };
      res.json(this.roomService.getAvailableBetween(start, end));
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  };
}
