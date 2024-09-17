import { PAGINATION } from '@world-beauty/core/constants'
import type { ServiceDto } from '@world-beauty/core/dtos'
import type { IServicesRepository } from '@world-beauty/core/interfaces'
import { Service } from '@world-beauty/core/entities'

import { KEYS } from '../keys'
import { LocalStorage } from '../local-storage'

export const LocalStorageServicesRepository = (): IServicesRepository => {
  const localStorage = LocalStorage()

  return {
    async findAll() {
      const servicesDto = localStorage.get<ServiceDto[]>(KEYS.services)
      if (!servicesDto) return []
      return servicesDto.map(Service.create)
    },

    async findAllPaginated(page: number) {
      const servicesDto = localStorage.get<ServiceDto[]>(KEYS.services)
      if (!servicesDto) return []

      const start = (page - 1) * PAGINATION.itemsPerPage
      const end = start + PAGINATION.itemsPerPage

      return servicesDto.map(Service.create).slice(start, end)
    },

    async count() {
      const constumers = await this.findAll()
      return constumers.length
    },

    async add(service) {
      const constumers = await this.findAll()
      localStorage.set(KEYS.services, [
        service.dto,
        ...constumers.map((service) => service.dto),
      ])
    },

    async removeAll() {
      localStorage.remove(KEYS.services)
    },
  }
}
