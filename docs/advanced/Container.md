# Advanced Container

Advanced container is usable for cases where more than one area is required
or container itself is rendered with additional props which may overlap
props from agent.

Whole `through area` is mapped to prop with name of correspondent `through
area`. Higher-order components creator function `throughContainer` is used
for that like this:

```js
import {throughContainer} from 'react-through'

const MyContainer = (props) => {
  const bearingPropName = 'id'

  const areaName = 'myAreaName'

  const agentProps = props[areaName][bearingPropName]

  return (
    <div>
      {agentProps.value}
    </div>
  )
}


export default throughContainer(myAreaName)(MyContainer)
```