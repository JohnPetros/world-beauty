import { ApiClient } from './client'
import {
  CustomersService,
  ProductsService,
  ServicesService,
  OrdersService,
  ReportsService,
} from './services'

const apiClient = ApiClient()
apiClient.setBaseUrl('http://localhost:32832')

export const customersService = CustomersService(apiClient)
export const productsService = ProductsService(apiClient)
export const servicesService = ServicesService(apiClient)
export const ordersService = OrdersService(apiClient)
export const reportsService = ReportsService(apiClient)
