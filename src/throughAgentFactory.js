import React, { Children } from 'react'
import PropTypes from 'prop-types'

import throughAgent from './throughAgent'
import Item from './Item'

const throughAgentFactory = (area, key) => {

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
      const keys = Object.keys(nextProps).concat(Object.keys(this.props))
      const skip = [area]
      const differences = keys.filter(
        k => (!skip.includes(k) && this.props[k] !== nextProps[k])
      ).length
      if( differences ) {
        this.configureItem(nextProps)
      }
    }

    configureItem = (props) => {
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