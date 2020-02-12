---
id: through-direct
title: throughDirect
sidebar_label: throughDirect
hide_title: true
---

# `throughDirect(areaName)`

High Order Component merge the props from default agent (when only one agent
in whole area is exists see [direct mapping](../basics/Direct.md))

## Params

* `areaName`: *String*: Name of the selected area

## Examples

Let `Agent` is declared and one default instance some where in react tree like this:

```
const Agent = createAdvAgent('myarea')

...
<Agent text='hello'/>
...
```

Then we can render `hello` using HOC `throughDirect()` like this:

```js
const MyContainer = ({text}) => (
  <div>
    {text}
  </div>
)

export default throughDirect('myarea')(MyContainer)
```