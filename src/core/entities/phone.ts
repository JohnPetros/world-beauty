export class Phone {
  constructor(
    private _ddd: string,
    private _number: string,
  ) {}

  public get ddd(): string {
    return this._ddd
  }

  public get number(): string {
    return this._number
  }
}
