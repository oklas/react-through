import React, { Children } from 'react'
import PropTypes from 'prop-types'

const throughAgent = (area) => (AgentComponent) => {
  class ThroughAgent extends React.Component {
    static contextTypes = {
      through: PropTypes.object,
    }

    constructor(props, context) {
      super(props, context)
      this.data = {}
    }

    componentWillMount = () => {
      this.update(this.data)
    }

    componentWillUnmount = () => {
      this.update({})
    }

    item = (elem) => {
      const data = (!elem || !elem.props.to) ?
        {} : { [elem.props.to]: elem.props }
      this.update(data)
    }

    items = (elem) => {
      const data = {}
      React.Children.forEach(elem.props.children, function(elem) {
        if(!elem || !elem.props.to) { return }
        data[elem.props.to] = elem.props
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
