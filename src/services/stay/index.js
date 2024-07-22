const { DEV, VITE_LOCAL } = import.meta.env

import {
  makeId,
  getRandomLabels,
  getRandomImgUrls,
  getRandomKilometersAway,
  getDateRange,
  generateRandomReviews,
  getRandomIntInclusive,
  getRandomElement,
  getRandomLocation,
} from '../util.service'
import {
  names,
  types,
  countries,
  cities,
  labels,
  imgUrls,
} from '../data.service'

import { stayService as local } from './stay.service.local'
import { stayService as remote } from './stay.service.remote'

function getEmptyStay({ price = getRandomIntInclusive(20, 300) } = {}) {
  const name = getRandomElement(names)
  const type = getRandomElement(types)
  const loc = getRandomLocation()
  const reviews = generateRandomReviews(5)

  return {
    name,
    type,
    imgUrls: getRandomImgUrls(imgUrls),
    price,
    summary: 'Fantastic duplex apartment...',
    capacity: Math.floor(Math.random() * 10) + 1,
    beds: Math.floor(Math.random() * 6) + 1,
    amenities: [
      'TV',
      'Wifi',
      'Kitchen',
      'Smoking allowed',
      'Pets allowed',
      'Cooking basics',
    ],
    labels: getRandomLabels(labels),
    loc,
    reviews,
    kilometersAway: getRandomKilometersAway(),
    dateRange: getDateRange(),
    likedByUsers: ['mini-user'],
    owner: {
      _id: makeId(),
      fullname: 'Default Owner',
    },
  }
}

function getDefaultFilter() {
  return {
    txt: '',
    // minSpeed: '',
    // sortField: '',
    // sortDir: '',
  }
}

const service = VITE_LOCAL === 'true' ? local : remote
export const stayService = { getEmptyStay, getDefaultFilter, ...service }

if (DEV) window.stayService = stayService
