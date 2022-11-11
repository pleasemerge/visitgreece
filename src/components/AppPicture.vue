<script setup lang="ts">
interface Props {
  img: string,
  classNames?: string,
  width?: string | number
}

const props = defineProps<Props>()
</script>

<template>
<picture>
  <img :src="img" :class="['object-cover w-full', classNames]" :width="width" />
</picture>
</template>
