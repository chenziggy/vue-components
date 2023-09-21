<template>
  <div :class="[ns.b()]">
    <FlipNumber ref="flipHour1"></FlipNumber>
    <FlipNumber ref="flipHour2"></FlipNumber>
    <em>:</em>
    <FlipNumber ref="flipMinute3"></FlipNumber>
    <FlipNumber ref="flipMinute4"></FlipNumber>
    <em>:</em>
    <FlipNumber ref="flipSecond5"></FlipNumber>
    <FlipNumber ref="flipSecond6"></FlipNumber>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, Ref } from 'vue'
import FlipNumber from '../../flip-number/src/FlipNumber.vue'
import { useNamespace } from '@vz-components/hooks'
import { formatDate, interval } from '@vz-components/utils'


const ns = useNamespace('flip-clock')

const flipHour1 = ref()
const flipHour2 = ref()
const flipMinute3 = ref()
const flipMinute4 = ref()
const flipSecond5 = ref()
const flipSecond6 = ref()
const flipList = ref([
  flipHour1,
  flipHour2,
  flipMinute3,
  flipMinute4,
  flipSecond5,
  flipSecond6
])

const init = () => {
  let now = new Date()
  let nowTimeStr = formatDate(new Date(now.getTime()), 'hhmmss')
  flipList.value.forEach((flip, i) => {
    flip.value.setFront(nowTimeStr[i])
  })
}


const timer = ref() as Ref<ReturnType<typeof setTimeout>> 
const run = () => {
  interval(timer , () => {
    let now = new Date()
    let nowTimeStr = formatDate(new Date(now.getTime() - 1000), 'hhmmss')
    let nextTimeStr = formatDate(now, 'hhmmss')
    flipList.value.forEach((flip, i) => {
      if (nowTimeStr[i] === nextTimeStr[i]) {
        return
      }
      flip.value.flipDown(nowTimeStr[i], nextTimeStr[i])
    })
  }, 1000)
}

onMounted(() => {
  init()
  run()
})
</script>
