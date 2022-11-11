<template>
<nav :class="{
  'h-20 fixed top-0 w-full z-20 bg-primary transition-all duration-300': true,
  'bg-sky-300 text-white': pageScrolled
}">
  <div class="h-20 container mx-auto">
    <div class="flex justify-between md:justify-end items-center gap-4 h-20">
      <div class="flex gap-2">
        <router-link 
          :to="{ name: 'Home' }"
          :class="{
          'border-b-4 border-blue-300': route.name === 'Home',
          'border-orange-100': pageScrolled
        }">
          Home
        </router-link>
      </div>
      
      <div class="ml-2">
        <app-btn :class="{
          'bg-primary': pageScrolled
        }">
          <router-link :to="{ name: 'list-hotels' }">Hotels</router-link>
        </app-btn>
      </div>
    </div>
  </div>
</nav>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import AppBtn from '@/components/AppBtn.vue'
import { useRoute } from 'vue-router'
const route = useRoute()

let pageScrolled = ref(false)

const handleScroll = () => pageScrolled.value = window.scrollY > 0
window.addEventListener('scroll', handleScroll)

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
