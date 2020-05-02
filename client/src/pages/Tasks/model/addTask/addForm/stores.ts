import { createStore, combine } from 'effector'
import { Test } from './typings'
import { nanoid } from 'nanoid'

export const $name = createStore('')

export const $description = createStore(
  '<p style="font-size: 16px">Добавьте описание задания здесь</p>',
)

export const $tests = createStore<Test[]>([{ id: nanoid(), input: '', output: '' }])

export const $testsCount = $tests.map((tests) => tests.length)

//TODO FIX TOPIC
export const $form = combine({ name: $name, description: $description, tests: $tests }, (kek) => ({
  ...kek,
  topicId: 1,
}))
