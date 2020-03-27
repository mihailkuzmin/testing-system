import React from 'react'
import { Button } from '@material-ui/core'

interface ISecondaryButtonProps {
  onClick?: any
  children?: React.ReactNode
}

export const SecondaryButton = ({
  children,
  onClick,
}: ISecondaryButtonProps) => {
  return (
    <Button variant='outlined' color='secondary' onClick={onClick}>
      {children}
    </Button>
  )
}
