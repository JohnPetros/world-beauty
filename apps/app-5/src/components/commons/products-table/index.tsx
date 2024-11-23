import {
  Button,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from '@nextui-org/react'

import type { Product } from '@world-beauty/core/entities'
import type { ProductDto } from '@world-beauty/core/dtos'

import { Icon } from '@/components/commons/icon'
import { Dialog } from '@/components/commons/dialog'
import { ProductForm } from './product-form'
import { useProductsTable } from './use-products-table'

type ProductsTableProps = {
  products: Product[]
  page: number
  pagesCount: number
  hasActions: boolean
  hasSelection: boolean
  isLoading?: boolean
  selectedProductsIds?: string[]
  onPageChange?: (page: number) => void
  onUpdateProduct?: (productDto: ProductDto, productsId: string) => void
  onProductsSelectionChange?: (productsIds: string[]) => void
}

export const ProductsTable = ({
  products,
  hasActions,
  hasSelection,
  page,
  pagesCount,
  isLoading,
  selectedProductsIds,
  onPageChange,
  onProductsSelectionChange,
  onUpdateProduct,
}: ProductsTableProps) => {
  const { handlePageChange, handleProductsSelectionChange, handleUpdateProduct } =
    useProductsTable({
      products,
      onPageChange,
      onProductsSelectionChange,
      onUpdateProduct,
    })

  return (
    <Table
      key={pagesCount}
      color='default'
      selectionMode={hasSelection ? 'multiple' : 'none'}
      selectedKeys={selectedProductsIds}
      aria-label='Tabela de produtos'
      onSelectionChange={(selection) => handleProductsSelectionChange(selection)}
      bottomContent={
        pagesCount > 1 && (
          <Pagination
            color='primary'
            total={pagesCount}
            initialPage={page}
            onChange={(page) => handlePageChange(page)}
          />
        )
      }
      className='w-full'
      checkboxesProps={{
        classNames: {
          wrapper: 'after:bg-foreground after:text-background text-background',
        },
      }}
    >
      <TableHeader>
        <TableColumn>Nome</TableColumn>
        <TableColumn>Preço</TableColumn>
        <TableColumn>Descrição</TableColumn>
        <TableColumn>Qtd. de vezes que esse produto foi consumido</TableColumn>
        <TableColumn> </TableColumn>
      </TableHeader>
      <TableBody
        isLoading={isLoading}
        loadingContent={<Spinner />}
        emptyContent='Nenhum produto cadastrado'
        items={products}
      >
        {(product) => (
          <TableRow key={product.id}>
            <TableCell>{product.name}</TableCell>
            <TableCell>
              {(() => {
                const formatter = new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
                return formatter.format(product.price)
              })()}
            </TableCell>
            <TableCell>{product.description}</TableCell>
            <TableCell>{product.ordersCount}</TableCell>
            <TableCell>
              {hasActions && (
                <div className='relative flex items-center gap-2'>
                  <Dialog
                    title='Atualizar produto'
                    trigger={(openDialog) => (
                      <Tooltip content='Atualizar produto'>
                        <Button
                          size='sm'
                          className='bg-gray-200 text-zinc-800'
                          onClick={openDialog}
                        >
                          <Icon name='edit' size={16} />
                        </Button>
                      </Tooltip>
                    )}
                  >
                    {(closeDialog) => (
                      <ProductForm
                        product={product}
                        onCancel={closeDialog}
                        onSubmit={async (productDto) => {
                          closeDialog()
                          await handleUpdateProduct(productDto, product.id)
                        }}
                      />
                    )}
                  </Dialog>
                </div>
              )}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
