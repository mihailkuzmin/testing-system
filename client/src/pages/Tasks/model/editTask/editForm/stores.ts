import { createStore, combine } from 'effector'
import { UpdateTest, TaskId } from './typings'

export const $taskId = createStore<TaskId | null>(null)

export const $name = createStore('')

export const $description = createStore('')

export const $tests = createStore<UpdateTest[]>([])
export const $testsCount = $tests.map((tests) => tests.length)

export const $editTests = createStore(false)

export const $form = combine({
  id: $taskId,
  name: $name,
  description: $description,
  tests: $tests,
  editTests: $editTests,
})
