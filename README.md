# react-through

## Declarative data mapping through react tree

**Extremal flexible and effective way to communicate between components.**

This library provides tools to map props directly from one component to another.
Source component may be specified in one place of react tree and destination
component which receives that props in another place of react tree.

This allows to create `agent` component (or set of agents) which maps some of
its props to named area and also allows to create `container` (or set of
containers) of that area from which that props are received.

And then all what you need is just to instantiate one or more created
`through-container` in one place(s) and specify some props for it in one or more
`through-agent` in another place(s) of react tree.

[![Npm package](https://img.shields.io/npm/v/react-through.svg?style=flat)](https://npmjs.com/package/react-through)
[![Npm downloads](https://img.shields.io/npm/dm/react-through.svg?style=flat)](https://npmjs.com/package/react-through)
[![Travis build status](http://img.shields.io/travis/oklas/react-through.svg?style=flat)](https://travis-ci.org/oklas/react-through)
[![Test Coverage](https://img.shields.io/codecov/c/github/oklas/react-through.svg)](https://codecov.io/gh/oklas/react-through)
[![Dependency Status](https://david-dm.org/oklas/react-through.svg)](https://david-dm.org/oklas/react-through)


***

Read the **[Documentation](https://react-through.js.org/basics/installation-and-setup)**

# Synopsis

``` javascript
  const Header = () => (
    Your ballance: <IndicatorContainer/> USD
  )

  const Content = () => (
    <IndicatorAgent balance=1000 />
  )

  <App>
    <Header />
    <Content />
  </App>
```


## LICENSE

#### [MIT](./LICENSE.md)
