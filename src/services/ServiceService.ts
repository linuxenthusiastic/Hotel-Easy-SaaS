import { IServiceRepository } from '../interfaces/IServiceRepository';
import { IService } from '../models/IService';

export class ServiceService {
  constructor(private readonly serviceRepository: IServiceRepository) {}

  getAll(): IService[] {
    return this.serviceRepository.findAll();
  }
}
