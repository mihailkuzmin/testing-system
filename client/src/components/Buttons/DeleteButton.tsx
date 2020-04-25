import React from 'react'
import { IconButton, Tooltip } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/DeleteOutlineOutlined'

interface IDeleteButtonProps {
  onClick?: any
  prompt?: string
}

export const DeleteButton = (props: IDeleteButtonProps) => (
  <Tooltip title={props.prompt ?? 'Удалить'}>
    <IconButton onClick={props.onClick} size='small'>
      <DeleteIcon />
    </IconButton>
  </Tooltip>
)
