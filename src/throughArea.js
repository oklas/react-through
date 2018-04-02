import React from 'react'
import throughContainer from './throughContainer'

const throughArea =
  areaName =>
  Component =>
  throughContainer(areaName)(
    ({[areaName]: area, ...rest}) => (
      <Component {...rest} {...(area)} />
    )
  )

export default throughArea