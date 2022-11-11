import { Hotel, IHotel,  HotelFacilityDescription } from '@/types'
import { facilities } from '@/stores/facilities'
import { defineStore } from 'pinia'
import { generateComments } from '@/helpers/seed'
import { faker } from '@faker-js/faker'
import _ from 'underscore'

interface RootState {
  hotels: IHotel[]
}

export const useHotelsStore = defineStore('hotels', {
  state: () => ({
    hotels: hotels
  } as RootState),
  getters: {
    featured: (state) => state.hotels.filter(h => h.featured === true),
    getByID: (state) => (id: number) => state.hotels.find(h => h.id === id)
  }
})

const data = [
  ['Divine Cave Experience', 'Imerovigli', 'divine_cave_experience.jpg'],
  ['Cresanto Luxury Suites', 'Imerovigli', 'cresanto_luxury_suites.jpg'],
  ['Stella Rocca A Mare', 'Imerovigli', 'stella_rocca_a_mare.jpg'],
  ['Lagon Life Spirit Boutique', 'Crete', 'lagon_life_spirit_boutique.jpg'],
  ['Royal Sun', 'Crete', 'royal_sun.jpg'],
  ['Makedonia Palace', 'Crete', 'makedonia_palace.jpg'],
  ['KYMANI Boutique Hotel & Suites', 'Crete', 'kymani_boutique_hotel.jpg'],
  ['Grand Hotel Palace', 'Thessaloniki', 'grand_hotel_palace.jpg'],
  ['The Dome Luxury', 'Thasos', 'the_dome_luxury.jpg'],
  ['Paradision Hotel', 'Tourlos', 'paradision_hotel.jpg'],
  ['Megas Rooms', 'Tourlos', 'megas_rooms.jpg'],
  ['Paradisia Villas', 'Tourlos', 'paradisia_villas.jpg'],
  ['Secret Island', 'Tourlos', 'secret_island.jpg'],
  ['Life Suites', 'Tourlos', 'life_suites.jpg'],
  ['Deliades Hotel', 'Ornos', 'deliades_hotel.jpg'],
  ['Mykonos Cactus', 'Ornos', 'mykonos_cactus.jpg'],
  ['Adorno Beach Hotel', 'Ornos', 'adorno_beach_hotel.jpg'],
  ['Harma Boutique Hotel', 'Hersonissos', 'harma_boutique.jpg'],
  ['Niriides Villas', 'Hersonissos', 'niriides_villas.jpg'],
  ['Sea Breeze Hotel', 'Hersonissos', 'sea_breeze_hotel.jpg'],
  ['Kassavetis Center', 'Hersonissos', 'kassavetis_center.jpg'],
  ['Onira Suite Dreams', 'Hersonissos', 'onira_suite_dreams.jpg'],
  ['Villa Diktynna', 'Hersonissos', 'villa_diktynna.jpg'],
  ['Chandris Apartments', 'Corfu', 'chandris_apartments.jpg'],
  ['Villa Kerkyra', 'Corfu', 'villa_kerkyra.jpg'],
  ['Agallis Corfu Residence', 'Corfu', 'agallis_corfu_residence.jpg'],
  ['Villa Politia', 'Athens', 'villa_politia.jpg'],
  ['Hapimag Apartments', 'Athens', 'hapimag_apartments.jpg'],
  ['The Stanley', 'Athens', 'the_stanley.jpg'],
  ['Urban Nest', 'Athens', 'urban_nest.jpg'],
]

const seedHotels = () => {  
  let id = 1
  const result: Hotel[] = []
  for (const hotel of data) {
    const [name, province, imgSrc] = hotel
    const hotelFacilities: HotelFacilityDescription[] = _.reduce(_.range(Object.keys(facilities).length), (acc, _current) : HotelFacilityDescription[] => {
      const randomFacility = _.sample(facilities)
      if (acc.find(f => f.id === randomFacility?.id)) return acc
      randomFacility && acc.push(randomFacility)
      return acc
    }, [] as HotelFacilityDescription[])

    result.push(new Hotel({
      id,
      name,
      imgSrc: new URL(`../assets/img/hotels/${imgSrc}`, import.meta.url).href,
      province,
      rating: _.random(3, 5),
      featured: !!_.random(0, 1),
      facilities: hotelFacilities,
      price: _.random(30, 150),
      about: faker.lorem.paragraph(),
      comments: generateComments(_.random(5, 25))
    }))
    id++
  }
  return result
}

export const hotels = seedHotels()

export const featuredHotels = hotels.filter(hotel => hotel.featured).slice(0, 3)
export const featuredHotel = hotels.find(h => h.featured)
