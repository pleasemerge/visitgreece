<script setup lang="ts">
import { useBookingStore } from '@/stores/booking'
import { useBookmarks } from '@/stores/bookmarks'
import HotelImage from '@/components/HotelImage.vue'
import HotelName from '@/components/HotelName.vue'
import HotelProvince from '@/components/HotelProvince.vue'
import HotelFacility from '@/components/FacilityItem.vue'
import HotelPrice from '@/components/HotelPrice.vue'
import BookNowBtn from '@/components/BookNowBtn.vue'
import { IHotel } from '@/types'
import HotelRating from '@/components/HotelRating.vue'
import { BookmarkIcon } from '@heroicons/vue/24/outline'
import { BookmarkSlashIcon } from '@heroicons/vue/24/solid'

const booking = useBookingStore()
const bookmarks = useBookmarks()

interface Props {
  hotel: IHotel,
  navigateOnClick?: <T>(a: T) => void
}

const props = defineProps<Props>()

</script>

<template>
<div class="bg-white rounded-t-md flex content-between flex-wrap">
  <div class="flex flex-wrap content-start">
    <div class="w-full rounded-t-md overflow-hidden h-72 relative">
      <hotel-image :img-src="hotel.imgSrc" class="w-full" />
      <div class="absolute right-1 top-1">
        <hotel-rating :rating="hotel.rating" />
      </div>
    </div>
    <div class="p-4 w-full grid">
      <div class="mt-4 w-full flex justify-between">
        <hotel-name :name="hotel.name" />
        <a @click="bookmarks.add(hotel.id)">
          <bookmark-slash-icon v-if="bookmarks.items.find(b => b.id === hotel.id)" class="text-yellow-500 w-6 h-6 inline-block" />
          <bookmark-icon v-else class="w-6 h-6 inline-block text-gray-500" />
        </a>
      </div>
      <div class="w-full">
        <hotel-province :province="hotel.province" />
      </div>
      <div class="w-full my-2 flex gap-2 flex-wrap relative">
        <hotel-facility v-for="(facility, index) of hotel.facilities" :key="index" :facility="facility" @click="navigateOnClick && navigateOnClick(facility.id)" />
      </div>
    </div>
  </div>

  <div class="w-full flex justify-between content-end items-center p-4">
    <book-now-btn @click="booking.showBookingHotelModal(hotel)">Book now</book-now-btn>
    <hotel-price :price="hotel.price" />
  </div>
</div>
</template>
