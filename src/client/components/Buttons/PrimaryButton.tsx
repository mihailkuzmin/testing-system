import React from 'react'
import { Button, ButtonProps } from '@material-ui/core'

type onClick = {
  onClick?: any
}
type PrimaryButtonProps = Omit<ButtonProps, 'onClick'> & onClick

export const PrimaryButton = (props: PrimaryButtonProps) => {
  return <Button {...props} variant='outlined' color='primary' />
}
