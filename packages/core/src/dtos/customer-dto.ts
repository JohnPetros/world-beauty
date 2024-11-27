import type { DocumentDto } from './document-dto'
import type { PhoneDto } from './phone-dto'

export type CustomerDto = {
  id?: string
  name: string
  socialName?: string
  gender: string
  cpf: DocumentDto
  rgs: DocumentDto[]
  phones: PhoneDto[]
  consumption?: number
  spending?: number
}
