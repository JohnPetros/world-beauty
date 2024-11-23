import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { PAGINATION } from '@world-beauty/core/constants'
import { Product } from '@world-beauty/core/entities'
import { reportsService } from '@/api'

export function useMostConsumedProductsTable() {
  const [products, setProducts] = useState<Product[]>([])
  const [page, setPage] = useState(1)
  const [pagesCount, setPagesCount] = useState(0)
  const [isFetching, setIsFetching] = useState(true)

  const fetchProducts = useCallback(async (page: number) => {
    setIsFetching(true)
    const response = await reportsService.listMostConsumedProducts(page)

    if (response.isFailure) {
      toast.error(response.errorMessage)
    }

    if (response.isSuccess) {
      setProducts(response.body.items.map(Product.create))
      setPage(page)
      setPagesCount(Math.ceil(response.body.itemsCount / PAGINATION.itemsPerPage))
    }

    setIsFetching(false)
  }, [])

  async function handlePageChange(page: number) {
    await fetchProducts(page)
  }

  useEffect(() => {
    fetchProducts(1)
  }, [fetchProducts])

  return {
    isFetching,
    products,
    page,
    pagesCount,
    handlePageChange,
  }
}
