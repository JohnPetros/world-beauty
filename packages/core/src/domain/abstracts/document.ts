import { Datetime } from '../../libs'

export abstract class Document {
  readonly value: string
  readonly issueDate: Date

  protected constructor(value: string, issueDate: Date) {
    this.value = value
    this.issueDate = issueDate instanceof Date ? issueDate : new Date(issueDate)
  }

  get issueDateAsString(): string {
    return new Datetime(this.issueDate).format('YYYY-MM-DD')
  }

  abstract get format(): string
}
