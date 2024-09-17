import { Button, CalendarDate, DateInput, Input } from '@nextui-org/react'

import { useRegisterCustomerForm } from './use-register-customer-form'
import type { CustomerDto } from '@world-beauty/core/dtos'
import { Icon } from '@/components/commons/icon'

type RegisterCustomerFormProps = {
  onSubmit: (customer: CustomerDto) => void
}

export const RegisterCustomerForm = ({ onSubmit }: RegisterCustomerFormProps) => {
  const { handleSubmit, register } = useRegisterCustomerForm(onSubmit)

  return (
    <form onSubmit={handleSubmit} className='space-y-3'>
      <div className='flex items-center gap-3'>
        <Input
          autoFocus
          label='Nome'
          placeholder='Rodrigo Faro'
          variant='bordered'
          {...register('name')}
        />
        <Input
          label='Nome social'
          placeholder='DelaAccrux'
          variant='bordered'
          {...register('socialName')}
        />
      </div>
      <div className='flex items-center gap-6'>
        <Input
          type='email'
          label='E-mail'
          placeholder='nome@provedor.com'
          variant='bordered'
          {...register('email')}
        />
        <Input
          label='CPF'
          placeholder='xxxxxxxxxxx'
          variant='bordered'
          {...register('cpf')}
        />
      </div>
      <div>
        <div>
          <Input label='RG' placeholder='xxxxxxxxxxx' variant='bordered' />
          <DateInput
            label='Data de emissão'
            placeholderValue={new CalendarDate(1995, 11, 6)}
          />
          <Button isIconOnly>
            <Icon name='delete' />
          </Button>
          <Button isIconOnly>
            <Icon name='add' />
          </Button>
        </div>
      </div>
    </form>
  )
}
