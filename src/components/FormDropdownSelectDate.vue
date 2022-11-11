<script setup lang="ts">
import { ref, Ref, defineEmits, watch } from 'vue'
import { ChevronDownIcon } from '@heroicons/vue/24/solid'
import { getMonthLocalString } from '@/helpers/time'
import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from '@headlessui/vue'

interface Props {
  title: string,
  defaultDate?: Date,
  dates: Date[]
}

const emits = defineEmits(['update'])

const props = defineProps<Props>()

const selectedDate: any = ref(props.defaultDate || new Date())

watch(selectedDate, (newVal, _oldVal) => {
  emits('update', newVal)
})
</script>

<template>
<div class="w-full">
  <span class="block font-bold">{{title}}</span>
  <span class="block text-gray-800 w-1/2 flex justify-between items-center">
    <div class="relative z-50">
      <Listbox 
        v-model="selectedDate"
      >
        <ListboxButton class="relative w-32 flex justify-between items-center">
          {{getMonthLocalString(selectedDate)}} {{selectedDate.getDate()}}
          <ChevronDownIcon class="h-4 w-4" /></ListboxButton>
        <ListboxOptions class="absolute w-32 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 border">
          <ListboxOption 
            v-for="(date, index) in dates"
            :key="index"
            :value="date"
            class="p-2 hover:bg-orange-200 transition-colors duration-200"
          >
            {{getMonthLocalString(date)}} {{date.getDate()}}
          </ListboxOption>
        </ListboxOptions>
      </Listbox>
    </div>
  </span>
</div>
</template>
