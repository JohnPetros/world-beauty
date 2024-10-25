import { ProductsTable } from '@/components/commons/products-table'
import { useMostConsumedProductsTable } from './use-most-consumed-products-table'

export const MostConsumedProductsTable = () => {
  const {page, pagesCount, products, handlePageChange} = useMostConsumedProductsTable()

    return (
      <ProductsTable
        hasActions={false}
        hasSelection={false}
        products={products}
        page={page}
        pagesCount={pagesCount}
        onPageChange={(page) => handlePageChange(page)}
      />
    )
}
