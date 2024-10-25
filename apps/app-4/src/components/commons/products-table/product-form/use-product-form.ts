import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import type { ProductDto } from '@world-beauty/core/dtos'
import { useForm } from 'react-hook-form'
import {
  descriptionSchema,
  nameSchema,
  priceSchema,
} from '@world-beauty/validation/schemas'

const productSchema = z.object({
  name: nameSchema,
  price: priceSchema,
  description: descriptionSchema,
})

type ProductFormFields = z.infer<typeof productSchema>

export function useProductForm(
  onSubmit: (productDto: ProductDto) => void,
  productDto?: ProductDto,
) {
  const { control, formState, register, handleSubmit } = useForm<ProductFormFields>({
    defaultValues: {
      name: productDto?.name,
      price: productDto?.price,
      description: productDto?.description,
    },
    resolver: zodResolver(productSchema),
  })

  async function handleFormSubmit(fields: ProductFormFields) {
    const productDto: ProductDto = {
      name: fields.name,
      description: fields.description,
      price: fields.price,
      category: 'product',
    }

    onSubmit(productDto)
  }

  return {
    formControl: control,
    formErrors: formState.errors,
    registerField: register,
    handleFormSubmit: handleSubmit(handleFormSubmit),
  }
}
