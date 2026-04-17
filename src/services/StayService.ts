import { IStayRepository } from '../interfaces/IStayRepository';
import { IGuestRepository } from '../interfaces/IGuestRepository';
import { IRoomRepository } from '../interfaces/IRoomRepository';
import { IStay, IStayWithDetails } from '../models/IStay';

export class StayService {
  constructor(
    private readonly stayRepository: IStayRepository,
    private readonly guestRepository: IGuestRepository,
    private readonly roomRepository: IRoomRepository
  ) {}

  getAll(): IStayWithDetails[] {
    return this.stayRepository.findAll();
  }

  getActive(): IStayWithDetails[] {
    return this.stayRepository.findActive();
  }

  getActiveByGuestDocument(document_number: string): IStayWithDetails {
    const stay = this.stayRepository.findActiveByGuestDocument(document_number);
    if (!stay) throw new Error(`No active stay found for document ${document_number}`);
    return stay;
  }

  create(data: {
    document_number: string;
    room_id: number;
    start_date: string;
    end_date: string;
  }): IStay {
    if (!data.document_number || !data.room_id || !data.start_date || !data.end_date) {
      throw new Error('document_number, room_id, start_date and end_date are required');
    }

    if (new Date(data.end_date) <= new Date(data.start_date)) {
      throw new Error('end_date must be after start_date');
    }

    const guest = this.guestRepository.findByDocument(data.document_number);
    if (!guest) throw new Error(`Guest with document ${data.document_number} not found`);

    const room = this.roomRepository.findById(data.room_id);
    if (!room) throw new Error(`Room ${data.room_id} not found`);

    const overlap = this.stayRepository.hasOverlap(data.room_id, data.start_date, data.end_date);
    if (overlap) {
      throw new Error(`Room ${room.number} is not available for the requested dates`);
    }

    const stay = this.stayRepository.create({
      guest_id: guest.id,
      room_id: data.room_id,
      start_date: data.start_date,
      end_date: data.end_date,
      status: 'Activa',
      checkin_at: new Date().toISOString(),
    });

    this.roomRepository.setAvailability(data.room_id, 0);

    return stay;
  }

  checkout(id: number, checkoutAtParam?: string): IStay {
    const stay = this.stayRepository.findById(id);
    if (!stay) throw new Error(`Stay ${id} not found`);
    if (stay.status === 'Finalizada') throw new Error('Stay is already checked out');

    const checkout_at = checkoutAtParam ?? new Date().toISOString();

    const checkinMs = new Date(stay.checkin_at).getTime();
    const checkoutMs = new Date(checkout_at).getTime();
    const hours = (checkoutMs - checkinMs) / (1000 * 60 * 60);
    const days = Math.ceil(hours / 24);

    const room = this.roomRepository.findById(stay.room_id);
    if (!room) throw new Error(`Room ${stay.room_id} not found`);

    const total = days * room.price_per_night;

    const updated = this.stayRepository.checkout(id, checkout_at, total);
    if (!updated) throw new Error('Failed to update stay');

    this.roomRepository.setAvailability(stay.room_id, 1);

    return updated;
  }
}
