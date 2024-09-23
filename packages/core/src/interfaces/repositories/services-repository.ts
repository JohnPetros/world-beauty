import type { Service } from '../../domain/entities'

export interface IServicesRepository {
  findAll(): Promise<Service[]>
  findAllPaginated(page: number): Promise<Service[]>
  removeAll(): Promise<void>
  removeMany(servicesIds: string[]): Promise<void>
  count(): Promise<number>
  update(service: Service): Promise<void>
  add(customer: Service): Promise<void>
}
