import { combine, createStore, forward } from 'effector'
import { WorkId } from '@common/typings/work'
import { UserId } from '@common/typings/user'
import { GroupId } from '@common/typings/group'
import { getReportFx } from './effects'
import { open, close } from './events'
import { $report } from './stores'

const onMount = (params: { workId: WorkId; userId: UserId; groupId: GroupId }) => {
  open(params)
  return () => close()
}

const $isLoading = createStore(true)
$isLoading.on(getReportFx.done, () => false)
$isLoading.on(getReportFx.fail, () => false)
$isLoading.reset(close)

const $isFail = createStore(false)
$isFail.on(getReportFx.fail, () => true)
$isFail.reset(close)

forward({ from: open, to: getReportFx })
forward({ from: close, to: getReportFx.cancel })

$report.on(getReportFx.doneData, (_, { payload }) => payload)
$report.reset(close)

$report.watch(console.log)

export const userReport = {
  page: { onMount, status: combine({ isLoading: $isLoading, isFail: $isFail }) },
  $report,
}
