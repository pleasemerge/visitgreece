import { defineStore } from 'pinia'
import { IHotel, Tour } from '@/types'
import { useUiState } from '@/stores/uistate'

type RootState = {
  hotel: IHotel,
  tour: Tour,
  checkInDate: Date,
  checkOutDate: Date,
  tourStartDate: number,
  step: number,
  guests: number,
  rooms: number,
  name: string,
  email: string,
  phoneNumber: string
}

export const useBookingStore = defineStore('bookingStore', {
  state: () => ({
    hotel: {},
    tour: {},
    checkInDate: new Date(),
    checkOutDate: new Date(),
    name: '',
    email: '',
    phoneNumber: '',
    step: 1,
    rooms: 1,
    guests: 1
  } as RootState),
  actions: {
    showBookingHotelModal (hotel: IHotel) {
      const uiState = useUiState()
      this.setHotel(hotel)
      uiState.toggleOverlay()
      uiState.toggleHotelBookingModal()
    },
    showTourBookingModal (tour: Tour) {
      const uiState = useUiState()
      this.setTour(tour)
      uiState.toggleOverlay()
      uiState.toggleTourBookingModal()
    },
    setHotel (hotel: IHotel) {
      this.hotel = hotel
    },
    setTour (tour: Tour) {
      this.tour = tour
    },
    setStep (step: number) {
      this.step = step
    },
    setCheckInDate (date: Date) {
      this.checkInDate = date
    },
    setCheckOutDate (date: Date) {
      this.checkOutDate = date
    },
    setGuests (guests: number) {
      this.guests = guests
    },
    setRooms (rooms: number) {
      this.rooms = rooms
    },
    setName (name: string) {
      this.name = name
    },
    setEmail (email: string) {
      this.email = email
    },
    setPhoneNumber (phoneNumber: string) {
      this.phoneNumber = phoneNumber
    },
    reset () {
      this.step = 1
      this.checkInDate = new Date()
      this.checkOutDate = new Date()
      this.guests = 1
      this.rooms = 1
      this.name = ''
      this.email = ''
      this.phoneNumber = ''
    }
  },
  getters: {
    rentingPeriod: (state: RootState) => {
      return Math.floor((Date.parse(state.checkOutDate.toDateString()) - Date.parse(state.checkInDate.toDateString())) / 86400000)
    },
    totalPayment (state: RootState) : number {
      if (this.hotel && this.hotel.id) {
        const amount = ((this.rentingPeriod * state.hotel.price) * state.guests) * state.rooms
        return amount > 0 ? amount : 0
      } else {
        return this.tour.itinerary.reduce((total, ininerary, _useless) => {
          return total += ininerary.days * ininerary.hotel.price
        }, 0)
      }
    }
  }
})
