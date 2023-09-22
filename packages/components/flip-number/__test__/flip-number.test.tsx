import { nextTick } from 'vue'
import { describe, expect, it, } from 'vitest'
import { mount } from '@vue/test-utils'
import FlipNumber from '@vz-components/components/flip-number/src/FlipNumber.vue'


describe('FlipNumber.vue', () => {
  it('create', () => {
    const wrapper =  mount(() => <FlipNumber />)
    expect(wrapper.classes()).toContain('vz-flip-number')
  })

  it('setFront', async () => {
    const wrapper = mount(() => <FlipNumber />)
    const target = wrapper.getComponent(FlipNumber).vm
    target.setFront('1')
    await nextTick()
    expect(wrapper.find('.front').classes()).toContain('number1')
    target.setFront('2')
    await nextTick()
    expect(wrapper.find('.front').classes()).toContain('number2')
  })

  it('setBack', async () => {
    const wrapper = mount(() => <FlipNumber />)
    const target = wrapper.getComponent(FlipNumber).vm
    target.setBack('1')
    await nextTick()
    expect(wrapper.find('.back').classes()).toContain('number1')
    target.setBack('2')
    await nextTick()
    expect(wrapper.find('.back').classes()).toContain('number2')
  })

  it('flipDown', async () => {
    const wrapper = mount(() => <FlipNumber />)
    const target = wrapper.getComponent(FlipNumber).vm
    target.flipDown('3', '4')
    await nextTick()
    expect(wrapper.classes()).toContain('is-go')
    expect(wrapper.classes()).toContain('vz-flip-number--down')
    expect(wrapper.find('.front').classes()).toContain('number3')
    expect(wrapper.find('.back').classes()).toContain('number4')
  })

  it('flipUp', async () => {
    const wrapper = mount(() => <FlipNumber />)
    const target = wrapper.getComponent(FlipNumber).vm
    target.flipUp('5', '6')
    await nextTick()
    expect(wrapper.classes()).toContain('is-go')
    expect(wrapper.classes()).toContain('vz-flip-number--up')
    expect(wrapper.find('.front').classes()).toContain('number5')
    expect(wrapper.find('.back').classes()).toContain('number6')
  })

  it('duration', async () => {
    
    const wrapper = mount(() => <FlipNumber />)
    const target = wrapper.getComponent(FlipNumber).vm
    target.flipUp('5', '6')
    await nextTick()
    target.flipUp('0', '1')
    await nextTick()
    expect(wrapper.classes()).toContain('is-go')
    expect(wrapper.classes()).toContain('vz-flip-number--up')
    expect(wrapper.find('.front').classes()).toContain('number5')
    expect(wrapper.find('.back').classes()).toContain('number6')
    setTimeout(async () => {
      target.flipUp('0', '1')
      await nextTick()
      expect(wrapper.classes()).toContain('is-go')
      expect(wrapper.classes()).toContain('vz-flip-number--up')
      expect(wrapper.find('.front').classes()).toContain('number0')
      expect(wrapper.find('.back').classes()).toContain('number1')
    }, 600)
  })
})