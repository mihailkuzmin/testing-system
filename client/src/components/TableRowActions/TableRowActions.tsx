import React from 'react'
import styles from './TableRowActions.module.css'

interface ITableRowActions {
  children?: React.ReactNode
}

export const TableRowActions = ({ children }: ITableRowActions) => {
  return <div className={styles.actions}>{children}</div>
}
