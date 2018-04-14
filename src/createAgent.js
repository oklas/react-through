import throughAgentFactory from './throughAgentFactory'

function createAgent(area, key) {
  return throughAgentFactory(area, key)
}

export default createAgent