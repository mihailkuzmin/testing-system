import React from 'react'
import styles from './ModalActions.module.css'

interface IModalActionsProps {
  children?: React.ReactNode
}

export const ModalActions = ({ children }: IModalActionsProps) => {
  return <div className={styles.actions}>{children}</div>
}
