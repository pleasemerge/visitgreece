<script setup lang="ts">
import { StarIcon } from '@heroicons/vue/24/solid'

interface Props {
 rating: number
}

const props = defineProps<Props>()
</script>

<template>
<div class="flex">
  <star-icon class="inline-block w-4 h-4 text-amber-400" v-for="star in rating" :key="star" />
</div>
</template>