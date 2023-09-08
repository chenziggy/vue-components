<template>
  <div class="flip__clock">
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
import { ref, onMounted } from 'vue'
import FlipNumber from '@/components/flip/FlipNumber.vue'
import { formatDate, interval } from '@/utils/utils'

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


const timer = ref<number>(0)
const run = () => {
  interval(timer, () => {
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

<style scoped>
.flip__clock ::v-deep() .flip {
  margin: 0 3px;
}

.flip__clock em {
  color: #fff;
  display: inline-block;
  font-size: 66px;
  font-style: normal;
  vertical-align: top;
}
</style>