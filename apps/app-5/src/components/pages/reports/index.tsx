import { Select, SelectItem } from '@nextui-org/react'

import { PageTitle } from '@/components/commons/page-title'

import { useReportsPage } from './use-reports-page'
import { CustomersByGenderTable } from './customers-by-gender-table'
import { CustomersByLessConsumptionTable } from './customers-by-less-consumption-table'
import { CustomersByMostConsumptionTable } from './customers-by-most-consumption-table'
import { CustomersByMostSpendingTable } from './customers-by-most-spending-table'
import { MostConsumedProductsAndServicesTable } from './most-consumed-products-and-services-table'
import { MostConsumedProductsAndServicesByGenderTable } from './most-consumed-products-and-services-table-by-gender'

export const ReportsPage = () => {
  const { selectedReport, handleSelectChange } = useReportsPage()

  return (
    <div className='flex flex-col gap-3 pb-12'>
      <PageTitle>Relatórios</PageTitle>

      <Select
        label='Selecione um relatório'
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
        {selectedReport === 'most-consumed-products-and-services-by-gender' && (
          <MostConsumedProductsAndServicesByGenderTable />
        )}
        {selectedReport === 'most-consumed-products-and-services' && (
          <MostConsumedProductsAndServicesTable />
        )}
        {selectedReport === 'customers-by-most-spending' && (
          <CustomersByMostSpendingTable />
        )}
        {selectedReport === 'customers-by-most-consumption' && (
          <CustomersByMostConsumptionTable />
        )}
        {selectedReport === 'customers-by-less-consumption' && (
          <CustomersByLessConsumptionTable />
        )}
        {selectedReport === 'customers-by-gender' && <CustomersByGenderTable />}
      </div>
    </div>
  )
}
