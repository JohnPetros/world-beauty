import type { IServicesRepository } from '../../interfaces'

export class ListAllServicesUseCase {
  constructor(private readonly servicesRepository: IServicesRepository) {}

  async execute() {
    const services = this.servicesRepository.findAll()

    return services.map((service) => service.dto)
  }
}
