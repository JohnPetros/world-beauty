import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { PAGINATION } from '@world-beauty/core/constants'
import { Product } from '@world-beauty/core/entities'
import type { ProductDto } from '@world-beauty/core/dtos'

import { productsService } from '@/api'

export function useProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [pagesCount, setPagesCount] = useState(0)
  const [selectedProductsIds, setSelectedProductsIds] = useState<string[]>([])
  const [page, setPage] = useState(1)
  const [isFetching, setIsFetching] = useState(true)

  const fetchProducts = useCallback(async (page: number) => {
    const response = await productsService.listProducts(page)
    setProducts(response.body.items.map(Product.create))
    setPagesCount(Math.ceil(response.body.itemsCount / PAGINATION.itemsPerPage))
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
    await productsService.deleteProducts(selectedProductsIds)
    await fetchProducts(1)
  }

  async function handleUpdateProduct(productDto: ProductDto, productId: string) {
    const response = await productsService.updateProduct(
      Product.create({ id: productId, ...productDto }),
    )
    if (response.isFailure) {
      toast.error('Erro ao atualizar cliente')
      return
    }
    await fetchProducts(1)
    toast.success('Cliente atualizado com sucessso')
  }

  async function handleRegisterProduct(productDto: ProductDto) {
    const response = await productsService.registerProduct(Product.create(productDto))
    if (response.isFailure) {
      toast.error('Erro ao registrar cliente')
      return
    }
    await fetchProducts(1)
    toast.success('Cliente criado com sucessso')
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
    handleRegisterProduct,
    handleUpdateProduct,
    handleDeleteButtonClick,
    handleProductsSelectionChange,
    handlePageChange,
  }
}
