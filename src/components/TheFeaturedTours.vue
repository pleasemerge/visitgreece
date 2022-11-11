<script setup lang="ts">
import AppBtn from '@/components/AppBtn.vue'
import { useBookingStore } from '@/stores/booking'
import AppPicture from '@/components/AppPicture.vue'
import { tours } from '@/stores/tours'

const booking = useBookingStore()
</script>

<template>
<div class="w-full" id="tours">
  <h1 class="text-4xl pt-8">Best of Greece</h1>
  <div class="py-2">
    <span class="text-gray-700 tracking-widest">TOURS</span>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="flex border content-between flex-wrap" v-for="(tour, index) of tours" :key="index">
      <div class="content-start flex flex-wrap">
        <div class="overflow-hidden w-full h-64 rounded-t-md">
          <app-picture :img="tour.img" class-names="h-64 object-cover hover:scale-110 transition-transform duration-500" />
        </div>
        <div class="p-4 w-full">
          <div class="text-gray-500">
            {{tour.name}}
          </div>
          <div v-for="(itinerary, index) of tour.itinerary" :key="index" class="w-full flex content-start flex-wrap justify-between">
            <div class="text-xl">
              {{itinerary.hotel.province}}
            </div>
            <div class="text-gray-500">
              {{itinerary.days}} days 
            </div>
          </div>
        </div>
      </div>
      <div class="flex self-start justify-between w-full grow px-4 py-1 mb-2">
        <div>
          <app-btn @click="booking.showTourBookingModal(tour)">
            Book now
          </app-btn>
        </div>
        <div class="font-bold text-xl">
          ${{tour.getCost().toFixed(2)}}
        </div>
      </div>
    </div>
  </div>
</div>
</template>
