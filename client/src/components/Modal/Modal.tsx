import React from 'react'
import {
  Modal as MaterialModal,
  Fade,
  Backdrop,
  Paper,
} from '@material-ui/core'
import styles from './Modal.module.css'

interface IModalProps {
  open: boolean
  onClose: () => void
  children?: React.ReactNode
  className?: string
}

export const Modal = ({ open, onClose, className, children }: IModalProps) => {
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
      <Fade in={open}>
        <Paper style={{ outline: 'none' }} className={className}>
          {children}
        </Paper>
      </Fade>
    </MaterialModal>
  )
}
