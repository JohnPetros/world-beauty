import type { Service } from '../../entities'
import type { Input, Output } from '../../interfaces'
import { Update } from '../update'
import { ListServices } from '../listing'

export class UpdateService extends Update {
  private isRunning = true
  private services: Service[]

  constructor(services: Service[], input: Input, output: Output) {
    super(input, output)
    this.services = services
  }

  public async update(): Promise<void> {
    const servicesList = new ListServices(this.services, this.input, this.output)
    servicesList.list()

    while (this.isRunning) {
      const id = await this.input.text('ID do serviço:')

      const service = this.services.find((service) => service.id === id)

      if (!service) {
        this.output.error('Serviço não encontrado')
        continue
      }

      await this.updateService(service)
      this.isRunning = false
    }
  }

  private async updateService(service: Service): Promise<void> {
    const option = await this.input.select('Escolha uma opção para atualizar:', [
      ['Nome', 'name'],
      ['Descrição', 'description'],
      ['Preço', 'price'],
      ['voltar', 'back'],
    ])

    switch (option) {
      case 'name':
        service.name = await this.input.text('Insira o novo nome do serviço:')
        break
      case 'description':
        service.description = await this.input.text('Insira a nova descrição do serviço:')
        break
      case 'price':
        service.price = await this.input.number('Insira o novo preço do serviço:')
        break
      case 'back':
        return
      default:
        this.output.error('Opção inválida')
    }

    const serviceIndex = this.services.findIndex((currentService) =>
      currentService.isEqualTo(service),
    )
    this.services.splice(serviceIndex, 1, service)

    this.output.clear()
    this.output.success('Serviço atualizado com sucesso')
  }
}
