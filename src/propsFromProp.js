import React, { Children } from 'react'
import PropTypes from 'prop-types'

const propsFromProp =
  prop =>
  Component =>
  ({[prop]: props, ...rest}) =>
  <Component {...rest} {...(props||{})}/>

export default propsFromProp