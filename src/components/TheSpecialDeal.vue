<script setup lang="ts">
import { useBookingStore } from '@/stores/booking';
import { featuredTour } from '@/stores/tours'
import BookNowBtn from '@/components/BookNowBtn.vue'
const booking = useBookingStore()
</script>

<template>
  <div class="bg-green-base rounded flex flex-wrap" v-if="featuredTour">
    <div class="w-full md:w-1/2 lg:w-5/12 flex flex-wrap p-8">
      <div class="w-1/2">
        <h1 class="text-3xl raleway font-bold py-2 text-orange-100">SPECIAL DEAL</h1>
        <span class="block w-full text-white">{{featuredTour.name}}</span>
        <book-now-btn class="my-2 px-8" @click="featuredTour && booking.showTourBookingModal(featuredTour)">Book now</book-now-btn>
  
      </div>
      <div class="w-1/2 text-right">
        <h3 class="text-5xl raleway font-bold text-white opacity-70">${{featuredTour.getCost()}}</h3>
        <span class="w-full block text-sm text-white opacity-80 pt-2">only this week</span>
        <a href="javascript:;" class="underline text-sm text-white opacity-80" @click="featuredTour && booking.showTourBookingModal(featuredTour)">learn more</a>
      </div>
    </div>
  
    <div class="hidden md:block md:w-1/2 lg:w-7/12 bg-green-base">
      <div class="special-bg bg-blue-200 bg-cover h-full"></div>
    </div>
  </div>
 </template>
  
  
<style scoped>
  .special-bg {
    clip-path: polygon(11% 0, 100% 0%, 100% 100%, 0% 100%);
    background-image: url('../assets/img/special_bg.png');
    background-repeat: no-repeat;
  }
</style>
