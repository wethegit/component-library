import { Flex } from "@local/components"
import { classnames } from "@local/utilities"

import styles from "./nav-list.module.scss"

export interface NavListProps extends React.HTMLAttributes<HTMLUListElement> {
  children?: React.ReactNode
}

export function NavList({ children, className, ...props }: NavListProps) {
  return (
    <Flex as="ul" className={classnames([styles.navList, className])} {...props}>
      {children}
    </Flex>
  )
}

export interface NavListItemProps extends React.HTMLAttributes<HTMLLIElement> {}

export function NavListItem({ children, className, ...props }: NavListItemProps) {
  return (
    <li className={classnames([styles.navListItem, className])} {...props}>
      {children}
    </li>
  )
}
