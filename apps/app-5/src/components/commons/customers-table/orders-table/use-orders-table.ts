import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { PAGINATION } from '@world-beauty/core/constants'
import { Product, Service } from '@world-beauty/core/entities'

import { ordersService } from '@/api'

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
      const response = await ordersService.listProducts(customerId, page)

      if (response.isFailure) {
        toast.error('Não foi possível listar produtos, tente novamente mais tarde')
        return
      }

      setProducts(response.body.items.map(Product.create))
      setProductsPagesCount(Math.ceil(response.body.itemsCount / PAGINATION.itemsPerPage))
      setProductsPage(page)
    },
    [customerId],
  )

  const fetchServices = useCallback(
    async (page: number) => {
      const response = await ordersService.listServices(customerId, page)

      if (response.isFailure) {
        toast.error('Não foi possível listar produtos, tente novamente mais tarde')
        return
      }

      setServices(response.body.items.map(Service.create))
      setServicesPagesCount(Math.ceil(response.body.itemsCount / PAGINATION.itemsPerPage))
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
