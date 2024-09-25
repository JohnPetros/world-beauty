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

    async findMany(page: number) {
      const customers = await this.findAll()

      const start = (page - 1) * PAGINATION.itemsPerPage
      const end = start + PAGINATION.itemsPerPage

      return {
        customers: customers.slice(start, end),
        count: customers.length,
      }
    },

    async findManyMale(page: number) {
      const customers = await this.findAll()
      const maleCustomers = customers.filter((customer) => customer.isMale)

      const start = (page - 1) * PAGINATION.itemsPerPage
      const end = start + PAGINATION.itemsPerPage

      return {
        customers: maleCustomers.slice(start, end),
        count: maleCustomers.length,
      }
    },

    async findManyFemale(page: number) {
      const customers = await this.findAll()
      const femaleCustomers = customers.filter((customer) => customer.isFemale)

      const start = (page - 1) * PAGINATION.itemsPerPage
      const end = start + PAGINATION.itemsPerPage

      return {
        customers: femaleCustomers.slice(start, end),
        count: femaleCustomers.length,
      }
    },

    async findTop10CustomersByMostConsumption() {
      const customers = await this.findAll()
      customers.sort((fisrtCustomer, secondCustomer) => {
        return (
          secondCustomer.consumedProductsOrServicesCount -
          fisrtCustomer.consumedProductsOrServicesCount
        )
      })

      return customers.slice(0, 10)
    },

    async findTop10CustomersByLessConsumption() {
      const customers = await this.findAll()
      customers.sort((fisrtCustomer, secondCustomer) => {
        return (
          fisrtCustomer.consumedProductsOrServicesCount -
          secondCustomer.consumedProductsOrServicesCount
        )
      })

      return customers.slice(0, 10)
    },

    async findTop5CustomersByMostSpending() {
      const customers = await this.findAll()
      customers.sort((fisrtCustomer, secondCustomer) => {
        return secondCustomer.spendingAsNumber - fisrtCustomer.spendingAsNumber
      })

      return customers.slice(0, 5)
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
