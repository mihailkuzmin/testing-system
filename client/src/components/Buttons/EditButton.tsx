import React from 'react'
import { IconButton } from '@material-ui/core'
import EditIcon from '@material-ui/icons/EditOutlined'

interface IEditButtonProps {
  onClick?: any
}

export const EditButton = (props: IEditButtonProps) => {
  return (
    <IconButton onClick={props.onClick} size='small'>
      <EditIcon />
    </IconButton>
  )
}
