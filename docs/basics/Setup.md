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

Communication center must be the parent of all react elements which need
to be involved in communications. The communication center is implemented
in `ThroughProvider` component.

Add the `<ThroughProvider/>` component to the root of your React component
tree. In the react tree the `ThroughProvider` component must be the parent
of all components of this library with any deeps of nesting.

```javascript
import {ThroughProvider} from 'react-through'

const theApp = (
  <ThroughProvider>
    <App />
  </ThroughProvider>
)

ReactDOM.render(theApp, document.getElementById('root'))
```

## Individual imports

This library is very small but if you want to make your bundle as small
as possible you can import each thing of this library individually rather
than the entire library. Use individual imports for each export of this
library, for example:

```javascript
import ThroughProvider from 'react-through/lib/ThroughProvider'
```

instead of:

```javascript
import {ThroughProvider} from 'react-through'
```

for each this library exports.