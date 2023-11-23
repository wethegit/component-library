"use client"

import { useRef } from "react"
import {
  Modal as WTCModal,
  ModalContent,
  ModalBackdrop,
  useModal,
  ModalStates,
} from "@wethegit/react-modal"
import "@wethegit/react-modal/style.css"
import { useUserPrefs } from "@wethegit/react-hooks"

import { classnames } from "@local/utilities"

import styles from "./modal.module.scss"

export interface ModalProps {
  /**
   * If true the modal will be appended to the body instead of the parent element.
   * @defaultValue true
   */
  appendToBody?: boolean
  /**
   * The duration of the modal transition in milliseconds.
   */
  transitionDuration?: number
  /**
   * If provided, the modal state will be controlled by the hash in the URL.
   */
  slug?: string
  /**
   * A function that returns the trigger element for the modal.
   */
  trigger: (toggleModal: () => void) => React.ReactNode
  /**
   * The modal content.
   */
  children?: React.ReactNode
}

/**
 * Wrapper around the `@wethegit/react-modal` component that adds a trigger and takes care of reducing motion.
 * For more information, see the [modal documentation](https://github.com/wethegit/react-modal).
 */
export function Modal({
  transitionDuration = 800,
  slug,
  children,
  appendToBody = true,
  trigger,
}: ModalProps) {
  const triggerButton = useRef(null)
  const { prefersReducedMotion } = useUserPrefs()
  const transition = prefersReducedMotion ? 0 : transitionDuration
  const { isOpen, state, toggle } = useModal({
    triggerRef: triggerButton,
    transitionDuration: transition,
    slug,
  })

  const stylesVars = {
    "--transition-duration": `${transition}ms`,
  } as React.CSSProperties

  return (
    <>
      {trigger && trigger(toggle)}

      {isOpen && (
        <WTCModal appendToBody={appendToBody} state={state} style={stylesVars}>
          <ModalBackdrop className={styles.modalBackdrop} onClick={toggle} />
          <ModalContent
            className={classnames([
              styles.modalContent,
              (state === ModalStates.OPENING || state === ModalStates.OPEN) &&
                styles.modalContentOpen,
            ])}
          >
            <button className={styles.modalCloseButton} onClick={toggle}>
              Close
            </button>
            {children}
          </ModalContent>
        </WTCModal>
      )}
    </>
  )
}
