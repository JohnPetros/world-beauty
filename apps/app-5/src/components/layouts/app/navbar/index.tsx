import { NavbarLink } from './navbar-link'

export const NavMenu = () => {
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
        <NavbarLink icon='list' link='/reports' title='Relatórios' />
      </li>
    </ul>
  )
}
