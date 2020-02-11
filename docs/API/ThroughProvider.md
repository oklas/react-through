---
id: through-provider
title: ThroughProvider
sidebar_label: ThroughProvider
hide_title: true
---

# `<ThroughProvider>`

This is communication center which must be the parent of all react elements

## Props

* `children`: *ReactElement*: Whole react tree of the applcation

## Examples

```js
const theApp = (
  <ThroughProvider>
    <App />
  </ThroughProvider>
)

ReactDOM.render(theApp, document.getElementById('root'))
```