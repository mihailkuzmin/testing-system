import React from 'react'
import { CircularProgress } from '@material-ui/core'
import styles from './FullScreenLoader.module.css'

export const FullScreenLoader = () => {
  return (
    <div className={styles.loader}>
      <CircularProgress />
      <p>Загрузка</p>
    </div>
  )
}
