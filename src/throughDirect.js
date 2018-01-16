import React from 'react'
import Through from './Through'

const throughDirect =
  areaName =>
  Component =>
  props => (
    <Through area={areaName} direct default={{}}>
      { data =>
        <Component {...props} {...data}/>
      }
    </Through>
  )

export default throughDirect