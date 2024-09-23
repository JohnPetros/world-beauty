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
  type Selection,
} from '@nextui-org/react'

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
import { Icon } from '@/components/commons/icon'
import { Dialog } from '@/components/commons/dialog'
import { CustomerForm } from './customer-form'

type CustomersPageState = {
  customers: Customer[]
  page: number
  pagesCount: number
  selectedCustomersIds: string[]
}

export class CustomersPage extends Component<any, CustomersPageState> {
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
      pagesCount: Math.round(response.itemsCount / PAGINATION.itemsPerPage),
      page,
    })
  }

  async handleCustomersSelectionChange(customersSelection: Selection) {
    let selectedCustomersIds: string[] = []

    if (customersSelection === 'all') {
      selectedCustomersIds = this.state.customers.map((customer) => customer.id)
    } else {
      selectedCustomersIds = Array.from(customersSelection).map(String)
    }

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

  async handleSubmit(
    customerDto: CustomerDto,
    closeDialog: VoidFunction,
    action: 'register' | 'update',
  ) {
    if (action === 'register') {
      await this.registerCustomerUseCase.execute(customerDto)
    } else {
      await this.updateCustomerUseCase.execute(customerDto)
    }
    await this.fetchCustomers(1)
    closeDialog()
  }

  async componentDidMount() {
    await this.fetchCustomers(1)
  }

  render() {
    return (
      <div className='flex flex-col gap-3'>
        <PageTitle>Clientes</PageTitle>

        <div className='flex items-center gap-2'>
          <Dialog
            title='Adicionar cliente'
            trigger={
              <Button
                endContent={<Icon name='add' size={20} />}
                radius='sm'
                className='bg-zinc-800 text-zinc-50 w-max'
              >
                Cadastrar cliente
              </Button>
            }
          >
            {(closeDialog) => (
              <CustomerForm
                onCancel={closeDialog}
                onSubmit={(customerDto) =>
                  this.handleSubmit(customerDto, closeDialog, 'register')
                }
              />
            )}
          </Dialog>
          {this.state.selectedCustomersIds.length > 0 && (
            <Button
              radius='sm'
              color='danger'
              onClick={() => this.handleDeleteButtonClick()}
            >
              Deletar cliente(s)
            </Button>
          )}
        </div>

        <div className='w-full'>
          <Table
            key={this.state.pagesCount}
            color='default'
            selectionMode='multiple'
            selectedKeys={this.state.selectedCustomersIds}
            aria-label='Tabela de clientes'
            onSelectionChange={(selection) =>
              this.handleCustomersSelectionChange(selection)
            }
            bottomContent={
              this.state.pagesCount > 1 && (
                <Pagination
                  color='primary'
                  total={this.state.pagesCount}
                  initialPage={this.state.page}
                  onChange={(page) => this.handlePageChange(page)}
                />
              )
            }
            className='w-full'
            checkboxesProps={{
              classNames: {
                wrapper: 'after:bg-foreground after:text-background text-background',
              },
            }}
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
              emptyContent='Nenhum cliente cadastrado'
              items={this.state.customers}
            >
              {(customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.cpf.value}</TableCell>
                  <TableCell>
                    {customer.gender === 'male' ? 'masculino' : 'feminino'}
                  </TableCell>
                  <TableCell>{customer.socialName}</TableCell>
                  <TableCell>{customer.phonesList}</TableCell>
                  <TableCell>{customer.rgsList}</TableCell>
                  <TableCell>{customer.consumedProductsOrServicesCount}</TableCell>
                  <TableCell>{customer.spending}</TableCell>
                  <TableCell>
                    <div className='relative flex items-center gap-2'>
                      <Dialog
                        title='Atualizar cliente'
                        trigger={
                          <Button size='sm' className='bg-gray-200 text-zinc-800'>
                            <Icon name='edit' size={16} />
                          </Button>
                        }
                      >
                        {(closeDialog) => (
                          <CustomerForm
                            customer={customer}
                            onCancel={closeDialog}
                            onSubmit={(customerDto) =>
                              this.handleSubmit(customerDto, closeDialog, 'update')
                            }
                          />
                        )}
                      </Dialog>

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
      </div>
    )
  }
}
