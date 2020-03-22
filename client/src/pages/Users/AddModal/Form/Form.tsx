import React from 'react'
import styles from './Form.module.css'

interface IFormProps {
  children?: React.ReactNode
}

export const Form = ({ children }: IFormProps) => {
  return (
    <form noValidate autoComplete='off'>
      <div className={styles.content}>{children}</div>
    </form>
  )
}
