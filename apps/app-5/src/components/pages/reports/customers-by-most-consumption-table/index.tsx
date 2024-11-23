import { CustomersTable } from '@/components/commons/customers-table'
import { useCustomersByMostConsumptionTable } from './use-customers-by-most-consumption-table'

export const CustomersByMostConsumptionTable = () => {
  const { isFetching, customers, page, handlePageChange } =
    useCustomersByMostConsumptionTable()

  return (
    <div className='flex flex-col gap-3'>
      <div>
        <h2 className='mb-2 text-zinc-700 text-xl font-medium'>
          Top 10 clientes que mais consumiram produtos ou serviços (em quantidade)
        </h2>
        <CustomersTable
          hasActions={false}
          customers={customers}
          page={page}
          pagesCount={0}
          isLoading={isFetching}
          onPageChange={(page) => handlePageChange(page)}
        />
      </div>
    </div>
  )
}
