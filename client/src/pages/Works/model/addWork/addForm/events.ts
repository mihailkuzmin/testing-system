import { createEvent } from 'effector'
import { TopicId } from './typings'

export const topicChange = createEvent<TopicId>()
