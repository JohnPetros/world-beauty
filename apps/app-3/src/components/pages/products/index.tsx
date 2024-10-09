import { Button } from '@nextui-org/react'

import { PageTitle } from '@/components/commons/page-title'
import { Icon } from '@/components/commons/icon'
import { Dialog } from '@/components/commons/dialog'
import { ProductForm } from '../../commons/products-table/product-form'
import { ProductsTable } from '@/components/commons/products-table'
import { useProductsPage } from './use-products-page'

export const ProductsPage = () => {
  const {
    page,
    products,
    isFetching,
    pagesCount,
    selectedProductsIds,
    handleDeleteButtonClick,
    handleFormSubmit,
    handlePageChange,
    handleProductsSelectionChange,
    handleUpdateProduct,
  } = useProductsPage()

  return (
    <div className='flex flex-col gap-3'>
      <PageTitle>Produtos</PageTitle>

      <div className='flex items-center gap-2'>
        <Dialog
          title='Adicionar produto'
          trigger={
            <Button
              endContent={<Icon name='add' size={20} />}
              radius='sm'
              className='bg-zinc-800 text-zinc-50 w-max'
            >
              Cadastrar produto
            </Button>
          }
        >
          {(closeDialog) => (
            <ProductForm
              onCancel={closeDialog}
              onSubmit={(ProductDto) =>
                handleFormSubmit(ProductDto, closeDialog, 'register')
              }
            />
          )}
        </Dialog>
        {selectedProductsIds.length > 0 && (
          <Button radius='sm' color='danger' onClick={() => handleDeleteButtonClick()}>
            Deletar produto(s)
          </Button>
        )}
      </div>

      <div className='w-full'>
        <ProductsTable
          hasActions={true}
          hasSelection={true}
          products={products}
          page={page}
          isLoading={isFetching}
          pagesCount={pagesCount}
          selectedProductsIds={selectedProductsIds}
          onUpdateProduct={(productDto) => handleUpdateProduct(productDto)}
          onPageChange={(page) => handlePageChange(page)}
          onProductsSelectionChange={(productsIds) =>
            handleProductsSelectionChange(productsIds)
          }
        />
      </div>
    </div>
  )
}
