import { describe, expect, it, } from 'vitest'
import { mount } from '@vue/test-utils'
import FlipNumber from '@vz-components/components/flip-number/src/FlipNumber.vue'


describe('FlipNumber.vue', () => {
  it('create', () => {
    const wrapper =  mount(() => <FlipNumber />)
    expect(wrapper.classes()).toContain('vz-flip-number')
  })
})