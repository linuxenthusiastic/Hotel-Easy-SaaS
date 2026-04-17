import { Router } from 'express';
import { ServiceController } from '../controllers/ServiceController';

export function createServiceRouter(controller: ServiceController): Router {
  const router = Router();
  router.get('/', controller.getAll);
  return router;
}
