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

import ErrorBoundary from './ErrorBoundary'

enzyme.configure({ adapter: new Adapter() })
jest.dontMock('../src')

const TestOneComponent = props => (
  <b>{props.value}</b>
)

const TestOneContainer = throughDirect('test_one')(TestOneComponent)

const TestOneAgent = createAdvAgent('test_one')

const TestOneApp = ({value, sameAgentDuplicateTwice}) => (
  <ThroughProvider>
    <main>
      <header>
        <TestOneContainer />
      </header>
      <article>
        <TestOneAgent value={1 + value} />
        { sameAgentDuplicateTwice &&
          <section>
            <TestOneAgent value={2 + value} />
            <TestOneAgent value={3 + value} />
          </section>
        }
      </article>
    </main>
  </ThroughProvider>
)

describe('test with one agent in default area', function() {
  it("transfer and update the data", function() {
    const wrapper = mount(<TestOneApp value={10}/>)

    expect(wrapper.find('header').find('b').at(0).props().children).to.equal(11)

    wrapper.setProps({value: 20})
    wrapper.update()

    expect(wrapper.find('header').find('b').at(0).props().children).to.equal(21)

    wrapper.unmount()
  })

  it("throw for duplicate twice", function() {
    const wrapper = mount(
      <ErrorBoundary>
        <TestOneApp value={3} sameAgentDuplicateTwice={true}/>
      </ErrorBoundary>
    )
    expect(wrapper.find('u').at(0).props().children).to.equal('error')
    wrapper.unmount()
  })
})