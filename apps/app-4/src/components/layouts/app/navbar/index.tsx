import { NavbarLink } from './navbar-link'

export const NavMenu = () => {
  return (
    <ul className='space-y-2'>
      <li>
        <NavbarLink icon='customer' link='/' title='Clientes' />
      </li>
    </ul>
  )
}
