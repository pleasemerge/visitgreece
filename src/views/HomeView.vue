<template>
  <main>
    <div class="hero-wrapper w-full">
      <div class="container ">
        <the-hero />
      </div>
    </div>

    <div class="container my-2 md:my-4">
      <the-promo/>
    </div>

    <div class="featured-hotels-wrapper mt-16">
      <div class="container">
        <the-featured-hotels class="py-4 md:py-8" />
        <div class="pb-4 md:pb-8 text-gray-800 text-center">
          <router-link :to="{ name: 'list-hotels' }" class="underline">View all</router-link>
        </div>
      </div>
    </div>

    <div class="container">
      <the-featured-tours />
    </div>

    <div class="container ">
      <the-special-deal class="my-4 md:my-8" />
    </div>
  </main>
</template>

<script setup lang="ts">
import TheHero from '@/components/TheHero.vue'
import ThePromo from '@/components/ThePromo.vue'
import TheFeaturedHotels from '@/components/TheFeaturedHotels.vue'
import TheFeaturedTours from '@/components/TheFeaturedTours.vue'
import TheSpecialDeal from '@/components/TheSpecialDeal.vue'
</script>

<style scoped>
.hero-wrapper, .featured-hotels-wrapper {
  background-color: #FFE6CC;
}
</style>
