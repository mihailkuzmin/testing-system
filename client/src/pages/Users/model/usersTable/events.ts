import { createEvent } from 'effector'
import {
  Response,
  UsersTableRow,
  UsersTableGroup,
  UsersTableRowId,
} from '../../../../typings'

export const groupSelectChange = createEvent<number>()
export const onGroupSelectChange = groupSelectChange.prepend(
  (e: React.ChangeEvent<{ value: unknown }>) => {
    return e.target.value as number
  },
)

export const groupsRefreshed = createEvent<Response<UsersTableGroup[]>>()
export const usersRefreshed = createEvent<Response<UsersTableRow[]>>()

export const deleteUser = createEvent<{
  id: UsersTableRowId
  lastName: string
  firstName: string
  patronymic: string
}>()
export const userDeleted = createEvent<Response<UsersTableRow>>()
