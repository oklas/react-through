function hasComplex(props) {
  // reflect types in the documentation if changed
  const quicks = [ 'string', 'number', 'undefined', 'boolean', 'symbol' ]

  return !!Object
    .keys(props)
    .filter( function(key) {
      return Object.prototype.hasOwnProperty.call(props, key)
    })
    .map( function(key){ return props[key] } )
    .find( function(prop) {
      return !quicks.find( function(quickTypeName) {
        return typeof(prop) === quickTypeName
      })
    })
}

export default hasComplex