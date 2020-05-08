import React from 'react'
import { Error } from '../../Icons'
import styles from './PageError.module.css'

export const PageError = () => (
  <div className={styles.error}>
    <Error />
    <p>Произошла ошибка</p>
  </div>
)
