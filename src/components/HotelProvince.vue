<template>
<div class="opacity-70">
  {{province}}
</div>
</template>

<script setup lang="ts">
interface Props {
  province: string
}

const props = defineProps<Props>()
</script>
