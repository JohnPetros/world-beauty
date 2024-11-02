import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { PAGINATION } from '@world-beauty/core/constants'
import { Service } from '@world-beauty/core/entities'
import type { ServiceDto } from '@world-beauty/core/dtos'

import { servicesService } from '@/api'

export function useServicesPage() {
  const [Services, setServices] = useState<Service[]>([])
  const [pagesCount, setPagesCount] = useState(0)
  const [selectedServicesIds, setSelectedServicesIds] = useState<string[]>([])
  const [page, setPage] = useState(1)
  const [isFetching, setIsFetching] = useState(true)

  const fetchServices = useCallback(async (page: number) => {
    const response = await servicesService.listServices(page)
    setServices(response.body.items.map(Service.create))
    setPagesCount(Math.ceil(response.body.itemsCount / PAGINATION.itemsPerPage))
    setPage(page)
  }, [])

  function handleServicesSelectionChange(selectedServicesIds: string[]) {
    setSelectedServicesIds(selectedServicesIds)
  }

  async function handlePageChange(page: number) {
    await fetchServices(page)
  }

  async function handleDeleteButtonClick() {
    setSelectedServicesIds([])
    await servicesService.deleteServices(selectedServicesIds)
    await fetchServices(1)
  }

  async function handleUpdateService(ServiceDto: ServiceDto, ServiceId: string) {
    const response = await servicesService.updateService(
      Service.create({ id: ServiceId, ...ServiceDto }),
    )
    if (response.isFailure) {
      toast.error('Erro ao atualizar cliente')
      return
    }
    await fetchServices(1)
    toast.success('Cliente atualizado com sucessso')
  }

  async function handleRegisterService(ServiceDto: ServiceDto) {
    const response = await servicesService.registerService(Service.create(ServiceDto))
    if (response.isFailure) {
      toast.error('Erro ao registrar cliente')
      return
    }
    await fetchServices(1)
    toast.success('Cliente criado com sucessso')
  }

  useEffect(() => {
    fetchServices(1)
    setIsFetching(false)
  }, [fetchServices])

  return {
    Services,
    page,
    pagesCount,
    isFetching,
    selectedServicesIds,
    handleRegisterService,
    handleUpdateService,
    handleDeleteButtonClick,
    handleServicesSelectionChange,
    handlePageChange,
  }
}
