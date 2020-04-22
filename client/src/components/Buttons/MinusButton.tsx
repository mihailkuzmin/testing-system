import React from 'react'
import { IconButton, ButtonProps } from '@material-ui/core'
import { Minus } from '../Icons'

export const MinusButton = (props: ButtonProps) => (
  <IconButton {...props} size='small'>
    <Minus />
  </IconButton>
)
