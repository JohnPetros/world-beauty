import { Button, Divider, Input, Textarea } from '@nextui-org/react'

import type { ProductDto } from '@world-beauty/core/dtos'
import type { Product } from '@world-beauty/core/entities'

import { useProductForm } from './use-product-form'

type ProductFormProps = {
  product?: Product
  onSubmit: (Product: ProductDto) => void
  onCancel: () => void
}

export const ProductForm = ({ product, onSubmit, onCancel }: ProductFormProps) => {
  const { formErrors, registerField, handleFormSubmit } = useProductForm(
    onSubmit,
    product?.dto,
  )

  return (
    <form onSubmit={handleFormSubmit} className='space-y-3'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
        <Input
          label='Nome'
          autoFocus
          defaultValue={product?.name}
          variant='bordered'
          isInvalid={Boolean(formErrors.name)}
          errorMessage={formErrors.name?.message}
          {...registerField('name')}
        />
        <Input
          label='Preço'
          defaultValue={product?.price.toString()}
          variant='bordered'
          isInvalid={Boolean(formErrors.price)}
          errorMessage={formErrors.price?.message}
          {...registerField('price')}
        />
      </div>
      <Divider />
      <Textarea
        label='Descrição'
        variant='bordered'
        isInvalid={Boolean(formErrors.description)}
        errorMessage={formErrors.description?.message}
        {...registerField('description')}
      />
      <div className='flex items-center gap-2'>
        <Button type='submit' color='primary' className='mt-3'>
          Cadastrar
        </Button>
        <Button color='danger' onClick={() => onCancel()} className='mt-3'>
          Cancelar
        </Button>
      </div>
    </form>
  )
}
