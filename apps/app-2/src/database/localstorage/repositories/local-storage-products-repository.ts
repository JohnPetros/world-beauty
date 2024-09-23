import type { ProductDto } from '@world-beauty/core/dtos'
import { Product } from '@world-beauty/core/entities'
import { PAGINATION } from '@world-beauty/core/constants'
import type { IProductsRepository } from '@world-beauty/core/interfaces'

import { KEYS } from '../keys'
import { LocalStorage } from '../local-storage'

export const LocalStorageProductsRepository = (): IProductsRepository => {
  const localStorage = LocalStorage()

  return {
    async findAll() {
      const productsDto = localStorage.get<ProductDto[]>(KEYS.products)
      if (!productsDto) return []
      return productsDto.map(Product.create)
    },

    async findAllPaginated(page: number) {
      const productsDto = localStorage.get<ProductDto[]>(KEYS.products)
      if (!productsDto) return []

      const start = (page - 1) * PAGINATION.itemsPerPage
      const end = start + PAGINATION.itemsPerPage

      return productsDto.map(Product.create).slice(start, end)
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
