import { ICONS } from './icons'
import type { IconProps } from '../types'
import { type ForwardedRef, forwardRef } from 'react'

const LucideIconComponent = (
  { name, className, size }: IconProps,
  ref: ForwardedRef<SVGSVGElement>,
) => {
  const Icon = ICONS[name]
  return <Icon ref={ref} className={className} size={size ?? 24} />
}

export const LucideIcon = forwardRef(LucideIconComponent)
