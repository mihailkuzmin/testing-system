import React from 'react'
import { IconButton, Tooltip } from '@material-ui/core'
import EditIcon from '@material-ui/icons/EditOutlined'

interface IEditButtonProps {
  onClick?: any
  prompt?: string
}

export const EditButton = (props: IEditButtonProps) => (
  <Tooltip title={props.prompt ?? 'Изменить'}>
    <IconButton onClick={props.onClick} size='small'>
      <EditIcon />
    </IconButton>
  </Tooltip>
)
