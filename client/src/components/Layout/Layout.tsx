import React from 'react'
import styles from './Layout.module.css'

interface ILayoutProps {
  children?: React.ReactNode
}

export const Layout = ({ children }: ILayoutProps) => {
  return <div className={styles.layout}>{children}</div>
}
