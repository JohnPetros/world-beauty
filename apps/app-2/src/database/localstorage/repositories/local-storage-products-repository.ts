import type { ProductDto } from '@world-beauty/core/dtos'
import { Product } from '@world-beauty/core/entities'
import { PAGINATION } from '@world-beauty/core/constants'
import type {
  ICustomersRepository,
  IProductsRepository,
} from '@world-beauty/core/interfaces'

import { KEYS } from '../keys'
import { LocalStorage } from '../local-storage'

export const LocalStorageProductsRepository = (
  costumersRepository: ICustomersRepository,
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

      const start = (page - 1) * PAGINATION.itemsPerPage
      const end = start + PAGINATION.itemsPerPage

      return productsDto.map(Product.create).slice(start, end)
    },

    async findManyMostConsumedProducts(page: number) {
      const consumedProductsMap: {
        [key: string]: number
      } = {}

      const products = await this.findAll()
      const customers = await costumersRepository.findAll()

      for (const customer of customers) {
        for (const product of customer.consumedProducts) {
          if (!(product.id in consumedProductsMap)) {
            consumedProductsMap[product.id] = consumedProductsMap[product.id] + 1
          }
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
