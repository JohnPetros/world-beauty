import { LocalStorageCustomersRepository } from './localstorage/repositories'
import { Seed } from './localstorage/seed'

export const customersRepository = LocalStorageCustomersRepository()
Seed()
