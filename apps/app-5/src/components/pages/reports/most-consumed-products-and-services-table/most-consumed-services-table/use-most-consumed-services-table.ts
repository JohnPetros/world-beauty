import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { PAGINATION } from '@world-beauty/core/constants'
import { Service } from '@world-beauty/core/entities'
import { reportsService } from '@/api'

export function useMostConsumedServicesTable() {
  const [Services, setServices] = useState<Service[]>([])
  const [page, setPage] = useState(1)
  const [pagesCount, setPagesCount] = useState(0)

  const fetchServices = useCallback(async (page: number) => {
    const response = await reportsService.listMostConsumedServices(page)

    if (response.isFailure) {
      toast.error(
        'Não foi possível listar os serviços mais consumidos, tente novamente mais tarde',
      )
      return
    }

    setServices(response.body.items.map(Service.create))
    setPage(page)
    setPagesCount(Math.ceil(response.body.itemsCount / PAGINATION.itemsPerPage))
  }, [])

  async function handlePageChange(page: number) {
    await fetchServices(page)
  }

  useEffect(() => {
    fetchServices(1)
  }, [fetchServices])

  return {
    Services,
    page,
    pagesCount,
    handlePageChange,
  }
}
