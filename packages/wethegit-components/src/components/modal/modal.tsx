"use client"

import { useRef } from "react"
import {
  Modal as WTCModal,
  ModalContent,
  ModalBackdrop,
  useModal,
} from "@wethegit/react-modal"
import "@wethegit/react-modal/style.css"

import { useAnimatePresence } from "@local/hooks"
import { classnames } from "@local/utilities"

import styles from "./modal.module.scss"

export interface ModalProps {
  /**
   * If true the modal will be appended to the body instead of the parent element.
   * @defaultValue true
   */
  appendToBody?: boolean
  /**
   * If provided, the modal state will be controlled by the hash in the URL.
   */
  hash?: string
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
export function Modal({ hash, children, appendToBody = true, trigger }: ModalProps) {
  const triggerButton = useRef(null)
  const { isOpen, toggle } = useModal({
    triggerRef: triggerButton,
    hash,
  })
  const { shouldRender, reveal, runningDuration } = useAnimatePresence({
    isVisible: isOpen,
  })

  const stylesVars = {
    "--transition-duration": `${runningDuration}ms`,
  } as React.CSSProperties

  return (
    <>
      {trigger && trigger(toggle)}

      {shouldRender && (
        <WTCModal appendToBody={appendToBody} style={stylesVars}>
          <ModalBackdrop className={styles.modalBackdrop} onClick={toggle} />
          <ModalContent
            className={classnames([
              styles.modalContent,
              reveal && styles.modalContentOpen,
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
