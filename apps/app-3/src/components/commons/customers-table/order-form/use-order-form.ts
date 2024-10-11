import { useCallback, useEffect, useState } from 'react'

import {
  ListProductsUseCase,
  ListServicesUseCase,
  RegisterOrdersUseCase,
} from '@world-beauty/core/use-cases'
import { PAGINATION } from '@world-beauty/core/constants'
import type { Product, Service } from '@world-beauty/core/entities'
import type { Item } from '@world-beauty/core/abstracts'
import type { OrderDto } from '@world-beauty/core/dtos'

import { ordersRepository, productsRepository, servicesRepository } from '@/database'

const listProductsUseCase = new ListProductsUseCase(productsRepository)
const listServicesUseCase = new ListServicesUseCase(servicesRepository)
const registerOrdersUseCase = new RegisterOrdersUseCase(ordersRepository)

export function useOrderForm(customerId: string, onOrderItems: (items: Item[]) => void) {
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
      const response = await listProductsUseCase.execute(page)

      setProducts(response.items)
      setProductsPagesCount(Math.ceil(response.itemsCount / PAGINATION.itemsPerPage))
      setProductsPage(page)
    },
    [customerId],
  )

  const fetchServices = useCallback(
    async (page: number) => {
      const response = await listServicesUseCase.execute(page)

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

  async function handleOrderButtonClick() {
    const selectedProducts = products.filter((product) =>
      selectedProductsIds.includes(product.id),
    )
    const selectedServices = services.filter((service) =>
      selectedServicesIds.includes(service.id),
    )
    const ordersDto: OrderDto[] = []

    for (const product of selectedProducts) {
      ordersDto.push({
        amount: product.price,
        customerId: customerId,
        itemId: product.id,
      })
    }
    for (const service of selectedServices) {
      ordersDto.push({
        amount: service.price,
        customerId: customerId,
        itemId: service.id,
      })
    }

    await registerOrdersUseCase.execute(ordersDto)
    onOrderItems([...selectedProducts, ...selectedServices])
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
    handleOrderButtonClick,
  }
}
