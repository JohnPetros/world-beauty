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

import type { CustomerWithAddress } from '@world-beauty/core/entities'
import type { CustomerWithAddressDto } from '@world-beauty/core/dtos'
import type { Item } from '@world-beauty/core/abstracts'

import { Icon } from '@/components/commons/icon'
import { Dialog } from '@/components/commons/dialog'
import { CustomerForm } from './customer-form'
import { useCustomersTable } from './use-customers-table'

type CustomersTableProps = {
  customers: CustomerWithAddress[]
  page: number
  pagesCount: number
  hasActions: boolean
  selectedCustomersIds?: string[]
  isLoading?: boolean
  onPageChange?: (page: number) => void
  onUpdateCustomer?: (
    customerDto: CustomerWithAddressDto,
    customerId: string,
  ) => Promise<void>
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
          <TableColumn>Sobrenome</TableColumn>
          <TableColumn>E-mail</TableColumn>
          <TableColumn>Endereço</TableColumn>
          <TableColumn>Telefones</TableColumn>
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
              <TableCell>{customer.lastname}</TableCell>
              <TableCell className='w-24'>
                {<span className='truncate'>{customer.phonesList}</span>}
              </TableCell>
              <TableCell>{customer.formattedAddress}</TableCell>
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
                            await handleUpdateCustomer(customerDto, customer.id)
                          }}
                        />
                      )}
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
