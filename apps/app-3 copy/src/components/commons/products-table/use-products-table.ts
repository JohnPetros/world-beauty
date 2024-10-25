import type { Selection } from '@nextui-org/react'

import type { ProductDto } from '@world-beauty/core/dtos'
import type { Product } from '@world-beauty/core/entities'

type UseProductsTableProps = {
  products: Product[]
  onPageChange?: (page: number) => void
  onUpdateProduct?: (productDto: ProductDto, productsId: string) => void
  onProductsSelectionChange?: (productsIds: string[]) => void
}

export function useProductsTable({
  products,
  onPageChange,
  onProductsSelectionChange,
  onUpdateProduct,
}: UseProductsTableProps) {
  async function handleProductsSelectionChange(productsSelection: Selection) {
    let selectedProductsIds: string[] = []

    if (productsSelection === 'all') {
      selectedProductsIds = products.map((product) => product.id)
    } else {
      selectedProductsIds = Array.from(productsSelection).map(String)
    }

    if (onProductsSelectionChange) onProductsSelectionChange(selectedProductsIds)
  }

  function handlePageChange(page: number) {
    if (onPageChange) onPageChange(page)
  }

  async function handleUpdateProduct(productDto: ProductDto, productId: string) {
    if (onUpdateProduct) onUpdateProduct(productDto, productId)
  }

  return {
    handleProductsSelectionChange,
    handleUpdateProduct,
    handlePageChange,
  }
}
