<script setup lang="ts">
import { ref, computed, defineEmits, watch } from 'vue'
import { Field, Form, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import { useBookingStore } from '@/stores/booking'

import AppBtn from '@/components/AppBtn.vue'
import FormDropdownSelectDate from '@/components/FormDropdownSelectDate.vue'
import FormDropdown from '@/components/FormDropdown.vue'

const emit = defineEmits(['closeForm'])

const booking = useBookingStore()

const name = ref(booking.name)
const email = ref(booking.email)
const phoneNumber = ref(booking.phoneNumber)

const getDatesArr = (fromDate: Date, limit: number) => {
  let current = new Date(fromDate)
  const endDate = new Date(current)
  endDate.setDate(current.getDate() + limit)
  let result = []
  while (current < endDate) {
    result.push(new Date(current))
    current.setDate(current.getDate() + 1)
  }
  return result
}

const checkInDates = getDatesArr(booking.checkInDate, 30)

const checkOutDates = computed(() => {
 return getDatesArr(booking.checkInDate, 30).filter(date => date > booking.checkInDate)
})

const bookingDetailsformValidationSchema = yup.object({
  name: yup.string().required().label('Name'),
  email: yup.string().required().email().label('Email')
})

const onBookingDetailsFormSubmit = (_values: any, actions: any) => {
  if (booking.rentingPeriod <= 0) {
    return actions.setErrors({
      'period-err': 'Select correct period'
    })
  }
  booking.setStep(2, 'hotel')
}

</script>

<template>
<div>
  <div class="flex justify-between my-2">
    <div class="w-1/2">
      <form-dropdown-select-date title="Check In" :default-date="booking.checkInDate" :dates="checkInDates" @update="booking.setCheckInDate" />
    </div>
    
    <div class="w-1/3">
      <form-dropdown-select-date title="Check out" :default-date="booking.checkOutDate" :dates="checkOutDates" @update="booking.setCheckOutDate" />
    </div>
  </div>

  <div class="flex justify-between mt-4 mb-2">
    <div class="w-1/2">
      <form-dropdown :values="[1, 2, 3, 4, 5]" title="Guests" :default-value="booking.guests" @update="booking.setGuests" />
    </div>
    <div class="w-1/3">
      <form-dropdown :values="[1, 2, 3, 4, 5]" title="Rooms" :default-value="booking.rooms" @update="booking.setRooms" />
    </div>
  </div>

  <div class="my-4">
    Total: <span class="font-bold">${{booking.totalHotelPayment}}</span>
  </div>

  <Form :validation-schema="bookingDetailsformValidationSchema" @submit="onBookingDetailsFormSubmit" class="py-4 flex flex-wrap gap-2">
    <div class="w-full">
      <Field name="name" type="text" v-model="name" @input="booking.setName($event.target.value)" placeholder="John Doe" class="w-full p-2 border border-gray-300" />
      <ErrorMessage name="name" class="text-red-500" />
    </div>
    <div class="w-full">
      <Field type="email" name="email" v-model="email" @input="booking.setEmail($event.target.value)" placeholder="me@example.com" class="w-full p-2 border border-gray-300" />
      <ErrorMessage name="email" class="text-red-500" />
    </div>
    <div class="w-full">
      <Field type="tel" name="phone-number" v-model="phoneNumber" @input="booking.setPhoneNumber($event.target.value)" placeholder="Phone number" class="w-full p-2 border border-gray-300" />
    </div>
    <div class="w-full">
      <ErrorMessage name="period-err" class="text-red-500" />
    </div>
    <div class="pt-2">
      <app-btn type="submit">Make payment</app-btn>
      <a @click="emit('closeForm')" class="px-4 underline">Cancel</a>
    </div>
  </Form>
</div>
</template>
