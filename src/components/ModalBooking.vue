<script setup lang="ts">
import { onMounted } from 'vue'
import HotelImage from '@/components/HotelImage.vue'
import HotelName from '@/components/HotelName.vue'
import HotelProvince from '@/components/HotelProvince.vue'
import { IHotel } from '@/types'
import { useBookingStore } from '@/stores/booking'
import { useUiState } from '@/stores/uistate'
import HotelRating from '@/components/HotelRating.vue'
import FormBookingHotelDetails from '@/components/FormBookingHotelDetails.vue'
import FormBookingPayment from '@/components/FormBookingPayment.vue'

const booking = useBookingStore()
const uiState = useUiState()

const hotel: IHotel = booking.hotel

const closeForm = () => {
  uiState.toggleOverlay()
  uiState.toggleHotelBookingModal()
  booking.reset()
}

onMounted(() => {
  booking.setHotel(hotel)
  booking.setStep(1)
})

</script>

<template>

<div 
  v-if="hotel"
  class="z-50 overflow-auto h-164 md:h-fit w-full w-11/12 md:w-1/2 lg:w-1/3 mx-auto bg-white my-10 rounded-t-md"
>
  <div class="w-full relative overflow-hidden rounded-t-md">
    <hotel-image :img-src="hotel.imgSrc" />
    <div class="absolute right-2 top-1">
      <hotel-rating :rating="hotel.rating" />
    </div>
  </div>
  <div class="p-4">
    <div>
      <hotel-name :name="hotel.name" />
      <hotel-province :province="hotel.province" />
    </div>

    <div v-if="booking.step === 1">
      <form-booking-hotel-details @close-form="closeForm" />
    </div>

    <div v-if="booking.step === 2" class="py-4">
      <form-booking-payment @close-form="closeForm" />
    </div>
  </div>
</div>
</template>
