import React, { HTMLAttributes } from 'react'
import styles from './Card.module.css'

export const Card: React.FC<HTMLAttributes<HTMLDivElement>> = (props) => (
  <div className={`${styles.card} ${props.className ?? ''}`}>{props.children}</div>
)
