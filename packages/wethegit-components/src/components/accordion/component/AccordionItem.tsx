import React, { useRef } from "react"

import { Icon, IconDefs, IconSymbol, Tag, Text } from "@local/components"

const DEFAULT_TAG = "h3" as const

export function GenericSection({ ...props }) {
  const { as = DEFAULT_TAG, ...rest } = props

  return <Tag as={as} {...rest} />
}

import styles from "../accordion.module.scss"

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
  const containsTags = /<[a-z][\s\S]*>/i.test(text)
  const processedHtml = containsTags ? text : text

  if (!card) return null

  return (
    <div className={styles.accordionPanel}>
      <Tag as={DEFAULT_TAG} id={`accordionHeading${index}`}>
        <button
          className={`${active === index ? "active" : ""}`}
          onClick={() => handleToggle(index)}
          tabIndex={0}
          aria-controls={`accordionBody${index}`}
          // aria-expanded="true"
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
        className={`${styles.collapse} ${styles.accordionBody} ${active === index ? "show" : ""}`}
        id={`accordionBody${index}`}
        aria-labelledby={`accordionHeading${index}`}
        // hidden
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
          Object.values(processedHtml).map((p, i) => (
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
