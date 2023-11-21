import { VisuallyHidden } from "@local/components"

import styles from "./visually-hidden-links.module.scss"

interface Item {
  href: string
  label: string
}

type ItemProps = {
  items: Item[]
}

export function VisuallyHiddenLinks({ items }: ItemProps) {
  return (
    <ul className={styles.list}>
      {items.map((item, i) => {
        return (
          <li key={`${item.label}-${i}`}>
            <VisuallyHidden revealOnFocus href={item.href} as="a">
              <span>{item.label}</span>
            </VisuallyHidden>
          </li>
        )
      })}
    </ul>
  )
}
