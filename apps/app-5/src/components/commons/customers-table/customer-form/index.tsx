import { Button, Divider, Input, Radio, RadioGroup } from '@nextui-org/react'
import { Controller } from 'react-hook-form'

import type { CustomerDto } from '@world-beauty/core/dtos'
import type { Customer } from '@world-beauty/core/entities'

import { Icon } from '@/components/commons/icon'
import { useCustomerForm } from './use-customer-form'
import { Datetime } from '@world-beauty/core/libs'

type CustomerFormProps = {
  customer?: Customer
  onSubmit: (customer: CustomerDto) => void
  onCancel: () => void
}

export const CustomerForm = ({ onCancel, onSubmit, customer }: CustomerFormProps) => {
  const {
    rgFields,
    phoneFields,
    formControl,
    formErrors,
    registerField,
    handleSubmit,
    handleAppendRgFieldButtonClick,
    handlePopRgFieldButtonClick,
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
          label='Nome social'
          variant='bordered'
          isInvalid={Boolean(formErrors.socialName)}
          errorMessage={formErrors.socialName?.message}
          {...registerField('socialName')}
        />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
        <Controller
          name='gender'
          control={formControl}
          render={({ field: { value, onChange } }) => (
            <RadioGroup
              label='Gênero'
              defaultValue={value ?? 'female'}
              orientation='horizontal'
              onValueChange={onChange}
              isInvalid={Boolean(formErrors.gender?.message)}
              errorMessage={formErrors.gender?.message}
            >
              <Radio value='male'>Masculino</Radio>
              <Radio value='female'>Feminino</Radio>
            </RadioGroup>
          )}
        />
      </div>
      <Divider />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
        <Input
          label='CPF'
          variant='bordered'
          max={11}
          min={11}
          isInvalid={Boolean(formErrors.cpf?.value)}
          errorMessage={formErrors.cpf?.value?.message}
          {...registerField('cpf.value')}
        />

        <Controller
          name='cpf.issueDate'
          control={formControl}
          render={({ field: { value, onChange } }) => (
            <Input
              type='date'
              label='Data de emissão'
              variant='bordered'
              value={value && new Datetime(value).format('YYYY-MM-DD')}
              onChange={(event) => onChange(new Date(event.currentTarget.value))}
              isInvalid={Boolean(formErrors.cpf?.issueDate)}
              errorMessage={formErrors.cpf?.issueDate?.message}
            />
          )}
        />
      </div>
      <Divider />
      <div>
        <div className='flex items-center justify-between'>
          <Button
            size='sm'
            variant='bordered'
            className='text-zinc-500'
            onClick={() => handleAppendRgFieldButtonClick()}
          >
            Adicionar RG
            <Icon name='add' size={16} />
          </Button>
        </div>
        <div className='mt-1 space-y-1'>
          {rgFields.map((rgField, index) => (
            <div
              key={rgField.id}
              className='grid grid-cols-1 md:grid-cols-[1fr_1fr_0.25fr] gap-2'
            >
              <Input
                label='RG'
                variant='bordered'
                radius='sm'
                max={10}
                min={10}
                isInvalid={Boolean(formErrors.rgs?.[index]?.value?.message)}
                errorMessage={formErrors.rgs?.[index]?.value?.message}
                {...registerField(`rgs.${index}.value`)}
              />

              <Controller
                name={`rgs.${index}.issueDate`}
                control={formControl}
                render={({ field: { value, onChange } }) => (
                  <Input
                    type='date'
                    label='Data de emissão'
                    variant='bordered'
                    value={value && new Datetime(value).format('YYYY-MM-DD')}
                    onChange={(event) => onChange(new Date(event.currentTarget.value))}
                    isInvalid={Boolean(formErrors.rgs?.[index]?.issueDate?.message)}
                    errorMessage={formErrors.rgs?.[index]?.issueDate?.message}
                  />
                )}
              />
              <Button
                isIconOnly
                variant='bordered'
                radius='sm'
                className='w-full text-red-600'
                onClick={() => handlePopRgFieldButtonClick(index)}
              >
                <Icon name='delete' size={16} />
              </Button>
            </div>
          ))}
        </div>
        <p className='text-danger text-sm'>{formErrors.rgs?.message}</p>
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
