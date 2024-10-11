import { useCallback, useEffect, useState } from 'react'

import {
  ListCustomerOrderedProductsUseCase,
  ListCustomerOrderedservicesUseCase,
} from '@world-beauty/core/use-cases'
import { PAGINATION } from '@world-beauty/core/constants'
import type { Product, Service } from '@world-beauty/core/entities'

import { productsRepository, servicesRepository } from '@/database'

const listProductsUseCase = new ListCustomerOrderedProductsUseCase(productsRepository)
const listServicesUseCase = new ListCustomerOrderedservicesUseCase(servicesRepository)

export function useOrdersTable(customerId: string) {
  const [products, setProducts] = useState<Product[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [selectedProductsIds, setSelectedProductsIds] = useState<string[]>([])
  const [selectedServicesIds, setSelectedServicesIds] = useState<string[]>([])
  const [productsPage, setProductsPage] = useState(0)
  const [productsPagesCount, setProductsPagesCount] = useState(0)
  const [servicesPage, setServicesPage] = useState(0)
  const [servicesPagesCount, setServicesPagesCount] = useState(0)

  const fetchProducts = useCallback(
    async (page: number) => {
      const response = await listProductsUseCase.execute(customerId, page)

      setProducts(response.items)
      setProductsPagesCount(Math.ceil(response.itemsCount / PAGINATION.itemsPerPage))
      setProductsPage(page)
    },
    [customerId],
  )

  const fetchServices = useCallback(
    async (page: number) => {
      const response = await listServicesUseCase.execute(customerId, page)

      setServices(response.items)
      setServicesPagesCount(Math.ceil(response.itemsCount / PAGINATION.itemsPerPage))
      setServicesPage(page)
    },
    [customerId],
  )

  async function handleProductsPageChange(page: number) {
    await fetchProducts(page)
  }

  async function handleServicesPageChange(page: number) {
    await fetchServices(page)
  }

  function handleProductsSelectionChange(selectedProductsIds: string[]) {
    setSelectedProductsIds(selectedProductsIds)
  }

  function handleServicesSelectionChange(selectedServicesIds: string[]) {
    setSelectedServicesIds(selectedServicesIds)
  }

  useEffect(() => {
    ;(async () => await Promise.all([fetchProducts(1), fetchServices(1)]))()
  }, [fetchProducts, fetchServices])

  return {
    products,
    productsPage,
    productsPagesCount,
    selectedProductsIds,
    services,
    servicesPage,
    servicesPagesCount,
    selectedServicesIds,
    handleProductsPageChange,
    handleProductsSelectionChange,
    handleServicesPageChange,
    handleServicesSelectionChange,
  }
}
