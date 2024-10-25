import { CustomersTable } from '@/components/commons/customers-table'
import { useCustomersByLessConsumptionTable } from './use-customers-by-less-consumption-table'

export const CustomersByLessConsumptionTable = () => {
  const { customers, page, handlePageChange } =
    useCustomersByLessConsumptionTable()

  return (
    <div className='flex flex-col gap-3'>
      <div>
        <h2 className='mb-2 text-zinc-700 text-xl font-medium'>
          Top 10 clientes que menos consumiram produtos ou serviços (em quantidade)
        </h2>
        <CustomersTable
          hasActions={false}
          customers={customers}
          page={page}
          pagesCount={0}
          onPageChange={(page) => handlePageChange(page)}
        />
      </div>
    </div>
  )
}
