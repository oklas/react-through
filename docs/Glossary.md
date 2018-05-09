# Glossary


## Through Communication Center

Mapping data is carried out through **communication center** which is placed
at the root of react tree. It is accessble via good old react conext like. And
pub/sub is used as direct data mapping. However that are fully internal
process and no need to know and work with that manually.


## Through Area

**Area** — is named space for some application `aspect` in which data is
mapped from set of `agents` located at any place in the react tree
and me be received by any amont of `through components`.


## Through Agent

**Agent** — is a new type of react component. Agent is an intermediator
component which maps its props (or some of them) through react tree to
another component which receive that props and render content based on received
props. Agent component may or may not render content in place where it rendered.


## Through Container

**Through container** — is the `container` that receives data from anywhere
through react tree. The source of data is one or more agents. Data from each
agent is placed under bearing key associated with correspondent agent.


## Bearing Key

**Bearing Key** — is uniquie string which allow to differentiate props from
each agents in choosen through area. In simple cases it is a value of some
of property of agent component. It is possible to provide builder function
which create a beraing key based on props of agent.


## Bearing Prop

**Bearing Prop** — is an agent property name which contain bearing key. It is
used in most simple cases where bearing key builder function is not provided.


## Bearing Key Builder

**Bearing Key Builder** — is an function which receive props of its agent and
return value of bearing key which used as uniquie identifier of agent.