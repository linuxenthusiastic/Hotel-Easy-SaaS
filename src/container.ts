import { GuestRepository } from './repositories/GuestRepository';
import { RoomRepository } from './repositories/RoomRepository';
import { StayRepository } from './repositories/StayRepository';
import { ServiceRepository } from './repositories/ServiceRepository';

import { GuestService } from './services/GuestService';
import { RoomService } from './services/RoomService';
import { StayService } from './services/StayService';
import { ServiceService } from './services/ServiceService';

import { GuestController } from './controllers/GuestController';
import { RoomController } from './controllers/RoomController';
import { StayController } from './controllers/StayController';
import { ServiceController } from './controllers/ServiceController';

const guestRepository = new GuestRepository();
const roomRepository = new RoomRepository();
const stayRepository = new StayRepository();
const serviceRepository = new ServiceRepository();

const guestService = new GuestService(guestRepository);
const roomService = new RoomService(roomRepository);
const stayService = new StayService(stayRepository, guestRepository, roomRepository);
const serviceService = new ServiceService(serviceRepository);

export const guestController = new GuestController(guestService);
export const roomController = new RoomController(roomService);
export const stayController = new StayController(stayService);
export const serviceController = new ServiceController(serviceService);
