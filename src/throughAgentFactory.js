import React, { Children } from 'react'
import PropTypes from 'prop-types'

import throughAgent from './throughAgent'

const throughAgentFactory = (area, key) => {

  if( !(typeof area === 'string' || area instanceof String ) ) {
    throw new Error(
      "type error: throughAgentFactory(area:string, key:string|function)"
    )
  }

  const Item = () => null

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

    configureItems = (props) => {
      props[area].item(
        <Item {...props} />
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