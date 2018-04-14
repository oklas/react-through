import throughAgentFactory from './throughAgentFactory'

function createAdvAgent(area, key) {
  return throughAgentFactory(area, key, true)
}

export default createAdvAgent