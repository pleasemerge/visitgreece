<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import FormSearchHotel from '@/components/FormSearchHotel.vue'
import { useRoute } from 'vue-router'
const route = useRoute()

let pageScrolled = ref(false)

const handleScroll = () => pageScrolled.value = window.scrollY > 0
window.addEventListener('scroll', handleScroll)

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
<nav :class="{
  'h-20 fixed top-0 w-full z-20 bg-primary transition-all duration-300': true,
  'bg-sky-300': pageScrolled
}">
  <div class="h-20 container mx-auto">
    <div class="flex justify-between items-center gap-4 h-20">
      <div class="flex gap-2 items-center">
        <router-link 
          :to="{ name: 'Home' }"
          :class="{
          'border-b-4 border-blue-300': route.name === 'Home',
          'border-orange-100 text-white': pageScrolled
        }">
          Home
        </router-link>
      </div>
      <form-search-hotel :pageScrolled="pageScrolled" />
    </div>
  </div>
</nav>
</template>
