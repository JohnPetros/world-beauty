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

    async add(service: Service) {
      const services = await this.findAll()

      services.unshift(service)

      localStorage.set(
        KEYS.services,
        services.map((service) => service.dto),
      )
    },

    async update(service: Service) {
      const services = await this.findAll()

      localStorage.set(
        KEYS.services,
        services.map((currentService) => {
          return currentService.isEqualTo(service) ? service.dto : currentService.dto
        }),
      )
    },

    async removeMany(servicesIds: string[]) {
      const services = await this.findAll()

      localStorage.set(
        KEYS.services,
        services
          .filter((service) => !servicesIds.includes(service.id))
          .map((service) => service.dto),
      )
    },

    async removeAll() {
      localStorage.remove(KEYS.services)
    },
  }
}
