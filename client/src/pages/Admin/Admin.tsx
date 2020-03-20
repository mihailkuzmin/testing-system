import React from 'react'
import { IPageProps } from '../../typings'

export const Admin = (props: IPageProps) => {
  return (
    <div>
      Admin
      {props.children}
    </div>
  )
}
