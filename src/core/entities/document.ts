export class Document {
  private _value: string
  private _issueDate: Date

  constructor(value: string, issueDate: string) {
    this._value = value

    const dateParts = issueDate.split('/')
    const year = Number(dateParts[2])
    const month = Number(dateParts[1])
    const day = Number(dateParts[0])
    this._issueDate = new Date(year, month, day)
  }

  public get value(): string {
    return this._value
  }

  public get issueDate(): Date {
    return this._issueDate
  }
}
