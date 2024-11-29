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
import type { Item } from '@world-beauty/core/abstracts'

import { Icon } from '@/components/commons/icon'
import { Dialog } from '@/components/commons/dialog'
import { CustomerForm } from './customer-form'
import { OrderForm } from './orders-form'
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
  onUpdateCustomer?: (customerDto: CustomerDto, customerId: string) => Promise<void>
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
              <TableCell>
                <span className="truncate">{customer.name}</span>
              </TableCell>
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
                {hasActions && (
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
                            if (onCustomerOrderItems)
                              onCustomerOrderItems(items, customer.id)
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
