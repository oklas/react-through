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
        update: this.update,
        add: this.add,
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

    if( !count && area.data.hasOwnProperty(key) ) {
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
