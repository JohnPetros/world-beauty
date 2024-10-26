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
    console.log(response.body)
    setCustomers(response.body.map(CustomerWithAddress.create))
    setIsFetching(false)
  }, [])

  async function handleCustomersSelectionChange(newSelectedCustomersIds: string[]) {
    setSelectedCustomersIds([String(newSelectedCustomersIds.at(-1))])
  }

  async function handleDeleteButtonClick() {
    setSelectedCustomersIds([])

    await customersService.deleteCustomers(selectedCustomersIds)
    await fetchCustomers()
    toast.success('Cliente deletado com sucessso')
  }

  async function handleRegisterCustomer(customerWithAddressDto: CustomerWithAddressDto) {
    const response = await customersService.registerCustomer(
      CustomerWithAddress.create(customerWithAddressDto),
    )
    if (response.isFailure) {
      toast.error('Erro ao registrar cliente')
      return
    }
    await fetchCustomers()
    toast.success('Cliente criado com sucessso')
  }

  async function handleUpdateCustomer(
    customerWithAddressDto: CustomerWithAddressDto,
    customerId: string,
  ) {
    const response = await customersService.updateCustomer(
      CustomerWithAddress.create({ id: customerId, ...customerWithAddressDto }),
    )
    if (response.isFailure) {
      toast.error('Erro ao atualizar cliente')
      return
    }
    await fetchCustomers()
    toast.success('Cliente atualizado com sucessso')
  }

  function handleCustomerOrderItems() {
    fetchCustomers()
    toast('Pedido realizado com sucesso!', { type: 'success' })
  }

  useEffect(() => {
    fetchCustomers()
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
