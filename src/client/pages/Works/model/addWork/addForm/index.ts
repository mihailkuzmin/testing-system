import { forward, sample } from 'effector'
import { AddWorkPage } from '../page'
import { getTopicsFx, getTasksFx } from './effects'
import { $tasks, $selectedTasks, $topics, $selectedTopic } from './stores'
import { topicChange, addTask, deleteTask } from './events'

forward({ from: AddWorkPage.open, to: [getTasksFx, getTopicsFx] })
forward({ from: AddWorkPage.close, to: [getTasksFx.cancel, getTopicsFx.cancel] })

const addTaskToWork = sample({
  source: $tasks,
  clock: addTask,
  fn: (tasks, taskId) => tasks.find((task) => task.id === taskId),
})

const deleteTaskFromWork = sample({
  source: $selectedTasks,
  clock: deleteTask,
  fn: (tasks, taskId) => tasks.find((task) => task.id === taskId)!,
})

$tasks.on(getTasksFx.doneData, (_, { payload }) => payload)
$tasks.on(addTaskToWork, (tasks, taskForDelete) =>
  tasks.filter((task) => task.id !== taskForDelete!.id),
)
$tasks.on(deleteTaskFromWork, (tasks, task) => [...tasks, task])
$tasks.reset(AddWorkPage.close)

$topics.on(getTopicsFx.doneData, (_, { payload }) => payload)
$topics.reset(AddWorkPage.close)

$selectedTasks.on(addTaskToWork, (tasks, task) => [...tasks, task!])
$selectedTasks.on(deleteTaskFromWork, (tasks, taskForDelete) =>
  tasks.filter((task) => task.id !== taskForDelete.id),
)

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

export const addForm = {
  $filteredTasks,
  $selectedTasks,
  $topics,
  $selectedTopic,
  topicChange,
  addTask,
  deleteTask,
}
