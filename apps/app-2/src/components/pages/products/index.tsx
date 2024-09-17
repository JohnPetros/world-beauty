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
} from '@nextui-org/react'

import { PageTitle } from '@/components/commons/title'
import { PAGINATION } from '@world-beauty/core/constants'
import type { Product } from '@world-beauty/core/entities'

import { Icon } from '@/components/commons/icon'
import { Dialog } from '@/components/commons/dialog'
import type { ProductDto } from '@world-beauty/core/dtos'
import { ListProductsUseCase, RegisterProductUseCase } from '@world-beauty/core/use-cases'
import { productsRepository } from '@/database'

type productsPageState = {
  products: Product[]
  page: number
  pagesCount: number
}

export class ProductsPage extends Component<any, productsPageState> {
  private readonly listproductsUseCase = new ListProductsUseCase(productsRepository)
  private readonly registerProductUseCase = new RegisterProductUseCase(productsRepository)

  constructor(props: any) {
    super(props)
    this.state = {
      products: [],
      page: 1,
      pagesCount: 0,
    }
  }

  async fetchproducts(page: number) {
    const response = await this.listproductsUseCase.execute(page)
    this.setState({
      products: response.items,
      pagesCount: response.itemsCount / PAGINATION.itemsPerPage,
      page,
    })
  }

  async handlePageChange(page: number) {
    await this.fetchproducts(page)
  }

  async handleSubmit(productDto: ProductDto, closeDialog: VoidFunction) {
    // await this.registerproductUseCase.execute(productDto)
    closeDialog()
  }

  async componentDidMount() {
    await this.fetchproducts(1)
  }

  render() {
    return (
      <div className='flex flex-col gap-3'>
        <PageTitle>Produtos</PageTitle>

        {/* <Dialog
          title='Adicionar cliente'
          trigger={
            <Button
              endContent={<Icon name='add' size={20} />}
              className='bg-zinc-800 text-zinc-50 w-max'
            >
              Cadastrar cliente
            </Button>
          }
        >
          {(closeDialog) => (
            <RegisterproductForm
              onSubmit={(productDto) => this.handleSubmit(productDto, closeDialog)}
            />
          )}
        </Dialog> */}

        {this.state.pagesCount && (
          <div className='w-full'>
            <Table
              color='default'
              selectionMode='multiple'
              aria-label='Example static collection table'
              bottomContent={
                <Pagination
                  color='primary'
                  total={this.state.pagesCount}
                  initialPage={this.state.page}
                  onChange={(page) => this.handlePageChange(page)}
                />
              }
              className='w-full'
            >
              <TableHeader>
                <TableColumn>Nome</TableColumn>
                <TableColumn>Preço</TableColumn>
                <TableColumn>Descrição</TableColumn>
                <TableColumn>Ações</TableColumn>
              </TableHeader>
              <TableBody
                emptyContent={'Nenhum cliente cadastrado'}
                items={this.state.products}
              >
                {(product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>
                      <div className='relative flex items-center gap-2'>
                        <Tooltip content='Editar produto'>
                          <Button size='sm' className='bg-gray-200 text-zinc-800'>
                            <Icon name='edit' size={16} />
                          </Button>
                        </Tooltip>
                        <Tooltip content='Deletar produto'>
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
        )}
      </div>
    )
  }
}
