import { forward } from 'effector'
import { $name, $description, $tests } from './stores'
import { getTaskFx } from './effects'
import { EditPage } from '../page'

forward({ from: EditPage.open, to: getTaskFx })
forward({ from: EditPage.close, to: getTaskFx.cancel })

$name.on(getTaskFx.doneData, (_, { payload }) => payload.name)
$name.reset(EditPage.close)

$description.on(getTaskFx.doneData, (_, { payload }) => payload.description)
$description.reset(EditPage.close)

export const editForm = { $name, $description, $tests }
