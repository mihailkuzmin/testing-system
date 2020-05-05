import { forward, sample } from 'effector'
import { getTopicsFx, getTasksFx } from './effects'
import { $tasks, $selectedTasks, $topics, $selectedTopic } from './stores'
import { topicChange } from './events'
import { AddWorkPage } from '../page'

forward({ from: AddWorkPage.open, to: [getTasksFx, getTopicsFx] })
forward({ from: AddWorkPage.close, to: [getTasksFx.cancel, getTopicsFx.cancel] })

$tasks.on(getTasksFx.doneData, (_, { payload }) => payload)

$topics.on(getTopicsFx.doneData, (_, { payload }) => payload)

$selectedTopic.on(getTopicsFx.doneData, (_, { payload }) => {
  if (payload.length) {
    const [first] = payload
    return first.id
  }
})
$selectedTopic.on(topicChange, (_, topicId) => topicId)

const $filteredTasks = sample({
  source: $tasks,
  clock: $selectedTopic,
  fn: (tasks, topicId) => tasks.filter((task) => task.topic.id === topicId),
})

export const addForm = { $filteredTasks, $selectedTasks, $topics, $selectedTopic, topicChange }
