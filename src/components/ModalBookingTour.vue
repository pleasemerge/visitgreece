<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import HotelImage from '@/components/HotelImage.vue'
import AppBtn from '@/components/AppBtn.vue'
import { Tour } from '@/types'
import { useBookingStore } from '@/stores/booking'
import { useUiState } from '@/stores/uistate'
import FormBookingPayment from '@/components/FormBookingPayment.vue'
import { getMonthLocalString } from '@/helpers/time'

const booking = useBookingStore()
const uiState = useUiState()

const tour: Tour = reactive(booking.tour)

const closeForm = () => {
  uiState.toggleOverlay()
  uiState.toggleTourBookingModal()
  booking.reset()
}

onMounted(() => {
  booking.reset()
  booking.setTour(booking.tour)
  booking.setStep(1, 'tour')
})
</script>

<template>

<div 
  v-if="tour"
  class="z-50 w-full w-11/12 md:w-1/2 lg:w-1/3 mx-auto my-10 bg-white rounded-t-md"
>
  <div class="w-full overflow-hidden rounded-t-md">
    <hotel-image :img-src="tour.img" />
  </div>

  <div class="flex flex-wrap p-4 overflow-auto h-128" v-if="booking.step === 1">
    <div class="text-gray-500 py-2">
      {{tour.startDate.getDate()}} {{getMonthLocalString(tour.startDate)}}
      —
      {{tour.endDate.getDate()}} {{getMonthLocalString(tour.endDate)}}
    </div>

    <div class="pb-4 text-gray-600">
      {{tour.description}}
    </div>

    <div 
      v-for="(itinerary, index) of tour.itinerary" 
      :key="index" 
      class="w-full flex items-center border mb-2 p-2"
    >
      <div class="flex w-full justify-between">
        <div class="text-xl">
          {{itinerary.hotel.province}}
          <br/>
          <span class="block text-sm">{{itinerary.hotel.name}}</span>
        </div>
        <div>
          {{itinerary.days}} days (${{(itinerary.hotel.price * itinerary.days).toFixed(2)}})
        </div>
      </div>
    </div>
    
    <div class="flex w-full justify-between items-center mt-4 mb-2">
      <app-btn @click="booking.setStep(2, 'tour')">Make payment (${{tour.getCost()}})</app-btn>
      <a class="underline pl-2" @click="closeForm()">Close</a>
    </div>
  </div>

  <div v-if="booking.step === 2" class="p-4 overflow-y-scroll">
    <form-booking-payment @close-form="closeForm" />
  </div>
</div>
</template>
