import { useCallback, useEffect, useState } from 'react'

import { customersRepository } from '@/database'
import { PAGINATION } from '@world-beauty/core/constants'
import { Customer } from '@world-beauty/core/entities'
import { ListCustomersByGenderUseCase } from '@world-beauty/core/use-cases'

const listCustomersByGender = new ListCustomersByGenderUseCase(customersRepository)

export function useCustomersByGenderTable() {
  const [maleCustomers, setMaleCustomers] = useState<Customer[]>([])
  const [maleCustomersPage, setMaleCustomersPage] = useState(1)
  const [maleCustomersPagesCount, setMaleCustomersPagesCount] = useState(0)
  const [femaleCustomers, setFemaleCustomers] = useState<Customer[]>([])
  const [femaleCustomersPage, setFemaleCustomersPage] = useState(1)
  const [femaleCustomersPagesCount, setFemaleCustomersPagesCount] = useState(0)

  const fetchMaleCustomers = useCallback(async (maleCustomesPage: number) => {
    const { items, itemsCount } = await listCustomersByGender.execute(
      'male',
      maleCustomesPage,
    )

    setMaleCustomers(items.map(Customer.create))
    setMaleCustomersPagesCount(Math.ceil(itemsCount / PAGINATION.itemsPerPage))
  }, [])

  const fetchFemaleCustomers = useCallback(async (femaleCustomesPage: number) => {
    const { items, itemsCount } = await listCustomersByGender.execute(
      'female',
      femaleCustomesPage,
    )

    setFemaleCustomers(items.map(Customer.create))
    setFemaleCustomersPage(femaleCustomesPage)
    setFemaleCustomersPagesCount(Math.ceil(itemsCount / PAGINATION.itemsPerPage))
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
