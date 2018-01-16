import React from 'react'
import PropTypes from 'prop-types'

const MAX_DATA_NUM = 1000000

class Through extends React.Component {
  static contextTypes = {
    through: PropTypes.object,
  }

  static propTypes = {
    area: PropTypes.string.isRequired,
    direct: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    bearingKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    default: PropTypes.any,
    defaultValue: PropTypes.any,
    map: PropTypes.func,
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
    this.updateArea(this.props.area)
    this.canSetState = true
    if(this.state.dataNum != this.dataNum) {
        this.doUpdate(this.data, true)
    }
  }

  componentWillUnmount() {
    this.updateArea(undefined)
    this.canSetState = false
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.area !== nextProps.area)
      this.updateArea(nextProps.area)
  }

  updateArea(area) {
    if(this.unsubscribe)
      this.unsubscribe()
    if(area)
      this.unsubscribe = this.context.through.subscribe(area, this.doUpdate)
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
    const {
      direct,
      bearingKey,
      default: defval,
      defaultValue,
      map = a=>a,
    } = this.props

    const key = bearingKey ?
      bearingKey :
      direct===true ? 'default' : direct

    const data = key ? this.data[key] : this.data

    return this.props.children(data ? map(data) : defaultValue || defval)
  }
}

export default Through