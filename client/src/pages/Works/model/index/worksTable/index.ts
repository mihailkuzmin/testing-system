import { forward } from 'effector'
import { $works } from './stores'
import { getWorksFx } from './effects'
import { WorksPage } from '../page'

forward({ from: WorksPage.open, to: getWorksFx })
forward({ from: WorksPage.close, to: getWorksFx.cancel })

$works.on(getWorksFx.doneData, (_, { payload }) =>
  payload.map(({ openAt, closeAt, ...work }) => ({
    ...work,
    openAt: new Date(openAt).toLocaleString(),
    closeAt: new Date(closeAt).toLocaleString(),
  })),
)

export const worksTable = {
  $works,
}
