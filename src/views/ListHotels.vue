<script setup lang="ts">
import _ from 'underscore'
import { useRoute } from 'vue-router'
import { computed, ref, Ref } from 'vue'
import TheFeaturedHotel from '@/components/HotelFeatured.vue'
import ListHotels from '@/components/HotelList.vue'
import FormSelect from '@/components/FormSelect.vue'
import AppBtn from '@/components/AppBtn.vue'
import { IHotel } from '@/types'
import { facilities } from '@/stores/facilities'
import { useHotelsStore } from '@/stores/hotels'
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/vue/24/solid'

const hotelsStore = useHotelsStore()
const hotels = hotelsStore.hotels
const featuredHotel = hotelsStore.featured[0]
const provinces = _.uniq(hotels.map(hotel => hotel.province))

const route = useRoute()
const sortBy = ref('asc')
const pageSize = 9
let limit = ref(pageSize)
let filterByRating: Ref<number> = ref(0)
const selectedProvince: Ref<string> = route.query.province ? ref(String(route.query.province)) : ref('')
let selectedFacilities: Ref<(string | number)[]> = Number(route.query.facilityID) ? ref([Number(route.query.facilityID)]) : ref([])

const applyFilterByFacilities = (id: string | number) => {
  if (!id) return selectedFacilities.value = []
  limit.value = pageSize
  const index = selectedFacilities.value.findIndex(i => i === id)
  index > -1 ? selectedFacilities.value.splice(index, 1) : selectedFacilities.value.push(id)
}

const filters = {
  byRating: (hotel: IHotel) => {
    if (!filterByRating.value) return hotel
    return hotel.rating === filterByRating.value
  },
  byFacilities: (hotel: IHotel) => {
    if (selectedFacilities.value.length === 0) return hotel
    return selectedFacilities.value.every(facilityID => hotel.facilities.find(facility => facility.id === facilityID))
  },
  byProvince: (hotel: IHotel) => {
    if (!selectedProvince.value || selectedProvince.value === 'All') return hotel
    return hotel.province === selectedProvince.value
  }
}

const totalItems = ref(0)

const items = computed(() : IHotel[] => {
  const items = _.sortBy(hotels, h => sortBy.value === 'asc' ? h.price : -h.price)
  .filter(filters.byRating)
  .filter(filters.byFacilities)
  .filter(filters.byProvince)

  totalItems.value = items.length

  return items.slice(0, limit.value)
})

const isFacilitySelected = (id: string | number) : boolean => selectedFacilities.value.findIndex(f => f === id) > -1

const loadMore = () => {
  limit.value += pageSize
}
</script>

<template>
<main class="mt-20">
  <div class="bg-orange-50 w-full" v-if="featuredHotel">
    <the-featured-hotel :hotel="featuredHotel" class="container" />
  </div>
  <div>
    <div class="container py-2">
      <div class="flex flex-wrap items-center gap-2">
        <div>
          <a class="w-full my-2 inline-block text-sm px-4 py-2 text-gray-800 rounded-md bg-orange-100 hover:bg-orange-200" @click="sortBy = sortBy === 'desc' ? 'asc' : 'desc'">
            <span v-if="sortBy === 'asc'" key="sorting-by">
              Price <arrow-up-icon class="w-4 h-4 inline-block" />
            </span>
            <span v-else>
              Price <arrow-down-icon class="w-4 h-4 inline-block" />
            </span>
          </a>
        </div>

        <form-select 
          :options="[5, 4, 3].map(f => ({value: f, selected: f === filterByRating, text: `${f} stars`}))" 
          :default-option="{ selected: !filterByRating, text: 'Rating', value: '' }" 
          @update="rating =>  filterByRating = rating" 
          useDefaultOption
        />

       <form-select 
          :options="provinces.map(f => ({value: f, selected: f === selectedProvince, text: f})).sort((a, b) => a.text.localeCompare(b.text))" 
          :default-option="{ selected: !selectedProvince, text: 'Select province', value: '' }" 
          @update="province => selectedProvince = province" 
          useDefaultOption
        />

        <form-select 
          :options="Object.values(facilities).map(f => ({value: f.id, selected: isFacilitySelected(f.id), text: f.text}))" 
          :default-option="{ selected: selectedFacilities.length === 0, text: 'Select facilities', value: '' }"
          @update="(facilityID) => applyFilterByFacilities(facilityID)" 
          useDefaultOption
        />
      </div>
    </div>

    <list-hotels :hotels="items" key="list-hotels" class="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4" />
    
    <div v-if="items.length > 0 && items.length < totalItems" class="flex justify-center py-2">
      <app-btn @click="loadMore()">Load more</app-btn>
    </div>
    <div v-if="items && items.length === 0" class="container">
      No hotels found. <a @click="selectedProvince = ''; selectedFacilities = []; filterByRating = 0" class="underline text-gray-800">Reset filters</a>?
    </div>
  </div>
</main>
</template>
