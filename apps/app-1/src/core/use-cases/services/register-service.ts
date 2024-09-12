import { Service } from '../../entities'
import type { Input, Output } from '../../interfaces'
import { Register } from '../register'

export class RegisterService extends Register {
  private services: Service[]

  constructor(services: Service[], input: Input, output: Output) {
    super(input, output)
    this.services = services
  }

  public async register(): Promise<void> {
    const name = await this.input.text('Nome do serviço:')
    const description = await this.input.text('Descrição do serviço:')
    const price = await this.input.number('Preço do serviço:')

    const service = new Service({ name, description, price })

    this.services.push(service)
    this.output.clear()
    this.output.success('Serviço cadastrado com sucesso')
  }
}
