import type { ProductDto } from '@world-beauty/core/dtos'
import { Product } from '@world-beauty/core/entities'
import { PAGINATION } from '@world-beauty/core/constants'
import type {
  IProductsRepository,
  IOrdersRepository,
  ICustomersRepository,
} from '@world-beauty/core/interfaces'

import { KEYS } from '../keys'
import { LocalStorage } from '../local-storage'

export const LocalStorageProductsRepository = (
  ordersRepository: IOrdersRepository,
  customersRepository: ICustomersRepository,
): IProductsRepository => {
  const localStorage = LocalStorage()

  return {
    async findAll() {
      const productsDto = localStorage.get<ProductDto[]>(KEYS.products)
      if (!productsDto) return []
      return productsDto.map(Product.create)
    },

    async findMany(page: number) {
      const productsDto = localStorage.get<ProductDto[]>(KEYS.products)
      if (!productsDto) return []

      const orders = await ordersRepository.findAll()
      const products = productsDto.map((dto) => {
        const product = Product.create(dto)
        product.customersCount = orders.reduce((count, order) => {
          return count + (order.itemId === product.id ? 1 : 0)
        }, 0)
        return product
      })

      const start = (page - 1) * PAGINATION.itemsPerPage
      const end = start + PAGINATION.itemsPerPage

      return products.slice(start, end)
    },

    async findManyMostConsumedProducts(page: number) {
      const consumedProductsMap: {
        [key: string]: number
      } = {}

      const products = await this.findAll()
      const productsIds = products.map((product) => product.id)
      const orders = await ordersRepository.findAll()

      for (const order of orders) {
        if (productsIds.includes(order.itemId)) {
          consumedProductsMap[order.itemId] = consumedProductsMap[order.itemId] + 1
        }
      }

      products.sort(
        (firstProduct, secondProduct) =>
          consumedProductsMap[firstProduct.id] - consumedProductsMap[secondProduct.id],
      )

      const start = (page - 1) * PAGINATION.itemsPerPage
      const end = start + PAGINATION.itemsPerPage

      return {
        products: products.slice(start, end),
        count: products.length,
      }
    },

    async findManyMostConsumedProductsByMaleCustomers(page: number) {
      const consumedProductsMap: {
        [key: string]: number
      } = {}

      const products = await this.findAll()
      const productsIds = products.map((product) => product.id)
      const customers = await customersRepository.findAllMale()
      const customersIds = customers.map((customer) => customer.id)
      const orders = await ordersRepository.findAll()

      for (const order of orders) {
        if (
          productsIds.includes(order.itemId) &&
          customersIds.includes(order.customerId)
        ) {
          consumedProductsMap[order.itemId] = consumedProductsMap[order.itemId] + 1
        }
      }

      products.sort(
        (firstProduct, secondProduct) =>
          consumedProductsMap[firstProduct.id] - consumedProductsMap[secondProduct.id],
      )

      const start = (page - 1) * PAGINATION.itemsPerPage
      const end = start + PAGINATION.itemsPerPage

      return {
        products: products.slice(start, end),
        count: products.length,
      }
    },

    async findManyMostConsumedProductsByFemaleCustomers(page: number) {
      const consumedProductsMap: {
        [key: string]: number
      } = {}

      const products = await this.findAll()
      const productsIds = products.map((product) => product.id)
      const customers = await customersRepository.findAllFemale()
      const customersIds = customers.map((customer) => customer.id)
      const orders = await ordersRepository.findAll()

      for (const order of orders) {
        if (
          productsIds.includes(order.itemId) &&
          customersIds.includes(order.customerId)
        ) {
          consumedProductsMap[order.itemId] = consumedProductsMap[order.itemId] + 1
        }
      }

      products.sort(
        (firstProduct, secondProduct) =>
          consumedProductsMap[firstProduct.id] - consumedProductsMap[secondProduct.id],
      )

      const start = (page - 1) * PAGINATION.itemsPerPage
      const end = start + PAGINATION.itemsPerPage

      return {
        products: products.slice(start, end),
        count: products.length,
      }
    },

    async count() {
      const products = await this.findAll()
      return products.length
    },

    async add(product: Product) {
      const products = await this.findAll()

      products.unshift(product)

      localStorage.set(
        KEYS.products,
        products.map((product) => product.dto),
      )
    },

    async update(product: Product) {
      const products = await this.findAll()

      localStorage.set(
        KEYS.products,
        products.map((currentProduct) => {
          return currentProduct.isEqualTo(product) ? product.dto : currentProduct.dto
        }),
      )
    },

    async removeMany(productsIds: string[]) {
      const products = await this.findAll()

      localStorage.set(
        KEYS.products,
        products
          .filter((product) => !productsIds.includes(product.id))
          .map((product) => product.dto),
      )
    },

    async removeAll() {
      localStorage.remove(KEYS.products)
    },
  }
}
