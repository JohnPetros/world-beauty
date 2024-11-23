import { ProductsTable } from '@/components/commons/products-table'
import { useMostConsumedProductsTableByGender } from './use-most-consumed-products-table-by-gender'

export const MostConsumedProductsTableByGender = () => {
  const {
    isFetchingMaleCustomers,
    isFetchingFemaleCustomers,
    maleCustomersProducts,
    maleCustomersProductsPage,
    maleCustomersProductsPagesCount,
    femaleCustomersProductsPage,
    femaleCustomersProductsPagesCount,
    femaleCustomersProducts,
    handleMaleCustomersProductsPageChange,
    handleFemaleCustomersProductsPageChange,
  } = useMostConsumedProductsTableByGender()

  return (
    <div className='flex flex-col gap-3'>
      <div>
        <h2 className='mb-2 text-zinc-700 text-xl font-medium'>
          Produtos mais consumidos por clientes do sexo masculino
        </h2>
        <ProductsTable
          hasSelection={false}
          hasActions={false}
          products={maleCustomersProducts}
          page={maleCustomersProductsPage}
          pagesCount={maleCustomersProductsPagesCount}
          isLoading={isFetchingMaleCustomers}
          onPageChange={(page) => handleMaleCustomersProductsPageChange(page)}
        />
      </div>
      <div className='mt-6'>
        <h2 className='mb-2 text-zinc-700 text-xl font-medium'>
          Produtos mais consumidos por clientes do sexo feminino
        </h2>
        <ProductsTable
          hasSelection={false}
          hasActions={false}
          products={femaleCustomersProducts}
          page={femaleCustomersProductsPage}
          pagesCount={femaleCustomersProductsPagesCount}
          isLoading={isFetchingFemaleCustomers}
          onPageChange={(page) => handleFemaleCustomersProductsPageChange(page)}
        />
      </div>
    </div>
  )
}
