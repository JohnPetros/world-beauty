export class Phone {
  constructor(
    private _codeArea: string,
    private _number: string,
  ) {}

  public get codeArea(): string {
    return this._codeArea
  }

  public get number(): string {
    return this._number
  }
}
