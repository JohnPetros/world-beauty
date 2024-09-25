import { Component, type FormEvent } from 'react'
import { Button, Divider, Input, Textarea } from '@nextui-org/react'

import type { ProductDto } from '@world-beauty/core/dtos'
import type { Product } from '@world-beauty/core/entities'

type ProductFormProps = {
  product?: Product
  onSubmit: (Product: ProductDto) => void
  onCancel: () => void
}

type ProductFormState = {
  rgFieldsCount: number
  phoneFieldsCount: number
}

export class ProductForm extends Component<ProductFormProps, ProductFormState> {
  constructor(props: ProductFormProps) {
    super(props)
    this.state = {
      rgFieldsCount: 1,
      phoneFieldsCount: 1,
    }
  }

  async handleSubmit(event: FormEvent) {
    event.preventDefault()

    // @ts-ignore
    const formData = new FormData(event.target)

    const name = String(formData.get('name'))
    const price = Number(formData.get('price'))
    const description = String(formData.get('description'))

    const ProductDto: ProductDto = {
      name,
      price,
      description,
    }

    if (this.props.product) {
      const updatedProduct = this.props.product.update(ProductDto)
      this.props.onSubmit(updatedProduct.dto)
      return
    }

    this.props.onSubmit(ProductDto)
  }

  render() {
    return (
      <form onSubmit={(event) => this.handleSubmit(event)} className='space-y-3'>
        <div className='grid grid-cols-2 gap-3'>
          <Input
            autoFocus
            label='Nome'
            name='name'
            defaultValue={this.props.product?.name}
            variant='bordered'
            required
          />
          <Input
            label='Preço'
            name='price'
            defaultValue={this.props.product?.priceAsNumber.toString()}
            variant='bordered'
            required
          />
        </div>
        <Divider />
        <Textarea
          label='Descrição'
          name='description'
          variant='bordered'
          defaultValue={this.props.product?.description}
        />
        <div className='flex items-center gap-2'>
          <Button type='submit' color='primary' className='mt-3'>
            Cadastrar
          </Button>
          <Button color='danger' onClick={() => this.props.onCancel()} className='mt-3'>
            Cancelar
          </Button>
        </div>
      </form>
    )
  }
}
