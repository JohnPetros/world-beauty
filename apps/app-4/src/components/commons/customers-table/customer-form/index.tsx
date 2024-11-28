import { Button, Divider, Input } from '@nextui-org/react'

import type { CustomerWithAddressDto } from '@world-beauty/core/dtos'
import type { CustomerWithAddress } from '@world-beauty/core/entities'

import { Icon } from '@/components/commons/icon'
import { useCustomerForm } from './use-customer-form'

type CustomerFormProps = {
  customer?: CustomerWithAddress
  onSubmit: (customer: CustomerWithAddressDto) => void
  onCancel: () => void
}

export const CustomerForm = ({ onCancel, onSubmit, customer }: CustomerFormProps) => {
  const {
    phoneFields,
    formErrors,
    registerField,
    handleSubmit,
    handleAppendPhoneFieldButtonClick,
    handlePopPhoneFieldButtonClick,
  } = useCustomerForm(onSubmit, customer?.dto)

  return (
    <form onSubmit={handleSubmit} className='space-y-3'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
        <Input
          autoFocus
          label='Nome'
          variant='bordered'
          isInvalid={Boolean(formErrors.name)}
          errorMessage={formErrors.name?.message}
          {...registerField('name')}
        />
        <Input
          label='Sobrenome'
          variant='bordered'
          isInvalid={Boolean(formErrors.lastname)}
          errorMessage={formErrors.lastname?.message}
          {...registerField('lastname')}
        />
      </div>
      <Divider />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
        <Input
          autoFocus
          label='E-mail'
          variant='bordered'
          isInvalid={Boolean(formErrors.email)}
          errorMessage={formErrors.email?.message}
          {...registerField('email')}
        />
        <Input
          label='Estado'
          variant='bordered'
          isInvalid={Boolean(formErrors.address?.state)}
          errorMessage={formErrors.address?.state?.message}
          {...registerField('address.state')}
        />
      </div>
      <Divider />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
        <Input
          autoFocus
          label='Cidade'
          variant='bordered'
          isInvalid={Boolean(formErrors.address?.city)}
          errorMessage={formErrors.address?.city?.message}
          {...registerField('address.city')}
        />
        <Input
          label='Código postal'
          variant='bordered'
          isInvalid={Boolean(formErrors.address?.zipcode)}
          errorMessage={formErrors.address?.zipcode?.message}
          {...registerField('address.zipcode')}
        />
      </div>
      <Divider />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
        <Input
          autoFocus
          label='Rua'
          variant='bordered'
          isInvalid={Boolean(formErrors.address?.street)}
          errorMessage={formErrors.address?.street?.message}
          {...registerField('address.street')}
        />
        <Input
          label='Número'
          variant='bordered'
          isInvalid={Boolean(formErrors.address?.number)}
          errorMessage={formErrors.address?.number?.message}
          {...registerField('address.number')}
        />
      </div>
      <Divider />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
        <Input
          autoFocus
          label='Bairro'
          variant='bordered'
          isInvalid={Boolean(formErrors.address?.neighborhood)}
          errorMessage={formErrors.address?.neighborhood?.message}
          {...registerField('address.neighborhood')}
        />
        <Input
          label='Complemento'
          variant='bordered'
          placeholder='Apartamento 2, etc.'
          isInvalid={Boolean(formErrors.address?.complement)}
          errorMessage={formErrors.address?.complement?.message}
          {...registerField('address.complement')}
        />
      </div>
      <Divider />
      <div>
        <div className='flex items-center justify-between'>
          <Button
            size='sm'
            radius='sm'
            variant='bordered'
            onClick={handleAppendPhoneFieldButtonClick}
            className='text-zinc-500'
          >
            Adicionar telefone
            <Icon name='add' size={16} />
          </Button>
        </div>
        <div className='mt-1 space-y-1'>
          {phoneFields.map((_, index) => (
            <div
              key={String(index)}
              className='grid grid-cols-1 md:grid-cols-[1fr_1fr_0.25fr] gap-2'
            >
              <Input
                label='DDD'
                variant='bordered'
                isInvalid={Boolean(formErrors.phones?.[index]?.codeArea?.message)}
                max={2}
                min={2}
                errorMessage={formErrors.phones?.[index]?.codeArea?.message}
                {...registerField(`phones.${index}.codeArea`)}
              />
              <Input
                label='Número'
                variant='bordered'
                max={9}
                min={9}
                isInvalid={Boolean(formErrors.phones?.[index]?.number?.message)}
                errorMessage={formErrors.phones?.[index]?.number?.message}
                {...registerField(`phones.${index}.number`)}
              />
              <Button
                isIconOnly
                variant='bordered'
                radius='sm'
                onClick={() => handlePopPhoneFieldButtonClick(index)}
                className='w-full text-red-600'
              >
                <Icon name='delete' size={16} />
              </Button>
            </div>
          ))}
        </div>
        <p className='text-danger text-sm'>{formErrors.phones?.message}</p>
      </div>
      <Divider />
      <div className='flex items-center gap-2'>
        <Button type='submit' color='primary' className='mt-3'>
          Enviar
        </Button>
        <Button color='danger' onClick={onCancel} className='mt-3'>
          Cancelar
        </Button>
      </div>
    </form>
  )
}
