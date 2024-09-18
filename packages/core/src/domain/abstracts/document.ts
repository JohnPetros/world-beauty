export abstract class Document {
  readonly value: string
  readonly issueDate: Date

  protected constructor(value: string, issueDate: string) {
    this.value = value

    const dateParts = issueDate.split('/')
    const year = Number(dateParts[2])
    const month = Number(dateParts[1])
    const day = Number(dateParts[0])
    this.issueDate = new Date(year, month - 1, day)
  }
}
