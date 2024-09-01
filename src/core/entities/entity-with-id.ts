export class EntityWithId {
  private _id: string

  constructor(id?: string) {
    this._id = id ?? String(Math.floor(Math.random()) + 1)
  }

  public get() {
    return this._id
  }
}
