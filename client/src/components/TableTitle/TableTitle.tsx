import React from 'react'
import styles from './TableTitle.module.css'

interface ITableTitleProps {
  children?: React.ReactNode
}

export const TableTitle = ({ children }: ITableTitleProps) => {
  return <div className={styles.title}>{children}</div>
}
