import React from 'react'
import { IconButton, ButtonProps, Tooltip } from '@material-ui/core'
import { Plus } from '../Icons'

type PlusButtonProps = ButtonProps & {
  prompt?: string
}

export const PlusButton = (props: PlusButtonProps) => (
  <Tooltip title={props.prompt ?? 'Добавить'}>
    <IconButton {...props} size='small'>
      <Plus />
    </IconButton>
  </Tooltip>
)
