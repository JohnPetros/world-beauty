import { useCallback, useEffect, useState } from 'react'

import { PAGINATION } from '@world-beauty/core/constants'
import { Product } from '@world-beauty/core/entities'
import { ListMostConsumedProductsUseCase } from '@world-beauty/core/use-cases'
import { productsRepository } from '@/database'

export const listMostConsumedProducts = new ListMostConsumedProductsUseCase(
  productsRepository,
)

export function useMostConsumedProductsTable() {
  const [products, setProducts] = useState<Product[]>([])
  const [page, setPage] = useState(1)
  const [pagesCount, setPagesCount] = useState(0)

  const fetchProducts = useCallback(async (page: number) => {
    const { items, itemsCount } = await listMostConsumedProducts.execute(page)

    setProducts(items.map(Product.create))

    setPage(page)
    setPagesCount(Math.ceil(itemsCount / PAGINATION.itemsPerPage))
  }, [])

  async function handlePageChange(page: number) {
    await fetchProducts(page)
  }

  useEffect(() => {
    fetchProducts(1)
  }, [fetchProducts])

  return {
    products,
    page,
    pagesCount,
    handlePageChange,
  }
}
