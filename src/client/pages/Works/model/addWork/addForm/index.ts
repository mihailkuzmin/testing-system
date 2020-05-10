import { combine, forward, guard, sample } from 'effector'
import { notifications } from '@model'
import { MessageType } from '@typings'
import { AddWorkPage } from '../page'
import { createWorkFx, getTasksFx, getTopicsFx } from './effects'
import { $name, $openAt, $closeAt, $selectedTasks, $selectedTopic, $tasks, $topics } from './stores'
import {
  addTask,
  addWork,
  closeAtChange,
  deleteTask,
  nameChange,
  openAtChange,
  topicChange,
} from './events'

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
const $selectedTasksIds = $selectedTasks.map((tasks) => tasks.map((task) => task.id))

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

$name.on(nameChange, (_, name) => name)
$name.reset(AddWorkPage.close)

$openAt.on(openAtChange, (_, date) => date)
$openAt.reset(AddWorkPage.close)

$closeAt.on(closeAtChange, (_, date) => date)
$closeAt.reset(AddWorkPage.close)

const $form = combine({
  name: $name,
  openAt: $openAt,
  closeAt: $closeAt,
  tasks: $selectedTasksIds,
})

const $canSave = $selectedTasks.map((tasks) => Boolean(tasks.length))

// when addWork triggered, call effect if selected more than 0 tasks
guard({
  source: sample({
    source: $form,
    clock: addWork,
    fn: (form) => ({
      ...form,
      openAt: form.openAt.toISOString(),
      closeAt: form.closeAt.toISOString(),
    }),
  }),
  filter: $canSave,
  target: createWorkFx,
})

createWorkFx.watch(() => {
  notifications.createMessage({ text: 'Выполняется', type: MessageType.Info })
})

createWorkFx.doneData.watch(({ message }) => {
  notifications.createMessage({ text: message, type: MessageType.Success })
})

createWorkFx.failData.watch(({ message }) => {
  notifications.createMessage({ text: message, type: MessageType.Error })
})

export const addForm = {
  $filteredTasks,
  $selectedTasks,
  $topics,
  $selectedTopic,
  $name,
  $openAt,
  $closeAt,
  nameChange,
  openAtChange,
  closeAtChange,
  topicChange,
  addTask,
  deleteTask,
  addWork,
}
