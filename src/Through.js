import React, { Children } from 'react'
import PropTypes from 'prop-types'

const MAX_DATA_NUM = 1000000

const throughContainer = (area) => (ThroughComponent) => {
  class ThroughContainer extends React.Component {
    static contextTypes = {
      through: PropTypes.object,
    }

    constructor(props, context) {
      super(props, context)
      this.state = {
        dataNum: MAX_DATA_NUM
      }
      this.dataNum = MAX_DATA_NUM
      this.data = {}
      this.timer = undefined
      this.mounted = false
      this.canSetState = false
   }

    componentDidMount() {
      this.unsubscribe = this.context.through.subscribe(area, this.doUpdate)
      this.canSetState = true
      if(this.state.dataNum != this.dataNum) {
         this.doUpdate(this.data, true)
      }
    }

    componentWillUnmount() {
      this.unsubscribe()
      this.canSetState = false
    }

    doUpdate = (data, syncUpdate) => {
      this.data = data
      ++this.dataNum
      if( !this.timer && this.dataNum > MAX_DATA_NUM ) {
        this.dataNum = 0
      }

      if( syncUpdate ) {
        if(this.canSetState) {
          this.setState({dataNum: this.dataNum})
        }
        return
      }

      if( !this.timer ) {
        this.timer = setTimeout(() => {
          if(this.canSetState) {
            this.setState({dataNum: this.dataNum})
          }
          this.timer = undefined
        }, 0)
      }
    }

    render() {
      return (
        <ThroughComponent {...this.props} {...{[area]: this.data}} />
      )
    }
  }

  return ThroughContainer
}

export default throughContainer
