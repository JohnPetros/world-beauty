import {
  LocalStorageCustomersRepository,
  LocalStorageProductsRepository,
  LocalStorageServicesRepository,
} from './localstorage/repositories'
import { Seed } from './localstorage/seed'

export const customersRepository = LocalStorageCustomersRepository()
export const productsRepository = LocalStorageProductsRepository(customersRepository)
export const servicesRepository = LocalStorageServicesRepository(customersRepository)

Seed()
