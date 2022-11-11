<script setup lang="ts">
import { ref, Ref, watch, defineEmits } from 'vue'
import { ChevronDownIcon } from '@heroicons/vue/24/solid'
import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from '@headlessui/vue'

interface Props {
  title: string,
  defaultValue: number | string,
  values: number[] | string[]
}

const emit = defineEmits(['update'])


const props = defineProps<Props>()

const selectedValue: Ref<string | number> = ref(props.defaultValue || props.values[0])

watch(selectedValue, (newVal, _oldVal) => {
  emit('update', newVal)
})
</script>

<template>
<div class="w-full">
  <span class="block font-bold">{{title}}</span>
  <span class="block text-gray-800 w-1/2 flex justify-between items-center">
    <div class="relative z-40">
      <Listbox v-model="selectedValue">
        <ListboxButton class="relative w-32 flex justify-between items-center">{{selectedValue}} <ChevronDownIcon class="h-4 w-4" /></ListboxButton>
        <ListboxOptions class="absolute w-32 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 border">
          <ListboxOption 
            v-for="(dropdownValue, index) in values"
            :key="index"
            :value="dropdownValue"
            class="p-2 hover:bg-orange-200 transition-colors duration-200"
          >
            <a @click="selectedValue = dropdownValue">{{dropdownValue}}</a>
          </ListboxOption>
        </ListboxOptions>
      </Listbox>
    </div>
  </span>
</div>
</template>
