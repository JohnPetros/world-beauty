import { Customer } from '../../domain/entities'
import type { CustomerDto } from '../../dtos'
import type { ICustomersRepository } from '../../interfaces/repositories'

export class RegisterCustomerUseCase {
  constructor(private readonly customersRepository: ICustomersRepository) {}

  async execute(customerDto: CustomerDto) {
    const customer = Customer.create(customerDto)

    if (customer.cpf) {
      const customer = await this.customersRepository.findByCpf(customerDto.cpf.value)
      if (customer) throw new Error(`CPF ${customer.cpf.value} já em uso`)
    }

    for (const rg of customer.rgs) {
      const customer = await this.customersRepository.findByRg(rg.value)
      if (customer) throw new Error(`RG ${rg.value} já em uso`)
    }

    for (const phone of customer.phones) {
      const customer = await this.customersRepository.findByPhone(phone.number)
      if (customer) throw new Error(`Telefone ${phone.number} já em uso`)
    }

    await this.customersRepository.add(customer)
  }
}
