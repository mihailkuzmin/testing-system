import React from 'react'
import { Paper, TextField, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core'
import {PrimaryButton, SecondaryButton} from '../../../components/Buttons'
import { ModalActions } from './ModalActions'
import { Form } from './Form'
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
        <h3>Добавить пользователя</h3>
        <Form>
          <TextField label='ФИО' variant='outlined' />
          <FormControl variant='outlined'>
            <InputLabel id='group-select-label'>Группа</InputLabel>
            <Select labelId='group-select' id='group-select' value='' label='Группа'>
              <MenuItem disabled value=''>
                Группа
              </MenuItem>
              <MenuItem value={10}>АП-31</MenuItem>
              <MenuItem value={20}>АП-21</MenuItem>
              <MenuItem value={30}>АП-11</MenuItem>
            </Select>
          </FormControl>
          <TextField label='Логин' variant='outlined' />
          <TextField label='Пароль' variant='outlined' />
        </Form>
        <ModalActions>
          <PrimaryButton onClick={handleClose}>Добавить</PrimaryButton>
          <SecondaryButton onClick={handleClose}>Отменить</SecondaryButton>
        </ModalActions>
      </Paper>
    </Modal>
  )
}
