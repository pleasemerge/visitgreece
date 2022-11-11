<template>
<div>
  <h3 class="text-xl opacity-90">
    <router-link :to="{ name: 'show-hotel', params: { name } }">{{name}}</router-link>
  </h3>
</div>
</template>

<script setup lang="ts">
interface Props {
  name: string
}

const props = defineProps<Props>()
</script>
