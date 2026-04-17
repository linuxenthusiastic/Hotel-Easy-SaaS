import { Request, Response } from 'express';
import { GuestService } from '../services/GuestService';

export class GuestController {
  constructor(private readonly guestService: GuestService) {}

  getAll = (req: Request, res: Response): void => {
    try {
      const guests = this.guestService.getAll();
      res.json(guests);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  };

  getByDocument = (req: Request, res: Response): void => {
    try {
      const guest = this.guestService.getByDocument(req.params.doc);
      res.json(guest);
    } catch (err) {
      res.status(404).json({ error: (err as Error).message });
    }
  };

  create = (req: Request, res: Response): void => {
    try {
      const guest = this.guestService.create(req.body);
      res.status(201).json(guest);
    } catch (err) {
      const message = (err as Error).message;
      const status = message.includes('already exists') ? 400 : 400;
      res.status(status).json({ error: message });
    }
  };
}
