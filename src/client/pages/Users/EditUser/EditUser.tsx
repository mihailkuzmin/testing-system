import React from 'react'
import { StudentId } from '@common/typings/student'

type EditUserProps = { id: StudentId }
export const EditUser = ({ id }: EditUserProps) => {
  return <div>Edit user {id}</div>
}
