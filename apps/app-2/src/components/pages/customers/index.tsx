import { Component } from 'react'
import { Button } from '@nextui-org/react'

import {
  DeleteCustomersUseCase,
  ListCustomersUseCase,
  RegisterCustomerUseCase,
  UpdateCustomerUseCase,
} from '@world-beauty/core/use-cases'
import { Customer } from '@world-beauty/core/entities'
import type { CustomerDto } from '@world-beauty/core/dtos'
import { PAGINATION } from '@world-beauty/core/constants'

import { customersRepository } from '@/database'
import { PageTitle } from '@/components/commons/title'
import { Icon } from '@/components/commons/icon'
import { CustomersTable } from '@/components/commons/customers-table'
import { Dialog } from '@/components/commons/dialog'
import { CustomerForm } from '../../commons/customers-table/customer-form'

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
      customers: response.items.map(Customer.create),
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

  handleCustomerOrderItem(customerId: string, itemPrice: number) {
    const customerIndex = this.state.customers.findIndex(
      (customer) => customer.id === customerId,
    )
    if (customerIndex === -1) return

    const customer = this.state.customers[customerIndex]
    customer.orderItem(itemPrice)
    this.state.customers[customerIndex] = customer
    this.setState({ customers: this.state.customers })
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
                onSubmit={async (customerDto) => {
                  closeDialog()
                  await this.handleRegisterCustomer(customerDto)
                }}
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

        <CustomersTable
          isInteractable={true}
          customers={this.state.customers}
          page={this.state.page}
          pagesCount={this.state.pagesCount}
          selectedCustomersIds={this.state.selectedCustomersIds}
          onUpdateCustomer={(customerDto: CustomerDto) =>
            this.handleUpdateCustomer(customerDto)
          }
          onPageChange={(page) => this.handlePageChange(page)}
          onCustomersSelectionChange={(customersIds) =>
            this.handleCustomersSelectionChange(customersIds)
          }
        />
      </div>
    )
  }
}
