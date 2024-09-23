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
  DeleteServicesUseCase,
  ListServicesUseCase,
  RegisterServiceUseCase,
  UpdateServiceUseCase,
} from '@world-beauty/core/use-cases'
import type { Service } from '@world-beauty/core/entities'
import type { ServiceDto } from '@world-beauty/core/dtos'

import { servicesRepository } from '@/database'
import { PageTitle } from '@/components/commons/title'
import { PAGINATION } from '@world-beauty/core/constants'
import { Icon } from '@/components/commons/icon'
import { Dialog } from '@/components/commons/dialog'
import { ServiceForm } from './service-form'

type ServicesPageState = {
  services: Service[]
  page: number
  pagesCount: number
  selectedServicesIds: string[]
}

export class ServicesPage extends Component<any, ServicesPageState> {
  private readonly listServicesUseCase = new ListServicesUseCase(servicesRepository)
  private readonly registerServiceUseCase = new RegisterServiceUseCase(servicesRepository)
  private readonly updateServiceUseCase = new UpdateServiceUseCase(servicesRepository)
  private readonly deleteServicesUseCase = new DeleteServicesUseCase(servicesRepository)

  constructor(props: any) {
    super(props)
    this.state = {
      services: [],
      page: 1,
      pagesCount: 0,
      selectedServicesIds: [],
    }
  }

  async fetchServices(page: number) {
    const response = await this.listServicesUseCase.execute(page)
    this.setState({
      services: response.items,
      pagesCount: Math.ceil(response.itemsCount / PAGINATION.itemsPerPage),
      page,
    })
  }

  async handleServicesSelectionChange(ServicesSelection: Selection) {
    let selectedServicesIds: string[] = []

    if (ServicesSelection === 'all') {
      selectedServicesIds = this.state.services.map((service) => service.id)
    } else {
      selectedServicesIds = Array.from(ServicesSelection).map(String)
    }

    this.setState({
      selectedServicesIds,
    })
  }

  async handlePageChange(page: number) {
    await this.fetchServices(page)
  }

  async handleDeleteButtonClick() {
    this.setState({ selectedServicesIds: [] })
    await this.deleteServicesUseCase.execute(this.state.selectedServicesIds)
    await this.fetchServices(1)
  }

  async handleSubmit(
    ServiceDto: ServiceDto,
    closeDialog: VoidFunction,
    action: 'register' | 'update',
  ) {
    if (action === 'register') {
      await this.registerServiceUseCase.execute(ServiceDto)
    } else {
      await this.updateServiceUseCase.execute(ServiceDto)
    }
    await this.fetchServices(1)
    closeDialog()
  }

  async componentDidMount() {
    await this.fetchServices(1)
  }

  render() {
    return (
      <div className='flex flex-col gap-3'>
        <PageTitle>Serviços</PageTitle>

        <div className='flex items-center gap-2'>
          <Dialog
            title='Adicionar serviço'
            trigger={
              <Button
                endContent={<Icon name='add' size={20} />}
                radius='sm'
                className='bg-zinc-800 text-zinc-50 w-max'
              >
                Cadastrar serviço
              </Button>
            }
          >
            {(closeDialog) => (
              <ServiceForm
                onCancel={closeDialog}
                onSubmit={(serviceDto) =>
                  this.handleSubmit(serviceDto, closeDialog, 'register')
                }
              />
            )}
          </Dialog>
          {this.state.selectedServicesIds.length > 0 && (
            <Button
              radius='sm'
              color='danger'
              onClick={() => this.handleDeleteButtonClick()}
            >
              Deletar serviço(s)
            </Button>
          )}
        </div>

        <div className='w-full'>
          <Table
            key={this.state.pagesCount}
            color='default'
            selectionMode='multiple'
            selectedKeys={this.state.selectedServicesIds}
            aria-label='Tabela de serviços'
            onSelectionChange={(selection) =>
              this.handleServicesSelectionChange(selection)
            }
            bottomContent={
              <Pagination
                color='primary'
                total={this.state.pagesCount}
                initialPage={this.state.page}
                onChange={(page) => this.handlePageChange(page)}
              />
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
            <TableBody
              emptyContent='Nenhum serviço cadastrado'
              items={this.state.services}
            >
              {(services) => (
                <TableRow key={services.id}>
                  <TableCell>{services.name}</TableCell>
                  <TableCell>{services.price}</TableCell>
                  <TableCell>{services.description}</TableCell>
                  <TableCell>
                    <div className='relative flex items-center gap-2'>
                      <Dialog
                        title='Atualizar serviço'
                        trigger={
                          <Button size='sm' className='bg-gray-200 text-zinc-800'>
                            <Icon name='edit' size={16} />
                          </Button>
                        }
                      >
                        {(closeDialog) => (
                          <ServiceForm
                            service={services}
                            onCancel={closeDialog}
                            onSubmit={(serviceDto) =>
                              this.handleSubmit(serviceDto, closeDialog, 'update')
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
