import React, { Children } from 'react'
import PropTypes from 'prop-types'


export default class ThroughProvider extends React.Component {
  static childContextTypes = {
    through: PropTypes.object.isRequired,
  }

  static propTypes = {
    shouldBreadcrumbsUpdate: PropTypes.func,
    children: PropTypes.element,
  }

  constructor(props) {
    super(props)
    this.areas = {}
  }

  getChildContext() {
    return {
      through: {
        install: this.install,
        remove: this.remove,
        subscribe: this.subscribe,
      }
    }
  }

  area = (area) => {
    if( !this.areas.hasOwnProperty(area) ) {
      this.areas[area] = {
        name: area,
        listeners: [],
        data: {},
      }
    }
    return this.areas[area]
  }

  notify = (area, syncUpdate) => {
    area = this.area(area)

    area.listeners.forEach(
      listener => listener(area.data, syncUpdate)
    )
  }

  subscribe = ( area, listener ) => {
    area = this.area(area)

    area.listeners.push(listener)
    listener(area.data)

    return () => {
      area.listeners = area.listeners.filter(
        item => item !== listener
      )
    }
  }

  _diffAndComplicatedCounts(prevProps, props) {
    const keys = Object.keys(prevProps).concat(Object.keys(props))
    // reflect types in the documentation if changed
    const quicks = [ 'string', 'number', 'undefined', 'boolean', 'symbol' ]
    const [diff, comp] = keys.reduce( (stat,k) => {
      return [
        stat[0] + (prevProps[k] !== props[k] ? 1 : 0),
        stat[1] + (!quicks.includes(typeof(props[k])) ? 1 : 0)
      ]
    }, [0, 0])
    return [diff, comp]
  }

  checkArgs(area, key, props) {
    if (process.env.NODE_ENV !== 'production') {
      if(
        !( typeof area === 'string' || area instanceof String ) ||
        !( typeof key === 'string' || key instanceof String ) ||
        !( props instanceof Object && !(props instanceof Array) )
      ) {
        throw new Error(
          "type error: through.[install|remove](area:string, key:string, props:Object)"
        )
      }
    }
  }

  install = (area, key, props, syncUpdate = undefined) => {
    this.checkArgs(area, key, props)
    area = this.area(area)

    const prevProps = area.data[key] || {}

    if( this.props.shouldBreadcrumbsUpdate ) {
      const diff = this.props.shouldBreadcrumbsUpdate(prevProps, props)

      if( !diff ) return

      syncUpdate = true
    } else {
      const [diff, comp] = this._diffAndComplicatedCounts(prevProps, props)

      if( !diff ) return

      if( undefined === syncUpdate ) {
        syncUpdate = !comp
      }
    }

    const data = Object.assign({}, area.data)
    data[key] = {...props}
    area.data = data
    this.notify(area.name, syncUpdate)
  }

  remove = (area, key, syncUpdate = undefined) => {
    this.checkArgs(area, key, {})
    area = this.area(area)

    if( area.data.hasOwnProperty(key) ) {
      const data = Object.assign({}, area.data)
      delete data[key]
      area.data = data
      this.notify(area.name, true)
    }
  }
  render() {
    return React.Children.only(this.props.children)
  }
}