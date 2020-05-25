import React from 'react'
import { useStore } from 'effector-react'
import { auth } from '@model'
import { loginForm } from './model'
import { LoginInput } from './LoginInput'
import { PasswordInput } from './PasswordInput'
import { LoginButton } from './LoginButton'
import styles from './Login.module.css'

export const Login = () => {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    loginForm.login()
  }

  const disabled = useStore(auth.$loginPending)
  const error = useStore(loginForm.$loginFailed)
  const canSubmit = useStore(loginForm.$canSubmit)

  return (
    <form className={styles.loginForm} onSubmit={onSubmit}>
      <h2>{error ? 'Неверные данные' : 'Вход'}</h2>
      <LoginInput disabled={disabled} error={error} />
      <PasswordInput disabled={disabled} error={error} />
      <LoginButton disabled={disabled || !canSubmit} error={error} />
    </form>
  )
}
