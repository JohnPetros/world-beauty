import { Button, ButtonGroup, Divider, Input, Radio, RadioGroup } from '@nextui-org/react'
import { Component, type FormEvent } from 'react'

import type { CustomerDto, DocumentDto, PhoneDto } from '@world-beauty/core/dtos'
import { Icon } from '@/components/commons/icon'
import { Dialog } from '@/components/commons/dialog'
import { ServicesDialog } from './services-dialog'

type RegisterCustomerFormProps = {
  onSubmit: (customer: CustomerDto) => void
  onCancel: () => void
}

type RegisterCustomerFormState = {
  rgFieldsCount: number
  phoneFieldsCount: number
}

export class RegisterCustomerForm extends Component<
  RegisterCustomerFormProps,
  RegisterCustomerFormState
> {
  constructor(props: RegisterCustomerFormProps) {
    super(props)
    this.state = {
      rgFieldsCount: 1,
      phoneFieldsCount: 1,
    }
  }

  handleAppendRgFieldButtonClick() {
    this.setState({ ...this.state, rgFieldsCount: this.state.rgFieldsCount + 1 })
  }

  handlePopRgFieldButtonClick() {
    this.setState({ ...this.state, rgFieldsCount: this.state.rgFieldsCount - 1 })
  }

  async handleSubmit(event: FormEvent) {
    event.preventDefault()

    // @ts-ignore
    const formData = new FormData(event.target)

    const name = formData.get('name')
    const email = formData.get('email')
    const cpfValue = formData.get('cpf-value')
    const cpfIssueDate = formData.get('cpf-issue-date')
    const socialName = formData.get('social-name')
    const gender = formData.get('gender')

    const cpf = { value: String(cpfValue), issueDate: String(cpfIssueDate) }

    const rgNames = formData.getAll('rg-name[]')
    const rgIssueDates = formData.getAll('rg-issue-date[]')

    const phoneCodesArea = formData.getAll('phone-code-area[]')
    const phoneNumbers = formData.getAll('phone-number[]')

    const rgs: DocumentDto[] = []
    for (let index = 0; index < rgNames.length; index++) {
      rgs.push({ value: String(rgNames[0]), issueDate: String(rgIssueDates[0]) })
    }

    const phones: PhoneDto[] = []
    for (let index = 0; index < phoneCodesArea.length; index++) {
      phones.push({
        codeArea: String(phoneCodesArea[0]),
        number: String(phoneNumbers[0]),
      })
    }

    const customerDto: CustomerDto = {
      email: String(email),
      gender: String(gender),
      name: String(name),
      socialName: String(socialName),
      cpf,
      phones,
      rgs,
      consumedProducts: [],
      consumedServices: [],
    }

    console.log(customerDto)
  }

  render() {
    return (
      <form onSubmit={(event) => this.handleSubmit(event)} className='space-y-3'>
        <div className='grid grid-cols-2 gap-3'>
          <Input autoFocus label='Nome' name='name' variant='bordered' required />
          <Input label='Nome social' name='social-name' variant='bordered' required />
        </div>
        <div className='grid grid-cols-2 gap-3'>
          <Input type='email' name='email' label='E-mail' variant='bordered' required />
          <RadioGroup
            name='gender'
            label='Gênero'
            orientation='horizontal'
            defaultValue='male'
            isRequired
          >
            <Radio value='male'>Masculino</Radio>
            <Radio value='female'>Feminino</Radio>
          </RadioGroup>
        </div>
        <Divider />
        <div className='grid grid-cols-2'>
          <Input name='cpf-value' label='CPF' variant='bordered' required />
          <Input
            name='cpf-issue-date'
            type='date'
            label='Data de emissão'
            variant='bordered'
            required
          />
        </div>
        <Divider />
        <div>
          <div className='flex items-center justify-between'>
            <ButtonGroup>
              <Button
                size='sm'
                variant='bordered'
                onClick={() => this.handleAppendRgFieldButtonClick()}
              >
                Adicionar RG
                <Icon name='add' size={16} />
              </Button>
            </ButtonGroup>
          </div>
          <div className='mt-1 space-y-1'>
            {Array.from({ length: this.state.rgFieldsCount }).map((_, index) => (
              <div key={String(index)} className='grid grid-cols-[1fr_1fr_0.1fr]'>
                <Input
                  label='RG'
                  name='rg-name[]'
                  variant='bordered'
                  radius='sm'
                  required
                />
                <Input
                  type='date'
                  name='rg-issue-date[]'
                  label='Data de emissão'
                  variant='bordered'
                  radius='sm'
                  required
                />
                <Button
                  isIconOnly
                  variant='bordered'
                  radius='sm'
                  className='h-full text-red-600'
                >
                  <Icon name='delete' size={16} />
                </Button>
              </div>
            ))}
          </div>
        </div>
        <Divider />
        <div>
          <div className='flex items-center justify-between'>
            <ButtonGroup>
              <Button size='sm' variant='bordered'>
                Adicionar telefone
                <Icon name='add' size={16} />
              </Button>
            </ButtonGroup>
          </div>
          <div className='mt-1 space-y-1'>
            {Array.from({ length: this.state.phoneFieldsCount }).map((_, index) => (
              <div key={String(index)} className='grid grid-cols-[1fr_1fr_0.1fr]'>
                <Input
                  type='number'
                  label='DDD'
                  name='phone-code-area[]'
                  variant='bordered'
                  required
                />
                <Input label='Número' name='phone-number[]' variant='bordered' required />
                <Button
                  isIconOnly
                  variant='bordered'
                  radius='sm'
                  className='h-full text-red-600'
                  onClick={() => this.handlePopRgFieldButtonClick()}
                >
                  <Icon name='delete' size={16} />
                </Button>
              </div>
            ))}
          </div>
        </div>
        <Divider />
        <div>
          <Dialog title='Serviços' trigger={<Button>Serviços</Button>}>
            {() => <ServicesDialog defaultServicesIds={[]} onChange={() => {}} />}
          </Dialog>
        </div>
        <div className='flex items-center gap-2'>
          <Button type='submit' color='primary' className='mt-3'>
            Cadastrar
          </Button>
          <Button color='danger' onClick={this.props.onCancel} className='mt-3'>
            Cancelar
          </Button>
        </div>
      </form>
    )
  }
}

/**
 * - O use case vai receber o dto do lançamento
 * - Dentro do dto do laçamento há o id do produto
 * - Com esse id você vai buscar o produto utilizando o findById do products repository
 * - Se o produto não existir vc lança um erro not found
 * - Lembrando que um produto sempre será retornado com seus lotes
 * - Você vai usar o reduceStock do produto que vc pego com findById
 * - depois vc vai pegar os lotes atualizados pelo método updatedBatches da entidade produto
 * - você vai atulizar o estoque desses lotes no banco de dados passando esses lotes no método updateManyItemsCount do batchesRepository
 * - depois vc vai pegar os lotes com estoque zero pelo método batchesWithoutStock da entidade produto
 * - Você vai deletar esses lotes passando esses lotes no método deleteMany do batchesRepository passando somente os ids desses lotes
 * - Depois você vai criar a um objeto da entidade InventoryMovements passando o inventotyMovementDto no método create
 * - Por fim vc vai passar esse objeto da entidade InventoryMovements no método add do inventoryMovementsRepository para criá-lo no banco de dados
 */
