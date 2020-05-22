import React from 'react'
import { useStore } from 'effector-react'
import { Paper, Divider } from '@components'
import { PageError, PageLoader } from '@components/Loaders'
import { PrimaryButton as Save } from '@components/Buttons'
import { AddUserPage, addForm } from '../model/addUser'
import { Login, Password, FirstName, LastName, Patronymic, Group, Role, BookNumber } from './Inputs'
import styles from './AddUser.module.css'

export const AddUser = () => {
  React.useEffect(AddUserPage.onMount, [])

  const { isLoading, isFail } = useStore(AddUserPage.$status)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addForm.createUser()
  }

  if (isLoading) {
    return <PageLoader />
  }

  if (isFail) {
    return <PageError />
  }

  return (
    <Paper className={styles.addUser}>
      <div className={styles.header}>
        <h2>Добавить пользователя</h2>
        <Save form='addUserForm' type='submit'>
          Сохранить
        </Save>
      </div>

      <Divider />

      <form className={styles.addForm} onSubmit={onSubmit} id='addUserForm'>
        <LastName />
        <FirstName />
        <Patronymic />
        <Role />
        <BookNumber />
        <Group />
        <Login />
        <Password />
      </form>
    </Paper>
  )
}
