import React from 'react'
import { IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/DeleteOutlineOutlined'

interface IDeleteButtonProps {
  onClick?: any
}

export const DeleteButton = (props: IDeleteButtonProps) => {
  return (
    <IconButton onClick={props.onClick} size='small'>
      <DeleteIcon />
    </IconButton>
  )
}
