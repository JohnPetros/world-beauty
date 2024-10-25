import type { Selection } from '@nextui-org/react'

import type { ServiceDto } from '@world-beauty/core/dtos'
import type { Service } from '@world-beauty/core/entities'

type UseServicesTableProps = {
  services: Service[]
  onPageChange?: (page: number) => void
  onUpdateService?: (serviceDto: ServiceDto, serviceId: string) => void
  onServicesSelectionChange?: (serviceIds: string[]) => void
}

export function useServicesTable({
  services,
  onPageChange,
  onServicesSelectionChange,
  onUpdateService,
}: UseServicesTableProps) {
  async function handleServicesSelectionChange(ServicesSelection: Selection) {
    let selectedServicesIds: string[] = []

    if (ServicesSelection === 'all') {
      selectedServicesIds = services.map((service) => service.id)
    } else {
      selectedServicesIds = Array.from(ServicesSelection).map(String)
    }

    if (onServicesSelectionChange) onServicesSelectionChange(selectedServicesIds)
  }

  function handlePageChange(page: number) {
    if (onPageChange) onPageChange(page)
  }

  async function handleUpdateService(ServiceDto: ServiceDto, serviceId: string) {
    if (onUpdateService) onUpdateService(ServiceDto, serviceId)
  }

  return {
    handleServicesSelectionChange,
    handleUpdateService,
    handlePageChange,
  }
}
