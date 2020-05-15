import { combine, forward, guard, sample } from 'effector'
import { EditPage } from '../page'
import {
  $closeAt,
  $id,
  $name,
  $openAt,
  $selectedTasks,
  $selectedTopic,
  $tasks,
  $topics,
} from './stores'
import { getAllTasksFx, getTasksOfWorkFx, getTopicsFx, getWorkFx, updateWorkFx } from './effects'
import {
  addTask,
  closeAtChange,
  deleteTask,
  nameChange,
  openAtChange,
  topicChange,
  updateWork,
} from './events'
import { notifications } from '@model'
import { MessageType } from '@typings'

forward({ from: EditPage.open, to: [getWorkFx, getTopicsFx, getAllTasksFx, getTasksOfWorkFx] })
forward({
  from: EditPage.close,
  to: [getWorkFx.cancel, getTopicsFx.cancel, getAllTasksFx.cancel, getTasksOfWorkFx.cancel],
})

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

$tasks.on(getAllTasksFx.doneData, (_, { payload }) => payload)
$tasks.reset(EditPage.close)

$selectedTasks.on(getTasksOfWorkFx.doneData, (_, { payload }) => payload)
$selectedTasks.on(addTaskToWork, (tasks, task) => [...tasks, task!])
$selectedTasks.on(deleteTaskFromWork, (tasks, taskForDelete) =>
  tasks.filter((task) => task.id !== taskForDelete.id),
)
const $selectedTasksIds = $selectedTasks.map((tasks) => tasks.map((task) => task.id))

$topics.on(getTopicsFx.doneData, (_, { payload }) => payload)
$topics.on(updateWorkFx.done, (topics) => [...topics])
$topics.reset(EditPage.close)

const newTopic = sample({
  source: $topics,
  clock: topicChange,
  fn: (topics, topicId) => topics.find((topic) => topic.id === topicId) ?? null,
})
const setInitialTopic = getTopicsFx.doneData.map(({ payload }) => (payload ? payload[0] : null))
$selectedTopic.on(setInitialTopic, (_, topic) => topic)
$selectedTopic.on(newTopic, (_, topic) => topic)
$selectedTopic.reset(EditPage.close)

const $availableTasks = combine(
  { tasks: $tasks, selected: $selectedTasksIds },
  ({ tasks, selected }) => tasks.filter((task) => !selected.includes(task.id)),
)
const $filteredTasks = combine(
  { available: $availableTasks, topic: $selectedTopic },
  ({ available, topic }) => available.filter((task) => task.topic.id === topic?.id),
)

$id.on(getWorkFx.doneData, (_, { payload }) => payload?.id)
$id.reset(EditPage.close)

$name.on(getWorkFx.doneData, (_, { payload }) => payload?.name)
$name.on(nameChange, (_, name) => name)
$name.reset(EditPage.close)

$openAt.on(getWorkFx.doneData, (_, { payload }) => new Date(payload?.openAt ?? Date.now()))
$openAt.on(openAtChange, (_, date) => date)
$openAt.reset(EditPage.close)

$closeAt.on(getWorkFx.doneData, (_, { payload }) => new Date(payload?.closeAt ?? Date.now()))
$closeAt.on(closeAtChange, (_, date) => date)
$closeAt.reset(EditPage.close)

const $form = combine({
  id: $id,
  name: $name,
  openAt: $openAt.map((date) => date.toISOString()),
  closeAt: $closeAt.map((date) => date.toISOString()),
  tasks: $selectedTasksIds,
})

const $canSave = $selectedTasks.map((tasks) => Boolean(tasks.length))

// when updateWork triggered, call effect if selected more than 0 tasks
guard({
  source: sample({ source: $form, clock: updateWork }),
  filter: $canSave,
  target: updateWorkFx,
})

updateWorkFx.watch(() => {
  notifications.createMessage({ text: 'Выполняется', type: MessageType.Info })
})
updateWorkFx.doneData.watch(({ message }) => {
  if (message) {
    notifications.createMessage({ text: message, type: MessageType.Success })
  }
})
updateWorkFx.failData.watch(({ message }) => {
  notifications.createMessage({ text: message, type: MessageType.Error })
})

export const editForm = {
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
  updateWork,
}
