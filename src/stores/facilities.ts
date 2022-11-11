import { HotelFacilities } from '@/types'

export const facilities: HotelFacilities = [
  {
    id: 1,
    icon: `${new URL('../assets/img/icons/wifi.png', import.meta.url).href}`,
    text: 'wifi'
  },
  {
    id: 2,
    icon: `${new URL('../assets/img/icons/restaurant.png', import.meta.url).href}`,
    text: 'restaurant'
  },
  {
    id: 3,
    icon: `${new URL('../assets/img/icons/swimming_pool.png', import.meta.url).href}`,
    text: 'swimming pool'
  },
  {
    id: 4,
    icon: `${new URL('../assets/img/icons/spa_resort.png', import.meta.url).href}`,
    text: 'spa resort'
  },
  {
    id: 5,
    icon: `${new URL('../assets/img/icons/fitness.png', import.meta.url).href}`,
    text: 'fitness-center'
  }
]
