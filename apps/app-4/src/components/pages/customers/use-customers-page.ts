import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { Customer } from '@world-beauty/core/entities'
import {
  DeleteCustomersUseCase,
  ListCustomersUseCase,
  RegisterCustomerUseCase,
  UpdateCustomerUseCase,
} from '@world-beauty/core/use-cases'
import { PAGINATION } from '@world-beauty/core/constants'
import type { CustomerDto } from '@world-beauty/core/dtos'

import { customersRepository } from '@/database'

export function useCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [pagesCount, setPagesCount] = useState(0)
  const [selectedCustomersIds, setSelectedCustomersIds] = useState<string[]>([])
  const [page, setPage] = useState(1)
  const [isFetching, setIsFetching] = useState(true)

  const fetchCustomers = useCallback(async (page: number) => {
    const response = await listCustomersUseCase.execute(page)
    setCustomers(response.items.map(Customer.create))
    setPagesCount(Math.ceil(response.itemsCount / PAGINATION.itemsPerPage))
    setPage(page)
  }, [])

  async function handleCustomersSelectionChange(selectedCustomersIds: string[]) {
    setSelectedCustomersIds(selectedCustomersIds)
  }

  async function handlePageChange(page: number) {
    await fetchCustomers(page)
  }

  async function handleDeleteButtonClick() {
    setSelectedCustomersIds([])
    await deleteCustomersUseCase.execute(selectedCustomersIds)
    await fetchCustomers(1)
  }

  async function handleRegisterCustomer(customerDto: CustomerDto) {
    await registerCustomerUseCase.execute(customerDto)
    await fetchCustomers(1)
  }

  async function handleUpdateCustomer(customerDto: CustomerDto, customerId: string) {
    await updateCustomerUseCase.execute(customerDto, customerId)
    await fetchCustomers(1)
  }

  function handleCustomerOrderItems() {
    fetchCustomers(page)
    toast('Pedido realizado com sucesso!', { type: 'success' })
  }

  useEffect(() => {
    fetchCustomers(1)
    setIsFetching(false)
  }, [fetchCustomers])

  return {
    customers,
    page,
    pagesCount,
    isFetching,
    selectedCustomersIds,
    handleRegisterCustomer,
    handleUpdateCustomer,
    handleDeleteButtonClick,
    handleCustomerOrderItems,
    handleCustomersSelectionChange,
    handlePageChange,
  }
}
