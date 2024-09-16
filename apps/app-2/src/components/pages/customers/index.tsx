import { Component } from 'react'
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react'

import { ListCustomersUseCase } from '@world-beauty/core/use-cases'
import type { Customer } from '@world-beauty/core/entities'

import { customersRepository } from '@/database'
import { PageTitle } from '@/components/commons/title'
import { PAGINATION } from '@world-beauty/core/constants'

type CustomersPageState = {
  customers: Customer[]
  page: number
  pagesCount: number
}

export class CustomersPage extends Component<any, CustomersPageState> {
  private readonly useCase = new ListCustomersUseCase(customersRepository)

  constructor(props: any) {
    super(props)
    this.state = {
      customers: [],
      page: 1,
      pagesCount: 0,
    }
  }

  async fetchCustomers(page: number) {
    const response = await this.useCase.execute(page)
    this.setState({
      customers: response.items,
      pagesCount: response.itemsCount / PAGINATION.itemsPerPage,
      page,
    })
  }

  async handlePageChange(page: number) {
    await this.fetchCustomers(page)
  }

  async componentDidMount() {
    await this.fetchCustomers(1)
  }

  render() {
    return (
      <div className='flex flex-col gap-3'>
        <PageTitle>Clientes</PageTitle>
        {this.state.pagesCount && (
          <div className='w-full'>
            <Table
              color='default'
              selectionMode='multiple'
              aria-label='Example static collection table'
              bottomContent={
                <Pagination
                  color='primary'
                  total={this.state.pagesCount}
                  initialPage={this.state.page}
                  onChange={(page) => this.handlePageChange(page)}
                />
              }
              className='w-full'
            >
              <TableHeader>
                <TableColumn>Nome</TableColumn>
                <TableColumn>CPF</TableColumn>
                <TableColumn>Gênero</TableColumn>
                <TableColumn>Nome social</TableColumn>
                <TableColumn>Telefones</TableColumn>
                <TableColumn>RG's</TableColumn>
                <TableColumn>Total de produtos/serviços consumidos</TableColumn>
                <TableColumn>Total gasto (R$)</TableColumn>
              </TableHeader>
              <TableBody emptyContent={'Nenhum cliente cadastrado'}>
                {this.state.customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.cpf.value}</TableCell>
                    <TableCell>{customer.gender}</TableCell>
                    <TableCell>{customer.socialName}</TableCell>
                    <TableCell>{customer.phonesList}</TableCell>
                    <TableCell>{customer.rgsList}</TableCell>
                    <TableCell>{customer.consumedProductsOrServicesCount}</TableCell>
                    <TableCell>{customer.spending}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    )
  }
}
