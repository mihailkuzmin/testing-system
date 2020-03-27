import React from 'react'
import { Modal } from '../../../components'
import styles from './AddModal.module.css'

interface IAddModalProps {
  open: boolean
  handleClose: any
  children?: React.ReactNode
}

export const AddModal = ({ open, handleClose, children }: IAddModalProps) => {
  return (
    <Modal open={open} onClose={handleClose} className={styles.content}>
      {children}
    </Modal>
  )
}
