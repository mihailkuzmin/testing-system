import { forward, sample } from 'effector'
import { notifications } from '@model'
import { MessageType } from '@typings'
import { nanoid } from 'nanoid'
import { AddTaskPage } from '../page'
import { $description, $tests, $testsCount, $name, $form, $topics, $selectedTopic } from './stores'
import {
  descriptionChange,
  inputChange,
  outputChange,
  addTest,
  removeTest,
  createTask,
  nameChange,
  topicChange,
} from './events'
import { createTaskFx, getTopicsFx } from './effects'

forward({ from: AddTaskPage.open, to: getTopicsFx })
forward({ from: AddTaskPage.close, to: getTopicsFx.cancel })

$description.on(descriptionChange, (_, desc) => desc)
$description.reset(AddTaskPage.close, createTaskFx.done)

$name.on(nameChange, (_, name) => name)
$name.reset(AddTaskPage.close, createTaskFx.done)

$selectedTopic.on(getTopicsFx.doneData, (_, { payload }) => {
  if (payload) {
    return payload[0].id
  }
})
$selectedTopic.on(topicChange, (_, topic) => topic)
$selectedTopic.reset(AddTaskPage.close)

$topics.on(getTopicsFx.doneData, (_, { payload }) => payload)
$topics.reset(AddTaskPage.close)

$tests.on(inputChange, (tests, { id, value }) =>
  tests.map((test) => (test.id === id ? { ...test, input: value } : test)),
)
$tests.on(outputChange, (tests, { id, value }) =>
  tests.map((test) => (test.id === id ? { ...test, output: value } : test)),
)
$tests.on(addTest, (tests) => [...tests, { id: nanoid(), input: '', output: '' }])
$tests.on(removeTest, (tests, testId) => {
  if (tests.length === 1) {
    return tests
  }

  return tests.filter((test) => test.id !== testId)
})
$tests.on(createTaskFx.done, () => [{ id: nanoid(), input: '', output: '' }])
$tests.on(AddTaskPage.close, () => [{ id: nanoid(), input: '', output: '' }])

sample({
  source: $form,
  clock: createTask,
  target: createTaskFx,
  fn: (task) => ({
    ...task,
    topicId: task.topicId!,
  }),
})

createTaskFx.watch(() => {
  notifications.createMessage({ text: 'Выполняется', type: MessageType.Info })
})

createTaskFx.doneData.watch(({ message }) => {
  if (message) {
    notifications.createMessage({ text: message, type: MessageType.Success })
  }
})

createTaskFx.failData.watch(({ message }) => {
  notifications.createMessage({ text: message, type: MessageType.Error })
})

export const addForm = {
  $name,
  $description,
  $tests,
  $testsCount,
  $topics,
  $selectedTopic,
  addTest,
  removeTest,
  createTask,
  inputChange,
  outputChange,
  descriptionChange,
  nameChange,
  topicChange,
}
