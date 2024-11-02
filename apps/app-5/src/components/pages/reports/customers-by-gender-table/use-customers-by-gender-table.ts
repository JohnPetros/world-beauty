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

  const fetchMaleCustomers = useCallback(async (page: number) => {
    const response = await reportsService.listCustomersByGender('male', page)

    if (response.isFailure) {
      toast.error(
        'Não foi possível listar clientes masculinos, tente novamente mais tarde',
      )
      return
    }

    setMaleCustomers(response.body.items.map(Customer.create))
    setMaleCustomersPage(page)
    setMaleCustomersPagesCount(
      Math.ceil(response.body.itemsCount / PAGINATION.itemsPerPage),
    )
  }, [])

  const fetchFemaleCustomers = useCallback(async (page: number) => {
    const response = await reportsService.listCustomersByGender('female', page)

    if (response.isFailure) {
      toast.error(
        'Não foi possível listar clientes femininos, tente novamente mais tarde',
      )
      return
    }

    setFemaleCustomers(response.body.items.map(Customer.create))
    setFemaleCustomersPage(page)
    setFemaleCustomersPagesCount(
      Math.ceil(response.body.itemsCount / PAGINATION.itemsPerPage),
    )
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
