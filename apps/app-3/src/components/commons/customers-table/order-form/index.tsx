import { Button, Tab, Tabs } from '@nextui-org/react'

import type { Item } from '@world-beauty/core/abstracts'

import { ProductsTable } from '../../products-table'
import { ServicesTable } from '../../services-table'
import { useOrderForm } from './use-order-form'

type OrderFormProps = {
  customerId: string
  onCancel: VoidFunction
  onOrderItems: (items: Item[]) => void
}

export const OrderForm = ({ customerId, onOrderItems, onCancel }: OrderFormProps) => {
  const {
    products,
    productsPage,
    productsPagesCount,
    selectedProductsIds,
    services,
    servicesPage,
    servicesPagesCount,
    selectedServicesIds,
    handleProductsPageChange,
    handleProductsSelectionChange,
    handleServicesPageChange,
    handleServicesSelectionChange,
    handleOrderButtonClick,
  } = useOrderForm(customerId, onOrderItems)

  return (
    <>
      <Tabs aria-label='Tabelas' className='mt-3 w-full'>
        <Tab title='Produtos' className='w-full'>
          <ProductsTable
            hasActions={false}
            hasSelection={true}
            products={products}
            page={productsPage}
            pagesCount={productsPagesCount}
            selectedProductsIds={selectedProductsIds}
            onPageChange={(page) => handleProductsPageChange(page)}
            onProductsSelectionChange={(productsIds) =>
              handleProductsSelectionChange(productsIds)
            }
          />
        </Tab>
        <Tab title='Serviços' className='w-full'>
          <ServicesTable
            hasActions={false}
            hasSelection={true}
            services={services}
            page={servicesPage}
            pagesCount={servicesPagesCount}
            onPageChange={(page) => handleServicesPageChange(page)}
            selectedServicesIds={selectedServicesIds}
            onServicesSelectionChange={(servicesIds) =>
              handleServicesSelectionChange(servicesIds)
            }
          />
        </Tab>
      </Tabs>
      <div className='flex items-center gap-2'>
        <Button
          color='primary'
          isDisabled={
            selectedServicesIds.length === 0 && selectedProductsIds.length === 0
          }
          onClick={handleOrderButtonClick}
        >
          Fazer pedido
        </Button>
        <Button color='danger' onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </>
  )
}
