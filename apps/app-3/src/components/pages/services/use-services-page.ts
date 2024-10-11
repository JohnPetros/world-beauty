import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import {
  DeleteServicesUseCase,
  ListServicesUseCase,
  RegisterServiceUseCase,
  UpdateServiceUseCase,
} from '@world-beauty/core/use-cases'
import { PAGINATION } from '@world-beauty/core/constants'
import { Service } from '@world-beauty/core/entities'
import type { ServiceDto } from '@world-beauty/core/dtos'

import { servicesRepository } from '@/database'

const registerServiceUseCase = new RegisterServiceUseCase(servicesRepository)
const listServicesUseCase = new ListServicesUseCase(servicesRepository)
const updateServiceUseCase = new UpdateServiceUseCase(servicesRepository)
const deleteServicesUseCase = new DeleteServicesUseCase(servicesRepository)

export function useServicesPage() {
  const [Services, setServices] = useState<Service[]>([])
  const [pagesCount, setPagesCount] = useState(0)
  const [selectedServicesIds, setSelectedServicesIds] = useState<string[]>([])
  const [page, setPage] = useState(1)
  const [isFetching, setIsFetching] = useState(true)

  const fetchServices = useCallback(async (page: number) => {
    const response = await listServicesUseCase.execute(page)
    setServices(response.items.map(Service.create))
    setPagesCount(Math.ceil(response.itemsCount / PAGINATION.itemsPerPage))
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
    await deleteServicesUseCase.execute(selectedServicesIds)
    await fetchServices(1)
  }

  async function handleUpdateService(ServiceDto: ServiceDto) {
    await updateServiceUseCase.execute(ServiceDto)
    await fetchServices(1)
  }

  function handleServiceOrderItems() {
    fetchServices(page)
    toast('Pedido realizado com sucesso!', { type: 'success' })
  }

  async function handleFormSubmit(
    ServiceDto: ServiceDto,
    closeDialog: VoidFunction,
    action: 'register' | 'update',
  ) {
    if (action === 'register') {
      await registerServiceUseCase.execute(ServiceDto)
    } else {
      await updateServiceUseCase.execute(ServiceDto)
    }
    await fetchServices(1)
    closeDialog()
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
    handleFormSubmit,
    handleUpdateService,
    handleDeleteButtonClick,
    handleServiceOrderItems,
    handleServicesSelectionChange,
    handlePageChange,
  }
}
