import React from 'react'
import { useStore } from 'effector-react'
import { UserId } from '@common/typings/user'
import { PageError, PageLoader } from '@components/Loaders'
import { PrimaryButton as Save } from '@components/Buttons'
import { Divider, Paper } from '@components'
import { EditUserPage, editForm } from '../model/editUser'
import {
  BookNumber,
  ChangePassword,
  FirstName,
  Group,
  LastName,
  Login,
  Password,
  Patronymic,
  Role,
} from './Inputs'
import styles from './EditUser.module.css'

type EditUserProps = { id: UserId }

export const EditUser = ({ id }: EditUserProps) => {
  React.useEffect(() => EditUserPage.onMount(id), [id])

  const { isLoading, isFail } = useStore(EditUserPage.$status)
  const changePassword = useStore(editForm.$changePassword)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    editForm.updateUser()
  }

  if (isLoading) {
    return <PageLoader />
  }

  if (isFail) {
    return <PageError />
  }

  return (
    <Paper className={styles.editUser}>
      <div className={styles.header}>
        <h2>Редактировать пользователя</h2>
        <Save form='editUserForm' type='submit'>
          Сохранить
        </Save>
      </div>

      <Divider />

      <form className={styles.editForm} onSubmit={onSubmit} id='editUserForm'>
        <LastName />
        <FirstName />
        <Patronymic />
        <Role />
        <BookNumber />
        <Group />
        <Login />
        <Password disabled={!changePassword} />
        <ChangePassword value={changePassword} onChange={() => editForm.toggleChangePassword()} />
      </form>
    </Paper>
  )
}
