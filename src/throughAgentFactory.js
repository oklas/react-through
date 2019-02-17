import React, { Children } from 'react'
import PropTypes from 'prop-types'

import hasDiff from './hasDiff'
import hasComplex from './hasComplex'
import throughAgent from './throughAgent'
import Item from './Item'

export function createThroughAgentClass(area, key, syncUpdate) {
  class ThroughAgent extends React.Component {
    static propTypes = {
      [area]: PropTypes.object,
    }

    constructor(props) {
      super()
      this.configureItem(props)
      this.state = {
        configureItem: this.configureItem,
        props: {}
      }
    }

    static getDerivedStateFromProps(props, state) {
      if( hasDiff(props, state.props) ) {
        state.configureItem(props)
        return {...state, props}
      }
      return null
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

  return ThroughAgent
}

// this function with *two* params was documented and may be in use
const throughAgentFactory = (area, key, syncUpdate = undefined) => {

  if( !(typeof area === 'string' || area instanceof String ) ) {
    throw new Error(
      "type error: throughAgentFactory(area:string, key:string|function)"
    )
  }

  const ThroughAgent = createThroughAgentClass(area, key, syncUpdate)

  return throughAgent(area, key)(ThroughAgent)
}

export default throughAgentFactory