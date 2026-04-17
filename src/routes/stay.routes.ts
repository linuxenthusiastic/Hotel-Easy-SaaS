import { Router } from 'express';
import { StayController } from '../controllers/StayController';

export function createStayRouter(controller: StayController): Router {
  const router = Router();
  router.get('/', controller.getAll);
  router.get('/active', controller.getActive);
  router.get('/guest/:doc', controller.getActiveByGuestDocument);
  router.post('/', controller.create);
  router.patch('/:id/checkout', controller.checkout);
  return router;
}
