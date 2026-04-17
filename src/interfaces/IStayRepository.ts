import { IStay, IStayWithDetails } from '../models/IStay';

export interface IStayRepository {
  findAll(): IStayWithDetails[];
  findActive(): IStayWithDetails[];
  findById(id: number): IStay | undefined;
  findActiveByGuestDocument(document_number: string): IStayWithDetails | undefined;
  hasOverlap(room_id: number, start_date: string, end_date: string, excludeId?: number): boolean;
  create(data: Omit<IStay, 'id' | 'checkout_at' | 'total'>): IStay;
  checkout(id: number, checkout_at: string, total: number): IStay | undefined;
}
