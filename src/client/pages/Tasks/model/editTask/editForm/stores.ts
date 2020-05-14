import { createStore, combine } from 'effector'
import { UpdateTest, TaskId, TestId, Topic, TopicId } from '@common/typings/task'

export const $taskId = createStore<TaskId | null>(null)

export const $name = createStore('')

export const $description = createStore('')

export const $topics = createStore<Topic[]>([])
export const $selectedTopic = createStore<TopicId | null>(null)

export const $tests = createStore<UpdateTest[]>([])
export const $testsCount = $tests.map((tests) => tests.length)

export const $oldTestsForDelete = createStore<TestId[]>([])

export const $editTests = createStore(false)

export const $form = combine(
  {
    id: $taskId,
    name: $name,
    description: $description,
    topicId: $selectedTopic,
    tests: $tests,
    testsForDelete: $oldTestsForDelete,
    editTests: $editTests,
  },
  ({ tests, ...form }) => {
    return {
      ...form,
      testsForUpdate: tests.filter((test) => test.old),
      testsForInsert: tests.filter((test) => !test.old),
    }
  },
)
