"use client"

import { Modal as WTCModal, ModalContent, ModalBackdrop } from "@wethegit/react-modal"
import type { ModalProps as WTCModalProps } from "@wethegit/react-modal"
import { useAnimatePresence, useUserPrefs } from "@wethegit/react-hooks"

import { classnames } from "@local/utilities"

import styles from "./modal.module.scss"

export interface ModalProps extends WTCModalProps {
  /**
   * Whether the modal is open or not.
   */
  isOpen: boolean
  /**
   * A function that toggles the modal.
   */
  toggle: () => void
  /**
   * The modal content.
   */
  children?: React.ReactNode
  /**
   * The modal class name.
   */
  contentClassName?: string
  /**
   * The modal class name.
   */
  className?: string
}

/**
 * Wrapper around the `@wethegit/react-modal` component that adds a trigger and takes care of reducing motion.
 * For more information, see the [modal documentation](https://github.com/wethegit/react-modal).
 */
export function Modal({
  children,
  isOpen,
  toggle,
  className,
  contentClassName,
  ...props
}: ModalProps) {
  const { prefersReducedMotion } = useUserPrefs()
  const { render, animate, currentDuration } = useAnimatePresence({
    isVisible: isOpen,
    duration: prefersReducedMotion ? 0 : 500,
  })

  const stylesVars = {
    "--duration": `${currentDuration}ms`,
  } as React.CSSProperties

  if (!render) return null

  return (
    <WTCModal
      style={stylesVars}
      className={classnames([styles.modal, animate && styles.modalOpen, className])}
      {...props}
    >
      <ModalBackdrop className={styles.modalBackdrop} onClick={toggle} />
      <ModalContent className={classnames([styles.modalContent, contentClassName])}>
        <button className={styles.modalCloseButton} onClick={toggle}>
          Close
        </button>
        {children}
      </ModalContent>
    </WTCModal>
  )
}
