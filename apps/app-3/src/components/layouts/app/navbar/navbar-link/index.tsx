import { Link } from '@nextui-org/react'

import type { IconName } from '@/components/commons/icon/types'
import { Icon } from '@/components/commons/icon'

type NavLinkProps = {
  icon: IconName
  title: string
  link: string
}

export const NavbarLink = ({ icon, link, title }: NavLinkProps) => {
  return (
    <Link
      href={link}
      className='flex items-center gap-1 w-full px-3 py-2 rounded-md text-md text-zinc-700 font-medium hover:bg-zinc-200'
    >
      <Icon name={icon} className='text-zinc-700' size={20} />
      {title}
    </Link>
  )
}
