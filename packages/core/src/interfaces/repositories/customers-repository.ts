import type { Customer } from '../../domain/entities/customer'

export interface ICustomersRepository {
  findAll(): Promise<Customer[]>
  removeAll(): Promise<void>
  add(customer: Customer): Promise<void>
}
