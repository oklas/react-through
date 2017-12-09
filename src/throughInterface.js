import React, { Children } from 'react'
import PropTypes from 'prop-types'

export default throughInterface = (area) => (AgentComponent) => {
  const ThroughAgentInterfaceContainer = (props, context) => {
    return (
      <AgentComponent {...props} through={context.through} />
    )
  }
  return ThroughAgentInterfaceContainer
}

Provider.childContextTypes = {
  through: PropTypes.object.isRequired,
}