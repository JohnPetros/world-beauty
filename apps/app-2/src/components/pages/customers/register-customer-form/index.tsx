import { Button, ButtonGroup, Divider, Input, Radio, RadioGroup } from '@nextui-org/react'
import { Component, type FormEvent } from 'react'

import type { CustomerDto, DocumentDto, PhoneDto } from '@world-beauty/core/dtos'
import { Icon } from '@/components/commons/icon'

type RegisterCustomerFormProps = {
  onSubmit: (customer: CustomerDto) => void
  onCancel: () => void
}

type RegisterCustomerFormState = {
  name: string
  socialName: string
  email: string
  cpf: DocumentDto
  rgs: DocumentDto[]
  phones: PhoneDto[]
  rgFields: number[]
  phoneFields: number[]
}

export class RegisterCustomerForm extends Component<
  RegisterCustomerFormProps,
  RegisterCustomerFormState
> {
  constructor(props: RegisterCustomerFormProps) {
    super(props)
    this.state = {
      name: '',
      cpf: { value: '', issueDate: '' },
      email: '',
      socialName: '',
      rgs: [],
      phones: [],
      rgFields: [1],
      phoneFields: [1],
    }
  }

  handleEmailChange(email: string) {
    this.setState({ ...this.state, email })
  }

  handleNameChange(name: string) {
    this.setState({ ...this.state, name })
  }

  handleSocialNameChange(socialName: string) {
    this.setState({ ...this.state, socialName })
  }

  handleCpfValueChange(cpfValue: string) {
    this.setState({ ...this.state, cpf: { ...this.state.cpf, value: cpfValue } })
  }

  handleCpfIssueDateChange(cpfIssueDate: string) {
    this.setState({ ...this.state, cpf: { ...this.state.cpf, issueDate: cpfIssueDate } })
  }

  handleAppendRgFieldButtonClick() {
    this.state.rgFields.push(1)
    this.setState({ ...this.state, rgFields: this.state.rgFields })
  }

  handlePopRgFieldButtonClick(index: number) {
    alert(index)
    this.state.rgFields.splice(index, 1)
    this.setState({ ...this.state, rgFields: this.state.rgFields })
  }

  handleRgValueChange(rgValue: string, index: number) {
    this.state.rgs[index].value = rgValue
    this.setState({ ...this.state })
  }

  handleRgIssueDateChange(issueDate: string, index: number) {
    this.state.rgs[index].issueDate = issueDate
    this.setState({ ...this.state })
  }

  async handleSubmit(event: FormEvent) {
    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={(event) => this.handleSubmit(event)} className='space-y-3'>
        <div className='grid grid-cols-2 gap-3'>
          <Input
            autoFocus
            label='Nome'
            variant='bordered'
            value={this.state.name}
            onChange={(event) => this.handleNameChange(event.currentTarget.value)}
          />
          <Input
            label='Nome social'
            variant='bordered'
            value={this.state.socialName}
            onChange={(event) => this.handleSocialNameChange(event.currentTarget.value)}
          />
        </div>
        <div className='grid grid-cols-2 gap-3'>
          <Input
            type='email'
            label='E-mail'
            value={this.state.email}
            variant='bordered'
            onChange={(event) => this.handleEmailChange(event.currentTarget.value)}
          />
          <RadioGroup label='Gênero' orientation='horizontal' defaultValue='male'>
            <Radio value='male'>Masculino</Radio>
            <Radio value='female'>Feminino</Radio>
          </RadioGroup>
        </div>
        <Divider />
        <div className='grid grid-cols-2'>
          <Input
            label='CPF'
            variant='bordered'
            value={this.state.cpf.value}
            onChange={(event) => this.handleCpfValueChange(event.currentTarget.value)}
          />
          <Input
            type='date'
            label='Data de emissão'
            variant='bordered'
            value={this.state.cpf.issueDate}
            onChange={(event) => this.handleCpfIssueDateChange(event.currentTarget.value)}
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
            {this.state.rgFields.map((_, index) => (
              <div
                key={this.state.rgs[index]?.value}
                className='grid grid-cols-[1fr_1fr_0.1fr]'
              >
                <Input
                  label='RG'
                  variant='bordered'
                  radius='sm'
                  value={this.state.rgs[index]?.value}
                  onChange={(event) =>
                    this.handleRgValueChange(event.currentTarget.value, index)
                  }
                />
                <Input
                  type='date'
                  label='Data de emissão'
                  variant='bordered'
                  radius='sm'
                  value={this.state.rgs[index]?.issueDate}
                  onChange={(event) =>
                    this.handleRgIssueDateChange(event.currentTarget.value, index)
                  }
                />
                <Button
                  isIconOnly
                  variant='bordered'
                  radius='sm'
                  className='h-full text-red-600'
                  onClick={() => this.handlePopRgFieldButtonClick(index)}
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
            {this.state.phoneFields.map((_, index) => (
              <div
                key={this.state.phones[index]?.codeArea}
                className='grid grid-cols-[1fr_1fr_0.1fr]'
              >
                <Input
                  type='number'
                  label='DDD'
                  variant='bordered'
                  value={this.state.phones[index]?.codeArea}
                />
                <Input
                  label='Data de emissão'
                  variant='bordered'
                  value={this.state.phones[index]?.number}
                />
                <Button
                  isIconOnly
                  variant='bordered'
                  radius='sm'
                  className='h-full text-red-600'
                  onClick={() => this.handlePopRgFieldButtonClick(index)}
                >
                  <Icon name='delete' size={16} />
                </Button>
              </div>
            ))}
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <Button color='primary' className='mt-3'>
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
