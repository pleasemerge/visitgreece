<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import {  MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
import { hotels, randomHotel } from '@/stores/hotels'
import AppBtn from '@/components/AppBtn.vue'

const router = useRouter()

interface Props {
  pageScrolled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  pageScrolled: false
})

const searchString = ref('')

const search = () => {
  if (searchResults.value[selectedHotelIndex.value]) {
    searchString.value = searchResults.value[selectedHotelIndex.value]
  }
  router.push({ name: 'list-hotels', query: { search: searchString.value }, replace: true })
  searchString.value = ''
  selectedHotelIndex.value = -1
}

const hotelsData = hotels.map(hotel => hotel.name)

const searchResults = computed(() => {
  if (searchString.value === '') return []
  return hotelsData.filter(hotelName => hotelName.includes(searchString.value))
})

const selectedHotelIndex = ref(-1)
</script>

<template>
<div class="relative flex bg-white items-center rounded-md">
  <magnifying-glass-icon class="w-4 h-4 bg-white ml-2 text-gray-600" />
  <input 
    v-model="searchString"
    type="text" 
    :class="['search-input px-4 py-2 w-64 bg-white text-gray-800']" 
    :placeholder="`${randomHotel.name}`" 
    v-on:keyup.enter="search()"
    v-on:keyup.down="(selectedHotelIndex + 1) < searchResults.length && selectedHotelIndex++"
    v-on:keyup.up="(selectedHotelIndex - 1) > -1 && selectedHotelIndex--"
    v-on:keyup.esc="selectedHotelIndex = -1; searchString = ''"
  />
  <app-btn 
    :classNames="`px-2 py-2 rounded-tr-md rounded-br-md  ${ pageScrolled ? 'bg-orange-200 text-gray-700' : 'bg-sky-400 text-white' }`"
    @click="search()"
  >
    Search
  </app-btn>

  <div class="absolute w-full top-10 rounded-bl-md rounded-br-md border left-0 bg-white flex flex-wrap" v-if="searchResults.length > 0">
    <div v-for="(hotelName, index) of searchResults" :key="index" class="w-full">
      <router-link 
        :to="{ name: 'show-hotel', params: { name: hotelName } }" 
        :class="['block w-full py-1 px-4  mt-b hover:bg-orange-100 transition-colors duration-200', selectedHotelIndex === index ? 'bg-orange-100' : '']"
      >
        {{hotelName}}
      </router-link>
    </div>
  </div>
</div>
</template>
