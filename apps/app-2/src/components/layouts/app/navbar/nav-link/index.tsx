import { Component } from 'react'
import type { IconName } from '../../../../shared/icon/types'
import { Link } from '@nextui-org/react'
import { Icon } from '../../../../shared/icon'

type NavLinkProps = {
  icon: IconName
  title: string
  link: string
}

export class NavLink extends Component<NavLinkProps> {
  render() {
    return (
      <Link
        href={this.props.link}
        className='flex items-center gap-1 w-full px-3 py-2 rounded-md text-md font-medium hover:bg-zinc-200'
      >
        <Icon name={this.props.icon} className='text-zinc-700' size={20} />
        {this.props.title}
      </Link>
    )
  }
}
