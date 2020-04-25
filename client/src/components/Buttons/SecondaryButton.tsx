import React from 'react'
import { Button } from '@material-ui/core'

interface ISecondaryButtonProps {
  onClick?: any
  children?: React.ReactNode
  disabled?: boolean
}

export const SecondaryButton = (props: ISecondaryButtonProps) => {
  return (
    <Button disabled={props.disabled} variant='outlined' color='secondary' onClick={props.onClick}>
      {props.children}
    </Button>
  )
}
