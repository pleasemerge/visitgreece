<script setup lang="ts">
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import { CheckIcon, ChevronDownIcon } from '@heroicons/vue/20/solid'
import { defineEmits } from 'vue'

const emit = defineEmits(['update'])

interface Option {
  value: any,
  selected?: boolean,
  text?: string
}

interface Props {
  options: Option[],
  defaultOption: Option,
  useDefaultOption?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  defaultOption: () => ({ value: '', selected: true, text: 'Select' }),
  useDefaultOption: false
})

</script>

<template>
<Listbox v-slot="{ open }">
  <div class="relative">
    <ListboxButton class="py-2 px-4 rounded-md border border-gray-100 bg-orange-100 hover:bg-orange-200 transition-colors duration-100">
      {{defaultOption.text}} <ChevronDownIcon class="w-3 h-3 inline-block" />
    </ListboxButton>

    <transition
      enter-from-class="opacity-0"
      enter-active-class="transition duration-200 ease-in"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <ListboxOptions class="absolute mt-1 w-64 overflow-auto rounded-md bg-white border z-50 bg-orange-100  flex flex-wrap">
        <ListboxOption v-if="useDefaultOption" value="" v-slot="{ active }" class="w-full">
          <div 
            :class="[
              'flex items-center py-2 px-2 transition-colors duration-100', 
              active ? 'bg-orange-100' : 'bg-white'
            ]"
            @click="emit('update', '')"
          >
            <span
              v-if="defaultOption.selected"
              class="absolute flex items-center left-2 inline-block text-amber-600"
            >
              <CheckIcon class="h-5 w-5" aria-hidden="true" />
            </span>
            <a class="px-6">
              All
            </a>
          </div>
        </ListboxOption>

        <ListboxOption 
          v-for="option in options" 
          :key="option.value" 
          :value="option.value"
          class="z-50 w-full hover:bg-white"
        >
          <div 
            :class="[
              'flex items-center py-2 px-2 transition-colors duration-200', 
              option.selected ? 'bg-orange-100 hover:bg-orange-50' : 'bg-white hover:bg-orange-100'
            ]"
            @click="emit('update', option.value)"
          >
            <span
              v-if="option.selected"
              class="absolute flex items-center left-2 inline-block text-amber-600"
            >
              <CheckIcon class="h-5 w-5" aria-hidden="true" />
            </span>
            <a class="px-6">
              {{option.text}}
            </a>
          </div>
        </ListboxOption>
      </ListboxOptions>
    </transition>
  </div>
</Listbox>
</template>
