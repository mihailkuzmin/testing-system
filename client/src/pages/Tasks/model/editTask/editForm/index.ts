import { forward, guard, sample } from 'effector'
import {
  $description,
  $editTests,
  $form,
  $name,
  $oldTestsForDelete,
  $selectedTopic,
  $taskId,
  $tests,
  $testsCount,
  $topics,
} from './stores'
import {
  descriptionChange,
  inputChange,
  nameChange,
  outputChange,
  addTest,
  removeOldTest,
  removeTest,
  saveChanges,
  toggleEditTests,
  topicChange,
} from './events'
import { getTaskFx, getTestsFx, getTopicsFx, updateTaskFx } from './effects'
import { EditPage } from '../page'
import { notifications } from '../../../../../model/notifications'
import { MessageType } from '../../../../../typings'
import { nanoid } from 'nanoid'

//bind open/close/done events
forward({ from: EditPage.open, to: [getTaskFx, getTopicsFx] })
forward({ from: EditPage.close, to: [getTaskFx.cancel, getTestsFx.cancel, getTopicsFx.cancel] })
updateTaskFx.doneData.watch(({ payload: { id } }) => getTaskFx(id))

// working with inputs
$taskId.on(getTaskFx.doneData, (_, { payload }) => payload.id)
$taskId.reset(EditPage.close)

$name.on(getTaskFx.doneData, (_, { payload }) => payload.name)
$name.on(nameChange, (_, name) => name)
$name.reset(EditPage.close)

$description.on(getTaskFx.doneData, (_, { payload }) => payload.description)
$description.on(descriptionChange, (_, desc) => desc)
$description.reset(EditPage.close)

$topics.on(getTopicsFx.doneData, (_, { payload }) => payload)
$topics.reset(EditPage.close)

$selectedTopic.on(getTaskFx.doneData, (_, { payload }) => payload.topic.id)
$selectedTopic.on(topicChange, (_, topic) => topic)
$selectedTopic.reset(EditPage.close)

$editTests.on(toggleEditTests, (_, newState) => newState)
$editTests.reset(EditPage.close)

$oldTestsForDelete.on(removeOldTest, (tests, { id }) => [...tests, id])
$oldTestsForDelete.reset(EditPage.close, toggleEditTests)

$tests.on(getTestsFx.doneData, (_, { payload }) => payload.map((test) => ({ ...test, old: true })))
$tests.on(removeTest, (tests, { id }) => tests.filter((test) => test.id !== id))
$tests.on(addTest, (tests) => [...tests, { id: nanoid(), input: '', output: '', old: false }])
$tests.on(inputChange, (tests, { id, value }) =>
  tests.map((test) => (test.id === id ? { ...test, input: value } : test)),
)
$tests.on(outputChange, (tests, { id, value }) =>
  tests.map((test) => (test.id === id ? { ...test, output: value } : test)),
)
$tests.reset(EditPage.close, toggleEditTests)

/*
to prevent race condition we need to cancel effect:
when checkbox goes from false to true -> call effect
when checkbox goes from true to false -> cancel effect
*/
const fetchTests = guard({
  source: $editTests,
  filter: (edit) => edit,
})

sample({
  source: $taskId,
  clock: fetchTests,
  target: getTestsFx,
  fn: (taskId) => taskId!,
})

guard({
  source: $editTests,
  filter: (edit) => !edit,
  target: getTestsFx.cancel,
})

// update task
sample({
  source: $form,
  clock: saveChanges,
  target: updateTaskFx,
  fn: (form) => ({ ...form, id: form.id!, topicId: form.topicId! }),
})

updateTaskFx.watch(() => {
  notifications.createMessage({ text: 'Выполняется', type: MessageType.Info })
})

updateTaskFx.doneData.watch(({ message }) => {
  notifications.createMessage({ text: message, type: MessageType.Success })
})

updateTaskFx.failData.watch(({ message }) => {
  notifications.createMessage({ text: message, type: MessageType.Error })
})

export const editForm = {
  $name,
  $description,
  $topics,
  $selectedTopic,
  nameChange,
  descriptionChange,
  saveChanges,
  topicChange,
}

export const tests = {
  $tests,
  $testsCount,
  $testsAreLoading: getTestsFx.pending,
  $editTests,
  toggleEditTests,
  inputChange,
  outputChange,
  addTest,
  removeTest,
}
