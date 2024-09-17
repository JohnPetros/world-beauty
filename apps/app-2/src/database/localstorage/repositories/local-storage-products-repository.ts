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
      const ProductsDto = localStorage.get<ProductDto[]>(KEYS.products)
      if (!ProductsDto) return []
      return ProductsDto.map(Product.create)
    },

    async findAllPaginated(page: number) {
      const ProductsDto = localStorage.get<ProductDto[]>(KEYS.products)
      if (!ProductsDto) return []

      const start = (page - 1) * PAGINATION.itemsPerPage
      const end = start + PAGINATION.itemsPerPage

      return ProductsDto.map(Product.create).slice(start, end)
    },

    async count() {
      const constumers = await this.findAll()
      return constumers.length
    },

    async add(Product) {
      const constumers = await this.findAll()
      localStorage.set(KEYS.products, [
        Product.dto,
        ...constumers.map((Product) => Product.dto),
      ])
    },

    async removeAll() {
      localStorage.remove(KEYS.products)
    },
  }
}
