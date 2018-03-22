import React from 'react'
import PropTypes from 'prop-types'
import Adapter from 'enzyme-adapter-react-16';
import enzyme, { shallow, mount, render } from 'enzyme'
import { expect } from 'chai'

import {
  ThroughProvider,
  throughContainer,
  throughAgentFactory,
} from '../src'

enzyme.configure({ adapter: new Adapter() });
jest.dontMock('../src')

export const testOneThroughContainer = throughContainer('test_one')

const TestOneContainer = testOneThroughContainer(
  props => (
    <b>{props.test_one.default && props.test_one.default.value}</b>
  )
)

const TestOneAgent = throughAgentFactory('test_one')

const TestOneApp = props => (
  <ThroughProvider>
    <main>
      <header>
        <TestOneContainer />
      </header>
      <article>
        <TestOneAgent value={2+props.value} />
      </article>
    </main>
  </ThroughProvider>
)


describe('test with one agent in default area', function() {
  it("transfer the data", function() {
    const wrapper = mount(<TestOneApp value={3}/>)

    expect(wrapper.find('header').find('b').at(0).props().children).to.equal(5)

    wrapper.unmount()
  })
})