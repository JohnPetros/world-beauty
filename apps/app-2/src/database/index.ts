import {
  LocalStorageCustomersRepository,
  LocalStorageProductsRepository,
  LocalStorageServicesRepository,
  LocalStorageOrdersRepository,
} from './localstorage/repositories'
import { Seed } from './localstorage/seed'

export const ordersRepository = LocalStorageOrdersRepository()
export const customersRepository = LocalStorageCustomersRepository(ordersRepository)
export const productsRepository = LocalStorageProductsRepository(
  ordersRepository,
  customersRepository,
)
export const servicesRepository = LocalStorageServicesRepository(
  ordersRepository,
  customersRepository,
)

Seed()
