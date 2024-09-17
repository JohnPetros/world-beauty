import type { Customer } from '../../domain/entities/customer'

export interface ICustomersRepository {
  findAll(): Promise<Customer[]>
  findAllPaginated(page: number): Promise<Customer[]>
  removeAll(): Promise<void>
  count(): Promise<number>
  add(customer: Customer): Promise<void>
}