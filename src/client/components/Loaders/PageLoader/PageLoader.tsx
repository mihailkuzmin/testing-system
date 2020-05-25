import React from 'react'
import { Circular } from '../Circular'
import styles from './PageLoader.module.css'

export const PageLoader = () => (
  <div className={styles.loader}>
    <Circular />
  </div>
)
