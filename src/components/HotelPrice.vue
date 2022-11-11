<script setup lang="ts">
interface Props {
  price: number
}

const props = defineProps<Props>()
</script>

<template>
<span>
  <span class="font-bold">
    ${{price.toFixed(2)}}
  </span>
  /night
</span>
</template>
