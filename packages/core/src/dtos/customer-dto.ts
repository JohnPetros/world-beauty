import type { DocumentDto } from './document-dto'
import type { PhoneDto } from './phone-dto'
import type { ProductDto } from './product-dto'
import type { ServiceDto } from './service-dto'

export type CustomerDto = {
  id?: string
  name: string
  socialName: string
  email: string
  gender: string
  cpf: DocumentDto
  rgs: DocumentDto[]
  phones: PhoneDto[]
  consumedProducts: ProductDto[]
  consumedServices: ServiceDto[]
}
