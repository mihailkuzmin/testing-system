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
  Fade,
  Backdrop,
} from '@material-ui/core'
import styles from './AddModal.module.css'

interface IAddModalProps {
  open: boolean
  handleClose: () => void
  onClose: () => void
}

export const AddModal = ({ open, handleClose, onClose }: IAddModalProps) => {
  return (
    <Modal
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
          <div className={styles.actions}>
            <Button variant='outlined' color='primary'>
              Добавить
            </Button>
            <Button onClick={handleClose} variant='outlined' color='secondary'>
              Отменить
            </Button>
          </div>
        </Paper>
      </Fade>
    </Modal>
  )
}
