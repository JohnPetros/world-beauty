import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import {
  DeleteProductsUseCase,
  ListProductsUseCase,
  RegisterProductUseCase,
  UpdateProductUseCase,
} from '@world-beauty/core/use-cases'
import { PAGINATION } from '@world-beauty/core/constants'
import { Product } from '@world-beauty/core/entities'
import type { ProductDto } from '@world-beauty/core/dtos'

import { productsRepository } from '@/database'

const registerProductUseCase = new RegisterProductUseCase(productsRepository)
const listProductsUseCase = new ListProductsUseCase(productsRepository)
const updateProductUseCase = new UpdateProductUseCase(productsRepository)
const deleteProductsUseCase = new DeleteProductsUseCase(productsRepository)

export function useProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [pagesCount, setPagesCount] = useState(0)
  const [selectedProductsIds, setSelectedProductsIds] = useState<string[]>([])
  const [page, setPage] = useState(1)
  const [isFetching, setIsFetching] = useState(true)

  const fetchProducts = useCallback(async (page: number) => {
    const response = await listProductsUseCase.execute(page)
    setProducts(response.items.map(Product.create))
    setPagesCount(Math.ceil(response.itemsCount / PAGINATION.itemsPerPage))
    setPage(page)
  }, [])

  function handleProductsSelectionChange(selectedProductsIds: string[]) {
    setSelectedProductsIds(selectedProductsIds)
  }

  async function handlePageChange(page: number) {
    await fetchProducts(page)
  }

  async function handleDeleteButtonClick() {
    setSelectedProductsIds([])
    await deleteProductsUseCase.execute(selectedProductsIds)
    await fetchProducts(1)
  }

  async function handleUpdateProduct(productDto: ProductDto) {
    await updateProductUseCase.execute(productDto)
    await fetchProducts(1)
  }

  function handleProductOrderItems() {
    fetchProducts(page)
    toast('Pedido realizado com sucesso!', { type: 'success' })
  }

  async function handleFormSubmit(
    productDto: ProductDto,
    closeDialog: VoidFunction,
    action: 'register' | 'update',
  ) {
    if (action === 'register') {
      await registerProductUseCase.execute(productDto)
    } else {
      await updateProductUseCase.execute(productDto)
    }
    await fetchProducts(1)
    closeDialog()
  }

  useEffect(() => {
    fetchProducts(1)
    setIsFetching(false)
  }, [fetchProducts])

  return {
    products,
    page,
    pagesCount,
    isFetching,
    selectedProductsIds,
    handleFormSubmit,
    handleUpdateProduct,
    handleDeleteButtonClick,
    handleProductOrderItems,
    handleProductsSelectionChange,
    handlePageChange,
  }
}
