"use client"

import { useRef } from "react"
import {
  Modal as WTCModal,
  ModalContent,
  ModalBackdrop,
  useModal,
} from "@wethegit/react-modal"
import type { ModalProps as WTCModalProps } from "@wethegit/react-modal"
import { useAnimatePresence, useUserPrefs } from "@wethegit/react-hooks"

import { classnames } from "@local/utilities"

import styles from "./modal.module.scss"

export interface ModalProps extends WTCModalProps {
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
export function Modal({ hash, children, trigger, ...props }: ModalProps) {
  const triggerButton = useRef(null)
  const { isOpen, toggle } = useModal({
    triggerRef: triggerButton,
    hash,
  })
  const { prefersReducedMotion } = useUserPrefs()
  const { render, animate, currentDuration } = useAnimatePresence({
    isVisible: isOpen,
    duration: prefersReducedMotion ? 0 : 500,
  })

  const stylesVars = {
    "--duration": `${currentDuration}ms`,
  } as React.CSSProperties

  return (
    <>
      {trigger && trigger(toggle)}

      {render && (
        <WTCModal
          style={stylesVars}
          className={classnames([styles.modal, animate && styles.modalOpen])}
          {...props}
        >
          <ModalBackdrop className={styles.modalBackdrop} onClick={toggle} />
          <ModalContent className={styles.modalContent}>
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
