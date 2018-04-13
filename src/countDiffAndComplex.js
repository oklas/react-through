function countDiffAndComplex(prevProps, props) {
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

export default countDiffAndComplex