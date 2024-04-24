import React, { useRef } from "react"

import { Icon, Text } from "@local/components"

import styles from "../accordion.module.scss"
interface Card {
  header: string
  id: number
  text: string
}

interface Props {
  handleToggle: (id: number) => void
  active: number | null
  card: Card
  // className: string
}

const AccordionItem: React.FC<Props> = ({ handleToggle, active, card }) => {
  const contentEl = useRef<HTMLDivElement>(null)
  const { header, id, text } = card

  return (
    <div className={styles.accordionCard} tabIndex={0}>
      <div
        className={`${styles.accordionToggle} ${active === id ? "active" : ""}`}
        onClick={() => handleToggle(id)}
      >
        <h5 className={styles.accordionTitle}>{header}</h5>

        <Icon id="play" className={styles.accordionIcon} />
      </div>

      <div
        ref={contentEl}
        className={`${styles.collapse} ${active === id ? "show" : ""}`}
        style={
          active === id
            ? { height: contentEl.current?.scrollHeight || 200 }
            : { height: "0px" }
        }
      >
        <Text variant="body-smaller" className={styles.accordionBody}>
          {text}
        </Text>
        {/* <Text variant="body" dangerouslySetInnerHTML={text} /> */}
      </div>
    </div>
  )
}

export default AccordionItem
