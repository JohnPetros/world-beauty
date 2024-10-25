import { useCallback, useEffect, useState } from 'react'

import { PAGINATION } from '@world-beauty/core/constants'
import { Service } from '@world-beauty/core/entities'
import { ListMostConsumedServicesUseCase } from '@world-beauty/core/use-cases'
import { servicesRepository } from '@/database'

export const listMostConsumedServices = new ListMostConsumedServicesUseCase(
  servicesRepository,
)

export function useMostConsumedServicesTable() {
  const [services, setServices] = useState<Service[]>([])
  const [page, setPage] = useState(1)
  const [pagesCount, setPagesCount] = useState(0)

  const fetchServices = useCallback(async (page: number) => {
    const { items, itemsCount } = await listMostConsumedServices.execute(page)

    setServices(items.map(Service.create))

    setPage(page)
    setPagesCount(Math.ceil(itemsCount / PAGINATION.itemsPerPage))
  }, [])

  async function handlePageChange(page: number) {
    await fetchServices(page)
  }

  useEffect(() => {
    fetchServices(1)
  }, [fetchServices])

  return {
    services,
    page,
    pagesCount,
    handlePageChange,
  }
}
