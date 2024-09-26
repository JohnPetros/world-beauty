import { Component } from 'react'

import {
  ListMostConsumedServicesByMaleCustomersUseCase,
  ListMostConsumedServicesByFemaleCustomersUseCase,
} from '@world-beauty/core/use-cases'
import { Service } from '@world-beauty/core/entities'
import { PAGINATION } from '@world-beauty/core/constants'

import { servicesRepository } from '@/database'
import { ServicesTable } from '@/components/commons/services-table'

type ServicesPageState = {
  maleCustomersServices: Service[]
  maleCustomersServicesPage: number
  maleCustomersServicesPagesCount: number
  femaleCustomersServices: Service[]
  femaleCustomersServicesPage: number
  femaleCustomersServicesPagesCount: number
}

export class MostConsumedServicesTableByGender extends Component<any, ServicesPageState> {
  private readonly listMostConsumedServicesByMaleCustomers =
    new ListMostConsumedServicesByMaleCustomersUseCase(servicesRepository)
  private readonly listMostConsumedServicesByFemaleCustomers =
    new ListMostConsumedServicesByFemaleCustomersUseCase(servicesRepository)

  constructor(props: any) {
    super(props)
    this.state = {
      maleCustomersServices: [],
      maleCustomersServicesPage: 1,
      maleCustomersServicesPagesCount: 0,
      femaleCustomersServices: [],
      femaleCustomersServicesPage: 1,
      femaleCustomersServicesPagesCount: 0,
    }
  }

  async fetchMaleCustomersServices(page: number) {
    const { items, itemsCount } =
      await this.listMostConsumedServicesByMaleCustomers.execute(page)

    this.setState({
      maleCustomersServices: items.map(Service.create),
      maleCustomersServicesPage: page,
      maleCustomersServicesPagesCount: Math.ceil(itemsCount / PAGINATION.itemsPerPage),
    })
  }

  async fetchFemaleCustomersServices(page: number) {
    const { items, itemsCount } =
      await this.listMostConsumedServicesByFemaleCustomers.execute(page)

    this.setState({
      femaleCustomersServices: items.map(Service.create),
      femaleCustomersServicesPage: page,
      femaleCustomersServicesPagesCount: Math.ceil(itemsCount / PAGINATION.itemsPerPage),
    })
  }

  async handleMaleCustomersServicesPageChange(page: number) {
    await this.fetchMaleCustomersServices(page)
  }

  async handleFemaleCustomersServicesPageChange(page: number) {
    await this.fetchMaleCustomersServices(page)
  }

  async componentDidMount() {
    await this.fetchMaleCustomersServices(1)
    await this.fetchFemaleCustomersServices(1)
  }

  render() {
    return (
      <div className='flex flex-col gap-3'>
        <div>
          <h2 className='mb-2 text-zinc-700 text-xl font-medium'>
            Serviços mais consumidos por clientes do sexo masculino
          </h2>
          <ServicesTable
            isInteractable={false}
            services={this.state.maleCustomersServices}
            page={this.state.maleCustomersServicesPage}
            pagesCount={this.state.maleCustomersServicesPagesCount}
            onPageChange={(page) => this.handleMaleCustomersServicesPageChange(page)}
          />
        </div>
        <div className='mt-6'>
          <h2 className='mb-2 text-zinc-700 text-xl font-medium'>
            Serviços mais consumidos por clientes do sexo feminino
          </h2>
          <ServicesTable
            isInteractable={false}
            services={this.state.femaleCustomersServices}
            page={this.state.femaleCustomersServicesPage}
            pagesCount={this.state.femaleCustomersServicesPagesCount}
            onPageChange={(page) => this.handleFemaleCustomersServicesPageChange(page)}
          />
        </div>
      </div>
    )
  }
}
