import { IService } from '../models/IService';

export interface IServiceRepository {
  findAll(): IService[];
  findById(id: number): IService | undefined;
}
