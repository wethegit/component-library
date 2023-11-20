import { Flex } from "@local/components"

import styles from "./nav-list.module.scss"

export interface NavListProps extends React.HTMLAttributes<HTMLUListElement> {
  children?: React.ReactNode
}

export function NavList({ children, ...props }: NavListProps) {
  return (
    <Flex as="ul" className={styles.navList} {...props}>
      {children}
    </Flex>
  )
}

export interface NavListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  selected?: boolean
  children?: React.ReactNode
}

export function NavListItem({ selected = false, children, ...props }: NavListItemProps) {
  return (
    <li
      className={styles.navListItem}
      aria-current={selected ? "page" : undefined}
      {...props}
    >
      {children}
    </li>
  )
}
