import React, { Children } from 'react'
import PropTypes from 'prop-types'

const throughInterface = (area) => (AgentComponent) => {
  class ThroughInterface extends React.Component {
    static contextTypes = {
      through: PropTypes.object,
    }

    render() {
      return (
        <AgentComponent {...this.props}
          { ...{[area]: {
            update: (key, props, syncUpdate = undefined) => {
              this.context.through.update(area, key, props, syncUpdate)
            },
            add: (key) => {
              this.context.through.add(area, key)
            },
            remove: (key) => {
              this.context.through.remove(area, key)
            },
          } } }
       />
      )
    }
  }

  return ThroughInterface
}

export default throughInterface
