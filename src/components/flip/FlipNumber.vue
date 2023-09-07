<template>
  <div class="flip" :class="[flipType, { 'go': isFlipping }]" @click="flip(FlipType.Down, 0, 1)">
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
import { ref, onBeforeMount } from 'vue'
const props = defineProps({
  frontText: {
    type: [Number],
    default: 0
  },
  // back paper text
  // 后牌文字
  backText: {
    type: [Number],
    default: 1
  },
  duration: {
    type: Number,
    default: 600
  }
})

const flipType = ref('down')
const isFlipping = ref(false)
const frontTextFromData = ref(0)
const backTextFromData = ref(1)

const _textClass = (val: number) => {
  return 'number' + val
}

const flip = (type:  FlipType, front: number, back: number) => {

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

const flipDown = (front: number, back: number) => {
  flip(FlipType.Down, front, back)
}

const flipUp = (front: number, back: number) => {
  flip(FlipType.Up, front, back)
}

const setFront =(text: number) => {
  frontTextFromData.value = text
}

const setBack = (text: number) => {
  backTextFromData.value = text
}

onBeforeMount(() => {
  frontTextFromData.value = props.frontText
  backTextFromData.value = props.backText
})
const count = ref(0)
setInterval(() => {
  flipDown(count.value, count.value+1)
  count.value = (count.value+1)%10
}, 1000)

defineExpose({
  flipDown,
  flipUp,
  setFront,
  setBack
})
</script>

<style scoped>
.flip {
  display: inline-block;
  position: relative;
  width: 60px;
  height: 100px;
  line-height: 100px;
  border: solid 1px #fff;
  border-radius: 10px;
  background: #fff;
  font-size: 66px;
  color: #000;
  box-shadow: 0 0 6px rgba(0, 0, 0, .5);
  text-align: center;
  font-family: "Helvetica Neue"
}

.flip .digital:before,
.flip .digital:after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  background: #fff;
  overflow: hidden;
  box-sizing: border-box;
}

.flip .digital:before {
  top: 0;
  bottom: 50%;
  border-radius: 10px 10px 0 0;
  border-bottom: solid 1px #666;

}

.flip .digital:after {
  line-height: 0;
  top: 50%;
  bottom: 0;
  border-radius: 0 0 10px 10px;
}

.flip .number0:before,
.flip .number0:after {
  content: '0';
}

.flip .number1:before,
.flip .number1:after {
  content: '1';
}

.flip .number2:before,
.flip .number2:after {
  content: '2';
}

.flip .number3:before,
.flip .number3:after {
  content: '3';
}

.flip .number4:before,
.flip .number4:after {
  content: '4';
}

.flip .number5:before,
.flip .number5:after {
  content: '5';
}

.flip .number6:before,
.flip .number6:after {
  content: '6';
}

.flip .number7:before,
.flip .number7:after {
  content: '7';
}

.flip .number8:before,
.flip .number8:after {
  content: '8';
}

.flip .number9:before,
.flip .number9:after {
  content: '9';
}

.flip.down .front:before {
  z-index: 3;
}

.flip.down .back:after {
  z-index: 2;
  transform-origin: 50% 0%;
  transform: perspective(160px) rotateX(-180deg);
}

.flip.down .front:after,
.flip.down .back:before {
  z-index: 1;
}

.flip.up .front:after {
  z-index: 3;
}

.flip.up .back:before {
  z-index: 2;
  transform-origin: 50% 100%;
  transform: perspective(160px) rotateX(180deg);
}

.flip.up .front:before,
.flip.up .back:after {
  z-index: 1;
}


.flip.down.go .front:before {
  transform-origin: 50% 100%;
  animation: frontFlipDown .6s ease-in-out both;
  box-shadow: 0 -2px 6px rgba(255, 255, 255, 0.3);
  backface-visibility: hidden;
}

.flip.down.go .back:after {
  animation: backFlipDown .6s ease-in-out both;
}

@keyframes frontFlipDown {
  0% {
    transform: perspective(160px) rotateX(0deg);
  }

  100% {
    transform: perspective(160px) rotateX(-180deg);
  }
}

@keyframes backFlipDown {
  0% {
    transform: perspective(160px) rotateX(180deg);
  }

  100% {
    transform: perspective(160px) rotateX(0deg);
  }
}





.flip.up.go .front:after {
  transform-origin: 50% 0%;
  animation: frontFlipUp .6s ease-in-out both;
  box-shadow: 0 -2px 6px rgba(255, 255, 255, 0.3);
  backface-visibility: hidden;
}

.flip.up.go .back:before {
  animation: backFlipUp .6s ease-in-out both;
}

@keyframes frontFlipUp {
  0% {
    transform: perspective(160px) rotateX(0);
  }

  100% {
    transform: perspective(160px) rotateX(-180deg);
  }
}

@keyframes backFlipUp {
  0% {
    transform: perspective(160px) rotateX(-180deg);
  }

  100% {
    transform: perspective(160px) rotateX(0deg);
  }
}
</style>