import React from 'react'
import { IconButton, ButtonProps } from '@material-ui/core'
import { Plus } from '../Icons'

export const PlusButton = (props: ButtonProps) => (
  <IconButton {...props} size='small'>
    <Plus />
  </IconButton>
)
