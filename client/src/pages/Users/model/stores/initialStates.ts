import { User, AddModal, Group, AddForm } from '../typings'

export const users: User[] = [
  { id: 1, name: 'Исаков Клим Ярославович', group: 'АП-31', login: 'login1' },
  {
    id: 2,
    name: 'Владосов Арнольд Артемович',
    group: 'АП-31',
    login: 'login2',
  },
  {
    id: 3,
    name: 'Виноградов Владислав Георгьевич',
    group: 'АП-21',
    login: 'login3',
  },
  {
    id: 4,
    name: 'Муравьёв Аристарх Романович',
    group: 'МР-191',
    login: 'login4',
  },
]

export const groups: Group[] = [
  { id: 1, name: 'АП-31' },
  { id: 2, name: 'УС-31' },
  { id: 3, name: 'АП-21' },
]

export const addModal: AddModal = {
  open: false,
}

export const addForm: AddForm = {
  name: '',
  group: '',
  login: '',
  password: '',
}
