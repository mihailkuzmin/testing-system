import React from 'react'
import { Snackbar } from '@material-ui/core'
import { Alert, AlertProps } from '@material-ui/lab'
import { Status } from '../../typings'

interface IMessageProps extends AlertProps {
  open: boolean
  onClose?: any
  message: string
  status?: Status
}

export const Message = (props: IMessageProps) => {
  return (
    <Snackbar open={props.open} autoHideDuration={1500} onClose={props.onClose}>
      <Alert onClose={props.onClose} severity={props.status}>
        {props.message}
      </Alert>
    </Snackbar>
  )
}
