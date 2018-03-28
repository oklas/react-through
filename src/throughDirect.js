import React from 'react'
import throughContainer from './throughContainer'

const throughDirect =
  areaName =>
  Component =>
  throughContainer(areaName)(
    ({[areaName]: area, ...rest}) => (
      <Component {...rest} {...(area && area.default || {})} />
    )
  )

export default throughDirect