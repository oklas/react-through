import React, { Children } from 'react'
import PropTypes from 'prop-types'

import hasDiff from './hasDiff'
import hasComplex from './hasComplex'
import throughAgent from './throughAgent'
import Item from './Item'

// this function with *two* params was documented and may be in use
const throughAgentFactory = (area, key, syncUpdate = undefined) => {

  if( !(typeof area === 'string' || area instanceof String ) ) {
    throw new Error(
      "type error: throughAgentFactory(area:string, key:string|function)"
    )
  }

  class ThroughAgent extends React.Component {
    static propTypes = {
      [area]: PropTypes.object,
    }

    componentWillMount() {
      this.configureItem(this.props)
    }

    componentWillReceiveProps(nextProps) {
      if( hasDiff(nextProps, this.props) ) {
        this.configureItem(nextProps)
      }
    }

    configureItem = syncUpdate === undefined ?
      (props) => {
        const {[area]: notused, ...data} = props
        const syncUpdate = !hasComplex(data)
        props[area].item(
          <Item {...data} />
        , syncUpdate)
      }
      :
      (props) => {
        const {[area]: notused, ...data} = props
        props[area].item(
          <Item {...data} />
        )
      }

    render() {
      return null
    }
  }

  ThroughAgent.displayName = `ThroughAgent.${area}`

  return throughAgent(area, key)(ThroughAgent)
}

export default throughAgentFactory