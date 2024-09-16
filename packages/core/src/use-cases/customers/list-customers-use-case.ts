import type { ICustomersRepository } from '../../interfaces/repositories'

export class ListCustomersUseCase {
  constructor(private readonly customersRepository: ICustomersRepository) {}

  async execute() {
    return await this.customersRepository.findAll()
  }
}
