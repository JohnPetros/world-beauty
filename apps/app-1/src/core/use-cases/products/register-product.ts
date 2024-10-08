import { Product } from '../../entities'
import type { Input, Output } from '../../interfaces'
import { Register } from '../register'

export class RegisterProduct extends Register {
  private products: Product[]

  constructor(products: Product[], input: Input, output: Output) {
    super(input, output)
    this.products = products
  }

  public async register(): Promise<void> {
    this.output.clear()
    const name = await this.input.text('Nome do produto:')
    const description = await this.input.text('Descrição do produto:')
    const price = await this.input.number('Preço do produto:')

    const product = new Product({ name, description, price, ordersCount: 0 })

    this.products.push(product)
    this.output.clear()
    this.output.success('Produto cadastrado com sucesso')
  }
}
