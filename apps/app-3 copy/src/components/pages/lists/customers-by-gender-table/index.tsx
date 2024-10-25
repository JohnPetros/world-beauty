import { CustomersTable } from '@/components/commons/customers-table'
import { useCustomersByGenderTable } from './use-customers-by-gender-table'

export const CustomersByGenderTable = () => {
  const {
    maleCustomers,
    maleCustomersPage,
    maleCustomersPagesCount,
    femaleCustomers,
    femaleCustomersPage,
    femaleCustomersPagesCount,
    handleMaleCustomersPageChange,
    handlefemaleCustomersPageChange,
  } = useCustomersByGenderTable()

  return (
    <div className='flex flex-col gap-3'>
      <div>
        <h2 className='mb-2 text-zinc-700 text-xl font-medium'>
          Clientes do sexo masculino
        </h2>
        <CustomersTable
          hasActions={false}
          customers={maleCustomers}
          page={maleCustomersPage}
          pagesCount={maleCustomersPagesCount}
          onPageChange={(page) => handleMaleCustomersPageChange(page)}
        />
      </div>
      <div className='mt-6'>
        <h2 className='mb-2 text-zinc-700 text-xl font-medium'>
          Clientes do sexo feminino
        </h2>
        <CustomersTable
          hasActions={false}
          customers={femaleCustomers}
          page={femaleCustomersPage}
          pagesCount={femaleCustomersPagesCount}
          onPageChange={(page) => handlefemaleCustomersPageChange(page)}
        />
      </div>
    </div>
  )
}
