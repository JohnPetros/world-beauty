import { useCallback, useEffect, useState } from 'react'

import { Customer } from '@world-beauty/core/entities'
import { ListCustomersByMostConsumptionUseCase } from '@world-beauty/core/use-cases'
import { customersRepository } from '@/database'

const listCustomersByMostConsumption = new ListCustomersByMostConsumptionUseCase(
  customersRepository,
)

export function useCustomersByMostConsumptionTable() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [page, setPage] = useState(1)

  const fetchCustomers = useCallback(async () => {
    const customers = await listCustomersByMostConsumption.execute()
    setCustomers(customers.map(Customer.create))
  }, [])

  async function handlePageChange(page: number) {
    setPage(page)
  }

  useEffect(() => {
    fetchCustomers()
  }, [fetchCustomers])

  return {
    page,
    customers,
    handlePageChange,
  }
}
