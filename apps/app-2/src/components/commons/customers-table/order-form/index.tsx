import { Component } from 'react'

import { Button, Tab, Tabs } from '@nextui-org/react'

import type { Product, Service } from '@world-beauty/core/entities'
import { ListProductsUseCase, ListServicesUseCase } from '@world-beauty/core/use-cases'

import { productsRepository, servicesRepository } from '@/database'
import { PAGINATION } from '@world-beauty/core/constants'
import { ProductsTable } from '../../products-table'
import { ServicesTable } from '../../services-table'

type OrderFormProps = {
  onCancel: VoidFunction
}

type OrderFormState = {
  products: Product[]
  productsPage: number
  productsPagesCount: number
  selectedProductsIds: string[]
  services: Service[]
  servicesPage: number
  servicesPagesCount: number
  selectedServicesIds: string[]
}

export class OrderForm extends Component<OrderFormProps, OrderFormState> {
  private readonly listProductsUseCase = new ListProductsUseCase(productsRepository)
  private readonly listServicesUseCase = new ListServicesUseCase(servicesRepository)

  constructor(props: OrderFormProps) {
    super(props)
    this.state = {
      products: [],
      productsPage: 0,
      productsPagesCount: 0,
      selectedProductsIds: [],
      services: [],
      servicesPage: 0,
      servicesPagesCount: 0,
      selectedServicesIds: [],
    }
  }

  async fetchProducts(page: number) {
    const response = await this.listProductsUseCase.execute(page)
    this.setState({
      products: response.items,
      productsPagesCount: Math.ceil(response.itemsCount / PAGINATION.itemsPerPage),
      productsPage: page,
    })
  }

  async fetchServices(page: number) {
    const response = await this.listServicesUseCase.execute(page)
    this.setState({
      services: response.items,
      servicesPagesCount: Math.ceil(response.itemsCount / PAGINATION.itemsPerPage),
      servicesPage: page,
    })
  }

  handleProductsSelectionChange(selectedProductsIds: string[]) {
    this.setState({
      selectedProductsIds,
    })
  }

  handleServicesSelectionChange(selectedServicesIds: string[]) {
    this.setState({
      selectedServicesIds,
    })
  }

  async componentDidMount() {
    await Promise.all([this.fetchProducts(1), this.fetchServices(1)])
  }

  render() {
    return (
      <div>
        <h2>Fazer pedido para cliente</h2>
        <Tabs aria-label='Tabelas'>
          <Tab>
            <h3 className='text-xl text-zinc-800 font-semibold'>Produtos</h3>
            <ProductsTable
              hasActions={false}
              hasSelection={true}
              products={this.state.products}
              page={this.state.productsPage}
              pagesCount={this.state.productsPagesCount}
              selectedProductsIds={this.state.selectedProductsIds}
              onProductsSelectionChange={(productsIds) =>
                this.handleProductsSelectionChange(productsIds)
              }
            />
          </Tab>
          <Tab>
            <h3 className='text-xl text-zinc-800 font-semibold'>Serviços</h3>
            <ServicesTable
              hasActions={false}
              hasSelection={true}
              services={this.state.services}
              page={this.state.servicesPage}
              pagesCount={this.state.servicesPagesCount}
              selectedServicesIds={this.state.selectedServicesIds}
              onServicesSelectionChange={(servicesIds) =>
                this.handleServicesSelectionChange(servicesIds)
              }
            />
          </Tab>
        </Tabs>
        <div className='flex items-center gap-2'>
          <Button color='primary'>Fazer pedido</Button>
          <Button color='danger' onClick={this.props.onCancel}>
            Cancelar
          </Button>
        </div>
      </div>
    )
  }
}
