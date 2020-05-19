import React from 'react'
import { useStore } from 'effector-react'
import { Input } from '@components/Inputs'
import { loginForm } from './model'

type LoginInputProps = { disabled?: boolean; error?: boolean }
export const LoginInput = ({ disabled, error }: LoginInputProps) => {
  const value = useStore(loginForm.$login)

  return (
    <Input
      value={value}
      onChange={(e) => loginForm.loginChanged(e.target.value)}
      label='Логин'
      disabled={disabled}
      error={error}
    />
  )
}
