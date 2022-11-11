<script setup lang="ts">
import gsap from 'gsap'
import { IHotel } from '@/types'
import AppHotel from '@/components/HotelItem.vue'

interface Props {
  hotels: IHotel[]
}

const props = withDefaults(defineProps<Props>(), {
  hotels: () => []
})

const beforeEnter = (el: any) => {
  el.style.transform = 'translateY(-30px)'
  el.style.opacity = 0
}

let hotelIndex = 0

// Reset index for app-hotel to make gsap transition delay works properly
const getIndex = () : number => {
  if (hotelIndex >= 9) {
    hotelIndex = 1
  }
  return hotelIndex += 1
}

const enter = (el: any) => {
  gsap.to(el, {
    duration: 1,
    delay: el.dataset.index * 0.1,
    y: 0,
    opacity: 1
  })
}

</script>

<template>
<div class="py-4">
  <TransitionGroup @before-enter="beforeEnter" @enter="enter" :css="false" appear name="list">
    <app-hotel v-for="(hotel, index) of hotels" :hotel="hotel" :key="index" :data-index="getIndex()" class="shadow-none md:shadow-md border md:border-none" />
  </TransitionGroup>
</div>
</template>

<style scoped>
.list-move {
  transition: transform 1s;
}
</style>
