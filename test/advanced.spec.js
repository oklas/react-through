import React from 'react'
import PropTypes from 'prop-types'
import Adapter from 'enzyme-adapter-react-16'
import enzyme, { shallow, mount, render } from 'enzyme'
import { expect } from 'chai'

import {
  ThroughProvider,
  throughArea,
  createAdvAgent,
} from '../src'

import AdvancedAgent from './AdvancedAgent'

import spec from './base.spec-set'

enzyme.configure({ adapter: new Adapter() })
jest.dontMock('../src')

const TestComponent = ({b,i,u}) => (
  <div>
    { b && <b>{b.value}</b> }
    { i && <i>{i.value}</i> }
    { u && <u>{u.value}</u> }
  </div>
)

const TestContainer = throughArea('test_area')(TestComponent)

const TestApp = ({value, show_b, show_i, show_u}) => (
  <ThroughProvider>
    <main>
      <header>
        <TestContainer />
      </header>
      <article>
        <AdvancedAgent {...{value, show_b, show_i, show_u}} />
      </article>
    </main>
  </ThroughProvider>
)


describe('advanced - base spec-set', function() {
  spec(TestApp, false)
})