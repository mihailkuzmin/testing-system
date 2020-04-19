import React from 'react'
import { Link, LinkProps } from 'react-router-dom'
import styles from './NavLink.module.css'

interface NavLinkProps extends LinkProps {
  Icon?: () => JSX.Element
  text?: string
}

export const NavLink = ({ Icon, to, text, children }: NavLinkProps) => {
  return (
    <Link className={styles.link} to={to}>
      {Icon && <Icon />}
      {text}
      {children}
    </Link>
  )
}
