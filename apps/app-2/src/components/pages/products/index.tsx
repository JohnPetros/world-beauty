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

import {
  DeleteProductsUseCase,
  ListProductsUseCase,
  RegisterProductUseCase,
  UpdateProductUseCase,
} from '@world-beauty/core/use-cases'
import type { Product } from '@world-beauty/core/entities'
import type { ProductDto } from '@world-beauty/core/dtos'

import { productsRepository } from '@/database'
import { PageTitle } from '@/components/commons/title'
import { PAGINATION } from '@world-beauty/core/constants'
import { Icon } from '@/components/commons/icon'
import { Dialog } from '@/components/commons/dialog'
import { ProductForm } from './product-form'

type ProductsPageState = {
  products: Product[]
  page: number
  pagesCount: number
  selectedProductsIds: string[]
}

export class ProductsPage extends Component<any, ProductsPageState> {
  private readonly listProductsUseCase = new ListProductsUseCase(productsRepository)
  private readonly registerProductUseCase = new RegisterProductUseCase(productsRepository)
  private readonly updateProductUseCase = new UpdateProductUseCase(productsRepository)
  private readonly deleteProductsUseCase = new DeleteProductsUseCase(productsRepository)

  constructor(props: any) {
    super(props)
    this.state = {
      products: [],
      page: 1,
      pagesCount: 0,
      selectedProductsIds: [],
    }
  }

  async fetchProducts(page: number) {
    const response = await this.listProductsUseCase.execute(page)
    this.setState({
      products: response.items,
      pagesCount: Math.round(response.itemsCount / PAGINATION.itemsPerPage),
      page,
    })
  }

  async handleProductsSelectionChange(ProductsSelection: Selection) {
    let selectedProductsIds: string[] = []

    if (ProductsSelection === 'all') {
      selectedProductsIds = this.state.products.map((product) => product.id)
    } else {
      selectedProductsIds = Array.from(ProductsSelection).map(String)
    }

    this.setState({
      selectedProductsIds,
    })
  }

  async handlePageChange(page: number) {
    await this.fetchProducts(page)
  }

  async handleDeleteButtonClick() {
    this.setState({ selectedProductsIds: [] })
    await this.deleteProductsUseCase.execute(this.state.selectedProductsIds)
    await this.fetchProducts(1)
  }

  async handleSubmit(
    productDto: ProductDto,
    closeDialog: VoidFunction,
    action: 'register' | 'update',
  ) {
    if (action === 'register') {
      await this.registerProductUseCase.execute(productDto)
    } else {
      await this.updateProductUseCase.execute(productDto)
    }
    await this.fetchProducts(1)
    closeDialog()
  }

  async componentDidMount() {
    await this.fetchProducts(1)
  }

  render() {
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
                  this.handleSubmit(ProductDto, closeDialog, 'register')
                }
              />
            )}
          </Dialog>
          {this.state.selectedProductsIds.length > 0 && (
            <Button
              radius='sm'
              color='danger'
              onClick={() => this.handleDeleteButtonClick()}
            >
              Deletar produto(s)
            </Button>
          )}
        </div>

        <div className='w-full'>
          <Table
            key={this.state.pagesCount}
            color='default'
            selectionMode='multiple'
            selectedKeys={this.state.selectedProductsIds}
            aria-label='Tabela de produtos'
            onSelectionChange={(selection) =>
              this.handleProductsSelectionChange(selection)
            }
            bottomContent={
              this.state.pagesCount > 1 && (
                <Pagination
                  color='primary'
                  total={this.state.pagesCount}
                  initialPage={this.state.page}
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
            <TableBody
              emptyContent='Nenhum produto cadastrado'
              items={this.state.products}
            >
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
                            onSubmit={(ProductDto) =>
                              this.handleSubmit(ProductDto, closeDialog, 'update')
                            }
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
        </div>
      </div>
    )
  }
}
