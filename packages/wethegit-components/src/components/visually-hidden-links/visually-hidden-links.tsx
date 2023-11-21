import { Tag, VisuallyHidden } from "@local/components"
import type { TagProps } from "@local/components"
import { classnames } from "@local/utilities"

import styles from "./visually-hidden-links.module.scss"

const DEFAULT_ELEMENT = "ul"

interface Item {
  href: string
  label: string
}

export type ItemProps<TAs extends React.ElementType> = TagProps<TAs> & {
  items: Item[]
}

export function VisuallyHiddenLinks<TAs extends React.ElementType = "ul">({
  items,
  className,
  ...props
}: ItemProps<TAs>) {
  const { as = DEFAULT_ELEMENT, ...rest } = props

  return (
    <Tag as={as} className={classnames([styles.list, className])} {...rest}>
      {items.map((item, i) => {
        return (
          <li key={`${item.label}-${i}`}>
            <VisuallyHidden revealOnFocus href={item.href} as="a">
              <span>{item.label}</span>
            </VisuallyHidden>
          </li>
        )
      })}
    </Tag>
  )
}
