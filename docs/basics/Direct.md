# Direct Mapping

Make sure that you read about `through area` and `through containers`
and `through agents` in
[core concepts](../introduction/CoreConcepts.md)
before read this.

Direct mapping is most simple usage. The `direct` means all props of your
agent is directly mapped to destination associated container.

For example let's suppose area name is `indicator`. Then through container
may be created with `throughDirect` like this:

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

Now render our `IndicatorAgent` at any place of react tree and declarative
communication is runing.

```js
  <IndicatorAgent balance="1000" />
```

Only one such direct agent may be rendered in through area. But any number
of through containers may be created for same area.

If you need multiple agents for same area it need to organize a way how to
differentiate agents from each other. Read about that in next chapter.

Agent itself renders nothing but you can wrap it in component or you can
create advanced agents described in advanced section.

Secong argument of function `throughDirect` may be name of bearing prop or
bearing key builder function which is described in next sections.