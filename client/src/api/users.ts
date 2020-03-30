import { Response } from '../typings'

export interface User {
  id: number
  name: string
  group: number | string
  login: string
}

export interface CreateUser {
  name: string
  group: number | string
  login: string
  password: string
}

const timeout = (time: number) =>
  new Promise((res, rej) => {
    setTimeout(res, time)
  })

const api = 'http://localhost:5000/api'

const getAll = async (): Promise<User[]> => {
  try {
    await timeout(500)
    const response = await fetch(`${api}/users`)
    const result = await response.json()
    return result
  } catch (e) {
    throw e
  }
}

const create = async (user: CreateUser): Promise<Response<User>> => {
  try {
    await timeout(500)
    return {
      result: {
        id: 2,
        group: 1,
        name: '',
        login: '',
      },
      message: 'Выполнено',
    }
    // const response = await fetch(`${api}/users`, {
    //   method: 'POST',
    //   body: JSON.stringify(user),
    // })
    // const result = await response.json()
    // return result
  } catch (e) {
    throw e
  }
}

export const usersApi = {
  create,
  getAll,
}
