# Advanced Internal Agent Declarative Interface

This section shows low-level agent interface.
In most case [createAgent()](../createAgent.md) or
[createAdvAgent()](../createAdvAgent.md) is enough to solve all the tasks.
However in case to update through area data from external non-react
events that are not enough and may be achieved with this interface.

In particular, it allows:

* update the data intiated from independent event (not an component state change)
* agent may represent itself multiple agents
* agent may render some content at place wher it rendered

The second and third possibility may be achived by using more simple ways
described basic chapters by wrapping generic agents into components
of course. However this is another way which may be useful in some
different cases.

The function `throughAgent` integrate into component props property with
name of requred area. The property is an object wich contains the `item()`
and `items()` functions. These functions accept one item or list of items
in declarative manner. The item may be any react component, only its props
is significant. The library exports `Item` and `Dummy` stub components for
that.


``` javascript
import {throughAgent, Item} from 'react-through'

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
          <Item bearingProp='first' {...props.first} />
          <Item bearingProp='second' {...props.second} />
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

export default throughAgent('areaAdvanced', 'bearingPropName')(MyAdvancedAgent)
// or
export default throughAgent('areaAdvanced', props => props.bearingProp)(MyAdvancedAgent)
```

