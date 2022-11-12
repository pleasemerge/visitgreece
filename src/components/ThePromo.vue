<template>
<div class="w-full relative">
  <app-picture :img="promoBg" />
  <div class="bg-white relative md:absolute -bottom-4 inset-x-0 w-full md:w-11/12 mx-auto shadow-lg flex flex-wrap justify-between">
    <div class="w-full md:w-5/12 p-2 md:p-8">
      <h1 class="text-4xl">Destinations</h1>
      <div class="py-4">
        <div>
          <router-link 
            :to="{ name: 'list-hotels', query: { province } }" 
            v-for="(province, index) in destinations.slice(0, 3)" 
            :key="index" 
            class="block w-full"
          >
            {{province}}
          </router-link>
          <span class="block text-gray-500">{{destinations.length - 3 > 0 ? `And ${destinations.length - 3} more` : ''}}</span>
          <a class="text-gray-700 text-sm underline block  my-4" @click="scrollToTours()">View tours</a>
        </div>
      </div>
    </div>
    <div 
      v-if="featuredHotel"
      :style="[`background-image: url(${destinationsBg})`]"
      class="bg-primary md:bg-white flex rounded items-center w-full md:w-7/12 bg-left-top bg-no-repeat bg-cover p-8"
    >
      <div class="flex justify-start lg:justify-center w-full">
        <img :src="featuredHotel.imgSrc" class="object-cover rounded-md" width="150" />
        <div class="px-4">
          <h2 class="text-2xl">Featured Hotel</h2>
          <span class="block text-gray-700">{{featuredHotel.name}}</span>
          <hotel-price :price="featuredHotel.price" class="block mt-2 mb-1" />
          <div>
            <BookNowBtn @click="featuredHotel && booking.showBookingHotelModal(featuredHotel)">Book Now</BookNowBtn>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import _ from 'underscore'
import BookNowBtn from '@/components/BookNowBtn.vue'
import AppPicture from '@/components/AppPicture.vue'
import HotelPrice from '@/components/HotelPrice.vue'
import { useBookingStore } from '@/stores/booking'
import { featuredHotel } from '@/stores/hotels'
import { hotels } from '@/stores/hotels'

const destinationsBg = new URL('../assets/img/promo_destinations_bg.png', import.meta.url).href
const promoBg = new URL(`../assets/img/promo_bg-md.png`, import.meta.url).href

const booking = useBookingStore()
const destinations = _.uniq(hotels.map(hotel => hotel.province))

const scrollToTours = () => {
  const target = document.getElementById('tours')
  target && window.scrollTo({
    top: target.offsetTop - 60,
    left: 0,
    behavior: 'smooth'
  })
}
</script>
