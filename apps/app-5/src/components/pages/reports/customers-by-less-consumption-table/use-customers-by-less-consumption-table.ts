import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { Customer } from '@world-beauty/core/entities'
import { reportsService } from '@/api'

export function useCustomersByLessConsumptionTable() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [page, setPage] = useState(1)

  const fetchCustomers = useCallback(async () => {
    const response = await reportsService.listCustomersByLessConsumption()

    if (response.isFailure) {
      toast.error(
        'Não foi possível listar os clientes que menos consumiram em valor, tente novamente mais tarde',
      )
      return
    }

    setCustomers(response.body.map(Customer.create))
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
