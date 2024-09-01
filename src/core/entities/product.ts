import { EntityWithId } from './entity-with-id'

type ProductProps = {
  name: string
  price: number
}

export class Product extends EntityWithId {
  private _name: string
  private _price: number

  constructor(props: ProductProps) {
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
