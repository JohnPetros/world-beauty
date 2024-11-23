import type { DocumentDto } from '../../dtos'
import { Document } from '../abstracts'

export class Rg extends Document {
  static create(dto: DocumentDto): Rg {
    return new Rg(dto.value, dto.issueDate)
  }

  get format() {
    const formattedRG = `${this.value.slice(0, 3)}.${this.value.slice(3, 6)}.${this.value.slice(6, 9)}-${this.value[9]}`
    return formattedRG
  }

  get dto(): DocumentDto {
    return {
      issueDate: this.issueDate,
      value: this.value,
    }
  }
}
