import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { Customer } from '@world-beauty/core/entities'
import type { CustomerDto } from '@world-beauty/core/dtos'

import { customersService } from '@/api'
import { PAGINATION } from '@world-beauty/core/constants'

export function useCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [pagesCount, setPagesCount] = useState(0)
  const [selectedCustomersIds, setSelectedCustomersIds] = useState<string[]>([])
  const [page, setPage] = useState(1)
  const [isFetching, setIsFetching] = useState(true)

  const fetchCustomers = useCallback(async (page: number) => {
    const response = await customersService.listCustomers(page)

    if (response.isFailure) {
      toast('Não foi possível listar clientes, tente novamente mais tarde')
      return
    }

    setCustomers(response.body.items.map(Customer.create))
    setPagesCount(Math.ceil(response.body.itemsCount / PAGINATION.itemsPerPage))
    setPage(page)
    setIsFetching(false)
  }, [])

  async function handleCustomersSelectionChange(newSelectedCustomersIds: string[]) {
    setSelectedCustomersIds([String(newSelectedCustomersIds.at(-1))])
  }

  async function handlePageChange(page: number) {
    await fetchCustomers(page)
  }

  async function handleDeleteButtonClick() {
    setSelectedCustomersIds([])

    await customersService.deleteCustomers(selectedCustomersIds)
    await fetchCustomers(1)
    toast.success('Cliente deletado com sucessso')
  }

  async function handleRegisterCustomer(customerDto: CustomerDto) {
    const response = await customersService.registerCustomer(Customer.create(customerDto))
    if (response.isFailure) {
      toast.error('Erro ao registrar cliente')
      return
    }
    await fetchCustomers(1)
    toast.success('Cliente criado com sucessso')
  }

  async function handleUpdateCustomer(customerDto: CustomerDto, customerId: string) {
    const response = await customersService.updateCustomer(
      Customer.create({ id: customerId, ...customerDto }),
    )
    if (response.isFailure) {
      toast.error('Erro ao atualizar cliente')
      return
    }
    await fetchCustomers(1)
    toast.success('Cliente atualizado com sucessso')
  }

  function handleCustomerOrderItems() {
    fetchCustomers(1)
    toast('Pedido realizado com sucesso!', { type: 'success' })
  }

  useEffect(() => {
    fetchCustomers(1)
  }, [fetchCustomers])

  return {
    customers,
    isFetching,
    selectedCustomersIds,
    page,
    pagesCount,
    handlePageChange,
    handleRegisterCustomer,
    handleUpdateCustomer,
    handleDeleteButtonClick,
    handleCustomerOrderItems,
    handleCustomersSelectionChange,
  }
}
