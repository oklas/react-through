import React, { Children } from 'react'
import PropTypes from 'prop-types'
import hasDiff from './hasDiff'
import hasComplex from './hasComplex'

export default class ThroughProvider extends React.Component {
  static childContextTypes = {
    through: PropTypes.object.isRequired,
  }

  static propTypes = {
    children: PropTypes.element,
  }

  constructor(props) {
    super(props)
    this.areas = {}
  }

  getChildContext() {
    return {
      through: {
        update: this.update,
        add: this.add,
        remove: this.remove,
        subscribe: this.subscribe,
      }
    }
  }

  area = (area) => {
    if( !Object.prototype.hasOwnProperty.call(this.areas, area) ) {
      this.areas[area] = {
        name: area,
        listeners: [],
        counters: {},
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

  checkArgs(area, key, props) {
    if (process.env.NODE_ENV !== 'production') {
      if(
        !( typeof area === 'string' || area instanceof String ) ||
        !( typeof key === 'string' || key instanceof String ) ||
        !( props instanceof Object &&
          !(props instanceof Array) &&
          !(props instanceof Function)
        )
      ) {
        throw new Error(
          "react-through: type error: " +
          "through.[add|update|remove](area:string, key:string, props:Object)"
        )
      }
    }
  }

  update = (area, key, props, syncUpdate = undefined) => {
    this.checkArgs(area, key, props)
    area = this.area(area)

    if (process.env.NODE_ENV !== 'production') {
      if( !area.counters[key] ) {
        throw new Error("react-through: bearing key must be added before update")
      }
    }

    const prevProps = area.data[key] || {}

    if( !hasDiff(prevProps, props) ) return

    if( undefined === syncUpdate ) {
      syncUpdate = !hasComplex(props)
    }

    const data = Object.assign({}, area.data)
    data[key] = {...props}
    area.data = data
    this.notify(area.name, syncUpdate)
  }

  add = (area, key) => {
    this.checkArgs(area, key, {})
    area = this.area(area)
    area.counters[key] = area.counters[key] ? area.counters[key] + 1 : 1

    if (process.env.NODE_ENV !== 'production') {
      if( 2 < area.counters[key] ) {
        throw new Error(
          "react-through: bearing key adding must be not more 2, call remove()"
        )
      }
    }
  }

  remove = (area, key) => {
    this.checkArgs(area, key, {})
    area = this.area(area)
    let count = area.counters[key]
    count = count ? count - 1 : 0
    area.counters[key] = count

    if( !count && Object.prototype.hasOwnProperty.call(area.data, key) ) {
      const data = Object.assign({}, area.data)
      delete area.counters[key]
      delete data[key]
      area.data = data
      this.notify(area.name, true)
    }
  }

  render() {
    return React.Children.only(this.props.children)
  }
}
