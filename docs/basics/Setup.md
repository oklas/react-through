# Installation and Setup

## Installation

To install as dependency if you use `npm`

```sh
npm install --save react-through

```

or if you use `yarn`

```sh
yarn add react-through

```

## Base configuration

Communication center must be parent of all react elements which need
to be involved in communications. The communication center is implemented
in `ThroughProvider` component.

Add a `<ThroughProvider/>` component to the root of your React component
tree. In the react tree the `ThroughProvider` component must be parent of
all components of this library with any deeps of nesting.

``` javascript
import {ThroughProvider} from 'react-through'

const theApp = (
  <ThroughProvider>
    <App />
  </ThroughProvider>
)

ReactDOM.render(theApp, document.getElementById('root'))
```
