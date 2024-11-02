import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { PAGINATION } from '@world-beauty/core/constants'
import { Product } from '@world-beauty/core/entities'
import { reportsService } from '@/api'

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
    const response = await reportsService.listMostConsumedProducts(page, 'male')

    if (response.isFailure) {
      toast.error(
        'Não foi possível listar produtos mais consumidos por gênero masculino, tente novamente mais tarde',
      )
      return
    }

    setMaleCustomersProducts(response.body.items.map(Product.create))
    setMaleCustomersProductsPage(page)
    setMaleCustomersProductsPagesCount(
      Math.ceil(response.body.itemsCount / PAGINATION.itemsPerPage),
    )
  }, [])

  const fetchFemaleCustomersProducts = useCallback(async (page: number) => {
    const response = await reportsService.listMostConsumedProducts(page, 'female')

    if (response.isFailure) {
      toast.error(
        'Não foi possível listar produtos mais consumidos por gênero feminino, tente novamente mais tarde',
      )
      return
    }

    setFemaleCustomersProducts(response.body.items.map(Product.create))
    setFemaleCustomersProductsPage(page)
    setFemaleCustomersProductsPagesCount(
      Math.ceil(response.body.itemsCount / PAGINATION.itemsPerPage),
    )
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
