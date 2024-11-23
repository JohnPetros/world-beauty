import {
  CustomersRepository,
  ProductsRepository,
  ServicesRepository,
  OrdersRepository,
} from './prisma/repositories'

export const customersRepository = new CustomersRepository()
export const productsRepository = new ProductsRepository()
export const servicesRepository = new ServicesRepository()
export const ordersRepository = new OrdersRepository()
