import {
  Button,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from '@nextui-org/react'

import type { Customer } from '@world-beauty/core/entities'
import type { CustomerDto } from '@world-beauty/core/dtos'

import { Icon } from '@/components/commons/icon'
import { Dialog } from '@/components/commons/dialog'
import { CustomerForm } from './customer-form'
import { OrderForm } from './order-form'
import type { Item } from '@world-beauty/core/abstracts'
import { OrdersTable } from './orders-table'
import { useCustomersTable } from './use-customers-table'

type CustomersTableProps = {
  customers: Customer[]
  page: number
  pagesCount: number
  hasActions: boolean
  selectedCustomersIds?: string[]
  isLoading?: boolean
  onPageChange?: (page: number) => void
  onUpdateCustomer?: (customerDto: CustomerDto, customerId: string) => void
  onCustomersSelectionChange?: (customersIds: string[]) => void
  onCustomerOrderItems?: (items: Item[], customerId: string) => void
}

export const CustomersTable = (props: CustomersTableProps) => {
  const { handleCustomersSelectionChange, handlePageChange, handleUpdateCustomer } =
    useCustomersTable({
      customers: props.customers,
      onCustomersSelectionChange: props.onCustomersSelectionChange,
      onPageChange: props.onPageChange,
      onUpdateCustomer: props.onUpdateCustomer,
    })

  return (
    <div className='w-full'>
      <Table
        aria-label='Tabela de clientes'
        key={props.pagesCount}
        color='default'
        selectionMode={props.hasActions ? 'multiple' : 'none'}
        selectedKeys={props.selectedCustomersIds}
        onSelectionChange={(selection) => handleCustomersSelectionChange(selection)}
        bottomContent={
          props.pagesCount > 1 && (
            <Pagination
              color='primary'
              total={props.pagesCount}
              initialPage={props.page}
              onChange={(page) => handlePageChange(page)}
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
          <TableColumn> </TableColumn>
        </TableHeader>
        <TableBody
          isLoading={props.isLoading}
          loadingContent={<Spinner />}
          emptyContent='Nenhum cliente cadastrado'
          items={props.customers}
        >
          {(customer) => (
            <TableRow key={customer.id}>
              <TableCell>{customer.name}</TableCell>
              <TableCell>
                <span className='truncate'>{customer.cpf.format}</span>
              </TableCell>
              <TableCell>
                {customer.gender === 'male' ? 'masculino' : 'feminino'}
              </TableCell>
              <TableCell>{customer.socialName ? customer.socialName : '----'}</TableCell>
              <TableCell>
                <span className='truncate'>{customer.phonesList}</span>
              </TableCell>
              <TableCell>
                <span className='truncate'>{customer.rgsList}</span>
              </TableCell>
              <TableCell>{customer.consumption}</TableCell>
              <TableCell>
                {(() => {
                  const formatter = new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                  return formatter.format(customer.spending)
                })()}
              </TableCell>
              <TableCell>
                {props.hasActions && (
                  <div className='relative flex items-center gap-2'>
                    <Dialog
                      title={`Atualizar cliente ${customer.name}`}
                      trigger={(openDialog) => (
                        <Tooltip content='Atualizar cliente'>
                          <Button
                            size='sm'
                            className='bg-gray-200 text-zinc-800'
                            onClick={openDialog}
                          >
                            <Icon name='edit' size={16} />
                          </Button>
                        </Tooltip>
                      )}
                    >
                      {(closeDialog) => (
                        <CustomerForm
                          customer={customer}
                          onCancel={closeDialog}
                          onSubmit={async (customerDto) => {
                            closeDialog()
                            await handleUpdateCustomer(customerDto, customer.id)
                          }}
                        />
                      )}
                    </Dialog>
                    <Dialog
                      title={`Fazer pedido para o cliente ${customer.name}`}
                      isLarge
                      trigger={(openDialog) => (
                        <Tooltip content={`Fazer pedido para o cliente ${customer.name}`}>
                          <Button
                            size='sm'
                            className='bg-gray-200 text-zinc-800'
                            onClick={openDialog}
                          >
                            <Icon name='order' size={16} />
                          </Button>
                        </Tooltip>
                      )}
                    >
                      {(closeDialog) => (
                        <OrderForm
                          customerId={customer.id}
                          onCancel={closeDialog}
                          onOrderItems={(items) => {
                            closeDialog()
                            if (props.onCustomerOrderItems)
                              props.onCustomerOrderItems(items, customer.id)
                          }}
                        />
                      )}
                    </Dialog>
                    <Dialog
                      title={`Produtos e serviços consumidos por ${customer.name}`}
                      isLarge
                      trigger={(openDialog) => (
                        <Tooltip
                          content={`Produtos e serviços consumidos por ${customer.name}`}
                        >
                          <Button
                            size='sm'
                            className='bg-gray-200 text-zinc-800'
                            onClick={openDialog}
                          >
                            <Icon name='orders' size={16} />
                          </Button>
                        </Tooltip>
                      )}
                    >
                      {() => <OrdersTable customerId={customer.id} />}
                    </Dialog>
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
