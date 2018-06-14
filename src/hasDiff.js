function hasDiff(prevProps, props) {
  const pkeys = Object.keys(prevProps)
  const nkeys = Object.keys(props)

  if (pkeys.length !== nkeys.length) return true

  return !!Array.prototype.find.call(nkeys, function(key){
    return prevProps[key] !== props[key]
  })
}

export default hasDiff
