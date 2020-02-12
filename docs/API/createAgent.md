---
id: create-agent
title: createAgent
sidebar_label: createAgent
hide_title: true
---

# `createAgent(areaName, bearingPropOrBuilder)`

Factory function creates the agent component

## Params

* `areaName`: *String*: Name of the area
* `bearingPropOrBuilder`: *String|function|undefined*: Name of the prop which contain string which identify the agent or bearing builder function

## Examples

There multiple agent possible to render in different places of react within same through area.
Each agent must have unique identifier - a bearing key which may be holded is some prop.
In this example we hold bearing key in prop `id`:

```
const Agent = createAgent('myarea', 'id')

...
<Agent id='first' text='hello'/>
<Agent id='second' text='world'/>
...
```

In some cases one prop is not enough flexible to unique identify agent within the area.
For such case bearing builder function is specifing instead of name of prop:

```
const Agent = createAgent(
  'myarea',
  ({category, id}) => `${category}-${id}`
)

...
<Agent category='product' id='125' title='Product'/>
...
```

For such case container may enumerate all the area items:


```js
<Through area='myarea'>
  {area => {
    Object.keys(area).map(key => (
      <ul>
        <li> {area[key].title} </li>
        <li> {area[key].category} </li>
        <li> {area[key].id} </li>
      </ul>
    ))
  }
</Through>
```

## Notice

The `createAgent()` is appropriate for more simple usage and prform additional checking.
For better performance consider to use advanced
version: [createAdvAgent()](../API/createAdvAgent.md)

