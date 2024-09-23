import { Document } from '../abstracts'
import type { DocumentDto } from '../../dtos'
import { Datetime } from '../../libs'

export class Cpf extends Document {
  static create(dto: DocumentDto): Cpf {
    return new Cpf(dto.value, dto.issueDate)
  }

  get dto(): DocumentDto {
    return {
      issueDate: this.issueDate,
      value: this.value,
    }
  }
}
