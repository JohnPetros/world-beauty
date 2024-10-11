import { Select, SelectItem } from '@nextui-org/react'

import { PageTitle } from '@/components/commons/page-title'

import { useListsPage } from './use-lists-page'
import { CustomersByGenderTable } from './customers-by-gender-table'

export const ListsPage = () => {
  const { selectedList, handleSelectChange } = useListsPage()

  return (
    <div className='flex flex-col gap-3'>
      <PageTitle>Listagens</PageTitle>

      <Select
        label='Selecione uma lista'
        defaultSelectedKeys={['customers-by-most-consumption']}
        onChange={({ target }) => handleSelectChange(target.value)}
        className='max-w-xs'
      >
        <SelectItem key='customers-by-most-consumption'>
          10 clientes que mais consumiram produtos ou serviços
        </SelectItem>
        <SelectItem key='customers-by-less-consumption'>
          10 clientes que menos consumiram produtos ou serviços
        </SelectItem>
        <SelectItem key='customers-by-most-spending'>
          5 clientes que mais consumiram em valor
        </SelectItem>
        <SelectItem key='most-consumed-products-and-services'>
          Produtos e serviços mais consumidos
        </SelectItem>
        <SelectItem key='most-consumed-products-and-services-by-gender'>
          Produtos e serviços mais consumidos por gênero
        </SelectItem>
        <SelectItem key='customers-by-gender'>Clientes por gênero</SelectItem>
      </Select>

      <div className='mt-6 pb-6'>
        {/* {selectedList === 'customers-by-most-consumption' && (
          <CustomersByMostConsumptionTable />
        )}
        {selectedList === 'customers-by-less-consumption' && (
          <CustomersByLessConsumptionTable />
        )}
        {selectedList === 'customers-by-most-spending' && (
          <CustomersByMostSpendingTable />
        )}
        {selectedList === 'most-consumed-products-and-services' && (
          <MostConsumedProductsAndServicesTable />
        )}
        {selectedList === 'most-consumed-products-and-services-by-gender' && (
          <MostConsumedProductsAndServicesByGenderTable />
        )} */}
        {selectedList === 'customers-by-gender' && <CustomersByGenderTable />}
      </div>
    </div>
  )
}
