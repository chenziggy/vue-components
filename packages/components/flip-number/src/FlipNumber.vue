<template>
  <div :class="[ ns.b(), ns.m(flipType), ns.is('go', isFlipping)]">
    <div class="digital front" :class="_textClass(frontTextFromData)"></div>
    <div class="digital back" :class="_textClass(backTextFromData)"></div>
  </div>
</template>

<script lang="ts">
enum FlipType {
  Down = 'down',
  Up = 'up'
}
</script>

<script setup lang="ts">
import { useNamespace } from '@vz-components/hooks'
import { ref, onBeforeMount } from 'vue'
const props = defineProps({
  frontText: {
    type: [String],
    default: '0'
  },
  // back paper text
  // 后牌文字
  backText: {
    type: [String],
    default: '1'
  },
  duration: {
    type: Number,
    default: 600
  }
})

const flipType = ref('down')
const ns = useNamespace('flip-number')
const isFlipping = ref(false)
const frontTextFromData = ref('0')
const backTextFromData = ref('1')

const _textClass = (val: string) => {
  return 'number' + val
}

const flip = (type: FlipType, front: string, back: string) => {

  // 如果处于翻转中，则不执行
  if (isFlipping.value) {
    return false
  }
  flipType.value = type
  frontTextFromData.value = front
  backTextFromData.value = back
  // 根据传递过来的type设置翻转方向
  // 设置翻转状态为true
  isFlipping.value = true
  setTimeout(() => {
    // 设置翻转状态为false
    isFlipping.value = false
    frontTextFromData.value = back
  }, props.duration)
}

const flipDown = (front: string, back: string) => {
  flip(FlipType.Down, front, back)
}

const flipUp = (front: string, back: string) => {
  flip(FlipType.Up, front, back)
}

const setFront = (text: string) => {
  frontTextFromData.value = text
}

const setBack = (text: string) => {
  backTextFromData.value = text
}

onBeforeMount(() => {
  frontTextFromData.value = props.frontText
  backTextFromData.value = props.backText
})

defineExpose({
  flipDown,
  flipUp,
  setFront,
  setBack
})
</script>
