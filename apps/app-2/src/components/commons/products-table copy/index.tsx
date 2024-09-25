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

import type { Service } from '@world-beauty/core/entities'
import type { ServiceDto } from '@world-beauty/core/dtos'

import { Icon } from '@/components/commons/icon'
import { Dialog } from '@/components/commons/dialog'
import { ServiceForm } from './service-form'

type ServicesTableProps = {
  services: Service[]
  page: number
  pagesCount: number
  isInteractable: boolean
  selectedServicesIds?: string[]
  onPageChange?: (page: number) => void
  onUpdateService?: (serviceDto: ServiceDto) => void
  onServicesSelectionChange?: (servicesIds: string[]) => void
}

export class ServicesTable extends Component<ServicesTableProps> {
  async handleServicesSelectionChange(servicesSelection: Selection) {
    let selectedServicesIds: string[] = []

    if (servicesSelection === 'all') {
      selectedServicesIds = this.props.services.map((service) => service.id)
    } else {
      selectedServicesIds = Array.from(servicesSelection).map(String)
    }

    if (this.props.onServicesSelectionChange)
      this.props.onServicesSelectionChange(selectedServicesIds)
  }

  handlePageChange(page: number) {
    if (this.props.onPageChange) this.props.onPageChange(page)
  }

  async handleUpdateService(serviceDto: ServiceDto) {
    if (this.props.onUpdateService) this.props.onUpdateService(serviceDto)
  }

  render() {
    return (
      <Table
        key={this.props.pagesCount}
        color='default'
        selectionMode='multiple'
        selectedKeys={this.props.selectedServicesIds}
        aria-label='Tabela de produtos'
        onSelectionChange={(selection) => this.handleServicesSelectionChange(selection)}
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
          <TableColumn>Preço</TableColumn>
          <TableColumn>Descrição</TableColumn>
          <TableColumn>Ações</TableColumn>
        </TableHeader>
        <TableBody emptyContent='Nenhum produto cadastrado' items={this.props.services}>
          {(service) => (
            <TableRow key={service.id}>
              <TableCell>{service.name}</TableCell>
              <TableCell>{service.price}</TableCell>
              <TableCell>{service.description}</TableCell>
              <TableCell>
                <div className='relative flex items-center gap-2'>
                  <Dialog
                    title='Atualizar produto'
                    trigger={
                      <Button size='sm' className='bg-gray-200 text-zinc-800'>
                        <Icon name='edit' size={16} />
                      </Button>
                    }
                  >
                    {(closeDialog) => (
                      <ServiceForm
                        service={service}
                        onCancel={closeDialog}
                        onSubmit={async (serviceDto) => {
                          closeDialog()
                          await this.handleUpdateService(serviceDto)
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
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    )
  }
}
