import React from 'react'
import { useStore } from 'effector-react'
import { auth } from '@model'
import { Paper } from '@components'
import styles from './Main.module.css'

export const Main = () => {
  const user = useStore(auth.$user)

  return (
    <Paper className={styles.main}>
      <p>Пользователь: {`${user?.lastName} ${user?.firstName} ${user?.patronymic}`}</p>
      <p>Статус: {user?.role.name}</p>
      <p>Группа: {user?.group.name}</p>
      <p>Номер зачетной книжки: {user?.bookNumber}</p>
    </Paper>
  )
}
