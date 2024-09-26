import { Component } from 'react'

import { Button, Tab, Tabs } from '@nextui-org/react'

import type { Product, Service } from '@world-beauty/core/entities'
import {
  ListProductsUseCase,
  ListServicesUseCase,
  RegisterOrdersUseCase,
} from '@world-beauty/core/use-cases'

import type { OrderDto } from '@world-beauty/core/dtos'
import { PAGINATION } from '@world-beauty/core/constants'

import { ordersRepository, productsRepository, servicesRepository } from '@/database'
import { ProductsTable } from '../../products-table'
import { ServicesTable } from '../../services-table'

type OrderFormProps = {
  customerId: string
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
  private readonly registerOrdersUseCase = new RegisterOrdersUseCase(ordersRepository)

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

  async handleOrderButtonClick() {
    const selectedProducts = this.state.products.filter((product) =>
      this.state.selectedProductsIds.includes(product.id),
    )
    const selectedServices = this.state.services.filter((service) =>
      this.state.selectedServicesIds.includes(service.id),
    )
    const ordersDto: OrderDto[] = []

    for (const product of selectedProducts) {
      ordersDto.push({
        amount: product.price,
        customerId: this.props.customerId,
        itemId: product.id,
      })
    }
    for (const service of selectedServices) {
      ordersDto.push({
        amount: service.price,
        customerId: this.props.customerId,
        itemId: service.id,
      })
    }

    await this.registerOrdersUseCase.execute(ordersDto)
  }

  async componentDidMount() {
    await Promise.all([this.fetchProducts(1), this.fetchServices(1)])
  }

  render() {
    return (
      <>
        <Tabs aria-label='Tabelas' className='mt-3 w-full'>
          <Tab title='Produtos' className='w-full'>
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
          <Tab title='Serviços' className='w-full'>
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
      </>
    )
  }
}
