import { createReEffect } from 'effector-reeffect'
import { worksApi } from '../../../../../api/works'

export const getWorksFx = createReEffect({ handler: worksApi.getAll })
export const deleteWorkFx = createReEffect({ handler: worksApi.deleteById })
