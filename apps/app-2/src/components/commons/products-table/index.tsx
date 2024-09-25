import { Component } from 'react'
import {
  Button,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  type Selection,
} from '@nextui-org/react'

import type { Product } from '@world-beauty/core/entities'
import type { ProductDto } from '@world-beauty/core/dtos'

import { Icon } from '@/components/commons/icon'
import { Dialog } from '@/components/commons/dialog'
import { ProductForm } from './product-form'

type ProductsTableProps = {
  products: Product[]
  page: number
  pagesCount: number
  isInteractable: boolean
  selectedProductsIds?: string[]
  onPageChange?: (page: number) => void
  onUpdateProduct?: (productDto: ProductDto) => void
  onProductsSelectionChange?: (productsIds: string[]) => void
}

export class ProductsTable extends Component<ProductsTableProps> {
  async handleProductsSelectionChange(productsSelection: Selection) {
    let selectedProductsIds: string[] = []

    if (productsSelection === 'all') {
      selectedProductsIds = this.props.products.map((product) => product.id)
    } else {
      selectedProductsIds = Array.from(productsSelection).map(String)
    }

    if (this.props.onProductsSelectionChange)
      this.props.onProductsSelectionChange(selectedProductsIds)
  }

  handlePageChange(page: number) {
    if (this.props.onPageChange) this.props.onPageChange(page)
  }

  async handleUpdateProduct(productDto: ProductDto) {
    if (this.props.onUpdateProduct) this.props.onUpdateProduct(productDto)
  }

  render() {
    return (
      <Table
        key={this.props.pagesCount}
        color='default'
        selectionMode='multiple'
        selectedKeys={this.props.selectedProductsIds}
        aria-label='Tabela de produtos'
        onSelectionChange={(selection) => this.handleProductsSelectionChange(selection)}
        bottomContent={
          this.props.pagesCount > 1 && (
            <Pagination
              color='primary'
              total={this.props.pagesCount}
              initialPage={this.props.page}
              onChange={(page) => this.handlePageChange(page)}
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
          <TableColumn>Ações</TableColumn>
        </TableHeader>
        <TableBody emptyContent='Nenhum produto cadastrado' items={this.props.products}>
          {(product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>
                <div className='relative flex items-center gap-2'>
                  <Dialog
                    title='Atualizar produto'
                    trigger={
                      <Button size='sm' className='bg-gray-200 text-zinc-800'>
                        <Icon name='edit' size={16} />
                      </Button>
                    }
                  >
                    {(closeDialog) => (
                      <ProductForm
                        product={product}
                        onCancel={closeDialog}
                        onSubmit={async (productDto) => {
                          closeDialog()
                          await this.handleUpdateProduct(productDto)
                        }}
                      />
                    )}
                  </Dialog>

                  <Tooltip content='Deletar usuário'>
                    <Button size='sm' className='bg-gray-200 text-red-700'>
                      <Icon name='delete' size={16} />
                    </Button>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    )
  }
}
