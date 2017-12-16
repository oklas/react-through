# react-through

[![Npm package](https://img.shields.io/npm/v/react-through.svg?style=flat)](https://npmjs.com/package/react-through)

***

**Declarative data transfer through react tree -
extremal flexible and effective way to communicate between components.**

This library provides tools to map props directly from one component to another.
Source component may be specified in one place of react tree and destination
component which receives that props in another place of react tree.

This allows to create `agent` component (or set of agents) which maps some of
its props to named area and also allows to create `container` (or set of
containers) of that area from which that props are received.

And then all what you need is just to instantiate one or more created
`through-container` in one place(s) and specify some props for it in one or more
`through-agent` in another place(s) of react tree.

# Synopsis

``` javascript
  <App>
    <Header>
      Your ballance: <IndicatorContainer/> USD
    </Header>

    <Content>
      <IndicatorAgent ballance=1000 />
    </Content>
  </App>
```


# Installation

``` sh
npm install --save react-through

```


# Base configuration

Add a `<ThroughProvider/>` component to the root of your React component
tree like you do it for `react-redux` or `react-router`.
In the react tree the `ThroughProvider` component must be parent of all
components of this library with any deeps of nesting.

``` javascript
import {ThroughProvider} from 'react-through'

const theApp = (
  <ThroughProvider>
    <App />
  </ThroughProvider>
)

ReactDOM.render(theApp, document.getElementById('root'))
```

# Container

The `container` receives data from anywhere through react tree. The source of
data is one or more agents. Data from each agent is placed under bearing key
associated with correspondent agent.

For example if area name is `indicator` and bearing key name of agent is `balance`
the component may be created like this:

``` javascript
import {throughContainer} from 'react-through'

const IndicatorContainer = (props) => (
  const bearingKey = 'default'
  const data = props.indicator[bearingKey]
  return (
    <div>
      {data.balance}
    </div>
  )
}

export default throughContainer('indicator')(IndicatorContainer)
```

# Agent

The agent maps its props to `container` associated with same named area. One or
more agents may be instatiated in any place of react tree. Agent requires a
bearing key to differentiate its data from another agent associated with same
area. Bearing key is stored in agent prop which name specified at agent
declaration. Instead of name the function may be specified. Bearing key
is result of that function called with agent props as param. If not function
nor name is specified than bearing key will be always 'default' which
means that only one agent may be instantiated fot that area.

The simplest way to create agent is to use agent factory function:

``` javascript
import {throughAgentFactory} from 'react-through'

const IndicatorAgent = throughAgentFactory('indicator', 'balance')
// or
const IndicatorAgent = throughAgentFactory('indicator', props => props.balance)
// or for single agent with bearingKey='default'
const IndicatorAgent = throughAgentFactory('indicator')

<IndicatorAgent />
```

# Advanced Agent

There are possible some reasons requiring additional behaviour of agent
component that is default agent appears to be too simple. Also agent may be so
advanced that represent itself a multiple agents. The function `throughAgent`
integrate into component the `item()` and `items()` functions which accept
one item or list of items in declarative manner. The item may be any react
component, only its props is significant. This library exports `Item` and
`Dummy` stub components for that.


``` javascript
import {throughAgent} from 'react-through'

class MyAdvancedAgent extends React.Component {
    static propTypes = {
      areaAdvanced: PropTypes.object,
    }

    componentWillMount() {
      this.configureItems(this.props)
    }

    componentWillReceiveProps(nextProps) {
      // check this.props and nextProps differences here
      // differences = ...
      if( differences ) {
        this.configureItems(nextProps)
      }
    }

    configureItems = (props) => {
      props.areaAdvanced.item(
        <Item {...props} />
      )
      // or
      props.areaAdvanced.items(
        <div>
          <Item bearingKey='first' {...props.first} />
          <Item bearingKey='second' {...props.second} />
        </div>
      )
    }

    render() {
      return null
      // or
      return (
        <div> something here </div>
      )
    }
  }

export default throughAgent('areaAdvanced', 'bearingKey')(MyAdvancedAgent)
// or
export default throughAgent('areaAdvanced', props => props.bearingKey)(MyAdvancedAgent)
```

# Known usage

* [react-breadcrumbs-dynamic](https://github.com/oklas/react-breadcrumbs-dynamic)


## LICENSE

#### [MIT](./LICENSE.md)
