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
} from '@nextui-org/react'

import { PageTitle } from '@/components/commons/title'
import { PAGINATION } from '@world-beauty/core/constants'
import type { Service } from '@world-beauty/core/entities'

import { Icon } from '@/components/commons/icon'
import { Dialog } from '@/components/commons/dialog'
import type { ServiceDto } from '@world-beauty/core/dtos'
import { ListServicesUseCase, RegisterServiceUseCase } from '@world-beauty/core/use-cases'
import { servicesRepository } from '@/database'

type ServicesPageState = {
  Services: Service[]
  page: number
  pagesCount: number
}

export class ServicesPage extends Component<any, ServicesPageState> {
  private readonly listServicesUseCase = new ListServicesUseCase(servicesRepository)
  private readonly registerServiceUseCase = new RegisterServiceUseCase(servicesRepository)

  constructor(props: any) {
    super(props)
    this.state = {
      Services: [],
      page: 1,
      pagesCount: 0,
    }
  }

  async fetchServices(page: number) {
    const response = await this.listServicesUseCase.execute(page)
    this.setState({
      Services: response.items,
      pagesCount: response.itemsCount / PAGINATION.itemsPerPage,
      page,
    })
  }

  async handlePageChange(page: number) {
    await this.fetchServices(page)
  }

  async handleSubmit(ServiceDto: ServiceDto, closeDialog: VoidFunction) {
    // await this.registerServiceUseCase.execute(ServiceDto)
    closeDialog()
  }

  async componentDidMount() {
    await this.fetchServices(1)
  }

  render() {
    return (
      <div className='flex flex-col gap-3'>
        <PageTitle>Produtos</PageTitle>

        {/* <Dialog
          title='Adicionar cliente'
          trigger={
            <Button
              endContent={<Icon name='add' size={20} />}
              className='bg-zinc-800 text-zinc-50 w-max'
            >
              Cadastrar cliente
            </Button>
          }
        >
          {(closeDialog) => (
            <RegisterServiceForm
              onSubmit={(ServiceDto) => this.handleSubmit(ServiceDto, closeDialog)}
            />
          )}
        </Dialog> */}

        {this.state.pagesCount && (
          <div className='w-full'>
            <Table
              color='default'
              selectionMode='multiple'
              aria-label='Example static collection table'
              bottomContent={
                <Pagination
                  color='primary'
                  total={this.state.pagesCount}
                  initialPage={this.state.page}
                  onChange={(page) => this.handlePageChange(page)}
                />
              }
              className='w-full'
            >
              <TableHeader>
                <TableColumn>Nome</TableColumn>
                <TableColumn>Preço</TableColumn>
                <TableColumn>Descrição</TableColumn>
                <TableColumn>Ações</TableColumn>
              </TableHeader>
              <TableBody
                emptyContent={'Nenhum cliente cadastrado'}
                items={this.state.Services}
              >
                {(Service) => (
                  <TableRow key={Service.id}>
                    <TableCell>{Service.name}</TableCell>
                    <TableCell>{Service.price}</TableCell>
                    <TableCell>{Service.description}</TableCell>
                    <TableCell>
                      <div className='relative flex items-center gap-2'>
                        <Tooltip content='Editar produto'>
                          <Button size='sm' className='bg-gray-200 text-zinc-800'>
                            <Icon name='edit' size={16} />
                          </Button>
                        </Tooltip>
                        <Tooltip content='Deletar produto'>
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
        )}
      </div>
    )
  }
}
