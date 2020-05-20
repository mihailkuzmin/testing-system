import React from 'react'
import { PageLoader } from '@components/Loaders'
import { auth } from '@model'

export const Logout = () => {
  React.useEffect(() => auth.logout(), [])

  return <PageLoader />
}
