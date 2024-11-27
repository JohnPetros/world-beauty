import { Button, Divider, Input, Textarea } from '@nextui-org/react'

import type { ServiceDto } from '@world-beauty/core/dtos'
import type { Service } from '@world-beauty/core/entities'

import { useServiceForm } from './use-service.form'

type ServiceFormProps = {
  service?: Service
  onSubmit: (Service: ServiceDto) => void
  onCancel: () => void
}

export const ServiceForm = ({ service, onSubmit, onCancel }: ServiceFormProps) => {
  const { formErrors, registerField, handleFormSubmit } = useServiceForm(
    onSubmit,
    service?.dto,
  )

  return (
    <form onSubmit={handleFormSubmit} className='space-y-3'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
        <Input
          label='Nome'
          autoFocus
          variant='bordered'
          isInvalid={Boolean(formErrors.name)}
          errorMessage={formErrors.name?.message}
          {...registerField('name')}
        />
        <Input
          label='Preço'
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
          Enviar
        </Button>
        <Button color='danger' onClick={() => onCancel()} className='mt-3'>
          Cancelar
        </Button>
      </div>
    </form>
  )
}
