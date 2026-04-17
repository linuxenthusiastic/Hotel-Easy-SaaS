import { IGuestRepository } from '../interfaces/IGuestRepository';
import { IGuest } from '../models/IGuest';

export class GuestService {
  constructor(private readonly guestRepository: IGuestRepository) {}

  getAll(): IGuest[] {
    return this.guestRepository.findAll();
  }

  getByDocument(document_number: string): IGuest {
    const guest = this.guestRepository.findByDocument(document_number);
    if (!guest) throw new Error(`Guest with document ${document_number} not found`);
    return guest;
  }

  create(data: Omit<IGuest, 'id' | 'created_at'>): IGuest {
    if (!data.full_name || !data.document_number || !data.email || !data.phone) {
      throw new Error('full_name, document_number, email and phone are required');
    }
    const existing = this.guestRepository.findByDocument(data.document_number);
    if (existing) throw new Error(`Guest with document ${data.document_number} already exists`);
    return this.guestRepository.create(data);
  }
}
