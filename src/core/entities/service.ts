import { EntityWithId } from './entity-with-id'

export type ServiceProps = {
  id?: string
  name: string
  price: number
  description: string
}

export class Service extends EntityWithId {
  private _name: string
  private _price: number
  private _description: string

  constructor(props: ServiceProps) {
    super(props.id)
    this._name = props.name
    this._price = props.price
    this._description = props.description
  }

  public get name() {
    return this._name
  }

  public set name(name: string) {
    this._name = name
  }

  public get price(): string {
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    return formatter.format(this._price)
  }

  public set price(price: number) {
    this._price = price
  }

  public get priceAsNumber() {
    return Number(this._price)
  }

  public get description() {
    return this._description
  }

  public set description(description: string) {
    this._description = description
  }
}
