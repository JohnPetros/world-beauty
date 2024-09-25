import { Component } from 'react'

import { CustomersTable } from '@/components/commons/customers-table'
import { ListCustomersByGenderUseCase } from '@world-beauty/core/use-cases'

import { customersRepository } from '@/database'
import { Customer } from '@world-beauty/core/entities'
import { PAGINATION } from '@world-beauty/core/constants'

type CustomersPageState = {
  page: number
  maleCustomers: Customer[]
  maleCustomersPagesCount: number
  femaleCustomers: Customer[]
  femaleCustomersPagesCount: number
}

export class CustomersByGenderTable extends Component<any, CustomersPageState> {
  private readonly listCustomersByGender = new ListCustomersByGenderUseCase(
    customersRepository,
  )

  constructor(props: any) {
    super(props)
    this.state = {
      page: 1,
      maleCustomers: [],
      femaleCustomers: [],
      femaleCustomersPagesCount: 1,
      maleCustomersPagesCount: 1,
    }
  }

  async fetchMaleCustomers(maleCustomesPage: number) {
    const { items, itemsCount } = await this.listCustomersByGender.execute(
      'male',
      maleCustomesPage,
    )

    this.setState({
      maleCustomers: items.map(Customer.create),
      maleCustomersPagesCount: Math.ceil(itemsCount / PAGINATION.itemsPerPage),
    })
  }

  async fetchFemaleCustomers(femaleCustomesPage: number) {
    const { items, itemsCount } = await this.listCustomersByGender.execute(
      'female',
      femaleCustomesPage,
    )

    this.setState({
      femaleCustomers: items.map(Customer.create),
      femaleCustomersPagesCount: Math.ceil(itemsCount / PAGINATION.itemsPerPage),
    })
  }

  async handleMaleCustomersPageChange(page: number) {
    this.setState({ page })
    await this.fetchMaleCustomers(page)
  }

  async handlefemaleCustomersPageChange(page: number) {
    this.setState({ page })
    await this.fetchFemaleCustomers(page)
  }

  async componentDidMount() {
    await this.fetchFemaleCustomers(this.state.femaleCustomersPagesCount)
    await this.fetchMaleCustomers(this.state.maleCustomersPagesCount)
  }

  render() {
    return (
      <div className='flex flex-col gap-3'>
        <div>
          <h2 className='mb-2 text-zinc-700 text-xl font-medium'>
            Clientes do sexo masculino
          </h2>
          <CustomersTable
            isInteractable={false}
            customers={this.state.maleCustomers}
            page={this.state.page}
            pagesCount={this.state.maleCustomersPagesCount}
            onPageChange={(page) => this.handleMaleCustomersPageChange(page)}
          />
        </div>
        <div className='mt-6'>
          <h2 className='mb-2 text-zinc-700 text-xl font-medium'>
            Clientes do sexo feminino
          </h2>
          <CustomersTable
            isInteractable={false}
            customers={this.state.femaleCustomers}
            page={this.state.page}
            pagesCount={this.state.femaleCustomersPagesCount}
            onPageChange={(page) => this.handlefemaleCustomersPageChange(page)}
          />
        </div>
      </div>
    )
  }
}
