import { createEvent } from 'effector'
import { TopicId } from '@common/typings/task'

export const topicChange = createEvent<TopicId>()
