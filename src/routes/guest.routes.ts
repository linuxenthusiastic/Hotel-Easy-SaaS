import { Router } from 'express';
import { GuestController } from '../controllers/GuestController';

export function createGuestRouter(controller: GuestController): Router {
  const router = Router();
  router.get('/', controller.getAll);
  router.get('/document/:doc', controller.getByDocument);
  router.post('/', controller.create);
  return router;
}
