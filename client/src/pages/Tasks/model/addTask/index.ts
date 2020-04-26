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
import { notifications } from '../../../../model'
import { MessageType } from '../../../../typings'

$description.on(descriptionChange, (_, desc) => desc)
$description.reset(createTaskFx.done)

$name.on(nameChange, (_, name) => name)
$name.reset(createTaskFx.done)

$tests.on(inputChange, (tests, { id, value }) => {
  return tests.map((test) => {
    if (test.id === id) {
      test.input = value
    }
    return test
  })
})
$tests.on(outputChange, (tests, { id, value }) => {
  return tests.map((test) => {
    if (test.id === id) {
      test.output = value
    }
    return test
  })
})
$tests.on(addTest, (tests) => [...tests, { id: tests.length + 1, input: '', output: '' }])
$tests.on(removeTest, (tests) => {
  if (tests.length > 1) {
    return tests.slice(0, -1)
  }
})
$tests.on(createTaskFx.done, () => [{ id: 1, input: '', output: '' }])

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

export const addTask = {
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
