import type { IApiClient, IProductsService } from '@world-beauty/core/interfaces'
import type { Product } from '@world-beauty/core/entities'
import type { ProductDto } from '@world-beauty/core/dtos'
import type { PaginationResponse } from '@world-beauty/core/responses'

export const ProductsService = (apiClient: IApiClient): IProductsService => {
  return {
    async listProducts(page: number) {
      apiClient.setParam('page', page.toString())
      return await apiClient.get<PaginationResponse<ProductDto>>('/products')
    },

    async registerProduct(Product: Product) {
      return await apiClient.post('/products', Product.dto)
    },

    async updateProduct(product: Product) {
      return await apiClient.put(`/products/${product.id}`, product.dto)
    },

    async deleteProducts(ProductIds: string[]) {
      return await apiClient.delete('/products', { id: ProductIds[0] })
    },
  }
}
