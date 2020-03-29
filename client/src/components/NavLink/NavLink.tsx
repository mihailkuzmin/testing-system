import React from 'react'
import { Link, LinkProps, LinkGetProps } from '@reach/router'
import styles from './NavLink.module.css'

const isActive = ({ isCurrent }: LinkGetProps) => {
  return isCurrent ? { className: `${styles.link} ${styles.active}` } : {}
}

export const NavLink = ({ to, children }: LinkProps<{}>) => {
  return (
    <Link className={styles.link} to={to} getProps={isActive}>
      {children}
    </Link>
  )
}
