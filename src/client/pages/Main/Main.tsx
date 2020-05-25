import React from 'react'
import { useStore } from 'effector-react'
import { navigate } from 'hookrouter'
import { Paper, Divider } from '@components'
import { Linear } from '@components/Loaders'
import { PrimaryButton as Begin } from '@components/Buttons'
import { auth } from '@model'
import { MainPage } from './model/index'
import styles from './Main.module.css'

export const Main = () => {
  const { user } = useStore(auth.$store)
  const isLoading = useStore(MainPage.$isLoading)

  return (
    <Paper className={styles.mainPage}>
      <h3>Добро пожаловать, {`${user?.lastName} ${user?.firstName} ${user?.patronymic}`}</h3>

      <Divider />

      {isLoading ? <Linear /> : <Works />}
    </Paper>
  )
}

const Works = () => {
  const works = useStore(MainPage.$works)
  const isEmpty = !works.length

  return (
    <div className={styles.worksList}>
      {isEmpty ? <p>Доступных работ пока нет</p> : <p>Доступные работы:</p>}
      {works.map((work) => (
        <div key={work.id} className={styles.work}>
          {work.name}
          <Begin onClick={() => navigate(`/begin/${work.id}`)}>Начать</Begin>
        </div>
      ))}
    </div>
  )
}
