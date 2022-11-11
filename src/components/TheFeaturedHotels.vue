<script setup lang="ts">
import { useRouter } from 'vue-router'
import HotelItem from '@/components/HotelItem.vue'
import { featuredHotels } from '@/stores/hotels'

const router = useRouter()

const navigateToListHotels = <T>(facilityID: T) => {
  router.push({ name: 'list-hotels', query: { facilityID: Number(facilityID)} })
}
</script>

<template>
<div class="bg-primary w-full">
  <h1 class="text-4xl">Featured hotels</h1>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 my-8">
    <hotel-item 
      v-for="(hotel, index) of featuredHotels" 
      :key="index" 
      :hotel="hotel"
      :navigateOnClick="navigateToListHotels"
     />
  </div>
</div>
</template>
