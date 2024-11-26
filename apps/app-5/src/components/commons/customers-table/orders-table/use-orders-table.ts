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
  const [isFetchingProducts, setIsFetchingProducts] = useState(true)
  const [isFetchingServices, setIsFetchingServices] = useState(true)

  const fetchProducts = useCallback(
    async (page: number) => {
      setIsFetchingProducts(true)
      const response = await ordersService.listProducts(customerId, page)

      if (response.isFailure) {
        toast.error('Não foi possível listar produtos, tente novamente mais tarde')
      }

      if (response.isSuccess) {
        setProducts(response.body.items.map(Product.create))
        setProductsPagesCount(
          Math.ceil(response.body.itemsCount / PAGINATION.itemsPerPage),
        )
        setProductsPage(page)
      }

      setIsFetchingProducts(false)
    },
    [customerId],
  )

  const fetchServices = useCallback(
    async (page: number) => {
      setIsFetchingServices(true)
      const response = await ordersService.listServices(customerId, page)

      if (response.isFailure) {
        toast.error('Não foi possível listar produtos, tente novamente mais tarde')
      }

      if (response.isSuccess) {
        setServices(response.body.items.map(Service.create))
        setServicesPagesCount(
          Math.ceil(response.body.itemsCount / PAGINATION.itemsPerPage),
        )
        setServicesPage(page)
      }

      setIsFetchingServices(false)
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
    isFetchingProducts,
    isFetchingServices,
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
