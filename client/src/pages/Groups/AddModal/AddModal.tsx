import React from 'react'
import { Paper, TextField, Button } from '@material-ui/core'
import { Modal } from '../../../components'
import styles from './AddModal.module.css'

interface IAddModalProps {
  open: boolean
  handleClose: () => void
  onClose: () => void
}

export const AddModal = ({ open, handleClose, onClose }: IAddModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Paper className={styles.content}>
        <h3>Добавить группу</h3>
        <form noValidate autoComplete='off'>
          <div className={styles.formContainer}>
            <TextField label='Название' variant='outlined' />
          </div>
        </form>
        <div className={styles.actions}>
          <Button variant='outlined' color='primary'>
            Добавить
          </Button>
          <Button onClick={handleClose} variant='outlined' color='secondary'>
            Отменить
          </Button>
        </div>
      </Paper>
    </Modal>
  )
}
