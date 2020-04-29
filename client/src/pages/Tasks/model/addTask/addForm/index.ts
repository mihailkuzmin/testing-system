import { sample } from 'effector'
import { $description, $tests, $testsCount, $name, $form } from './stores'
import {
  descriptionChange,
  inputChange,
  outputChange,
  addTest,
  removeTest,
  createTask,
  nameChange,
} from './events'
import { createTaskFx } from './effects'
import { AddTaskPage } from '../page'
import { notifications } from '../../../../../model'
import { MessageType } from '../../../../../typings'
import { nanoid } from 'nanoid'

$description.on(descriptionChange, (_, desc) => desc)
$description.reset(AddTaskPage.close, createTaskFx.done)

$name.on(nameChange, (_, name) => name)
$name.reset(AddTaskPage.close, createTaskFx.done)

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
    tests: task.tests.map(({ input, output }) => ({ input, output })),
  }),
})

createTaskFx.watch(() => {
  notifications.createMessage({ text: 'Выполняется', type: MessageType.Info })
})

createTaskFx.doneData.watch(({ message }) => {
  notifications.createMessage({ text: message, type: MessageType.Success })
})

createTaskFx.failData.watch(({ message }) => {
  notifications.createMessage({ text: message, type: MessageType.Error })
})

export const addForm = {
  $name,
  $description,
  $tests,
  $testsCount,
  addTest,
  removeTest,
  createTask,
  inputChange,
  outputChange,
  descriptionChange,
  nameChange,
}
