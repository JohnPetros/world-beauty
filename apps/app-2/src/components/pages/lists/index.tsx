import { Component } from 'react'

import { PageTitle } from '@/components/commons/title'
import { Select, SelectItem } from '@nextui-org/react'
import { CustomersByGenderTable } from './customers-by-gender-table'
import { CustomersByMostSpendingTable } from './customers-by-most-spending-table'
import { CustomersByMostConsumptionTable } from './customers-by-most-consumption-table'
import { CustomersByLessConsumptionTable } from './customers-by-less-consumption-table'
import { MostConsumedProductsTable } from './most-consumed-products-and-services-table/most-consumed-products-table'

type ListsPageState = {
  selectedList: string
}

export class ListsPage extends Component<any, ListsPageState> {
  constructor(props: any) {
    super(props)
    this.state = { selectedList: 'customers-by-most-consumption' }
  }

  handleSelectChange(value: string) {
    this.setState({ selectedList: value })
  }

  render() {
    return (
      <div className='flex flex-col gap-3'>
        <PageTitle>Listagens</PageTitle>

        <Select
          label='Selecione uma lista'
          defaultSelectedKeys={['customers-by-most-consumption']}
          onChange={({ target }) => this.handleSelectChange(target.value)}
          className='max-w-xs'
        >
          <SelectItem key='customers-by-most-consumption'>
            10 clientes que mais consumiram produtos ou serviços
          </SelectItem>
          <SelectItem key='customers-by-gender'>Clientes por gênero</SelectItem>
          <SelectItem key='most-consumption-products-and-services'>
            Produtos e serviços mais consumidos
          </SelectItem>
          <SelectItem key='most-consumption-products-and-services-by-gender'>
            Produtos e serviços mais consumidos por gênero
          </SelectItem>
          <SelectItem key='customers-by-less-consumption'>
            10 clientes que menos consumiram produtos ou serviços
          </SelectItem>
          <SelectItem key='customers-by-most-spending'>
            5 clientes que mais consumiram em valor
          </SelectItem>
        </Select>

        <div className='mt-6'>
          {this.state.selectedList === 'customers-by-most-consumption' && (
            <CustomersByMostConsumptionTable />
          )}
          {this.state.selectedList === 'customers-by-less-consumption' && (
            <CustomersByLessConsumptionTable />
          )}
          {this.state.selectedList === 'customers-by-most-spending' && (
            <CustomersByMostSpendingTable />
          )}
          {this.state.selectedList === 'customers-by-gender' && (
            <CustomersByGenderTable />
          )}
          {this.state.selectedList ===
            'most-consumption-products-and-services-by-gender' && (
            <MostConsumedProductsTable />
          )}
        </div>
      </div>
    )
  }
}
