import React from 'react'
import { Circular } from '../Circular'
import styles from './PageLoader.module.css'

type PageLoaderProps = { style?: React.CSSProperties }
export const PageLoader = ({ style }: PageLoaderProps) => (
  <div style={style} className={styles.loader}>
    <Circular />
    <p>Загрузка</p>
  </div>
)
