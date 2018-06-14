import React from 'react'
import PropTypes from 'prop-types'

console.error(`
Please notice that errors in the console can currently mean
that error testing is running. This may not mean that there
are actually errors take place.
`)

class ErrorBoundary extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true })
  }

  render() {
    if (this.state.hasError) {
      return <u>error</u>
    }
    return this.props.children
  }
}

export default ErrorBoundary