import { forward, guard, sample } from 'effector'
import { $name, $description, $tests, $testsCount, $editTests, $taskId } from './stores'
import {
  toggleEditTests,
  descriptionChange,
  nameChange,
  editTask,
  inputChange,
  outputChange,
  addTest,
  removeTest,
} from './events'
import { getTaskFx, getTestsFx } from './effects'
import { EditPage } from '../page'
import { nanoid } from 'nanoid'

forward({ from: EditPage.open, to: getTaskFx })
forward({ from: EditPage.close, to: [getTaskFx.cancel, getTestsFx.cancel] })

// working with inputs
$taskId.on(getTaskFx.doneData, (_, { payload }) => payload.id)
$taskId.reset(EditPage.close)

$name.on(getTaskFx.doneData, (_, { payload }) => payload.name)
$name.on(nameChange, (_, name) => name)
$name.reset(EditPage.close)

$description.on(getTaskFx.doneData, (_, { payload }) => payload.description)
$description.on(descriptionChange, (_, desc) => desc)
$description.reset(EditPage.close)

$editTests.on(toggleEditTests, (_, newState) => newState)
$editTests.reset(EditPage.close)

$tests.on(getTestsFx.doneData, (_, { payload }) => payload.map((test) => ({ ...test, old: true })))
$tests.on(removeTest, (tests) => (tests.length > 1 ? tests.slice(0, -1) : tests))
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

export const editForm = {
  $name,
  $description,
  $tests,
  $testsCount,
  $testsAreLoading: getTestsFx.pending,
  $editTests,
  toggleEditTests,
  nameChange,
  descriptionChange,
  inputChange,
  outputChange,
  editTask,
  addTest,
  removeTest,
}
