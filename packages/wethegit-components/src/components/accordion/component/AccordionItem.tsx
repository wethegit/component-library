import React, { useRef } from "react"

import { Icon, IconDefs, IconSymbol, Tag, Text } from "@local/components"

import styles from "../accordion.module.scss"

const DEFAULT_TAG = "h3" as const

export function GenericSection({ ...props }) {
  const { as = DEFAULT_TAG, ...rest } = props

  return <Tag as={as} {...rest} />
}

export interface CardsData {
  title: string
  text: string | object
}

interface Props {
  handleToggle: (index: number) => void
  active: number | null
  card: CardsData
  icon: string
  index: number
}

const AccordionItem: React.FC<Props> = ({ handleToggle, active, card, icon, index }) => {
  const contentEl = useRef<HTMLDivElement>(null)
  const { title, text } = card

  if (!card) return null

  return (
    <div
      className={styles.accordionPanel}
      aria-expanded={active === index ? true : false}
    >
      <Tag as={DEFAULT_TAG} id={`accordionHeading${index}`}>
        <button
          className={`${active === index ? styles.active : ""}`}
          onClick={() => handleToggle(index)}
          tabIndex={0}
          aria-controls={`accordionBody${index}`}
        >
          <span className={styles.accordionTitle}>{title}</span>

          <IconDefs>
            <IconSymbol id={icon} size={27}>
              <path
                d="M6 9L12 15L18 9"
                stroke="#000000"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </IconSymbol>
          </IconDefs>

          <Icon id={icon} className={styles.accordionIcon} />
        </button>
      </Tag>

      <Tag
        ref={contentEl}
        className={`${styles.collapse} ${styles.accordionBody}`}
        id={`accordionBody${index}`}
        aria-labelledby={`accordionHeading${index}`}
        role="region"
        style={
          active === index
            ? { height: contentEl.current?.scrollHeight || 200 }
            : { height: "0px" }
        }
      >
        {typeof text === "string" && (
          <Text variant="body-smaller" dangerouslySetInnerHTML={{ __html: text }} />
        )}

        {typeof text === "object" &&
          Object.values(text).map((p, i) => (
            <Text
              key={i}
              variant="body-smaller"
              dangerouslySetInnerHTML={{ __html: p.toString() }}
            />
          ))}
      </Tag>
    </div>
  )
}

export default AccordionItem
