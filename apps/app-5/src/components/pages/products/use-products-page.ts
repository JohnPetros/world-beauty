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
    setIsFetching(true)
    const response = await productsService.listProducts(page)

    if (response.isFailure) {
      toast.error(response.errorMessage)
    }

    if (response.isSuccess) {
      setProducts(response.body.items.map(Product.create))
      setPagesCount(Math.ceil(response.body.itemsCount / PAGINATION.itemsPerPage))
      setPage(page)
    }

    setIsFetching(false)
  }, [])

  function handleProductsSelectionChange(selectedProductsIds: string[]) {
    setSelectedProductsIds(selectedProductsIds)
  }

  async function handlePageChange(page: number) {
    await fetchProducts(page)
  }

  async function handleDeleteButtonClick() {
    const shouldDelete = confirm('Deseja deletar esse(s) produtos(s)?')
    if (!shouldDelete) return

    setIsFetching(true)

    const response = await productsService.deleteProducts(selectedProductsIds)
    if (response.isFailure) {
      toast.error(response.errorMessage)
    }

    if (response.isSuccess) {
      await fetchProducts(1)
      toast.success(
        selectedProductsIds.length > 1
          ? 'Produtos deletados com sucessso'
          : 'Produto deletado com sucessso',
      )
    }

    setSelectedProductsIds([])
    setIsFetching(false)
  }

  async function handleUpdateProduct(productDto: ProductDto, productId: string) {
    const response = await productsService.updateProduct(
      Product.create({ id: productId, ...productDto }),
    )
    if (response.isFailure) {
      toast.error(response.errorMessage)
    }

    if (response.isSuccess) {
      await fetchProducts(1)
      toast.success('Produto atualizado com sucessso')
    }

    setIsFetching(false)
  }

  async function handleRegisterProduct(productDto: ProductDto) {
    setIsFetching(true)

    const response = await productsService.registerProduct(Product.create(productDto))
    if (response.isFailure) {
      toast.error(response.errorMessage)
    }

    if (response.isSuccess) {
      await fetchProducts(1)
      toast.success('Produto registrado com sucessso')
    }
  }

  useEffect(() => {
    fetchProducts(1)
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
