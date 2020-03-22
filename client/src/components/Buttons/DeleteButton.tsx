import React from 'react'
import { IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/DeleteOutlineOutlined'

export const DeleteButton = () => {
  return (
    <IconButton size='small'>
      <DeleteIcon />
    </IconButton>
  )
}
