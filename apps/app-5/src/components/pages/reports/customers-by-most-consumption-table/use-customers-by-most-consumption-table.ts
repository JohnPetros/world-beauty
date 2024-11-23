import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { Customer } from '@world-beauty/core/entities'

import { reportsService } from '@/api'

export function useCustomersByMostConsumptionTable() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [page, setPage] = useState(1)
  const [isFetching, setIsFetching] = useState(true)

  const fetchCustomers = useCallback(async () => {
    setIsFetching(true)
    const response = await reportsService.listCustomersByMostConsumption()

    if (response.isFailure) {
      toast.error(
        'Não foi possível listar os clientes que menos consumiram em quantidade, tente novamente mais tarde',
      )
      return
    }

    setCustomers(response.body.map(Customer.create))
    setIsFetching(false)
  }, [])

  async function handlePageChange(page: number) {
    setPage(page)
  }

  useEffect(() => {
    fetchCustomers()
  }, [fetchCustomers])

  return {
    isFetching,
    page,
    customers,
    handlePageChange,
  }
}
