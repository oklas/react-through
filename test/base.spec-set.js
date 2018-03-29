import React from 'react'
import { shallow, mount, render } from 'enzyme'
import { expect } from 'chai'

export default function spec(TestApp) {

  it("transfer and update the data", function() {
    const wrapper = mount(<TestApp show_b value={10}/>)

    expect(wrapper.find('header').find('b')).to.have.length(1)
    expect(wrapper.find('header').find('i')).to.have.length(0)
    expect(wrapper.find('header').find('u')).to.have.length(0)
    expect(wrapper.find('header').find('b').at(0).props().children).to.equal(11)

    wrapper.setProps({show_b: false, show_i: true})
    wrapper.update()

    expect(wrapper.find('header').find('b')).to.have.length(0)
    expect(wrapper.find('header').find('i')).to.have.length(1)
    expect(wrapper.find('header').find('u')).to.have.length(0)
    expect(wrapper.find('header').find('i').at(0).props().children).to.equal(12)

    wrapper.setProps({show_b: true, show_i: false, show_u: true})
    wrapper.update()

    expect(wrapper.find('header').find('b')).to.have.length(1)
    expect(wrapper.find('header').find('i')).to.have.length(0)
    expect(wrapper.find('header').find('u')).to.have.length(1)
    expect(wrapper.find('header').find('b').at(0).props().children).to.equal(11)
    expect(wrapper.find('header').find('u').at(0).props().children).to.equal(13)

    wrapper.setProps({show_b: true, show_i: true, show_u: true})
    wrapper.update()

    expect(wrapper.find('header').find('b')).to.have.length(1)
    expect(wrapper.find('header').find('i')).to.have.length(1)
    expect(wrapper.find('header').find('u')).to.have.length(1)
    expect(wrapper.find('header').find('b').at(0).props().children).to.equal(11)
    expect(wrapper.find('header').find('i').at(0).props().children).to.equal(12)
    expect(wrapper.find('header').find('u').at(0).props().children).to.equal(13)

    wrapper.unmount()
  })

} // spec()