import React from 'react'
import { IconButton, Tooltip, ButtonProps } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/DeleteOutlineOutlined'

type DeleteButtonProps = ButtonProps & {
  prompt?: string
}

export const DeleteButton = (props: DeleteButtonProps) => (
  <Tooltip title={props.prompt ?? 'Удалить'}>
    <IconButton {...props} size='small'>
      <DeleteIcon />
    </IconButton>
  </Tooltip>
)
