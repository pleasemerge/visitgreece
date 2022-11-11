<script setup lang="ts">
interface Props {
  classNames?: string
}

const props = withDefaults(defineProps<Props>(), {
  classNames: 'inline-block bg-gradient-to-r from-secondary to-sky-400 opacity-100 hover:opacity-80 text-white px-4 py-2 rounded'
})
</script>

<template>
  <button :class="[classNames]">
    <slot></slot>
  </button>
</template>
