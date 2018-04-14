import React from 'react'
import { shallow, mount, render } from 'enzyme'
import { expect } from 'chai'

export default function spec(TestApp, needTimers) {

  const runAllTimers = !needTimers ? () => {} : () => jest.runAllTimers()
  const useFakeTimers = !needTimers ? () => {} : () => jest.useFakeTimers()
  const usage = needTimers ? ' (with timers)' : ' (no timers)'


  it("transfer and update the data" + usage, function() {
    useFakeTimers()
    const wrapper = mount(<TestApp show_b value={10}/>)

    expect(wrapper.find('header').find('b')).to.have.length(1)
    expect(wrapper.find('header').find('i')).to.have.length(0)
    expect(wrapper.find('header').find('u')).to.have.length(0)
    expect(wrapper.find('header').find('b').at(0).props().children).to.equal(11)

    wrapper.setProps({show_b: false, show_i: true})
    runAllTimers()
    wrapper.update()

    expect(wrapper.find('header').find('b')).to.have.length(0)
    expect(wrapper.find('header').find('i')).to.have.length(1)
    expect(wrapper.find('header').find('u')).to.have.length(0)
    expect(wrapper.find('header').find('i').at(0).props().children).to.equal(12)

    wrapper.setProps({show_b: true, show_i: false, show_u: true})
    runAllTimers()
    wrapper.update()

    expect(wrapper.find('header').find('b')).to.have.length(1)
    expect(wrapper.find('header').find('i')).to.have.length(0)
    expect(wrapper.find('header').find('u')).to.have.length(1)
    expect(wrapper.find('header').find('b').at(0).props().children).to.equal(11)
    expect(wrapper.find('header').find('u').at(0).props().children).to.equal(13)

    wrapper.setProps({show_b: true, show_i: true, show_u: true})
    runAllTimers()
    wrapper.update()

    expect(wrapper.find('header').find('b')).to.have.length(1)
    expect(wrapper.find('header').find('i')).to.have.length(1)
    expect(wrapper.find('header').find('u')).to.have.length(1)
    expect(wrapper.find('header').find('b').at(0).props().children).to.equal(11)
    expect(wrapper.find('header').find('i').at(0).props().children).to.equal(12)
    expect(wrapper.find('header').find('u').at(0).props().children).to.equal(13)

    wrapper.setProps({value: 0, show_b: false, show_i: false, show_u: false})
    runAllTimers()
    wrapper.update()

    expect(wrapper.find('header').find('b')).to.have.length(0)
    expect(wrapper.find('header').find('i')).to.have.length(0)
    expect(wrapper.find('header').find('u')).to.have.length(0)

    wrapper.unmount()
  })

} // spec()