import React from 'react'
import PropTypes from 'prop-types'
import enzyme, { shallow, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { expect } from 'chai'

import {
  ThroughProvider,
  throughArea, 
  throughInterface,
} from '../src'


enzyme.configure({ adapter: new Adapter() })
jest.dontMock('../src')

class TestInterfaceComponent extends React.Component {
  static propTypes = {
    test_area: PropTypes.object,
  }

  addItem = () => {
    this.props.test_area.add('item')
    this.props.test_area.update('item', {value: 10})
  }

  changeItem = () => {
    this.props.test_area.update('item', {value: 20})
  }

  removeItem = () => {
    this.props.test_area.remove("item")
  }

  addComponenItem = () => {
    this.props.test_area.add('item')
    this.props.test_area.update('item', {value: <i>tag</i>})
  }

  wrongUpdateUnknownKey = () => {
    this.props.test_area.update('not-added', {})
  }

  wrongInstallToKey = () => {
    this.props.test_area.add([])
    this.props.test_area.update([], {})
  }

  wrongInstallPropsType = () => {
    this.props.test_area.add(new String('/'))
    this.props.test_area.update(new String('/'), [])
  }

  goodInstallToKey = () => {
    this.props.test_area.add("key")
    this.props.test_area.update("key", {})
  }

  goodInstallToStringKey = () => {
    this.props.test_area.add(new String('/'))
    this.props.test_area.update(new String('/'), {})
  }

  renderButton(name) {
    return <button className={name} onClick={this[name]} />
  }

  render() {
    return (
      <div>
        {this.renderButton("addItem")}
        {this.renderButton("changeItem")}
        {this.renderButton("removeItem")}
        {this.renderButton("addComponenItem")}
        {this.renderButton("wrongUpdateUnknownKey")}
        {this.renderButton("wrongInstallToKey")}
        {this.renderButton("wrongInstallPropsType")}
        {this.renderButton("goodInstallToKey")}
        {this.renderButton("goodInstallToStringKey")}
      </div>
    )
  }
}

const TestInterfaceContainer =
  throughInterface('test_area')(TestInterfaceComponent)

const TestComponent = ({item}) => (
  <div>
    { item && <b>{item.value}</b> }
  </div>
)

const TestContainer =
  throughArea('test_area')(TestComponent)

const TestApp = () => (
  <ThroughProvider>
    <div>
      <TestContainer />
      <TestInterfaceContainer />
    </div>
  </ThroughProvider>
)


describe('breadcrumbs api interface', function() {
  it("add + change + remove the item", function() {
    const wrapper = mount(<TestApp/>)
    expect(wrapper.find('b')).to.have.length(0)

    wrapper.find('.addItem').simulate('click')
    expect(wrapper.find('b')).to.have.length(1)
    expect(wrapper.find('b').at(0).props().children).to.equal(10)

    wrapper.find('.changeItem').simulate('click')
    expect(wrapper.find('b')).to.have.length(1)
    expect(wrapper.find('b').at(0).props().children).to.equal(20)

    wrapper.find('.removeItem').simulate('click')
    expect(wrapper.find('b')).to.have.length(0)

    wrapper.unmount()
  })

  it("can pass component", function() {
    jest.useFakeTimers()
    const wrapper = mount(<TestApp/>)
    expect(wrapper.find('.addComponenItem')).to.have.length(1)
    wrapper.find('.addComponenItem').simulate('click')
    jest.runAllTimers()
    wrapper.update()
    expect(wrapper.find('i')).to.have.length(1)
    expect(wrapper.find('i').at(0).props().children).to.equal('tag')
    wrapper.unmount()
  })

  it("throw in install for wrong types", function() {
    const wrapper = mount(<TestApp/>)
    expect(wrapper.find('.wrongInstallToKey')).to.have.length(1)
    expect(wrapper.find('.wrongInstallPropsType')).to.have.length(1)
    expect(() => {
      wrapper.find('.wrongInstallToKey').simulate('click')
    }).to.throw()
    expect(() => {
      wrapper.find('.wrongInstallPropsType').simulate('click')
    }).to.throw()
    wrapper.unmount()
  })

  it("throw in update when key is unknown", function() {
    const wrapper = mount(<TestApp/>)
    expect(wrapper.find('.wrongUpdateUnknownKey')).to.have.length(1)
    expect(() => {
      wrapper.find('.wrongUpdateUnknownKey').simulate('click')
    }).to.throw()
    wrapper.unmount()
  })

  it("not throw in install for good types", function() {
    const wrapper = mount(<TestApp/>)
    expect(() => {
      wrapper.find('.goodInstallToKey').simulate('click')
    }).not.to.throw()
    expect(() => {
      wrapper.find('.goodInstallToStringKey').simulate('click')
    }).not.to.throw()
    wrapper.unmount()
  })
})

