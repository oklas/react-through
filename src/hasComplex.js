function hasComplex(props) {
  // reflect types in the documentation if changed
  const quicks = [ 'string', 'number', 'undefined', 'boolean', 'symbol' ]

  return !!Object
    .keys(props)
    .filter( function(key) {
      return Object.prototype.hasOwnProperty.call(props, key)
    })
    .map( function(key){ return props[key] } )
    .find( function(item) {
      return !quicks.includes(typeof(item))
    })
}

export default hasComplex