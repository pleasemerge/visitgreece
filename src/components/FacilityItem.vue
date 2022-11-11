<script setup lang="ts">
import { HotelFacilityDescription } from '@/types'

interface Props {
  facility: HotelFacilityDescription,
  classNames?: string,
  bgColor?: string,
}

const props = withDefaults(defineProps<Props>(), {
  bgColor: 'bg-orange-100'
})
</script>

<template>
<a 
  :class="[
    'flex gap-2 items-center px-4 py-2 text-sm rounded-md transition-colors duration-200 hover:bg-opacity-70 text-gray-900', 
    classNames || '', 
    bgColor
  ]" 
>
  <div>
    <img :src="facility.icon" width="20" />
  </div>
  <div>
    {{facility.text}}
  </div>
</a>
</template>
