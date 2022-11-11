import { defineStore } from 'pinia'

export const useUiState = defineStore('uistore', {
  state: () => {
    return {
      showHotelBookingModal: false,
      showTourBookingModal: false,
      showOverlay: false
    }
  },
  actions: {
    toggleOverlay () {
      this.showOverlay = !this.showOverlay
    },
    toggleHotelBookingModal () {
      this.showHotelBookingModal = !this.showHotelBookingModal
    },
    toggleTourBookingModal () {
      this.showTourBookingModal = !this.showTourBookingModal
    }
  }
})
