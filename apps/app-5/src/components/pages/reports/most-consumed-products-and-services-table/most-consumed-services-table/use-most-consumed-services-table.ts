import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { PAGINATION } from '@world-beauty/core/constants'
import { Service } from '@world-beauty/core/entities'
import { reportsService } from '@/api'

export function useMostConsumedServicesTable() {
  const [services, setServices] = useState<Service[]>([])
  const [page, setPage] = useState(1)
  const [pagesCount, setPagesCount] = useState(0)
  const [isFetching, setIsFetching] = useState(true)

  const fetchServices = useCallback(async (page: number) => {
    setIsFetching(true)
    const response = await reportsService.listMostConsumedServices(page)

    if (response.isFailure) {
      toast.error(response.errorMessage)
    }

    if (response.isSuccess) {
      setServices(response.body.items.map(Service.create))
      setPage(page)
      setPagesCount(Math.ceil(response.body.itemsCount / PAGINATION.itemsPerPage))
    }

    setIsFetching(false)
  }, [])

  async function handlePageChange(page: number) {
    await fetchServices(page)
  }

  useEffect(() => {
    fetchServices(1)
  }, [fetchServices])

  return {
    isFetching,
    services,
    page,
    pagesCount,
    handlePageChange,
  }
}
