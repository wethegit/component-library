"use client"

import { useRef, useState } from "react"

import { classnames } from "@local/utilities"

import { NavList, NavListItem, Overlay, Toggler } from "./components"
import styles from "./navigation.module.scss"

const MAIN_NAV_ID = "main-site-nav"
const LINKS = {
  home: {
    label: "Home",
    path: "/",
  },
  about: {
    label: "About",
    path: "/about",
  },
}

export interface NavigationProps {
  /**
   * The currently selected navigation item, used to highlight the selected item and to set the `aria-current` attribute.
   * This is based on the `key` of the `LINKS` object.
   */
  currentPage?: keyof typeof LINKS
}

/**
 * At it's basic form, the navigation component is a hamburger menu that opens a list of links on the `sm` breakpoint and from the `md` breakpoint and up, it's a horizontal list of links that is sticky to the top of the viewport.
 */
export function Navigation({ currentPage }: NavigationProps) {
  const [open, setOpen] = useState(false)
  const focusLoopEnd = useRef<HTMLSpanElement>(null)
  const menuToggler = useRef<HTMLButtonElement>(null)

  const toggle = () => {
    setOpen(!open)
  }

  const handleLinkClick = () => {
    setOpen(false)
  }

  const handleLoopFocus = () => {
    menuToggler.current?.focus()
  }

  return (
    <div className={classnames([styles.navBar, open && styles.navBarOpen])}>
      <Toggler
        ref={menuToggler}
        open={open}
        aria-controls={MAIN_NAV_ID}
        onClick={toggle}
      />

      <Overlay open={open} />

      <nav className={styles.mainNav} aria-label="Main Navigation" id={MAIN_NAV_ID}>
        <NavList>
          {Object.entries(LINKS).map(([key, { label, path }]) => (
            <NavListItem key={key} selected={key === currentPage}>
              <a href={path} onClick={handleLinkClick}>
                {label}
              </a>
            </NavListItem>
          ))}
        </NavList>

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
