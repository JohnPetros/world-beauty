import { randomUUID } from 'node:crypto'

export class EntityWithId {
  private _id: string

  constructor(id?: string) {
    this._id = id ?? randomUUID().slice(0, 4)
  }

  public get id(): string {
    return this._id
  }

  isEqualTo(entity: EntityWithId): boolean {
    return this.id === entity.id
  }
}
