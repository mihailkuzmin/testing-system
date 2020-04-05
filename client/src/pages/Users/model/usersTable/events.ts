import { createEvent } from 'effector'
import { Response, UsersTableRow, UsersTableGroup } from '../../../../typings'

export const groupSelectChange = createEvent<number>()
export const onGroupSelectChange = groupSelectChange.prepend(
  (e: React.ChangeEvent<{ value: unknown }>) => {
    return e.target.value as number
  },
)

export const groupsRefreshed = createEvent<Response<UsersTableGroup[]>>()
export const usersRefreshed = createEvent<Response<UsersTableRow[]>>()

export const selectForDelete = createEvent<UsersTableRow>()
export const deleteUser = createEvent()
export const userDeleted = createEvent<Response<UsersTableRow>>()
export const confirmDelete = createEvent()
export const cancelDelete = createEvent()
