import React from 'react'
import PropTypes from 'prop-types'


if(process.env.SKIP_THROWABLE) {
  console.error(`
  Environment variable SKIP_THROWABLE is enabled. Please notice
  that it reduces test coverage. This is just to check that
  nonthrowable tests do not throw. To check that trowable test
  do not do wrong throw need to do special research. Actually
  test result is test PASS state (with disabled SKIP_THROWABLE).
  `)
} else {
  console.error(`
  Please notice that errors in the console can currently mean
  that testing of error or exception throwing is running. This
  may not mean that there are actually errors take place. To
  disable such tests set SKIP_THROWABLE=1 environment variable.
  But notice that it will reduce test coverage. Actually test
  result is test PASS state (with disabled SKIP_THROWABLE).
  `)
}

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