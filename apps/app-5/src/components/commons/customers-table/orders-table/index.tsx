import { Tab, Tabs } from '@nextui-org/react'

import { ProductsTable } from '../../products-table'
import { ServicesTable } from '../../services-table'
import { useOrdersTable } from './use-orders-table'

type OrderFormProps = {
  customerId: string
}

export const OrdersTable = ({ customerId }: OrderFormProps) => {
  const {
    isFetchingProducts,
    isFetchingServices,
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
  } = useOrdersTable(customerId)

  return (
    <>
      <Tabs aria-label='Tabelas' className='mt-3 w-full'>
        <Tab title='Produtos' className='w-full'>
          <ProductsTable
            hasActions={false}
            hasSelection={false}
            products={products}
            page={productsPage}
            pagesCount={productsPagesCount}
            selectedProductsIds={selectedProductsIds}
            isLoading={isFetchingProducts}
            onPageChange={(page) => handleProductsPageChange(page)}
            onProductsSelectionChange={(productsIds) =>
              handleProductsSelectionChange(productsIds)
            }
          />
        </Tab>
        <Tab title='Serviços' className='w-full'>
          <ServicesTable
            hasActions={false}
            hasSelection={false}
            services={services}
            page={servicesPage}
            pagesCount={servicesPagesCount}
            isLoading={isFetchingServices}
            onPageChange={(page) => handleServicesPageChange(page)}
            selectedServicesIds={selectedServicesIds}
            onServicesSelectionChange={(servicesIds) =>
              handleServicesSelectionChange(servicesIds)
            }
          />
        </Tab>
      </Tabs>
    </>
  )
}
