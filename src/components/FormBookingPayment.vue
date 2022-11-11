<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import { useBookingStore } from '@/stores/booking'
import { Field, Form, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import AppBtn from '@/components/AppBtn.vue'
import { useToasts } from '@/stores/toasts'

const toastsStore = useToasts()
const booking = useBookingStore()
const emit = defineEmits(['closeForm'])

const nameOnCard = ref('')
const cardNumber = ref('')
const cardExpiresAt = ref('')
const cardSecurityCode = ref('')

const paymentFormValidationSchema = yup.object({
  'card-number': yup.string().required().label('Card number'),
  'name-on-card': yup.string().required().label('Name on card'),
  'card-expiration-date': yup.string().required().label('Expiration date'),
  'card-security-code': yup.string().required().label('Security code')
})

const masterCardIconSrc = new URL('../assets/img/icons/mastercard.png', import.meta.url).href
const visaIconSrc = new URL('../assets/img/icons/visa.png', import.meta.url).href
</script>

<template>
<div>
  <div class="flex justify-between items-center py-2">
    <div>
      <span class="text-xl font-bold">Payment</span>
    </div>
    <div class="flex">
      <span><img :src="masterCardIconSrc" /></span>
      <span><img :src="visaIconSrc" /></span>
    </div>
  </div>
  <div>
    Total: ${{booking.totalPayment}}
  </div>

  <Form class="py-4 flex flex-wrap gap-2" :validation-schema="paymentFormValidationSchema">
    <div class="w-full p-2 border">
      <span class="block font-medium">Card number</span>
      <Field name="card-number" v-model="cardNumber" type="text" placeholder="1234 1234 1234 1234" class="w-full" />
      <ErrorMessage name="card-number" class="text-red-500" />
    </div>
    <div class="w-full p-2 border">
      <span class="block font-medium">Name on card</span>
      <Field name="name-on-card" v-model="nameOnCard" type="text" placeholder="John Doe" class="w-full" />
      <ErrorMessage name="name-on-card" class="text-red-500" />
    </div>
    <div class="flex w-full gap-2">
      <div class="w-1/2 border p-2">
        <span class="block font-medium">Expiration date</span>
        <Field name="card-expiration-date" v-model="cardExpiresAt" type="text" placeholder="05/25" class="w-full" />
        <ErrorMessage name="card-expiration-date" class="text-red-500" />
      </div>
      <div class="w-1/2 border p-2">
        <span class="block font-medium">Security code</span>
        <Field name="card-security-code" v-model="cardSecurityCode" type="password" placeholder="123" class="w-full" />
        <ErrorMessage name="card-security-code" class="text-red-500" />
      </div>
    </div>
  </Form>

  <div class="flex justify-between flex-wrap items-center">
    <div class="flex items-center gap-2">
      <app-btn @click="toastsStore.showToast('Not implemented')">Pay now</app-btn>
      <app-btn class-names="bg-gray-400 rounded-md text-white px-4 py-2" @click="booking.setStep(1)">Back</app-btn>
    </div>
    
    <div>
      <a @click="emit('closeForm')" class="px-4 underline">Close</a>
    </div>
  </div>
</div>
</template>
