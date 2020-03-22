import React from 'react'
import styles from './TableHeader.module.css'

interface ITableHeaderProps {
  children?: React.ReactNode
}

export const TableHeader = ({ children }: ITableHeaderProps) => {
  return <div className={styles.header}>{children}</div>
}
