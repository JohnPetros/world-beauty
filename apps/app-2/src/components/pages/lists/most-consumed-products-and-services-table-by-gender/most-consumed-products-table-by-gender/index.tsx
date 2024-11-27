import { Component } from 'react'

import {
  ListMostConsumedProductsByMaleCustomersUseCase,
  ListMostConsumedProductsByFemaleCustomersUseCase,
} from '@world-beauty/core/use-cases'
import { Product } from '@world-beauty/core/entities'
import { PAGINATION } from '@world-beauty/core/constants'

import { productsRepository } from '@/database'
import { ProductsTable } from '@/components/commons/products-table'

type ProductsPageState = {
  maleCustomersProducts: Product[]
  maleCustomersProductsPage: number
  maleCustomersProductsPagesCount: number
  femaleCustomersProducts: Product[]
  femaleCustomersProductsPage: number
  femaleCustomersProductsPagesCount: number
}

export class MostConsumedProductsTableByGender extends Component<any, ProductsPageState> {
  private readonly listMostConsumedProductsByMaleCustomers =
    new ListMostConsumedProductsByMaleCustomersUseCase(productsRepository)
  private readonly listMostConsumedProductsByFemaleCustomers =
    new ListMostConsumedProductsByFemaleCustomersUseCase(productsRepository)

  constructor(props: any) {
    super(props)
    this.state = {
      maleCustomersProducts: [],
      maleCustomersProductsPage: 1,
      maleCustomersProductsPagesCount: 0,
      femaleCustomersProducts: [],
      femaleCustomersProductsPage: 1,
      femaleCustomersProductsPagesCount: 0,
    }
  }

  async fetchMaleCustomersProducts(page: number) {
    const { items, itemsCount } =
      await this.listMostConsumedProductsByMaleCustomers.execute(page)

    this.setState({
      maleCustomersProducts: items.map(Product.create),
      maleCustomersProductsPage: page,
      maleCustomersProductsPagesCount: Math.ceil(itemsCount / PAGINATION.itemsPerPage),
    })
  }

  async fetchFemaleCustomersProducts(page: number) {
    const { items, itemsCount } =
      await this.listMostConsumedProductsByFemaleCustomers.execute(page)

    this.setState({
      femaleCustomersProducts: items.map(Product.create),
      femaleCustomersProductsPage: page,
      femaleCustomersProductsPagesCount: Math.ceil(itemsCount / PAGINATION.itemsPerPage),
    })
  }

  async handleMaleCustomersProductsPageChange(page: number) {
    await this.fetchMaleCustomersProducts(page)
  }

  async handleFemaleCustomersProductsPageChange(page: number) {
    await this.fetchFemaleCustomersProducts(page)
  }

  async componentDidMount() {
    await this.fetchMaleCustomersProducts(1)
    await this.fetchFemaleCustomersProducts(1)
  }

  render() {
    return (
      <div className='flex flex-col gap-3'>
        <div>
          <h2 className='mb-2 text-zinc-700 text-xl font-medium'>
            Produtos mais consumidos por clientes do sexo masculino
          </h2>
          <ProductsTable
            hasActions={false}
            hasSelection={false}
            products={this.state.maleCustomersProducts}
            page={this.state.maleCustomersProductsPage}
            pagesCount={this.state.maleCustomersProductsPagesCount}
            onPageChange={(page) => this.handleMaleCustomersProductsPageChange(page)}
          />
        </div>
        <div className='mt-6'>
          <h2 className='mb-2 text-zinc-700 text-xl font-medium'>
            Produtos mais consumidos por clientes do sexo feminino
          </h2>
          <ProductsTable
            hasActions={false}
            hasSelection={false}
            products={this.state.femaleCustomersProducts}
            page={this.state.femaleCustomersProductsPage}
            pagesCount={this.state.femaleCustomersProductsPagesCount}
            onPageChange={(page) => this.handleFemaleCustomersProductsPageChange(page)}
          />
        </div>
      </div>
    )
  }
}
