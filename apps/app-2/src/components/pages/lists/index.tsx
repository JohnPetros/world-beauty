import { Component } from 'react'

import {
  DeleteCustomersUseCase,
  ListCustomersUseCase,
  RegisterCustomerUseCase,
  UpdateCustomerUseCase,
} from '@world-beauty/core/use-cases'
import type { Customer } from '@world-beauty/core/entities'
import type { CustomerDto } from '@world-beauty/core/dtos'

import { customersRepository } from '@/database'
import { PageTitle } from '@/components/commons/title'
import { PAGINATION } from '@world-beauty/core/constants'
import { Select, SelectItem } from '@nextui-org/react'
import { CustomersByGenderTable } from './customers-by-gender-table'

type CustomersPageState = {
  customers: Customer[]
  page: number
  pagesCount: number
  selectedCustomersIds: string[]
}

export class ListsPage extends Component<any, CustomersPageState> {
  private readonly listCustomersUseCase = new ListCustomersUseCase(customersRepository)
  private readonly registerCustomerUseCase = new RegisterCustomerUseCase(
    customersRepository,
  )
  private readonly updateCustomerUseCase = new UpdateCustomerUseCase(customersRepository)
  private readonly deleteCustomersUseCase = new DeleteCustomersUseCase(
    customersRepository,
  )

  constructor(props: any) {
    super(props)
    this.state = {
      customers: [],
      page: 1,
      pagesCount: 0,
      selectedCustomersIds: [],
    }
  }

  async fetchCustomers(page: number) {
    const response = await this.listCustomersUseCase.execute(page)
    this.setState({
      customers: response.items,
      pagesCount: Math.ceil(response.itemsCount / PAGINATION.itemsPerPage),
      page,
    })
  }

  async handleCustomersSelectionChange(selectedCustomersIds: string[]) {
    this.setState({
      selectedCustomersIds,
    })
  }

  async handlePageChange(page: number) {
    await this.fetchCustomers(page)
  }

  async handleDeleteButtonClick() {
    this.setState({ selectedCustomersIds: [] })
    await this.deleteCustomersUseCase.execute(this.state.selectedCustomersIds)
    await this.fetchCustomers(1)
  }

  async handleRegisterCustomer(customerDto: CustomerDto) {
    await this.registerCustomerUseCase.execute(customerDto)
    await this.fetchCustomers(1)
  }

  async handleUpdateCustomer(customerDto: CustomerDto) {
    await this.updateCustomerUseCase.execute(customerDto)
    await this.fetchCustomers(1)
  }

  async componentDidMount() {
    await this.fetchCustomers(1)
  }

  render() {
    return (
      <div className='flex flex-col gap-3'>
        <PageTitle>Listagens</PageTitle>

        <Select label='Selecione uma lista' className='max-w-xs'>
          <SelectItem key='customers-by-gender'>Clientes por gênero</SelectItem>
          <SelectItem key='customers-by-most-consumption'>
            10 clientes que mais consumiram produtos ou serviços
          </SelectItem>
          <SelectItem key='products-or-services-by-most-consumption'>
            Produtos ou serviços mais consumidos
          </SelectItem>
          <SelectItem key='products-or-services-by-most-consumption-and-gender'>
            Produtos ou serviços mais consumidos por gênero
          </SelectItem>
          <SelectItem key='customers-by-less-consumption'>
            10 clientes que menos consumiram produtos ou serviços{' '}
          </SelectItem>
          <SelectItem key='customers-by-most-spending'>
            5 clientes que mais consumiram em valor
          </SelectItem>
        </Select>

        <div className='mt-6'>
          <CustomersByGenderTable />
        </div>
      </div>
    )
  }
}
