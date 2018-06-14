import React from 'react'
import PropTypes from 'prop-types'
import Adapter from 'enzyme-adapter-react-16'
import enzyme, { shallow, mount, render } from 'enzyme'
import { expect } from 'chai'

import {
  ThroughProvider,
  throughDirect,
  throughContainer,
  createAdvAgent,
} from '../src'

enzyme.configure({ adapter: new Adapter() })
jest.dontMock('../src')

const TestOneComponent = ({handler}) => (
  <button onClick={() => handler && handler('ok')} />
)

const TestOneContainer = throughDirect('test_one')(TestOneComponent)

const TestOneAgent = createAdvAgent('test_one')

const TestOneApp = ({handler}) => (
  <ThroughProvider>
    <main>
      <header>
        <TestOneContainer />
      </header>
      <article>
        <TestOneAgent handler={handler} />
      </article>
    </main>
  </ThroughProvider>
)

describe('test pass function and call it back', function() {
  it("pass and call function", function() {
    let message = ''

    const first = msg => { message = 'first ' + msg }
    const second = msg => { message = 'second ' + msg }

    const wrapper = mount(<TestOneApp handler={first} />)

    wrapper.find('button').simulate('click')
    expect(message).to.equal('first ok')

    wrapper.setProps({handler: second})
    wrapper.update()

    wrapper.find('button').simulate('click')
    expect(message).to.equal('second ok')

    wrapper.unmount()
  })
})