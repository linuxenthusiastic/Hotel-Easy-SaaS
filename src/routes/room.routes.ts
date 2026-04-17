import { Router } from 'express';
import { RoomController } from '../controllers/RoomController';

export function createRoomRouter(controller: RoomController): Router {
  const router = Router();
  router.get('/', controller.getAll);
  router.get('/available', controller.getAvailable);
  router.get('/available-between', controller.getAvailableBetween);
  return router;
}
