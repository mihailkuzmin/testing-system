import React from 'react'
import { PrimaryButton } from '@components/Buttons'

type LoginButtonProps = { disabled?: boolean; error?: boolean }
export const LoginButton = ({ disabled, error }: LoginButtonProps) => {
  return (
    <PrimaryButton type='submit' disabled={disabled || error}>
      Войти
    </PrimaryButton>
  )
}
