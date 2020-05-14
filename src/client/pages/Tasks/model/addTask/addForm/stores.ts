import { createStore, combine } from 'effector'
import { Topic, TopicId, CreateTest } from '@common/typings/task'
import { nanoid } from 'nanoid'

export const $name = createStore('')

export const $description = createStore('')

export const $tests = createStore<CreateTest[]>([{ id: nanoid(), input: '', output: '' }])

export const $testsCount = $tests.map((tests) => tests.length)

export const $topics = createStore<Topic[]>([])

export const $selectedTopic = createStore<TopicId | null>(null)

export const $form = combine({
  name: $name,
  description: $description,
  tests: $tests,
  topicId: $selectedTopic,
})
