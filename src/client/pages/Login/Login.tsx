import React from 'react'
import { Paper } from '@components'
import { Input } from '@components/Inputs'
import { PrimaryButton } from '@components/Buttons'
import styles from './Login.module.css'

export const Login = () => {
  return (
    <Paper className={styles.login}>
      <form className={styles.loginForm}>
        <h2>Вход</h2>
        <Input label='Логин' />
        <Input type='password' label='Пароль' />
        <PrimaryButton>Войти</PrimaryButton>
      </form>
    </Paper>
  )
}
