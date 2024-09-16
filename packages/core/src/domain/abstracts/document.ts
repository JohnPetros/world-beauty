export abstract class Document {
  readonly value: string
  readonly issueDate: Date

  protected constructor(value: string, issueDate: Date) {
    this.value = value
    this.issueDate = issueDate
  }
}
