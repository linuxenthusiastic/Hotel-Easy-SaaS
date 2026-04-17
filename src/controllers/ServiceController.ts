import { Request, Response } from 'express';
import { ServiceService } from '../services/ServiceService';

export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  getAll = (req: Request, res: Response): void => {
    try {
      res.json(this.serviceService.getAll());
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  };
}
