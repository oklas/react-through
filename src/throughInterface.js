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
            install: (key, props, syncUpdate = undefined) => {
              this.context.through.install(area, key, props, syncUpdate)
            },
            remove: (key, syncUpdate = undefined) => {
              this.context.through.remove(area, key, syncUpdate)
            },
          } } }
       />
      )
    }
  }

  return ThroughInterface
}

export default throughInterface
