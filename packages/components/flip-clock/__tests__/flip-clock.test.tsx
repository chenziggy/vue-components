import { describe, expect, it, } from 'vitest'
import { mount } from '@vue/test-utils'
import FlipClock from '@vz-components/components/flip-clock/src/FlipClock.vue'


describe('FlipClock.vue', () => {
  it('create', () => {
    const wrapper =  mount(() => <FlipClock />)
    expect(wrapper.classes()).toContain('vz-flip-clock')
  })
})