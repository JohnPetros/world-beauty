import type { Service } from '../../domain/entities'

export interface IServicesRepository {
  findAll(): Promise<Service[]>
  findAllPaginated(page: number): Promise<Service[]>
  removeAll(): Promise<void>
  count(): Promise<number>
  add(customer: Service): Promise<void>
}
