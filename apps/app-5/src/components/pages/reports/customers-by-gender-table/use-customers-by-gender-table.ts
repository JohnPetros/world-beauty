import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { PAGINATION } from '@world-beauty/core/constants'
import { Customer } from '@world-beauty/core/entities'
import { reportsService } from '@/api'

export function useCustomersByGenderTable() {
  const [maleCustomers, setMaleCustomers] = useState<Customer[]>([])
  const [maleCustomersPage, setMaleCustomersPage] = useState(1)
  const [maleCustomersPagesCount, setMaleCustomersPagesCount] = useState(0)
  const [femaleCustomers, setFemaleCustomers] = useState<Customer[]>([])
  const [femaleCustomersPage, setFemaleCustomersPage] = useState(1)
  const [femaleCustomersPagesCount, setFemaleCustomersPagesCount] = useState(0)
  const [isFetchingMaleCustomers, setIsFetchingMaleCustomers] = useState(true)
  const [isFetchingFemaleCustomers, setIsFetchingFemaleCustomers] = useState(true)

  const fetchMaleCustomers = useCallback(async (page: number) => {
    setIsFetchingMaleCustomers(true)
    const response = await reportsService.listCustomersByGender('male', page)

    if (response.isFailure) {
      toast.error(
        'Não foi possível listar clientes masculinos, tente novamente mais tarde',
      )
    }

    if (response.isSuccess) {
      setMaleCustomers(response.body.items.map(Customer.create))
      setMaleCustomersPage(page)
      setMaleCustomersPagesCount(
        Math.ceil(response.body.itemsCount / PAGINATION.itemsPerPage),
      )
    }

    setIsFetchingMaleCustomers(false)
  }, [])

  const fetchFemaleCustomers = useCallback(async (page: number) => {
    setIsFetchingFemaleCustomers(true)
    const response = await reportsService.listCustomersByGender('female', page)

    if (response.isFailure) {
      toast.error(response.errorMessage)
    }

    if (response.isSuccess) {
      setFemaleCustomers(response.body.items.map(Customer.create))
      setFemaleCustomersPage(page)
      setFemaleCustomersPagesCount(
        Math.ceil(response.body.itemsCount / PAGINATION.itemsPerPage),
      )
    }

    setIsFetchingFemaleCustomers(false)
  }, [])

  async function handleMaleCustomersPageChange(page: number) {
    setMaleCustomersPage(maleCustomersPage)
    await fetchMaleCustomers(page)
  }

  async function handlefemaleCustomersPageChange(page: number) {
    setFemaleCustomers(femaleCustomers)
    await fetchFemaleCustomers(page)
  }

  useEffect(() => {
    ;(async () => await Promise.all([fetchFemaleCustomers(1), fetchMaleCustomers(1)]))()
  }, [fetchFemaleCustomers, fetchMaleCustomers])

  return {
    isFetchingMaleCustomers,
    isFetchingFemaleCustomers,
    maleCustomers,
    maleCustomersPage,
    maleCustomersPagesCount,
    femaleCustomers,
    femaleCustomersPage,
    femaleCustomersPagesCount,
    handleMaleCustomersPageChange,
    handlefemaleCustomersPageChange,
  }
}
