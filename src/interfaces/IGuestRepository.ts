import { IGuest } from '../models/IGuest';

export interface IGuestRepository {
  findAll(): IGuest[];
  findById(id: number): IGuest | undefined;
  findByDocument(document_number: string): IGuest | undefined;
  create(data: Omit<IGuest, 'id' | 'created_at'>): IGuest;
}
