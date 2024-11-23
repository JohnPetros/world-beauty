import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { PAGINATION } from '@world-beauty/core/constants'
import { Service } from '@world-beauty/core/entities'
import { reportsService } from '@/api'

export function useMostConsumedServicesTableByGender() {
  const [maleCustomersServices, setMaleCustomersServices] = useState<Service[]>([])
  const [maleCustomersServicesPage, setMaleCustomersServicesPage] = useState(0)
  const [maleCustomersServicesPagesCount, setMaleCustomersServicesPagesCount] =
    useState(0)
  const [femaleCustomersServices, setFemaleCustomersServices] = useState<Service[]>([])
  const [femaleCustomersServicesPage, setFemaleCustomersServicesPage] = useState(0)
  const [femaleCustomersServicesPagesCount, setFemaleCustomersServicesPagesCount] =
    useState(0)
  const [isFetchingMaleCustomers, setIsFetchingMaleCustomers] = useState(true)
  const [isFetchingFemaleCustomers, setIsFetchingFemaleCustomers] = useState(true)

  const fetchMaleCustomersServices = useCallback(async (page: number) => {
    setIsFetchingMaleCustomers(true)
    const response = await reportsService.listMostConsumedServices(page, 'male')

    if (response.isFailure) {
      toast.error(response.errorMessage)
    }

    if (response.isSuccess) {
      setMaleCustomersServices(response.body.items.map(Service.create))
      setMaleCustomersServicesPage(page)
      setMaleCustomersServicesPagesCount(
        Math.ceil(response.body.itemsCount / PAGINATION.itemsPerPage),
      )
    }

    setIsFetchingMaleCustomers(false)
  }, [])

  const fetchFemaleCustomersServices = useCallback(async (page: number) => {
    setIsFetchingFemaleCustomers(true)
    const response = await reportsService.listMostConsumedServices(page, 'female')

    if (response.isFailure) {
      toast.error(response.errorMessage)
    }

    if (response.isSuccess) {
      setFemaleCustomersServices(response.body.items.map(Service.create))
      setFemaleCustomersServicesPage(page)
      setFemaleCustomersServicesPagesCount(
        Math.ceil(response.body.itemsCount / PAGINATION.itemsPerPage),
      )
    }

    setIsFetchingFemaleCustomers(false)
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
    isFetchingMaleCustomers,
    isFetchingFemaleCustomers,
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
