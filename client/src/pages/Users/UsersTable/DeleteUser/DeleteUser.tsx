import React from 'react'
import {
  PrimaryButton as Confirm,
  SecondaryButton as Cancel,
} from '../../../../components/Buttons'
import { UsersTableRow } from '../../../../typings'
import { usersTable } from '../../model'
import styles from './DeleteUser.module.css'

interface IAddUserProps {
  user: UsersTableRow | null
}

export const DeleteUser = ({ user }: IAddUserProps) => {
  return (
    <div className={styles.deleteUser}>
      <h3 className={styles.title}>Удалить пользователя</h3>
      <p>Вы уверены, что хотите удалить пользователя</p>
      <p>{`${user?.lastName} ${user?.firstName} ${user?.patronymic} `}?</p>
      <div className={styles.actions}>
        <Confirm onClick={usersTable.confirmDelete}>Удалить</Confirm>
        <Cancel onClick={usersTable.cancelDelete}>Отмена</Cancel>
      </div>
    </div>
  )
}
