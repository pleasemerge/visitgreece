<script setup lang="ts">
import { useBookingStore } from '@/stores/booking'
import HotelRating from '@/components/HotelRating.vue'

import HotelName from '@/components/HotelName.vue'
import HotelProvince from '@/components/HotelProvince.vue'
import HotelFacility from '@/components/FacilityItem.vue'
import HotelPrice from '@/components/HotelPrice.vue'
import BookNowBtn from '@/components/BookNowBtn.vue'
import { IHotel } from '@/types'

interface Props {
  hotel: IHotel
}

const props = defineProps<Props>()

const booking = useBookingStore()
</script>

<template>
  <div class="flex flex-wrap w-full relative py-4" v-if="hotel">
    <div class="w-full md:w-1/2">
      <div class="relative">
        <img :src="hotel.imgSrc" class="object-cover w-full">
        <div class="absolute left-0 top-0 px-2 py-1 text-sm bg-secondary text-white">featured</div>
        <div class="absolute bottom-0 right-0 text-white p-4 bg-gray-800 bg-opacity-80">
          <hotel-price :price="hotel.price" />
        </div>
        <div class="absolute right-2 top-1">
          <hotel-rating :rating="hotel.rating" />
        </div>
      </div>
    </div>
    
    <div class="w-full md:w-1/2 px-0 md:px-10">
      <div>
        <hotel-name :name="hotel.name" class="pt-4 md:pt-0" />
        <hotel-province :province="hotel.province" />
        <div class="flex gap-2 flex-wrap my-2">
          <hotel-facility v-for="(facility, index) of hotel.facilities" :key="index" :facility="facility" />
        </div>
      </div>
      <div class="text-gray-700 py-2 md:py-4">
        <p v-if="hotel.about">{{hotel.about}}</p>
        <p v-else>No description provided</p>
      </div>
      <div class="my-2">
        <book-now-btn class="my-4 w-48 text-center" @click="booking.showBookingHotelModal(hotel)">Book now</book-now-btn>
      </div>
    </div>
  </div>
</template>
