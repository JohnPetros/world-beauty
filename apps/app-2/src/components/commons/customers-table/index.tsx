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

import type { Customer } from '@world-beauty/core/entities'
import type { CustomerDto } from '@world-beauty/core/dtos'

import { Icon } from '@/components/commons/icon'
import { Dialog } from '@/components/commons/dialog'
import { CustomerForm } from './customer-form'

type CustomersTableProps = {
  customers: Customer[]
  page: number
  pagesCount: number
  isInteractable: boolean
  selectedCustomersIds?: string[]
  onPageChange?: (page: number) => void
  onUpdateCustomer?: (customerDto: CustomerDto) => void
  onCustomersSelectionChange?: (customersIds: string[]) => void
}

export class CustomersTable extends Component<CustomersTableProps> {
  async handleCustomersSelectionChange(customersSelection: Selection) {
    let selectedCustomersIds: string[] = []

    if (customersSelection === 'all') {
      selectedCustomersIds = this.props.customers.map((customer) => customer.id)
    } else {
      selectedCustomersIds = Array.from(customersSelection).map(String)
    }

    if (this.props.onCustomersSelectionChange)
      this.props.onCustomersSelectionChange(selectedCustomersIds)
  }

  handlePageChange(page: number) {
    if (this.props.onPageChange) this.props.onPageChange(page)
  }

  async handleUpdateCustomer(customerDto: CustomerDto) {
    if (this.props.onUpdateCustomer) this.props.onUpdateCustomer(customerDto)
  }

  render() {
    return (
      <div className='w-full'>
        <Table
          key={this.props.pagesCount}
          color='default'
          selectionMode={this.props.isInteractable ? 'multiple' : 'none'}
          selectedKeys={this.props.selectedCustomersIds}
          aria-label='Tabela de clientes'
          onSelectionChange={(selection) =>
            this.handleCustomersSelectionChange(selection)
          }
          bottomContent={
            this.props.pagesCount > 1 && (
              <Pagination
                color='primary'
                total={this.props.pagesCount}
                initialPage={this.props.page}
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
            <TableColumn>Total gasto</TableColumn>
            <TableColumn>{this.props.isInteractable ? 'Ações' : null} </TableColumn>
          </TableHeader>
          <TableBody
            emptyContent='Nenhum cliente cadastrado'
            items={this.props.customers}
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
                  {this.props.isInteractable && (
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
                            onSubmit={async (customerDto) => {
                              closeDialog()
                              await this.handleUpdateCustomer(customerDto)
                            }}
                          />
                        )}
                      </Dialog>

                      <Tooltip content='Deletar usuário'>
                        <Button size='sm' className='bg-gray-200 text-red-700'>
                          <Icon name='delete' size={16} />
                        </Button>
                      </Tooltip>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    )
  }
}
