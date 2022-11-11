import { defineStore } from 'pinia'
import { Tour, IHotel, Itinerary } from '@/types'
import { hotels } from '@/stores/hotels'
import { faker } from '@faker-js/faker'

export const useToursStore = defineStore('tours', {
  state: () => ({
    tours: tours
  })
})

const addDays = (date: Date, days: number) : Date => {
  return new Date(date.setDate(date.getDate() + days))
}


export const tours: Tour[] = [
  new Tour({
    img: new URL('../assets/img/hotels/khaosan_palace_hotel.jpg', import.meta.url).href,
    name: 'Best of Crete',
    description: faker.lorem.paragraph(),
    startDate: addDays(new Date(), 5),
    itinerary: [
      { hotel: hotels[3], days: 2 },
      { hotel: hotels[1], days: 5 }
    ]
  }),
  new Tour({
    img: new URL('../assets/img/hotels/divine_cave_experience.jpg', import.meta.url).href,
    name: 'Best of Thasos',
    description: faker.lorem.paragraph(),
    startDate: addDays(new Date(), 3),
    itinerary: [
      { hotel: hotels[8], days: 1 },
      { hotel: hotels[4], days: 4 }
    ],
    featured: true
  }),
  new Tour({
    img: new URL('../assets/img/hotels/stella_rocca_a_mare.jpg', import.meta.url).href,
    name: 'Best of Imerovigli',
    description: faker.lorem.paragraph(),
    startDate: addDays(new Date(), 2),
    itinerary: [
      { hotel: hotels[0], days: 2 },
      { hotel: hotels[4], days: 5 }
    ]
  })
]

export const featuredTour = tours.find(tour => tour.featured === true)
