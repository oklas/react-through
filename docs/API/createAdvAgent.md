---
id: create-adv-agent
title: createAdvAgent
sidebar_label: createAdvAgent
hide_title: true
---

# `createAdvAgent(areaName, bearingPropOrBuilder)`

This factory function is identical to `createAgent()` the difference is
in the processing of anonimous instances of objects created inplace on
the react render stage

## The problem

When we create variables in component like this:

```js 
const Component = props = {
  const element = <div/>
  const array = []
  const object = {}
  const function = ()=>()
  const string = ""
  return (
    <Agent {...{element, array, object, function, string}} />
  )
}
```

All the variables: `element`, `array`, `object`, `function`, (but not a `string`)
contains new unique instance of appropriate entity each time when the component is
rendered. So once a new instance is receiving that cause new rerender which becom
indefinite process.

This case appears only for case when through-container has through-agent as one of
its children or some of subchildren at any depths.

Strings actually also represent itself new instance but different from point of
comparision. React state and delarative aprroach at all typicaly based on shallow
compare to figure out state changes to initiate update process. Two different
objects (and so on) are not equal `{} !== {}` even has identical content,
but string `'' == ''` are equal. So components with string props created inplace
in render stage has not this problem.

# The rule of two conditions

In all the case `createAdvAgent()` is preferable due to it is more efficient,
except when this rule satisfied:

The function `createAgent()` must be used instead of `createAdvAgent()`
when match both of this conditions:

* one or more of agent props contains new instance created each render without condition 
* through-container uses same area as the one of its child through-agents

## Example

```js
const Agent = createAgent('myarea', 'id')
const AdvAgent = createAdvAgent('myarea', 'id')

const memoized = React.useMemo({}, [])

<div>
  <Through area='myarea'>
    {(area) => {
      <div>

        worked: due to not advanced agent is used
        <Agent area='myarea' data={[]} />

        bad: due to same area as parent container
        <AdvAgent area='myarea' data={[]} />

        good: because there is no props with new instance
        <AdvAgent area='myarea' data='' />

        good: because memoized value is used
        <AdvAgent area='myarea' data={memoized} />
      </div>
    }
  </Through>

  good: because this is not (sub)children of container with same area 
  <AdvAgent area='myarea' data={[]} />

</div>
```
