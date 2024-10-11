import { useCallback, useEffect, useState } from 'react'

import { Customer } from '@world-beauty/core/entities'
import { ListCustomersByLessConsumptionUseCase } from '@world-beauty/core/use-cases'
import { customersRepository } from '@/database'

const listCustomersByMostConsumption = new ListCustomersByLessConsumptionUseCase(
  customersRepository,
)

export function CustomersByLessConsumptionTable() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [page, setPage] = useState(1)

  const fetchCustomers = useCallback(async () => {
    const customers = await listCustomersByMostConsumption.execute()
    setCustomers(customers.map(Customer.create))
  }, [])

  async function handleCustomersPageChange(page: number) {
    setPage(page)
  }

  useEffect(() => {}, [])

  useEffect(() => {
    fetchCustomers()
  }, [fetchCustomers])

  return {
    page,
    customers,
    handleCustomersPageChange,
  }
}
