import { createStore, combine } from 'effector'
import { Test, Topic, TopicId } from './typings'
import { nanoid } from 'nanoid'

export const $name = createStore('')

export const $description = createStore(
  '<p style="font-size: 16px">Добавьте описание задания здесь</p>',
)

export const $tests = createStore<Test[]>([{ id: nanoid(), input: '', output: '' }])

export const $testsCount = $tests.map((tests) => tests.length)

export const $topics = createStore<Topic[]>([])

export const $selectedTopic = createStore<TopicId | null>(null)

export const $form = combine({
  name: $name,
  description: $description,
  tests: $tests,
  topicId: $selectedTopic,
})

$form.watch(console.log)
