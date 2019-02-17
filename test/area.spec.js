import React from 'react'
import PropTypes from 'prop-types'
import Adapter from 'enzyme-adapter-react-16'
import enzyme, { shallow, mount, render } from 'enzyme'
import { expect } from 'chai'

import {
  ThroughProvider,
  throughArea,
  throughContainer,
  createAgent,
  createAdvAgent,
} from '../src'

import spec from './base.spec-set'

enzyme.configure({ adapter: new Adapter() })
jest.dontMock('../src')


const TestComponent = ({b,i,u}) => (
  <div>
    { b && <b>{b.value}</b> }
    { i && <i>{i.value}</i> }
    { u && u.children }
  </div>
)

const TestContainer = throughArea('test_area')(TestComponent)

function createTestApp(agentFactoryFunction) {
  const TestAgent = agentFactoryFunction(new String('test_area'), 'id' )
  const TestAgentB = agentFactoryFunction('test_area', props => 'b')

  const TestApp = ({value, show_b, show_i, show_u}) => (
    <ThroughProvider>
      <main>
        <header>
          <TestContainer />
        </header>
        <article>
          { show_b &&
            <TestAgentB value={1 + value} />
          }
          { show_i &&
            <TestAgent id='i' value={2 + value} />
          }
          { show_u &&
            <TestAgent id='u'>
              <u>{3 + value}</u>
            </TestAgent>
          }
        </article>
      </main>
    </ThroughProvider>
  )

  return TestApp
}


describe('area with createAgent - base spec-set', function() {
  const TestApp = createTestApp(createAgent)
  spec(TestApp, true)
})

describe('area with createAdvAgent - base spec-set', function() {
  const TestApp = createTestApp(createAdvAgent)
  spec(TestApp, false)
})

describe('area - specific specs', function() {
  it("does not crash with unknown area", function() {
    const TestContainer = throughArea('not-exists')(TestComponent)
    const wrapper = mount(
      <ThroughProvider>
        <TestContainer />
      </ThroughProvider>
    )
    wrapper.unmount()
  })
})

describe('throughContainer - specific specs', function() {
  it("does not crash with unknown area", function() {
    const TestContainer = throughContainer('test_area')(TestComponent)
    const wrapper = mount(
      <ThroughProvider>
        <TestContainer />
      </ThroughProvider>
    )
    wrapper.unmount()
  })
})

const useFakeTimers = jest.useFakeTimers
const runAllTimers = jest.runAllTimers

describe('area with createAdvAgent - specific specs', function() {

  it("it does not transfer until timers is not done", function() {
    useFakeTimers()
    const TestApp = createTestApp(createAgent)
    const wrapper = mount(<TestApp value={10}/>)

    expect(wrapper.find('header').find('u')).to.have.length(0)

    wrapper.setProps({show_u: true})
    wrapper.update()

    expect(wrapper.find('header').find('u')).to.have.length(0)

    runAllTimers()
    wrapper.update()

    expect(wrapper.find('header').find('u')).to.have.length(1)
    expect(wrapper.find('header').find('u').at(0).props().children).to.equal(13)

    wrapper.setProps({show_u: false})
    wrapper.update()

    expect(wrapper.find('header').find('u')).to.have.length(0)
    wrapper.unmount()
  })
})
