import type { DocumentDto } from '../../dtos'
import { Document } from '../abstracts'

export class Rg extends Document {
  static create(dto: DocumentDto): Rg {
    return new Rg(dto.value, dto.issueDate)
  }

  get dto(): DocumentDto {
    return {
      issueDate: this.issueDate.toDateString(),
      value: this.value,
    }
  }
}
