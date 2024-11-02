import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import type { Item } from '@world-beauty/core/abstracts'
import { PAGINATION } from '@world-beauty/core/constants'
import { Product, Service } from '@world-beauty/core/entities'
import { Order } from '@world-beauty/core/structs'
import { ordersService, productsService, servicesService } from '@/api'

export function useOrderForm(customerId: string, onOrderItems: (items: Item[]) => void) {
  const [products, setProducts] = useState<Product[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [selectedProductsIds, setSelectedProductsIds] = useState<string[]>([])
  const [selectedServicesIds, setSelectedServicesIds] = useState<string[]>([])
  const [productsPage, setProductsPage] = useState(0)
  const [productsPagesCount, setProductsPagesCount] = useState(0)
  const [servicesPage, setServicesPage] = useState(0)
  const [servicesPagesCount, setServicesPagesCount] = useState(0)

  const fetchProducts = useCallback(async (page: number) => {
    const response = await productsService.listProducts(page)

    if (response.isFailure) {
      toast.error('Não foi possível listar produtos, tente novamente mais tarde')
      return
    }

    setProducts(response.body.items.map(Product.create))
    setProductsPagesCount(Math.ceil(response.body.itemsCount / PAGINATION.itemsPerPage))
    setProductsPage(page)
  }, [])

  const fetchServices = useCallback(async (page: number) => {
    const response = await servicesService.listServices(page)

    if (response.isFailure) {
      toast.error('Não foi possível listar produtos, tente novamente mais tarde')
      return
    }

    setServices(response.body.items.map(Service.create))
    setServicesPagesCount(Math.ceil(response.body.itemsCount / PAGINATION.itemsPerPage))
    setServicesPage(page)
  }, [])

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
    const orders: Order[] = []

    for (const product of selectedProducts) {
      orders.push(
        Order.create({
          amount: product.price,
          customerId: customerId,
          itemId: product.id,
        }),
      )
    }
    for (const service of selectedServices) {
      orders.push(
        Order.create({
          amount: service.price,
          customerId: customerId,
          itemId: service.id,
        }),
      )
    }

    await ordersService.registerOrders(orders)
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
