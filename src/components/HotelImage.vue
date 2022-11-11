<script setup lang="ts">
import AppPicture from '@/components/AppPicture.vue'

interface Props {
  imgSrc: string
}

const props = defineProps<Props>()
</script>

<template>
<app-picture :img="imgSrc" classNames="w-full h-72 hover:scale-110 transiton-all duration-500" />
</template>
