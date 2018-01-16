import React from 'react'
import Through from './Through'

const throughContainer =
  areaName =>
  Component =>
  props => (
    <Through area={areaName}>
      { data =>
        <Component {...rest} {...{[areaName]: data}} />
      }
    </Through>
  )

export default throughContainer
