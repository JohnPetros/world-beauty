import type { ICustomersRepository } from '../../interfaces/repositories'

export class DeleteCustomersUseCase {
  constructor(private readonly customersRepository: ICustomersRepository) {}

  async execute(customersIds: string[]) {
    for (const customerId of customersIds) {
      const customer = await this.customersRepository.findById(customerId)
      if (!customer) throw new Error('Customer not found')
    }

    await this.customersRepository.removeMany(customersIds)
  }
}
