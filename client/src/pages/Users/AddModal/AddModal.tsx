import React from 'react'
import {
  Modal,
  Paper,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core'
import styles from './AddModal.module.css'

interface IAddModalProps {
  open: boolean
  onClose: () => void
}

export const AddModal = ({ open, onClose }: IAddModalProps) => {
  return (
    <Modal className={styles.modal} open={open} onClose={onClose}>
      <Paper className={styles.content}>
        <h3>Добавить пользователя</h3>
        <form noValidate autoComplete='off'>
          <div className={styles.formContainer}>
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
          </div>
        </form>
        <Button variant='contained' color='primary'>
          Добавить
        </Button>
      </Paper>
    </Modal>
  )
}
