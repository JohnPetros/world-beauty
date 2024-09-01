import { EntityWithId } from './entity-with-id'

type ServiceProps = {
  name: string
  price: number
}

export class Service extends EntityWithId {
  private _name: string
  private _price: number

  constructor(props: ServiceProps) {
    super()
    this._name = props.name
    this._price = props.price
  }

  public get name() {
    return this._name
  }

  public get price() {
    return this._price
  }
}
