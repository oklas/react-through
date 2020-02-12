---
id: through
title: Through
sidebar_label: Through
hide_title: true
---

# `<Through>`

Render Props based component to receive data in the though-container. It pass props received from the through-agent to a function. The Function as Child Compnent (FaCC) approach is used.

Props from selected agent or whole area if bearingKey (or direct) prop is not specified.


## Props

* `area`: *String*: The name of the area see [Glossary](../Glossary.md)
* `bearingKey`: *String|undefined*: define which agent data is selected, or whole area data if undefined
* `direct`: *String|bool|undefined*: same as `bearingKey` but also `boolean` is allowed and `true` is replaced with `default` for [direct mapping](../basics/Direct.md)
* `default`|`defaultValue`: *any*: default value passed to the render function if no such agent exists or in initial rendering
* `children`: *function(props|area: Object)*: props from agent selected by `bearingKey` or `direct` or whole area if not specified

## Examples

Let `Agent` is declared and two instanece of it are rendered some where in react tree like this:


```
const Agent = createAdvAgent('myarea', 'id')

...
<Agent id='first' text='hello'/>
<Agent id='second' text='world'/>
...
```

### Render data from each agent separtely

```js
<Through area='myarea' direct='first' default={{text: 'loading...'}}>
  { ({id, text}) => <p>{text}</p> }
</Through>
<Through area='myarea' direct='second' default={{text: 'loading...'}}>
  { ({id, text}) => <p>{text}</p> }
</Through>
```

### Render data using whole area

```js
<Through area='myarea'>
  {(area) => {
    <div>
      { ( area['first'] || {text: 'loading...'} ).text }
      { ( area['second'] || {text: 'loading...'} ).text }
    </div>
  }
</Through>
```
