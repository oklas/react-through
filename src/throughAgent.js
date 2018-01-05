import React, { Children } from 'react'
import PropTypes from 'prop-types'

const throughAgent = (area, key) => (AgentComponent) => {
  let getKey = null

  if( !(typeof area === 'string' || area instanceof String ) ) {
    throw new Error(
      "type error: throughAgent(area:string, key:string|function)"
    )
  }

  if( typeof key === 'string' || key instanceof String ) {
    getKey = props => props[key]
  } else if ( typeof key === 'function' ) {
    getKey = key
  } else if (key === undefined || key === null) {
    getKey = props => 'default'
  } else {
    throw new Error(
      "type error: throughAgent(area:string, key:string|function)"
    )
  }

  class ThroughAgent extends React.Component {
    static contextTypes = {
      through: PropTypes.object,
    }

    constructor(props, context) {
      super(props, context)
      this.data = {}
    }

    componentDidMount = () => {
      this.update(this.data)
    }

    componentWillUnmount = () => {
      this.update({})
    }

    item = (elem) => {
      const key = elem && getKey(elem.props)
      const data = (!elem || !key) ?
        {} : { [key]: elem.props }
      this.update(data)
    }

    items = (elem) => {
      const data = {}
      React.Children.forEach(elem.props.children, function(elem) {
        const key = elem && getKey(elem.props)
        if(!elem || !key) { return }
        data[key] = elem.props
      })
      this.update(data)
    }

    update = (data) => {
      const remove = Object.keys(this.data).filter(
        key => !data.hasOwnProperty(key)
      )
      remove.forEach(
        key => this.context.through.remove(area, key)
      )
      Object.keys(data).forEach(
        key => this.context.through.install(area, key, data[key], true)
      )
      this.data = data
    }

    render() {
      const {item, items} = this
      const through = Object.assign({item, items}, this.props.through)
      return <AgentComponent {...this.props} {...{[area]:{item, items}}} />
    }
  }
  return ThroughAgent
}

export default throughAgent
