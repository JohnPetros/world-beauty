import { Component } from 'react'

import { NavbarLink } from './navbar-link'

export class NavMenu extends Component {
  render() {
    return (
      <ul className='space-y-2'>
        <li>
          <NavbarLink icon='customer' link='/' title='Clientes' />
        </li>
        <li>
          <NavbarLink icon='product' link='/products' title='Produtos' />
        </li>
        <li>
          <NavbarLink icon='service' link='/services' title='Seviços' />
        </li>
        <li>
          <NavbarLink icon='list' link='/lists' title='Listagens' />
        </li>
      </ul>
    )
  }
}
