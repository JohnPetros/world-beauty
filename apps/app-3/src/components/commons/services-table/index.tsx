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

import type { Service } from '@world-beauty/core/entities'
import type { ServiceDto } from '@world-beauty/core/dtos'

import { Icon } from '@/components/commons/icon'
import { Dialog } from '@/components/commons/dialog'
import { ServiceForm } from './service-form'
import { useServicesTable } from './use-services-table'

type ServicesTableProps = {
  services: Service[]
  page: number
  pagesCount: number
  hasActions: boolean
  hasSelection: boolean
  isLoading?: boolean
  selectedServicesIds?: string[]
  onPageChange?: (page: number) => void
  onUpdateService?: (ServiceDto: ServiceDto, ServicesId: string) => void
  onServicesSelectionChange?: (ServicesIds: string[]) => void
}

export const ServicesTable = ({
  services,
  hasActions,
  hasSelection,
  page,
  pagesCount,
  isLoading,
  selectedServicesIds,
  onPageChange,
  onServicesSelectionChange,
  onUpdateService,
}: ServicesTableProps) => {
  const { handlePageChange, handleServicesSelectionChange, handleUpdateService } =
    useServicesTable({
      services,
      onPageChange,
      onServicesSelectionChange,
      onUpdateService,
    })

  return (
    <Table
      key={pagesCount}
      color='default'
      selectionMode={hasSelection ? 'multiple' : 'none'}
      selectedKeys={selectedServicesIds}
      aria-label='Tabela de produtos'
      onSelectionChange={(selection) => handleServicesSelectionChange(selection)}
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
        <TableColumn>Preço</TableColumn>
        <TableColumn>Descrição</TableColumn>
        <TableColumn>Qtd. de vezes que esse produto foi consumido</TableColumn>
        <TableColumn> </TableColumn>
      </TableHeader>
      <TableBody
        isLoading={isLoading}
        loadingContent={<Spinner />}
        emptyContent='Nenhum produto cadastrado'
        items={services}
      >
        {(service) => (
          <TableRow key={service.id}>
            <TableCell>
              <span className='truncate'>{service.name}</span>
            </TableCell>
            <TableCell>
              {(() => {
                const formatter = new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
                return formatter.format(service.price)
              })()}
            </TableCell>
            <TableCell>
              <span className='truncate'>{service.description}</span>
            </TableCell>
            <TableCell>
              <span className='truncate'>{service.ordersCount}</span>
            </TableCell>
            <TableCell>
              {hasActions && (
                <div className='relative flex items-center gap-2'>
                  <Dialog
                    title='Atualizar produto'
                    trigger={(openDialog) => (
                      <Tooltip content='Atualizar produto'>
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
                      <ServiceForm
                        service={service}
                        onCancel={closeDialog}
                        onSubmit={async (serviceDto) => {
                          closeDialog()
                          await handleUpdateService(serviceDto, service.id)
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
  )
}
