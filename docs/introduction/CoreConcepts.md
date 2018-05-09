# Core Concepts

The core concepts is simple and base idea is to use new type of react component
— agent component. The **agent** is an intermediator which maps its props
through react tree to another component which receive that props and renders
content based on received props.

So recever component is `through-container` in and sender is a `through-agent`.
Both of them may be anywhere in react tree:


```js
  const Header = () => (
    Your ballance: <Indicator/> USD
  )

  const Content = () => (
    <IndicatorAgent balance="1000" />
  )

  <App>
    <Header />
    <Content />
  </App>
```
