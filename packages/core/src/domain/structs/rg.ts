import type { DocumentDto } from '../../dtos'
import { Document } from '../abstracts'

export class Rg extends Document {
  static create(dto: DocumentDto): Rg {
    return new Rg(dto.value, dto.issueDate)
  }
}
