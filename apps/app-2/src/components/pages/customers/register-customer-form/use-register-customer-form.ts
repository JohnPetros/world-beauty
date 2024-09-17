import type { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import type { CustomerDto } from '@world-beauty/core/dtos'

import { registerCustomerSchema } from './schemas'

type RegisterCustomerFormFields = z.infer<typeof registerCustomerSchema>

export function useRegisterCustomerForm(onSubmit: (customer: CustomerDto) => void) {
  const { register, handleSubmit } = useForm<RegisterCustomerFormFields>({
    resolver: zodResolver(registerCustomerSchema),
  })

  function handleFormSubmit(fields: RegisterCustomerFormFields) {
    console.log(fields)
  }

  return {
    register,
    handleSubmit: handleSubmit(handleFormSubmit),
  }
}
