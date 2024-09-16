import { Document } from '../abstracts'
import type { DocumentDto } from '../../dtos'

export class Cpf extends Document {
  static create(dto: DocumentDto): Cpf {
    return new Cpf(dto.value, dto.issueDate)
  }
}
