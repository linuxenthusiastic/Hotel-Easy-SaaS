import express from 'express';
import cors from 'cors';
import { initializeSchema } from './databases/schema';
import { createGuestRouter } from './routes/guest.routes';
import { createRoomRouter } from './routes/room.routes';
import { createStayRouter } from './routes/stay.routes';
import { createServiceRouter } from './routes/service.routes';
import { guestController, roomController, stayController, serviceController } from './container';

initializeSchema();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/guests', createGuestRouter(guestController));
app.use('/api/rooms', createRoomRouter(roomController));
app.use('/api/stays', createStayRouter(stayController));
app.use('/api/services', createServiceRouter(serviceController));

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT ?? 4000;
app.listen(PORT, () => {
  console.log(`Hotel API running on port ${PORT}`);
});
