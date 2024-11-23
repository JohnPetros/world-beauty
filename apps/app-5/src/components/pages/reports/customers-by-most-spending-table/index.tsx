import { CustomersTable } from '@/components/commons/customers-table'
import { useCustomersByMostSpendingTable } from './use-customers-by-spending-table'

export const CustomersByMostSpendingTable = () => {
  const { isFetching, customers, page, handlePageChange } =
    useCustomersByMostSpendingTable()

  return (
    <div className='flex flex-col gap-3'>
      <div>
        <h2 className='mb-2 text-zinc-700 text-xl font-medium'>
          Top 5 clientes que mais consumiram produtos ou serviços (em valor)
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
