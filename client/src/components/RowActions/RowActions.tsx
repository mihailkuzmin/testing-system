import React from 'react'
import styles from './RowActions.module.css'

interface IRowActions {
  children?: React.ReactNode
}

export const RowActions = ({ children }: IRowActions) => {
  return <div className={styles.actions}>{children}</div>
}
