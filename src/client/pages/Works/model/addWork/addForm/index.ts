import { combine, forward, guard, sample } from 'effector'
import { notifications } from '@model'
import { MessageType } from '@typings'
import { setTimeToCompleteDate } from '@common/helpers'
import { AddWorkPage } from '../page'
import { createWorkFx, getTasksFx, getTopicsFx, getGroupsFx } from './effects'
import {
  $name,
  $openAt,
  $closeAt,
  $timeToComplete,
  $selectedTasks,
  $selectedTopic,
  $tasks,
  $topics,
  $groups,
  $selectedGroups,
} from './stores'
import {
  addGroup,
  removeGroup,
  addTask,
  addWork,
  closeAtChange,
  deleteTask,
  nameChange,
  openAtChange,
  topicChange,
  timeToCompleteChange,
} from './events'

forward({ from: AddWorkPage.open, to: [getTasksFx, getTopicsFx, getGroupsFx] })
forward({
  from: AddWorkPage.close,
  to: [getTasksFx.cancel, getTopicsFx.cancel, getGroupsFx.cancel],
})

const groupForAdd = sample({
  source: $groups,
  clock: addGroup,
  fn: (groups, groupId) => groups.find((group) => group.id === groupId),
})

const groupForRemove = sample({
  source: $selectedGroups,
  clock: removeGroup,
  fn: (groups, groupId) => groups.find((group) => group.id === groupId)!,
})

$groups.on(getGroupsFx.doneData, (_, { payload }) => payload)
$groups.reset(AddWorkPage.close)

$selectedGroups.on(groupForAdd, (groups, group) => [...groups, group!])
$selectedGroups.on(groupForRemove, (groups, groupForDelete) => {
  return groups.filter((group) => group.id !== groupForDelete.id)
})
$selectedGroups.reset(AddWorkPage.close, createWorkFx.done)
const $selectedGroupsIds = $selectedGroups.map((groups) => groups.map((group) => group.id))

const $availableGroups = combine(
  { groups: $groups, selected: $selectedGroupsIds },
  ({ groups, selected }) => groups.filter((group) => !selected.includes(group.id)),
)

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
$tasks.reset(AddWorkPage.close)

$topics.on(getTopicsFx.doneData, (_, { payload }) => payload)
$topics.on(createWorkFx.done, (topics) => [...topics])
$topics.reset(AddWorkPage.close)

$selectedTasks.on(addTaskToWork, (tasks, task) => [...tasks, task!])
$selectedTasks.on(deleteTaskFromWork, (tasks, taskForDelete) => {
  return tasks.filter((task) => task.id !== taskForDelete.id)
})
$selectedTasks.reset(AddWorkPage.close, createWorkFx.done)
const $selectedTasksIds = $selectedTasks.map((tasks) => tasks.map((task) => task.id))

const newTopic = sample({
  source: $topics,
  clock: topicChange,
  fn: (topics, topicId) => topics.find((topic) => topic.id === topicId) ?? null,
})
const setInitialTopic = sample({
  source: getTopicsFx.doneData,
  clock: getTopicsFx.doneData,
  fn: ({ payload }) => (payload ? payload[0] : null),
})
$selectedTopic.on(setInitialTopic, (_, topic) => topic)
$selectedTopic.on(newTopic, (_, topic) => topic)
$selectedTopic.reset(AddWorkPage.close)

const $availableTasks = combine(
  { tasks: $tasks, selected: $selectedTasksIds },
  ({ tasks, selected }) => tasks.filter((task) => !selected.includes(task.id)),
)
const $filteredTasks = combine(
  { available: $availableTasks, topic: $selectedTopic },
  ({ available, topic }) => available.filter((task) => task.topic.id === topic?.id),
)

$name.on(nameChange, (_, name) => name)
$name.reset(AddWorkPage.close, createWorkFx.done)

$openAt.on(openAtChange, (_, date) => date)
$openAt.on(createWorkFx.done, () => new Date())
$openAt.reset(AddWorkPage.close)

$closeAt.on(closeAtChange, (_, date) => date)
$closeAt.on(createWorkFx.done, () => new Date())
$closeAt.reset(AddWorkPage.close)

$timeToComplete.on(timeToCompleteChange, (_, date) => date)
$timeToComplete.on(createWorkFx.done, () =>
  setTimeToCompleteDate({ date: new Date(), hours: 1, minutes: 0 }),
)
$timeToComplete.reset(AddWorkPage.close)

const $form = combine({
  name: $name,
  openAt: $openAt.map((date) => date.toISOString()),
  closeAt: $closeAt.map((date) => date.toISOString()),
  timeToComplete: $timeToComplete.map((date) => date.toISOString()),
  tasks: $selectedTasks.map((tasks) => tasks.map((task) => task.id)),
  groups: $selectedGroups.map((groups) => groups.map((group) => group.id)),
})

const $tasksValid = $selectedTasks.map((tasks) => Boolean(tasks.length))
const $groupsValid = $selectedGroups.map((groups) => Boolean(groups.length))
const $canSave = combine([$tasksValid, $groupsValid], (arr) => {
  return arr.reduce((prev, next) => prev && next)
})

// when addWork triggered, call effect if selected more than 0 tasks and more than 0 groups
guard({
  source: sample({ source: $form, clock: addWork }),
  filter: $canSave,
  target: createWorkFx,
})

createWorkFx.watch(() => {
  notifications.createMessage({ text: 'Выполняется', type: MessageType.Info })
})

createWorkFx.doneData.watch(({ message }) => {
  if (message) {
    notifications.createMessage({ text: message, type: MessageType.Success })
  }
})

createWorkFx.failData.watch(({ message }) => {
  notifications.createMessage({ text: message, type: MessageType.Error })
})

export const addForm = {
  $groups: combine({ groups: $availableGroups, selected: $selectedGroups }),
  $tasks: combine({ tasks: $filteredTasks, selected: $selectedTasks }),
  $topics: combine({ topics: $topics, selected: $selectedTopic }),
  $name,
  $openAt,
  $closeAt,
  $timeToComplete,
  addGroup,
  removeGroup,
  nameChange,
  openAtChange,
  closeAtChange,
  timeToCompleteChange,
  topicChange,
  addTask,
  deleteTask,
  addWork,
}
