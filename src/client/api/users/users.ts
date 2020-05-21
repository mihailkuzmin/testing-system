import { Response } from '@common/typings'
import { CreateStudent, UpdateStudent, Student, StudentId } from '@common/typings/student'
import { request } from '../request'

const getAll = async (): Promise<Response<Student[]>> => {
  const result = await request.get<Student[]>('student')
  return result
}

const getById = async (id: StudentId): Promise<Response<Student>> => {
  const result = await request.get<Student>(`student/${id}`)
  return result
}

const create = async (user: CreateStudent): Promise<Response<void>> => {
  const result = await request.post<CreateStudent, void>('student', user)
  return result
}

const deleteById = async (id: StudentId): Promise<Response<void>> => {
  const result = await request.delete<StudentId, void>(`student/${id}`)
  return result
}

const update = async (user: UpdateStudent): Promise<Response<void>> => {
  const result = await request.put<UpdateStudent, void>('student', user)
  return result
}

export const usersApi = {
  create,
  getAll,
  getById,
  deleteById,
  update,
}
