import type { Customer } from '../../domain/entities/customer'

export interface ICustomersRepository {
  findById(customerId: string): Promise<Customer | null>
  findByCpf(customerCpf: string): Promise<Customer | null>
  findByRg(customerRg: string): Promise<Customer | null>
  findByPhone(customerPhone: string): Promise<Customer | null>
  findAll(): Promise<Customer[]>
  findAllMale(): Promise<Customer[]>
  findAllFemale(): Promise<Customer[]>
  findManyMale(page: number): Promise<{ customers: Customer[]; count: number }>
  findManyFemale(page: number): Promise<{ customers: Customer[]; count: number }>
  findMany(page: number): Promise<{ customers: Customer[]; count: number }>
  findTop10CustomersByMostConsumption(): Promise<Customer[]>
  findTop10CustomersByLessConsumption(): Promise<Customer[]>
  findTop5CustomersByMostSpending(): Promise<Customer[]>
  removeAll(): Promise<void>
  removeMany(customerIds: string[]): Promise<void>
  add(customer: Customer): Promise<void>
  update(customer: Customer): Promise<void>
  addMany(customers: Customer[]): Promise<void>
}