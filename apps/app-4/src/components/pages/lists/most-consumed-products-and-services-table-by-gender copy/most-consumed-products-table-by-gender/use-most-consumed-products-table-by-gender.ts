import { useCallback, useEffect, useState } from 'react'

import { PAGINATION } from '@world-beauty/core/constants'
import { Product } from '@world-beauty/core/entities'
import {
  ListMostConsumedProductsByFemaleCustomersUseCase,
  ListMostConsumedProductsByMaleCustomersUseCase,
} from '@world-beauty/core/use-cases'

import { productsRepository } from '@/database'

const listMostConsumedProductsByMaleCustomers =
  new ListMostConsumedProductsByMaleCustomersUseCase(productsRepository)
const listMostConsumedProductsByFemaleCustomers =
  new ListMostConsumedProductsByFemaleCustomersUseCase(productsRepository)

export function useMostConsumedProductsTableByGender() {
  const [maleCustomersProducts, setMaleCustomersProducts] = useState<Product[]>([])
  const [maleCustomersProductsPage, setMaleCustomersProductsPage] = useState(0)
  const [maleCustomersProductsPagesCount, setMaleCustomersProductsPagesCount] =
    useState(0)
  const [femaleCustomersProducts, setFemaleCustomersProducts] = useState<Product[]>([])
  const [femaleCustomersProductsPage, setFemaleCustomersProductsPage] = useState(0)
  const [femaleCustomersProductsPagesCount, setFemaleCustomersProductsPagesCount] =
    useState(0)

  const fetchMaleCustomersProducts = useCallback(async (page: number) => {
    const { items, itemsCount } =
      await listMostConsumedProductsByMaleCustomers.execute(page)

    setMaleCustomersProducts(items.map(Product.create))
    setMaleCustomersProductsPage(page)
    setMaleCustomersProductsPagesCount(Math.ceil(itemsCount / PAGINATION.itemsPerPage))
  }, [])

  const fetchFemaleCustomersProducts = useCallback(async (page: number) => {
    const { items, itemsCount } =
      await listMostConsumedProductsByFemaleCustomers.execute(page)

    setFemaleCustomersProducts(items.map(Product.create))
    setFemaleCustomersProductsPage(page)
    setFemaleCustomersProductsPagesCount(Math.ceil(itemsCount / PAGINATION.itemsPerPage))
  }, [])

  async function handleMaleCustomersProductsPageChange(page: number) {
    await fetchMaleCustomersProducts(page)
  }

  async function handleFemaleCustomersProductsPageChange(page: number) {
    await fetchMaleCustomersProducts(page)
  }

  useEffect(() => {
    fetchMaleCustomersProducts(1)
    fetchFemaleCustomersProducts(1)
  }, [fetchMaleCustomersProducts, fetchFemaleCustomersProducts])

  return {
    maleCustomersProducts,
    maleCustomersProductsPage,
    maleCustomersProductsPagesCount,
    femaleCustomersProductsPage,
    femaleCustomersProductsPagesCount,
    femaleCustomersProducts,
    handleMaleCustomersProductsPageChange,
    handleFemaleCustomersProductsPageChange,
  }
}
