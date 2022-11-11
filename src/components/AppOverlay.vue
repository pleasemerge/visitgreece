<script setup lang="ts">
import { useUiState } from '@/stores/uistate'
const showOverlay = useUiState()

</script>

<template>
<div class="fixed w-full h-screen bg-black bg-opacity-50" v-if="showOverlay">
  <slot></slot>
</div>
</template>
