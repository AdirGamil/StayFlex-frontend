const { DEV, VITE_LOCAL } = import.meta.env

import {
  makeId,
  getRandomLabels,
  getRandomImgUrls,
  getRandomKilometersAway,
  getDateRange,
  generateRandomReviews,
  getRandomIntInclusive,
} from '../util.service'
import {
  names,
  types,
  countries,
  cities,
  labels,
  imgUrls,
} from '../dataService'

import { stayService as local } from './stay.service.local'
import { stayService as remote } from './stay.service.remote'

function getEmptyStay({ price = getRandomIntInclusive(20, 300) } = {}) {
  const name = names[Math.floor(Math.random() * names.length)]
  const type = types[Math.floor(Math.random() * types.length)]
  const countryObj = countries[Math.floor(Math.random() * countries.length)]
  const country = countryObj.name
  const continent = countryObj.continent
  const city = cities[country]
    ? cities[country][Math.floor(Math.random() * cities[country].length)]
    : 'Unknown city'
  const address = `${Math.floor(Math.random() * 100)} ${
    [
      'Main',
      'Broad',
      'Market',
      'Elm',
      'Maple',
      'Oak',
      'Pine',
      'Cedar',
      'Birch',
      'Spruce',
      'Willow',
    ][Math.floor(Math.random() * 11)]
  } st`
  const lat = parseFloat((Math.random() * 180 - 90).toFixed(5))
  const lng = parseFloat((Math.random() * 360 - 180).toFixed(5))
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
    loc: {
      country,
      countryCode: country.substring(0, 2).toUpperCase(),
      city,
      address,
      lat,
      lng,
      continent,
    },
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
