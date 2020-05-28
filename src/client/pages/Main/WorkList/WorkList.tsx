import React from 'react'
import { navigate } from 'hookrouter'
import { useStore } from 'effector-react'
import { PrimaryButton as Begin } from '@components/Buttons'
import { Card } from '@components'
import { MainPage } from '../model/index'
import styles from './WorkList.module.css'

export const WorkList = () => {
  const works = useStore(MainPage.$works)
  const isEmpty = !works.length

  return (
    <div className={styles.worksList}>
      {isEmpty ? <p>Доступных работ пока нет</p> : <p>Доступные работы:</p>}
      {works.map((work) => (
        <Card key={work.id} className={styles.work}>
          {work.name}
          <Begin onClick={() => navigate(`/begin/${work.id}`)}>Начать</Begin>
        </Card>
      ))}
    </div>
  )
}
