import { forward, sample } from 'effector'
import { AddWorkPage } from '../page'
import { getTopicsFx, getTasksFx } from './effects'
import { $tasks, $selectedTasks, $topics, $selectedTopic } from './stores'
import { topicChange } from './events'

forward({ from: AddWorkPage.open, to: [getTasksFx, getTopicsFx] })
forward({ from: AddWorkPage.close, to: [getTasksFx.cancel, getTopicsFx.cancel] })

$tasks.on(getTasksFx.doneData, (_, { payload }) => payload)
$tasks.reset(AddWorkPage.close)

$topics.on(getTopicsFx.doneData, (_, { payload }) => payload)
$topics.reset(AddWorkPage.close)

$selectedTopic.on(getTopicsFx.doneData, (_, { payload }) => {
  if (payload.length) {
    const [first] = payload
    return first
  }
})
//trigger filter when tasks updates
$selectedTopic.on($tasks.updates, (state) => (state ? { ...state } : state))

sample({
  source: $topics,
  clock: topicChange,
  target: $selectedTopic,
  fn: (topics, topicId) => topics.find((topic) => topic.id === topicId) ?? null,
})
$selectedTopic.reset(AddWorkPage.close)

const $filteredTasks = sample({
  source: $tasks,
  clock: $selectedTopic,
  fn: (tasks, selected) => tasks.filter((task) => task.topic.id === selected?.id),
})
$filteredTasks.reset(AddWorkPage.close)

export const addForm = { $filteredTasks, $selectedTasks, $topics, $selectedTopic, topicChange }
