import React from 'react'
import { Button } from '@material-ui/core'

interface IPrimaryButtonProps {
  onClick?: () => void
  children?: React.ReactNode
}

export const PrimaryButton = ({ children, onClick }: IPrimaryButtonProps) => {
  return (
    <Button variant='outlined' color='primary' onClick={onClick}>
      {children}
    </Button>
  )
}
