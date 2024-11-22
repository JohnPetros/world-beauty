import type { CustomerDto } from '../../dtos'
import type { ICustomersRepository } from '../../interfaces/repositories'

export class UpdateCustomerUseCase {
  constructor(private readonly customersRepository: ICustomersRepository) {}

  async execute(customerDto: CustomerDto, customerId: string) {
    const customer = await this.customersRepository.findById(customerId)
    if (!customer) throw new Error('Cliente não encontrado')
    const updatedCustomer = customer.update(customerDto)
    await this.customersRepository.update(updatedCustomer)
  }
}
