import React from 'react'
import { IconButton, ButtonProps } from '@material-ui/core'
import { Preview } from '../Icons'

export const PreviewButton = (props: ButtonProps) => (
  <IconButton {...props} size='small'>
    <Preview />
  </IconButton>
)
