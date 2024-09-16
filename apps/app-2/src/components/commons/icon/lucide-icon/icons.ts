import {
  HandPlatter,
  ScrollText,
  ShoppingBasket,
  SquareUser,
  type LucideProps,
} from 'lucide-react'
import type { ForwardRefExoticComponent, RefAttributes } from 'react'
import type { IconName } from '../types'

export const ICONS: Record<
  IconName,
  ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
> = {
  list: ScrollText,
  product: ShoppingBasket,
  service: HandPlatter,
  customer: SquareUser,
}
