import React from 'react'
import PropTypes from 'prop-types'
import Adapter from 'enzyme-adapter-react-16'
import enzyme, { shallow, mount, render } from 'enzyme'
import { expect } from 'chai'

import {
  propsFromProp,
} from '../src'

enzyme.configure({ adapter: new Adapter() })
jest.dontMock('../src')

const TestContainer = props => (
  <main>
    <b>{props.base_prop}</b>
    <i>{props.internal_prop}</i>
  </main>
)

const WrappedTestContainer = propsFromProp('internal')(TestContainer)

describe('test props from prop', function() {
  it("base and internal prop it on top", function() {
    const wrapper = mount(
      <WrappedTestContainer
        base_prop='the-base'
        internal={{internal_prop: 'the-internal'}}
      />
    )

    expect(wrapper.find('b').at(0).props().children).to.equal('the-base')
    expect(wrapper.find('i').at(0).props().children).to.equal('the-internal')

    wrapper.unmount()
  })
})