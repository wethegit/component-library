import { useState } from "react"

import styles from "./accordion.module.scss"
import AccordionItem, { CardsData } from "./component/AccordionItem"
import cards from "./content.js"

export interface AccordionProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "aria-label"> {
  "aria-label": string
  toggle: () => void
  className?: string
}

export function Accordion({}: AccordionProps) {
  const [active, setActive] = useState<number | null>(null)
  const icon = "chevron" // Define your icon name here

  const handleToggle = (index: number) => {
    active === index ? setActive(null) : setActive(index)
  }

  return (
    <div className={styles.accordionGroup}>
      {cards.map((card: CardsData, index: number) => {
        return (
          <AccordionItem
            key={index}
            index={index}
            active={active}
            handleToggle={handleToggle}
            card={card}
            icon={icon}
          />
        )
      })}
    </div>
  )
}
