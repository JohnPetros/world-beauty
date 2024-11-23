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
    setIsFetching(true)
    const response = await servicesService.listServices(page)

    if (response.isFailure) {
      toast.error(response.errorMessage)
    }

    if (response.isSuccess) {
      setServices(response.body.items.map(Service.create))
      setPagesCount(Math.ceil(response.body.itemsCount / PAGINATION.itemsPerPage))
      setPage(page)
    }

    setIsFetching(false)
  }, [])

  function handleServicesSelectionChange(selectedServicesIds: string[]) {
    setSelectedServicesIds(selectedServicesIds)
  }

  async function handlePageChange(page: number) {
    await fetchServices(page)
  }

  async function handleDeleteButtonClick() {
    const shouldDelete = confirm('Deseja deletar esse(s) Serviços(s)?')
    if (!shouldDelete) return

    setIsFetching(true)

    const response = await servicesService.deleteServices(selectedServicesIds)
    if (response.isFailure) {
      toast.error(response.errorMessage)
    }

    if (response.isSuccess) {
      await fetchServices(1)
      toast.success(
        selectedServicesIds.length > 1
          ? 'Serviços deletados com sucessso'
          : 'Serviço deletado com sucessso',
      )
    }

    setSelectedServicesIds([])
    setIsFetching(false)
  }

  async function handleUpdateService(ServiceDto: ServiceDto, ServiceId: string) {
    const response = await servicesService.updateService(
      Service.create({ id: ServiceId, ...ServiceDto }),
    )
    if (response.isFailure) {
      toast.error(response.errorMessage)
    }

    if (response.isSuccess) {
      await fetchServices(1)
      toast.success('Serviço atualizado com sucessso')
    }

    setIsFetching(false)
  }

  async function handleRegisterService(ServiceDto: ServiceDto) {
    setIsFetching(true)

    const response = await servicesService.registerService(Service.create(ServiceDto))
    if (response.isFailure) {
      toast.error(response.errorMessage)
    }

    if (response.isSuccess) {
      await fetchServices(1)
      toast.success('Serviço registrado com sucessso')
    }
  }

  useEffect(() => {
    fetchServices(1)
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
