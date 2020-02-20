---
id: through-container
title: throughContainer
sidebar_label: throughContainer
hide_title: true
---

# `throughContainer(areaName)`

High Order Component merge the whole area to the wrapped component props
as single item named with name of area.

Advanced container is usable for cases where more than one area is required
or container itself is rendered with additional props which may overlap
props from agent.

Whole `through area` is mapped to prop with name of correspondent `through
area`. Higher-order components creator function `throughContainer` is used
for that like this:

```js
import {throughContainer} from 'react-through'

const areaName = 'myAreaName'
const bearingPropName = 'id'

const MyContainer = (props) => {
  const agentProps = props[areaName][bearingPropName]

  return (
    <div>
      {agentProps.value}
    </div>
  )
}


export default throughContainer(areaName)(MyContainer)
```