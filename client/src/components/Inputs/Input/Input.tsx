import React from 'react'
import { TextField, TextFieldProps } from '@material-ui/core'

export const Input = (props: TextFieldProps) => (
  <TextField {...props} variant='outlined' />
)
