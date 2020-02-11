---
id: create-adv-agent
title: createAdvAgent
sidebar_label: createAdvAgent
hide_title: true
---

# `createAdvAgent(areaName, bearingPropOrBuilder)`

This factory function is identical to `createAgent()` the difference is in the processing of anonimous instances of objects created inplace on the react render stage.

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

All the variables: `element`, `array`, `object`, `function`, (but not string) contains
new unique instance of appropriate entity each time when the component is rendered. So
once a new instance is receiving that cause new rerender which becom indefinite process.

This case appears only for case when through-container has through-agent as one of its
children or some of subchildren at any depths.

# The two rules

In all the case `createAdvAgent()` is preferable due to it is more efficient.
Except when one or both of the rules are satisfy.

The function `createAgent()` must be used instead of `createAdvAgent()` when
one of

* one or more of agent prop contain new instance created each render without condition 
* through-container uses same area as the one of its children through-agents

## Example

```js
const Agent = createAgent('myarea', 'id')
const AdvAgent = createAdvAgent('myarea', 'id')

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
      </div>
    }
  </Through>

  good: because advanced agent is not this is not one of (sub)children
  <AdvAgent area='myarea' data={[]} />

</div>
```
