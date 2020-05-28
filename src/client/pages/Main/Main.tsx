import React from 'react'
import { useStore } from 'effector-react'
import { Paper, Divider } from '@components'
import { Linear as Loader } from '@components/Loaders'
import { auth } from '@model'
import { MainPage } from './model/index'
import { WorkList } from './WorkList'
import styles from './Main.module.css'

export const Main = () => {
  const { user } = useStore(auth.$store)
  const isLoading = useStore(MainPage.$isLoading)

  return (
    <Paper className={styles.mainPage}>
      <h3>Добро пожаловать, {`${user?.lastName} ${user?.firstName} ${user?.patronymic}`}</h3>

      <Divider />

      {isLoading ? <Loader /> : <WorkList />}
    </Paper>
  )
}
