import React from 'react'
import { usePath, A } from 'hookrouter'
import styles from './NavLink.module.css'

interface NavLinkProps {
  icon?: () => JSX.Element
  text?: string
  href: string
}

export const NavLink = (props: NavLinkProps) => {
  const path = usePath()
  const isActive = path === props.href

  const Icon = props.icon

  return (
    <A
      draggable={false}
      className={`${styles.link} ${isActive ? styles.active : ''}`}
      href={props.href}
    >
      {Icon && <Icon />}
      {props.text}
    </A>
  )
}
