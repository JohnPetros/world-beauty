import { AxiosApiClient } from './axios/client'
import {
  CustomersService,
  ProductsService,
  ServicesService,
  OrdersService,
  ReportsService,
} from './services'

const apiClient = AxiosApiClient()
apiClient.setBaseUrl('http://localhost:3333')

export const customersService = CustomersService(apiClient)
export const productsService = ProductsService(apiClient)
export const servicesService = ServicesService(apiClient)
export const ordersService = OrdersService(apiClient)
export const reportsService = ReportsService(apiClient)
