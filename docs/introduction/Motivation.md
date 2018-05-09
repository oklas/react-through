# Motivation

When we create a react component first what we do is to declaratively define how
it looks like i.e. how it will be rendered. Our component may map its props or
some data only to that components of react tree which is rendered in it. If we
need pass data deeper to child or upper to parent component when it is not
directly available in our component we need to choose a way to communicate.

Possible and popular ways is:

* parent-child props forwarding chain
* event bus or pub/sub event system
* flux or redux like state management
* react context api or its new version
* many other which uses previous with combinations

These are good solutions and many of them are enough simple to use. (Except
forwarding chain which require to drag all things through react tree manually.)
Event bus or pub/sub system require to write handler functions and watch]
component mount state. Redux require write reducer and call a dispach()
function, and also it does not make sence to put data into main application
state just because that data need to be passed to another component. Most
simple is new react context api. However context api does not allows to
communicate from any component to any other component in tree but allows to
pass data from parent to some of children some where in tree, and also it
require to wrap child subtree of components with provider for each case.

This library is a way to achieve these capabilities as internally hidden and
represented as react components, higher-order components and auxiliary tools
that, as much as possible, simplify communication through the reaction tree.