import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { CustomerWithAddress } from '@world-beauty/core/entities'

import type { CustomerWithAddressDto } from '@world-beauty/core/dtos'
import { customersService } from '@/api'

export function useCustomersPage() {
  const [customers, setCustomers] = useState<CustomerWithAddress[]>([])
  const [selectedCustomersIds, setSelectedCustomersIds] = useState<string[]>([])
  const [isFetching, setIsFetching] = useState(true)

  const fetchCustomers = useCallback(async () => {
    const response = await customersService.listCustomers()
    setCustomers(response.body.map(CustomerWithAddress.create))
  }, [])

  async function handleCustomersSelectionChange(selectedCustomersIds: string[]) {
    setSelectedCustomersIds(selectedCustomersIds)
  }

  async function handleDeleteButtonClick() {
    setSelectedCustomersIds([])
    await customersService.deleteCustomers(selectedCustomersIds)
    await fetchCustomers()
  }

  async function handleRegisterCustomer(customerWithAddressDto: CustomerWithAddressDto) {
    await customersService.registerCustomer(
      CustomerWithAddress.create(customerWithAddressDto),
    )
    await fetchCustomers()
  }

  async function handleUpdateCustomer(customerWithAddressDto: CustomerWithAddressDto) {
    await customersService.updateCustomer(
      CustomerWithAddress.create(customerWithAddressDto),
    )
    await fetchCustomers()
  }

  function handleCustomerOrderItems() {
    fetchCustomers()
    toast('Pedido realizado com sucesso!', { type: 'success' })
  }

  useEffect(() => {
    fetchCustomers()
    setIsFetching(false)
  }, [fetchCustomers])

  return {
    customers,
    isFetching,
    selectedCustomersIds,
    handleRegisterCustomer,
    handleUpdateCustomer,
    handleDeleteButtonClick,
    handleCustomerOrderItems,
    handleCustomersSelectionChange,
  }
}
