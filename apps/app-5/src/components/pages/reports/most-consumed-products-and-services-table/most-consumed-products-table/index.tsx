import { ProductsTable } from '@/components/commons/products-table'
import { useMostConsumedProductsTable } from './use-most-consumed-products-table'

export const MostConsumedProductsTable = () => {
  const { isFetching, page, pagesCount, products, handlePageChange } =
    useMostConsumedProductsTable()

  return (
    <ProductsTable
      hasActions={false}
      hasSelection={false}
      products={products}
      page={page}
      pagesCount={pagesCount}
      isLoading={isFetching}
      onPageChange={(page) => handlePageChange(page)}
    />
  )
}
