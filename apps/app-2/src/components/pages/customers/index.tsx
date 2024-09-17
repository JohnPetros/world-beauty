import { Component } from 'react'
import {
  Button,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from '@nextui-org/react'

import { ListCustomersUseCase } from '@world-beauty/core/use-cases'
import type { Customer } from '@world-beauty/core/entities'

import { customersRepository } from '@/database'
import { PageTitle } from '@/components/commons/title'
import { PAGINATION } from '@world-beauty/core/constants'
import { Icon } from '@/components/commons/icon'
import { Dialog } from '@/components/commons/dialog'
import { Input } from 'postcss'

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

        <Dialog
          trigger={
            <Button
              endContent={<Icon name='register' size={20} />}
              className='bg-zinc-800 text-zinc-50 w-max'
            >
              Cadastrar cliente
            </Button>
          }
        >
          <>
            <Input autoFocus label='Nome' placeholder='Rodrigo Faro' variant='bordered' />
            <Input
              autoFocus
              label='E-mail'
              placeholder='nome@provedor.com'
              variant='bordered'
            />
          </>
        </Dialog>

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
                <TableColumn>Total consumido</TableColumn>
                <TableColumn>Total gasto (R$)</TableColumn>
                <TableColumn>Ações</TableColumn>
              </TableHeader>
              <TableBody
                emptyContent={'Nenhum cliente cadastrado'}
                items={this.state.customers}
              >
                {(customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.cpf.value}</TableCell>
                    <TableCell>{customer.gender}</TableCell>
                    <TableCell>{customer.socialName}</TableCell>
                    <TableCell>{customer.phonesList}</TableCell>
                    <TableCell>{customer.rgsList}</TableCell>
                    <TableCell>{customer.consumedProductsOrServicesCount}</TableCell>
                    <TableCell>{customer.spending}</TableCell>
                    <TableCell>
                      <div className='relative flex items-center gap-2'>
                        <Tooltip content='Editar usuário'>
                          <Button size='sm' className='bg-gray-200 text-zinc-800'>
                            <Icon name='edit' size={16} />
                          </Button>
                        </Tooltip>
                        <Tooltip content='Deletar usuário'>
                          <Button size='sm' className='bg-gray-200 text-red-700'>
                            <Icon name='delete' size={16} />
                          </Button>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    )
  }
}