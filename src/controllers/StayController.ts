import { Request, Response } from 'express';
import { StayService } from '../services/StayService';

export class StayController {
  constructor(private readonly stayService: StayService) {}

  getAll = (req: Request, res: Response): void => {
    try {
      res.json(this.stayService.getAll());
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  };

  getActive = (req: Request, res: Response): void => {
    try {
      res.json(this.stayService.getActive());
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  };

  getActiveByGuestDocument = (req: Request, res: Response): void => {
    try {
      res.json(this.stayService.getActiveByGuestDocument(req.params.doc));
    } catch (err) {
      res.status(404).json({ error: (err as Error).message });
    }
  };

  create = (req: Request, res: Response): void => {
    try {
      const stay = this.stayService.create(req.body);
      res.status(201).json(stay);
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  };

  checkout = (req: Request, res: Response): void => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid stay id' });
        return;
      }
      const { checkout_at } = req.body as { checkout_at?: string };
      res.json(this.stayService.checkout(id, checkout_at));
    } catch (err) {
      const message = (err as Error).message;
      const status = message.includes('not found') ? 404 : 400;
      res.status(status).json({ error: message });
    }
  };
}
