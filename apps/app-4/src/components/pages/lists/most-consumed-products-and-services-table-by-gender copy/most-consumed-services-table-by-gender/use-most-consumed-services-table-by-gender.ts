import { useCallback, useEffect, useState } from 'react'

import { PAGINATION } from '@world-beauty/core/constants'
import { Service } from '@world-beauty/core/entities'
import {
  ListMostConsumedServicesByFemaleCustomersUseCase,
  ListMostConsumedServicesByMaleCustomersUseCase,
} from '@world-beauty/core/use-cases'

import { servicesRepository } from '@/database'

const listMostConsumedServicesByMaleCustomers =
  new ListMostConsumedServicesByMaleCustomersUseCase(servicesRepository)
const listMostConsumedServicesByFemaleCustomers =
  new ListMostConsumedServicesByFemaleCustomersUseCase(servicesRepository)

export function useMostConsumedServicesTableByGender() {
  const [maleCustomersServices, setMaleCustomersServices] = useState<Service[]>([])
  const [maleCustomersServicesPage, setMaleCustomersServicesPage] = useState(0)
  const [maleCustomersServicesPagesCount, setMaleCustomersServicesPagesCount] =
    useState(0)
  const [femaleCustomersServices, setFemaleCustomersServices] = useState<Service[]>([])
  const [femaleCustomersServicesPage, setFemaleCustomersServicesPage] = useState(0)
  const [femaleCustomersServicesPagesCount, setFemaleCustomersServicesPagesCount] =
    useState(0)

  const fetchMaleCustomersServices = useCallback(async (page: number) => {
    const { items, itemsCount } =
      await listMostConsumedServicesByMaleCustomers.execute(page)

    setMaleCustomersServices(items.map(Service.create))
    setMaleCustomersServicesPage(page)
    setMaleCustomersServicesPagesCount(Math.ceil(itemsCount / PAGINATION.itemsPerPage))
  }, [])

  const fetchFemaleCustomersServices = useCallback(async (page: number) => {
    const { items, itemsCount } =
      await listMostConsumedServicesByFemaleCustomers.execute(page)

    setFemaleCustomersServices(items.map(Service.create))
    setFemaleCustomersServicesPage(page)
    setFemaleCustomersServicesPagesCount(Math.ceil(itemsCount / PAGINATION.itemsPerPage))
  }, [])

  async function handleMaleCustomersServicesPageChange(page: number) {
    await fetchMaleCustomersServices(page)
  }

  async function handleFemaleCustomersServicesPageChange(page: number) {
    await fetchMaleCustomersServices(page)
  }

  useEffect(() => {
    fetchMaleCustomersServices(1)
    fetchFemaleCustomersServices(1)
  }, [fetchMaleCustomersServices, fetchFemaleCustomersServices])

  return {
    maleCustomersServices,
    maleCustomersServicesPage,
    maleCustomersServicesPagesCount,
    femaleCustomersServicesPage,
    femaleCustomersServicesPagesCount,
    femaleCustomersServices,
    handleMaleCustomersServicesPageChange,
    handleFemaleCustomersServicesPageChange,
  }
}
