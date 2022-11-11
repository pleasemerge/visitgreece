<script setup lang="ts">
import { ChevronDoubleRightIcon } from '@heroicons/vue/24/outline'
import AppBtn from '@/components/AppBtn.vue'
</script>

<template>
<app-btn>
  <slot></slot>
  <ChevronDoubleRightIcon class="inline-block ml-2 w-5 h-5" />
</app-btn>
</template>
