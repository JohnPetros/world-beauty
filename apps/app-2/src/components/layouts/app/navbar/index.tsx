import { Component } from 'react'
import { NavLink } from './nav-link'

export class NavMenu extends Component {
  render() {
    return (
      <ul className='space-y-2'>
        <li>
          <NavLink icon='customer' link='/' title='Clientes' />
        </li>
        <li>
          <NavLink icon='product' link='/products' title='Produtos' />
        </li>
        <li>
          <NavLink icon='service' link='/services' title='Seviços' />
        </li>
        <li>
          <NavLink icon='list' link='/lists' title='Listagens' />
        </li>
      </ul>
    )
  }
}
