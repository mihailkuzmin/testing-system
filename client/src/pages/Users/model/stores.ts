import { createStore } from 'effector'
import { User, AddModal } from './typings'

const usersInitialState: User[] = [
  { id: 1, name: 'Исаков Клим Ярославович', group: 'АП-31', login: 'login1' },
  { id: 2, name: 'Владосов Арнольд Артемович', group: 'АП-31', login: 'login2' },
  { id: 3, name: 'Виноградов Владислав Георгьевич', group: 'АП-21', login: 'login3' },
  { id: 4, name: 'Муравьёв Аристарх Романович', group: 'МР-191', login: 'login4' },
]

export const $users = createStore<User[]>(usersInitialState)

export const $addModal = createStore<AddModal>({open: false})
