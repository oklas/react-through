---
id: through-area
title: throughArea
sidebar_label: throughArea
hide_title: true
---

# `throughArea(areaName)`

High Order Component merge the whole area to the  wrapped component props

## Params

* `areaName`: *String*: Name of the selected area

## Examples

Let `Agent` is declared and two instance are rendered some where in react tree like this:

```
const Agent = createAdvAgent('myarea', 'id')

...
<Agent id='first' text='hello'/>
<Agent id='second' text='world'/>
...
```

Then we can render `hello world` using HOC `throughArea()` like this:

```js
const MyContainer = ({first,second}) => (
  <div>
    {first.text} {second.text}
  </div>
)

export default throughArea('myarea')(MyContainer)
```