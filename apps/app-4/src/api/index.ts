import { ApiClient } from './client'
import { CustomersService } from './services'

const apiClient = ApiClient()
apiClient.setBaseUrl('http://localhost:32832')

export const customersService = CustomersService(apiClient)
