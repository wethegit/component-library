"use client"

import { useRef, useState } from "react"

import { classnames } from "@local/utilities"

import { NavList, Overlay, Toggler } from "./components"
import styles from "./navigation.module.scss"

export interface NavigationProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "aria-label"> {
  /**
   * Mandatory `aria-label` attribute.
   */
  "aria-label": string
}

const MAIN_NAV_ID = "main-nav"

/**
 * At it's basic form, the navigation component is a hamburger menu that opens a list of links on the `sm` breakpoint and from the `md` breakpoint and up, it's a horizontal list of links that is sticky to the top of the viewport.
 */
export function Navigation({ className, children, ...props }: NavigationProps) {
  const [open, setOpen] = useState(false)
  const focusLoopEnd = useRef<HTMLSpanElement>(null)
  const menuToggler = useRef<HTMLButtonElement>(null)

  const toggle = () => {
    setOpen(!open)
  }

  const handleLoopFocus = () => {
    menuToggler.current?.focus()
  }

  return (
    <div className={classnames([styles.navBar, open && styles.navBarOpen, className])}>
      <Toggler
        ref={menuToggler}
        open={open}
        aria-controls={MAIN_NAV_ID}
        onClick={toggle}
        className={styles.toggler}
      />

      <Overlay open={open} onClick={toggle} className={styles.overlay} />

      <nav className={styles.mainNav} aria-label={props["aria-label"]} id={MAIN_NAV_ID}>
        <NavList>{children}</NavList>

        {/* Focus loop trigger -> takes us back to the menu toggler when tabbing */}
        <span
          className="visually-hidden"
          ref={focusLoopEnd}
          tabIndex={0}
          onFocus={handleLoopFocus}
        />
      </nav>
    </div>
  )
}
