import React from 'react'
import Through from './Through'

const throughContainer =
  areaName =>
  Component =>
  props => (
    <Through area={areaName}>
      { data =>
        <Component {...props} {...{[areaName]: data}} />
      }
    </Through>
  )

export default throughContainer
