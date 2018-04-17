# Many Agents

It is possible to create many agenents in any place of react tree. The only
requirement is that each agent must be uniquie identified in its area.

Agent may be uniquie identified based on its props. The simplest way is define
some prop name (bearing prop) which contain uniquie idetifier (bearing key).

## Bearing key and prop

The `createAgent` which create agent component receive a through area as first
param. The second param may be name of bearing prop or beraing key builder
function.

When agent is created with a name of bering prop at second param the uniquie
value of agent will be taken from that prop:

```js
const Agent = createAgent('area', 'id')
```

Now if we render two agent with different key in prop `id`:

```js
  <div>
    <Agent id='first' name='Master' />
    <Agent id='second' name='Slave' />
  </div>
```

Then we can receive all that props from all agents of the area using
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

Note: another function `throughArea` is used to whole map area (instead
of `throughDirect` which used to direct mapping of agent props to container.


## Bearing key builder

The function `throughArea` accepts bearing key builder function. The bearing
key builder function acceps props of its agent and must return value of bearing
key. If second argument is not specified then bearing key will be identity
equal string value `default`. Default valu is used by Direct mapping.

It is possible to define bearing key based on number of props or add some
constant value or math or any other. For example to use bearing key based on
two props `x` and `y` the through agent may be created like this:

```js
const Agent = createAgent( 'area', ({x, y}) => x + '_' + y )
```
