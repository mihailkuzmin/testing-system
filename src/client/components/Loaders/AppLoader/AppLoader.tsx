import React from 'react'
import styles from './AppLoader.module.css'

export const AppLoader = () => (
  <div className={styles.loader}>
    <p style={{ fontSize: '1.1rem' }}>Загрузка...</p>
  </div>
)
