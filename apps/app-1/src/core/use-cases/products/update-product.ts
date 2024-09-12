import type { Product } from '../../entities'
import type { Input, Output } from '../../interfaces'
import { Update } from '../update'
import { ListProducts } from '../listing'

export class UpdateProduct extends Update {
  private isRunning = true
  private products: Product[]

  constructor(products: Product[], input: Input, output: Output) {
    super(input, output)
    this.products = products
  }

  public async update(): Promise<void> {
    this.output.clear()
    const productsList = new ListProducts(this.products, this.input, this.output)
    productsList.list()

    while (this.isRunning) {
      const id = await this.input.text('ID do produto:')

      const product = this.products.find((product) => product.id === id)

      if (!product) {
        this.output.error('Produto não encontrado')
        continue
      }

      await this.updateProduct(product)
      this.isRunning = false
    }
  }

  private async updateProduct(product: Product): Promise<void> {
    const option = await this.input.select('Escolha uma opção para atualizar:', [
      ['Nome', 'name'],
      ['Descrição', 'description'],
      ['Preço', 'price'],
      ['voltar', 'back'],
    ])

    switch (option) {
      case 'name':
        product.name = await this.input.text('Insira o novo nome do produto:')
        break
      case 'description':
        product.description = await this.input.text('Insira a nova descrição do produto:')
        break
      case 'price':
        product.price = await this.input.number('Insira o novo preço do produto:')
        break
      case 'back':
        return
      default:
        this.output.error('Opção inválida')
    }

    const productIndex = this.products.findIndex((currentProduct) =>
      currentProduct.isEqualTo(product),
    )
    this.products.splice(productIndex, 1, product)

    this.output.success('Produto atualizado com sucesso')
  }
}
