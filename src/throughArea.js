import React from 'react'
import Through from './Through'

const throughArea =
  areaName =>
  Component =>
  props => (
    <Through area={areaName}>
      { data =>
        <Component {...props} {...data} />
      }
    </Through>
  )

export default throughArea