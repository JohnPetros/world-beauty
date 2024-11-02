import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import type { ServiceDto } from '@world-beauty/core/dtos'
import { useForm } from 'react-hook-form'
import {
  descriptionSchema,
  nameSchema,
  priceSchema,
} from '@world-beauty/validation/schemas'

const serviceSchema = z.object({
  name: nameSchema,
  price: priceSchema,
  description: descriptionSchema,
})

type serviceFormFields = z.infer<typeof serviceSchema>

export function useServiceForm(
  onSubmit: (serviceDto: ServiceDto) => void,
  serviceDto?: ServiceDto,
) {
  const { control, formState, register, handleSubmit } = useForm<serviceFormFields>({
    defaultValues: {
      name: serviceDto?.name,
      price: serviceDto?.price,
      description: serviceDto?.description,
    },
    resolver: zodResolver(serviceSchema),
  })

  async function handleFormSubmit(fields: serviceFormFields) {
    const serviceDto: ServiceDto = {
      name: fields.name,
      description: fields.description,
      price: fields.price,
      category: 'service',
    }

    onSubmit(serviceDto)
  }

  return {
    formControl: control,
    formErrors: formState.errors,
    registerField: register,
    handleFormSubmit: handleSubmit(handleFormSubmit),
  }
}
