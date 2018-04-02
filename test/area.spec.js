import React from 'react'
import PropTypes from 'prop-types'
import Adapter from 'enzyme-adapter-react-16';
import enzyme, { shallow, mount, render } from 'enzyme'
import { expect } from 'chai'

import {
  ThroughProvider,
  throughArea,
  throughContainer,
  throughAgentFactory,
} from '../src'

import spec from './base.spec-set'

enzyme.configure({ adapter: new Adapter() });
jest.dontMock('../src')


const TestComponent = ({b,i,u}) => (
  <div>
    { b && <b>{b.value}</b> }
    { i && <i>{i.value}</i> }
    { u && <u>{u.value}</u> }
  </div>
)

const TestContainer = throughArea('test_area')(TestComponent)

const TestAgent = throughAgentFactory(new String('test_area'), 'id' )
const TestAgentB = throughAgentFactory('test_area', props => 'b')

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
          <TestAgent id='u' value={3 + value} />
        }
      </article>
    </main>
  </ThroughProvider>
)

describe('area - base spec-set', function() {
  spec(TestApp)
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