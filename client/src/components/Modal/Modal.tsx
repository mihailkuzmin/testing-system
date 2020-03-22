import React from 'react'
import { Modal as MaterialModal, Fade, Backdrop } from '@material-ui/core'
import styles from './Modal.module.css'

interface IModalProps {
  open: boolean
  onClose: () => void
  children?: React.ReactNode
}

export const Modal = ({ open, onClose, children }: IModalProps) => {
  return (
    <MaterialModal
      className={styles.modal}
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>{children}</Fade>
    </MaterialModal>
  )
}
