import React from 'react'
import PropTypes from 'prop-types'

import { throughAgent, Item } from '../src'

const testThroughArea = 'test_area'
const testThroughAreaKeyProp = 'id'

class AdvancedAgent extends React.Component {
  static propTypes = {
    [testThroughArea]: PropTypes.object,
  }

  componentWillMount() {
    this.declareItems(this.props)
  }

  componentWillReceiveProps(nextProps) {
    const keys = Object.keys(nextProps).concat(Object.keys(this.props))
    const skip = [testThroughArea]
    const differences = keys.filter(
      k => (!skip.includes(k) && this.props[k] !== nextProps[k])
    ).length
    if( differences ) {
      this.declareItems(nextProps)
    }
  }

  declareItems = (props) => {
    const throughArea = props[testThroughArea]
    const {state} = this
    const {value, show_b, show_i, show_u} = props

    if( show_b && !show_i && !show_u ) return throughArea.item(
      <Item id='b' value={1 + value} />
    )

    if( !show_b && show_i && !show_u ) return throughArea.items(
      <section>
        <Item id='i' value={2 + value} />
      </section>
    )

    if( 0 === value ) return throughArea.item(null)

    if( !show_b && !show_i && !show_u ) return throughArea.items(
      null
    )

    return throughArea.items(
      <section>
        { show_b &&
          <Item id='b' value={1 + value} />
        }
        { show_i &&
          <Item id='i' value={2 + value} />
        }
        { show_u &&
          <Item id='u' value={3 + value} />
        }
      </section>
    )
  }

  render() {
    return null
  }
}

export default throughAgent(testThroughArea, testThroughAreaKeyProp)(AdvancedAgent)