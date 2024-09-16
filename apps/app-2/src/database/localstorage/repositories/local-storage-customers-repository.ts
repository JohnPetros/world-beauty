import type { CustomerDto } from '@world-beauty/core/dtos'
import { Customer } from '@world-beauty/core/entities'
import type { ICustomersRepository } from '@world-beauty/core/interfaces'

import { KEYS } from '../keys'
import { LocalStorage } from '../local-storage'

export const LocalStorageCustomersRepository = (): ICustomersRepository => {
  const localStorage = LocalStorage()

  return {
    async findAll() {
      const customersDto = localStorage.get<CustomerDto[]>(KEYS.customers)
      if (!customersDto) return []
      return customersDto.map(Customer.create)
    },

    async add(customer) {
      const constumers = await this.findAll()
      localStorage.set(KEYS.customers, [
        customer.dto,
        ...constumers.map((customer) => customer.dto),
      ])
    },

    async removeAll() {
      localStorage.remove(KEYS.customers)
    },
  }
}
