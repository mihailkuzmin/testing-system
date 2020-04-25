import { createStore, combine } from 'effector'
import { Test } from './typings'

export const $description = createStore(
  '<p style="font-size: 16px">Добавьте описание задания здесь</p>',
)

export const $tests = createStore<Test[]>([{ id: 1, input: '', output: '' }])

export const $testsCount = $tests.map((tests) => tests.length)

export const $form = combine({ description: $description, tests: $tests })
