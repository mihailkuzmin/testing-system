import React from 'react'
import { PrimaryButton, SecondaryButton } from '../../../components/Buttons'
import { TextField } from '@material-ui/core'
import { ModalActions } from './ModalActions'
import { GroupSelect } from './GroupSelect'
import { Modal } from '../../../components'
import styles from './AddModal.module.css'
import { Form } from './Form'

interface IAddModalProps {
  open: boolean
  handleClose: () => void
}

export const AddModal = ({ open, handleClose }: IAddModalProps) => {
  const groups = ['АП-31', 'УС-31', 'АП-21']

  return (
    <Modal open={open} onClose={handleClose} className={styles.content}>
        <h3>Добавить пользователя</h3>
        <Form>
          <TextField label='ФИО' variant='outlined' />
          <GroupSelect placeholder='Группа' items={groups} />
          <TextField label='Логин' variant='outlined' />
          <TextField label='Пароль' variant='outlined' />
        </Form>
        <ModalActions>
          <PrimaryButton onClick={handleClose}>Добавить</PrimaryButton>
          <SecondaryButton onClick={handleClose}>Отменить</SecondaryButton>
        </ModalActions>
    </Modal>
  )
}
