import type { CustomerDto } from '@world-beauty/core/dtos'
import { Customer } from '@world-beauty/core/entities'
import { PAGINATION } from '@world-beauty/core/constants'
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

    async findAllPaginated(page: number) {
      const customersDto = localStorage.get<CustomerDto[]>(KEYS.customers)
      if (!customersDto) return []

      const start = (page - 1) * PAGINATION.itemsPerPage
      const end = start + PAGINATION.itemsPerPage

      return customersDto.map(Customer.create).slice(start, end)
    },

    async count() {
      const constumers = await this.findAll()
      return constumers.length
    },

    async add(customer: Customer) {
      const constumers = await this.findAll()

      constumers.unshift(customer)

      localStorage.set(
        KEYS.customers,
        constumers.map((customer) => customer.dto),
      )
    },

    async update(customer: Customer) {
      const constumers = await this.findAll()

      localStorage.set(
        KEYS.customers,
        constumers.map((currentCustomer) =>
          currentCustomer.isEqualTo(customer) ? customer.dto : currentCustomer.dto,
        ),
      )
    },

    async removeMany(customersIds: string[]) {
      const constumers = await this.findAll()

      localStorage.set(
        KEYS.customers,
        constumers
          .filter((customer) => !customersIds.includes(customer.id))
          .map((customer) => customer.dto),
      )
    },

    async removeAll() {
      localStorage.remove(KEYS.customers)
    },
  }
}
