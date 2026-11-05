import { classnames } from "@local/utilities/classnames"

import { VisuallyHidden } from "../visually-hidden/visually-hidden"

import styles from "./visually-hidden-links.module.scss"

export interface VisuallyHiddenLinkProps extends React.HTMLAttributes<HTMLUListElement> {}

export function VisuallyHiddenLinks({
  children,
  className,
  ...props
}: VisuallyHiddenLinkProps) {
  return (
    <ul className={classnames([styles.list, className])} {...props}>
      {children}
    </ul>
  )
}

export interface VisuallyHiddenLinkItemProps extends React.HTMLAttributes<HTMLLIElement> {
  /**
   * The ID of the element to focus when the link is clicked.
   */
  href: string
}

export function VisuallyHiddenLinkItem({
  href,
  children,
  ...props
}: VisuallyHiddenLinkItemProps) {
  return (
    <li {...props}>
      <VisuallyHidden revealOnFocus href={href} as="a">
        {children}
      </VisuallyHidden>
    </li>
  )
}
