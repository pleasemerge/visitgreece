<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useHotelsStore } from '@/stores/hotels'
import FeaturedHotel from '@/components/HotelFeatured.vue'
import NotFound from '@/components/NotFound.vue'
import { StarIcon } from '@heroicons/vue/24/solid'

const route = useRoute()
const hotelsStore = useHotelsStore()
const hotel = hotelsStore.hotels.find(h => h.name === route.params.name)

</script>

<template>
<div>
  <div v-if="hotel">
    <div class="py-4 bg-orange-50">
      <featured-hotel :hotel="hotel" class="container" />
    </div>
    <div v-if="hotel.comments && hotel.comments.length > 0" class="container my-4">
      <h1 class="text-3xl py-4">Reviews</h1>
      <div v-for="(comment, index) of hotel.comments" :key="index" class="p-4 bg-white mb-2 border border-gray-200 rounded-md w-full flex flex-wrap">
        <div class="w-full flex items-center flex-wrap justify-between">
          <div>
            <img :src="comment.user.userpic" width="40" class="inline-block rounded-full" />
            <span class="font-bold px-4">{{comment.user.name}}</span>
          </div>
          <div>
            <star-icon class="inline-block w-4 h-4 text-amber-400" v-for="star in comment.rating" :key="star" />
          </div>
        </div>
        <div>
          <p class="text-gray-700 py-4">
            {{comment.text}}
          </p>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <not-found />
  </div>
</div>
</template>
