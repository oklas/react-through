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

import ErrorBoundary from './ErrorBoundary'

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

const TestApp = ({value, show_i, show_u}) => (
  <ThroughProvider>
    <main>
      <header>
        <TestContainer />
      </header>
      <article>
        <TestAgentB value={1 + value} />
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

describe('test with multiple agents', function() {
  it("transfer and update the data", function() {
    const wrapper = mount(<TestApp value={10}/>)

    expect(wrapper.find('header').find('b')).to.have.length(1)
    expect(wrapper.find('header').find('i')).to.have.length(0)
    expect(wrapper.find('header').find('u')).to.have.length(0)
    expect(wrapper.find('header').find('b').at(0).props().children).to.equal(11)

    wrapper.setProps({show_i: true})
    wrapper.update()

    expect(wrapper.find('header').find('b')).to.have.length(1)
    expect(wrapper.find('header').find('i')).to.have.length(1)
    expect(wrapper.find('header').find('u')).to.have.length(0)
    expect(wrapper.find('header').find('b').at(0).props().children).to.equal(11)
    expect(wrapper.find('header').find('i').at(0).props().children).to.equal(12)

    wrapper.setProps({show_i: true, show_u: true})
    wrapper.update()

    expect(wrapper.find('header').find('b')).to.have.length(1)
    expect(wrapper.find('header').find('i')).to.have.length(1)
    expect(wrapper.find('header').find('u')).to.have.length(1)
    expect(wrapper.find('header').find('b').at(0).props().children).to.equal(11)
    expect(wrapper.find('header').find('i').at(0).props().children).to.equal(12)
    expect(wrapper.find('header').find('u').at(0).props().children).to.equal(13)

    wrapper.unmount()
  })
})