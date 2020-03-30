import React from 'react'
import { Modal as MaterialModal, Paper } from '@material-ui/core'
import styles from './Modal.module.css'

interface IModalProps {
  open: boolean
  onClose: any
  children?: React.ReactNode
  className?: string
}

export const Modal = (props: IModalProps) => {
  return (
    <MaterialModal
      className={styles.modal}
      open={props.open}
      onClose={props.onClose}
    >
      <Paper style={{ outline: 'none' }} className={props.className}>
        {props.children}
      </Paper>
    </MaterialModal>
  )
}
