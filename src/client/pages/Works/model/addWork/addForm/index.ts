import { combine, forward, guard, sample } from 'effector'
import { notifications } from '@model'
import { MessageType } from '@typings'
import { AddWorkPage } from '../page'
import { createWorkFx, getTasksFx, getTopicsFx, getGroupsFx } from './effects'
import {
  $name,
  $openAt,
  $closeAt,
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

const mergedGroupsAfterCreate = sample({
  source: [$selectedGroups, $groups],
  clock: createWorkFx.done,
  fn: ([selected, all]) => all.concat(selected),
})

$groups.on(getGroupsFx.doneData, (_, { payload }) => payload)
$groups.on(groupForAdd, (groups, groupForDelete) => {
  return groups.filter((group) => group.id !== groupForDelete!.id)
})
$groups.on(groupForRemove, (groups, group) => [...groups, group])
$groups.on(mergedGroupsAfterCreate, (_, groups) => groups)
$groups.reset(AddWorkPage.close)

$selectedGroups.on(groupForAdd, (groups, group) => [...groups, group!])
$selectedGroups.on(groupForRemove, (groups, groupForDelete) => {
  return groups.filter((group) => group.id !== groupForDelete.id)
})
$selectedGroups.on(mergedGroupsAfterCreate, () => [])
$selectedGroups.reset(AddWorkPage.close)

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

const mergedTasksAfterCreate = sample({
  source: [$selectedTasks, $tasks],
  clock: createWorkFx.done,
  fn: ([selected, all]) => all.concat(selected),
})

$tasks.on(getTasksFx.doneData, (_, { payload }) => payload)
$tasks.on(addTaskToWork, (tasks, taskForDelete) => {
  return tasks.filter((task) => task.id !== taskForDelete!.id)
})
$tasks.on(deleteTaskFromWork, (tasks, task) => [...tasks, task])
$tasks.on(mergedTasksAfterCreate, (_, tasks) => tasks)
$tasks.reset(AddWorkPage.close)

$topics.on(getTopicsFx.doneData, (_, { payload }) => payload)
$topics.on(createWorkFx.done, (topics) => [...topics])
$topics.reset(AddWorkPage.close)

$selectedTasks.on(addTaskToWork, (tasks, task) => [...tasks, task!])
$selectedTasks.on(deleteTaskFromWork, (tasks, taskForDelete) => {
  return tasks.filter((task) => task.id !== taskForDelete.id)
})
$selectedTasks.on(mergedTasksAfterCreate, () => [])
$selectedTasks.reset(AddWorkPage.close)

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

const $filteredTasks = combine({ tasks: $tasks, topic: $selectedTopic }, ({ tasks, topic }) => {
  return tasks.filter((task) => task.topic.id === topic?.id)
})

$name.on(nameChange, (_, name) => name)
$name.reset(AddWorkPage.close, createWorkFx.done)

$openAt.on(openAtChange, (_, date) => date)
$openAt.on(createWorkFx.done, () => new Date())
$openAt.reset(AddWorkPage.close)

$closeAt.on(closeAtChange, (_, date) => date)
$closeAt.on(createWorkFx.done, () => new Date())
$closeAt.reset(AddWorkPage.close)

const $form = combine({
  name: $name,
  openAt: $openAt.map((date) => date.toISOString()),
  closeAt: $closeAt.map((date) => date.toISOString()),
  tasks: $selectedTasks.map((tasks) => tasks.map((task) => task.id)),
  groups: $selectedGroups.map((groups) => groups.map((group) => group.id)),
})

const $canSave = $selectedTasks.map((tasks) => Boolean(tasks.length))

// when addWork triggered, call effect if selected more than 0 tasks
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
  $groups: combine({ groups: $groups, selected: $selectedGroups }),
  $tasks: combine({ tasks: $filteredTasks, selected: $selectedTasks }),
  $topics: combine({ topics: $topics, selected: $selectedTopic }),
  $name,
  $openAt,
  $closeAt,
  addGroup,
  removeGroup,
  nameChange,
  openAtChange,
  closeAtChange,
  topicChange,
  addTask,
  deleteTask,
  addWork,
}
