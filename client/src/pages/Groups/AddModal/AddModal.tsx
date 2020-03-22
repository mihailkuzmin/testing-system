import React from 'react'
import { TextField } from '@material-ui/core'
import { ModalActions } from './ModalActions'
import { Form } from './Form'
import { PrimaryButton, SecondaryButton } from '../../../components/Buttons'
import { Modal } from '../../../components'
import styles from './AddModal.module.css'

interface IAddModalProps {
  open: boolean
  handleClose: () => void
}

export const AddModal = ({ open, handleClose }: IAddModalProps) => {
  return (
    <Modal open={open} onClose={handleClose} className={styles.content}>
        <h3>Добавить группу</h3>
        <Form>
          <TextField label='Название' variant='outlined' />
        </Form>
        <ModalActions>
          <PrimaryButton onClick={handleClose}>Добавить</PrimaryButton>
          <SecondaryButton onClick={handleClose}>Отменить</SecondaryButton>
        </ModalActions>
    </Modal>
  )
}
