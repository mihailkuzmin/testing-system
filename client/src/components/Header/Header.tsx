import React from 'react'
import styles from './Header.module.css'

interface HeaderProps {
  children: React.ReactNode
}

export const Header = ({ children }: HeaderProps) => {
  return <header className={styles.header}>{children}</header>
}
