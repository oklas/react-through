import React from 'react'
import enzyme, { shallow, mount, render } from 'enzyme'
import { expect } from 'chai'

import {
  ThroughProvider,
  throughContainer,
  throughAgent,
  throughAgentFactory,
  Dummy,
  Item,
} from '../src'

import {createThroughAgentClass} from '../src/throughAgentFactory'

describe('dummy components', function() {
  it("`Dummy` return null", function() {
    expect(Dummy()).to.be.null
  })
  it("`Item` return null", function() {
    expect(Item()).to.be.null
  })
})

describe('ThroughProvider params checking', function() {
  it("throw for function", function() {
    expect(() => { ThroughProvider.prototype.checkArgs(()=>1) }).to.throw()
    expect(() => { ThroughProvider.prototype.checkArgs('', ()=>1) }).to.throw()
  })
  it("throw for array", function() {
    expect(() => { ThroughProvider.prototype.checkArgs([]) }).to.throw()
    expect(() => { ThroughProvider.prototype.checkArgs('', []) }).to.throw()
  })
  it("throw for object", function() {
    expect(() => { ThroughProvider.prototype.checkArgs({}) }).to.throw()
    expect(() => { ThroughProvider.prototype.checkArgs('', {}) }).to.throw()
  })
  it("throw for props non object", function() {
    expect(() => { ThroughProvider.prototype.checkArgs('', '', ()=>1) }).to.throw()
    expect(() => { ThroughProvider.prototype.checkArgs('', '', []) }).to.throw()
    expect(() => { ThroughProvider.prototype.checkArgs('', '', '') }).to.throw()
    expect(() => { ThroughProvider.prototype.checkArgs('', '', 1) }).to.throw()
  })
})

describe('throughAgent params checking', function() {
  it("throw for function", function() {
    expect(() => { throughAgent(()=>1)(Dummy) }).to.throw()
  })
  it("throw for array", function() {
    expect(() => { throughAgent([])(Dummy) }).to.throw()
    expect(() => { throughAgent('', [])(Dummy) }).to.throw()
  })
  it("throw for object", function() {
    expect(() => { throughAgent({})(Dummy) }).to.throw()
    expect(() => { throughAgent('', {})(Dummy) }).to.throw()
  })
})

describe('throughAgentFactory params checking', function() {
  it("throw for function", function() {
    expect(() => { throughAgentFactory(()=>1)(Dummy) }).to.throw()
  })
  it("throw for arrays", function() {
    expect(() => { throughAgentFactory([])(Dummy) }).to.throw()
  })
  it("throw for object", function() {
    expect(() => { throughAgentFactory({})(Dummy) }).to.throw()
  })
})

describe('ThroughAgent class', function() {
  it("derived state for same values", function() {
    const ThroughAgent = createThroughAgentClass({})
    const state = ThroughAgent.getDerivedStateFromProps({}, {props: {}})
    expect(state).to.be.null
  })
})
