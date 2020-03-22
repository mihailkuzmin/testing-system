import React from 'react'
import styles from './TableHeaderActions.module.css'

interface ITableHeaderActionsProps {
  children?: React.ReactNode
}

export const TableHeaderActions = ({ children }: ITableHeaderActionsProps) => {
  return <div className={styles.actions}>{children}</div>
}
