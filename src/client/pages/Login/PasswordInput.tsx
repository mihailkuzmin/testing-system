import React from 'react'
import { useStore } from 'effector-react'
import { Input } from '@components/Inputs'
import { loginForm } from './model'

type PasswordInputProps = { disabled?: boolean; error?: boolean }
export const PasswordInput = ({ disabled, error }: PasswordInputProps) => {
  const value = useStore(loginForm.$password)

  return (
    <Input
      value={value}
      onChange={(e) => loginForm.passwordChanged(e.target.value)}
      type='password'
      label='Пароль'
      disabled={disabled}
      error={error}
    />
  )
}
