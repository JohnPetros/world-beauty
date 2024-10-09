import { ICONS } from './icons'
import type { IconProps } from '../types'

export const LucideIcon = ({ name, className, size }: IconProps) => {
  const Icon = ICONS[name]
  return <Icon className={className} size={size ?? 24} />
}
