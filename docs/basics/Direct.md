# Direct Mapping

Make sure that you read about `through area` and `through containers`
and `through agents` in
[core concepts](../introduction/CoreConcepts.md)
before read this.

Direct mapping is the simplest use. The `direct` means that all props of
your agent are directly mapped to destination associated container.

For example let's suppose the area name is an `indicator`. Then the
through container may be created with `throughDirect` like this:

```js
import {throughDirect} from 'react-through'

const Indicator = (props) => (
  <div>
    {props.balance}
  </div>
)

export default throughDirect('indicator')(Indicator)
```

this ballance indicator may be rendered at application top bar:

```js
const  TopBar = (props) => (
  <div>
    Balance <Indicator /> USD
  </div>
)
```

But data is actually mapped from place where our indicator agent
is rendered.

The simplest way to create agent just call agent factory function
with same through area name like this:

```js
import {createAgent} from 'react-through'

const IndicatorAgent = createAgent('indicator')

```

Now rendering `IndicatorAgent` at any place of the react tree maps
balance declaratively to indicator container:

```js
  <IndicatorAgent balance="1000" />
```

Only one such direct agent can be rendered in the through area. But any
number of through containers can be created for the same area.

To get multiple agents for the same area, you need to organize a way
how to differentiate agents from each other. Read about that in the next
section.

Agent itself renders nothing but you can wrap it in component or you
can create advanced agents described in advanced section.

Second argument of `throughDirect` function may be *the name of bearing
prop* or *the bearing key builder function* which is described in the next
sections.