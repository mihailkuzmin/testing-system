import React from 'react'
import { usePath, A } from 'hookrouter'
import styles from './NavLink.module.css'

interface NavLinkProps {
  icon?: () => JSX.Element
  text?: string
  href: string
  strict?: boolean
}

export const NavLink = (props: NavLinkProps) => {
  const path = usePath()
  /*
    strict = true, path = '/', href = '/' -> active
    path = '/users/add', href = '/users/' -> active
  */
  const isActive = props.strict ? path === props.href : path.startsWith(props.href)

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
