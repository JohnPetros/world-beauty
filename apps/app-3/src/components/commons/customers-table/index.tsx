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
  onUpdateCustomer?: (customerDto: CustomerDto) => void
  onCustomersSelectionChange?: (customersIds: string[]) => void
  onCustomerOrderItems?: (items: Item[], customerId: string) => void
}

export const CustomersTable = ({
  customers,
  hasActions,
  page,
  pagesCount,
  isLoading,
  selectedCustomersIds,
  onCustomerOrderItems,
  onCustomersSelectionChange,
  onPageChange,
  onUpdateCustomer,
}: CustomersTableProps) => {
  const { handleCustomersSelectionChange, handlePageChange, handleUpdateCustomer } =
    useCustomersTable({
      customers,
      onCustomersSelectionChange,
      onPageChange,
      onUpdateCustomer,
    })

  return (
    <div className='w-full'>
      <Table
        aria-label='Tabela de clientes'
        key={pagesCount}
        color='default'
        selectionMode={hasActions ? 'multiple' : 'none'}
        selectedKeys={selectedCustomersIds}
        onSelectionChange={(selection) => handleCustomersSelectionChange(selection)}
        bottomContent={
          pagesCount > 1 && (
            <Pagination
              color='primary'
              total={pagesCount}
              initialPage={page}
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
          isLoading={isLoading}
          loadingContent={<Spinner />}
          emptyContent='Nenhum cliente cadastrado'
          items={customers}
        >
          {(customer) => (
            <TableRow key={customer.id}>
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.cpf.value}</TableCell>
              <TableCell>
                {customer.gender === 'male' ? 'masculino' : 'feminino'}
              </TableCell>
              <TableCell>{customer.socialName}</TableCell>
              <TableCell className='w-24'>
                {<span className='truncate'>{customer.phonesList}</span>}
              </TableCell>
              <TableCell>{customer.rgsList}</TableCell>
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
                {hasActions && (
                  <div className='relative flex items-center gap-2'>
                    <Dialog
                      title={`Atualizar cliente ${customer.name}`}
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
                            await handleUpdateCustomer(customerDto)
                          }}
                        />
                      )}
                    </Dialog>
                    <Dialog
                      title={`Fazer pedido para o cliente ${customer.name}`}
                      isLarge
                      trigger={
                        <Button size='sm' className='bg-gray-200 text-zinc-800'>
                          <Icon name='order' size={16} />
                        </Button>
                      }
                    >
                      {(closeDialog) => (
                        <OrderForm
                          customerId={customer.id}
                          onCancel={closeDialog}
                          onOrderItems={(items) => {
                            closeDialog()
                            if (onCustomerOrderItems)
                              onCustomerOrderItems(items, customer.id)
                          }}
                        />
                      )}
                    </Dialog>
                    <Dialog
                      title={`Produtos e serviços consumidos por ${customer.name}`}
                      isLarge
                      trigger={
                        <Button size='sm' className='bg-gray-200 text-zinc-800'>
                          <Icon name='orders' size={16} />
                        </Button>
                      }
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
