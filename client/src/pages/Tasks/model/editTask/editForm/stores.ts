import { createStore, combine } from 'effector'
import { Test } from './typings'

export const $name = createStore('')

export const $description = createStore('')

export const $tests = createStore<Test[]>([])

export const $editTests = createStore(false)

export const $form = combine({
  name: $name,
  description: $description,
  tests: $tests,
  editTests: $editTests,
})
