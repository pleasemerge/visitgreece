<template>
  <app-navbar />
  
  <app-overlay class="z-30 h-full" v-if="appUiState.showOverlay">
    <TransitionGroup @before-enter="transitions.beforeEnter" @enter="transitions.enter" :css="false" appear name="list">
      <modal-booking v-if="UIState.showHotelBookingModal" key="transition-booking-form" />
      <modal-booking-tour v-if="UIState.showTourBookingModal" key="transition-tour-booking-form" />
    </TransitionGroup>
  </app-overlay>
  
  <div class="fixed top-4 right-2 flex flex-wrap z-50 w-64">
    <TransitionGroup @before-enter="transitions.beforeEnter" @enter="transitions.enter" :css="false" appear name="list">
      <div v-for="(toast, index) of toastsStore.toasts" :key="index" class="bg-gray-800 px-4 py-4 z-50 text-white rounded-md mb-2">
        {{toast.text}}
        <a class="underline" @click="toastsStore.hideImmediatly(toast.id)">
          <x-mark-icon class="w-5 h-5 self-center inline-block" />
        </a>
      </div>
    </TransitionGroup>
  </div>
  <div class="mt-20">
    <RouterView />
  </div>
  <div>
    <app-footer class="mt-32" />
  </div>
</template>

<script setup lang="ts">
import { useUiState } from '@/stores/uistate'
import AppNavbar from '@/components/TheNavbar.vue'
import AppOverlay from '@/components/AppOverlay.vue'
import ModalBooking from '@/components/ModalBooking.vue'
import ModalBookingTour from '@/components/ModalBookingTour.vue'
import gsap from 'gsap'
import { useToasts } from '@/stores/toasts'
import { XMarkIcon } from '@heroicons/vue/24/solid'
import AppFooter from '@/components/TheFooter.vue'

const toastsStore = useToasts()
const UIState = useUiState()

const transitions = {
  beforeEnter: (el: any) => {
    el.style.transform = 'translateY(-30px)'
    el.style.opacity = 0
  },
  enter: (el: any) => {
    gsap.to(el, {
      duration: 1.2,
      delay: el.dataset.index * 0.5,
      y: 0,
      opacity: 1
    })
  }
}

const appUiState = useUiState()
</script>

