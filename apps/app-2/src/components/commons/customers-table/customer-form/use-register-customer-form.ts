import type { z } from 'zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import type { CustomerDto } from '@world-beauty/core/dtos'

import { registerCustomerSchema } from './schemas'
import { useCallback, useEffect } from 'react'

type RegisterCustomerFormFields = z.infer<typeof registerCustomerSchema>

export function useRegisterCustomerForm(onSubmit: (customer: CustomerDto) => void) {
  const { control, register, handleSubmit } = useForm<RegisterCustomerFormFields>({
    resolver: zodResolver(registerCustomerSchema),
  })

  const { fields, append } = useFieldArray({ control, name: 'rgs' })

  const appendRgField = useCallback(() => {
    append({ value: '', issueDate: new Date(1995, 12, 12) })
  }, [append])

  function handleAppendRgButtonClick() {
    appendRgField()
  }

  function handleFormSubmit(fields: RegisterCustomerFormFields) {
    console.log(fields)
  }

  useEffect(() => {
    appendRgField()
  }, [appendRgField])

  return {
    rgsFieds: fields,
    register,
    handleSubmit: handleSubmit(handleFormSubmit),
    handleAppendRgButtonClick,
  }
}
