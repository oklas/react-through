# Many Agents

It is possible to create many agents in any place of the react tree. The
only requirement is that each agent must be unique identified in its area.

Agent may be unique identified based on its props. The easiest way is define
some prop name (bearing prop) which contain unique idetifier (bearing key).

## Bearing key and prop

The `createAgent` function creates an agent component. It receives the through
area name as the first param. The second param can be *a name of bearing prop*
or *a bearing key builder function*.

When agent is created with a name of bearing prop at second param the second
param the unique value of agent will be taken from that prop:

```js
const Agent = createAgent('area', 'id')
```

When we render two agents with different key in property id:

```js
  <div>
    <Agent id='first' name='Master' />
    <Agent id='second' name='Slave' />
  </div>
```

then we receive all props from that agents of the area using `throughArea`
higher-order components creator function:

Then we receive all that props from all agents of the area using
`throughArea` higher-order components creator function:


```js
import {throughArea} from 'react-through'

const Container = ({first, second}) => (
  <ul>
    <li>Master name: {first.name}</li>
    <li>Slave name: {second.name}</li>
  </ul>
)

export default throughArea('indicator')(Container)
```

Note: function `throughArea` is used to map whole area instead of
`throughDirect` which is used to direct mapping agent props to container.


## Bearing key builder

The function `throughArea` accepts *the bearing key builder function* as a
second argument. The bearing key builder function accepts props of its agent
and must return value of bearing key.

It is possible to define the bearing key based on number of props or add
some constant value or math or any other. For example, to use bearing key
based on two props `x` and `y` the through agent can be created like this:

If the second argument is not specified the bearing key will be identity equal
to string value `default`. Default value is used by Direct mapping. See
API for details.

```js
const Agent = createAgent( 'area', ({x, y}) => x + '_' + y )
```
