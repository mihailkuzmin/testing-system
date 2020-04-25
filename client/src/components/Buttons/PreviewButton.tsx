import React from 'react'
import { IconButton, Tooltip, ButtonProps } from '@material-ui/core'
import { Preview } from '../Icons'

type PreviewButtonProps = ButtonProps & {
  prompt?: string
}

export const PreviewButton = (props: PreviewButtonProps) => (
  <Tooltip title={props.prompt ?? 'Просмотреть'}>
    <IconButton onClick={props.onClick} size='small'>
      <Preview />
    </IconButton>
  </Tooltip>
)
