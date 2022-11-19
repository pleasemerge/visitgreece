import { faker } from '@faker-js/faker'
import { IUser, IComment, IImage } from '@/types'
import _ from 'underscore'

const generateUser = () : IUser => {
  return {
    name: faker.internet.userName(),
    userpic: faker.image.avatar()
  }
}

export const generateComments = (amount: number) : IComment[] => {
  let comments = []
  for (let i = 0; i < amount; i++) {
    comments.push({
      user: generateUser(),
      text: faker.lorem.sentence(),
      rating: _.random(1, 5),
      date: new Date()
    })
  }
  return comments
}

export const generateImages = (amount: number) : IImage[] => {
  let images = []
  for (let i = 0; i < amount; i++) {
    images.push({
      src: `${faker.image.cats()}?random=${Date.now() + i}`
    })
  }
  return images
}
