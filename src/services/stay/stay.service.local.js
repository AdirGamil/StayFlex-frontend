import { storageService } from '../async-storage.service'
import { userService } from '../user'

import {
  makeId,
  makeLorem,
  getRandomLabels,
  getRandomImgUrls,
  getRandomKilometersAway,
  getDateRange,
  loadFromStorage,
  saveToStorage,
  generateRandomReviews,
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
} from '../dataService'

const STORAGE_KEY = 'stayDB'
var gStays
_createStays(4)

export const stayService = {
  query,
  getById,
  save,
  remove,
}
window.cs = stayService

async function query(filterBy = {
  txt: '', label: '', startDate: '', endDate: '', minPrice: 10, maxPrice: 570}
) {
  var stays = await storageService.query(STORAGE_KEY)
  const { txt, label, startDate, endDate } = filterBy

  if (txt) {
    const regex = new RegExp(txt, 'i')
    stays = stays.filter(
      (stay) => regex.test(stay.loc.city) || regex.test(stay.loc.country)
    )
  }

  if (label) {
    stays = stays.filter((stay) => stay.labels.includes(label))
  }

  if (startDate && endDate) {
    const filterStartDate = new Date(startDate)
    const filterEndDate = new Date(endDate)

    stays = stays.filter((stay) => {
      const [startStr, endStr] = stay.dateRange.split(' - ')
      const stayStartDate = new Date(`${startStr} ${new Date().getFullYear()}`)
      const stayEndDate = new Date(`${endStr} ${new Date().getFullYear()}`)

      return (
        (stayStartDate >= filterStartDate && stayStartDate <= filterEndDate) ||
        (stayEndDate >= filterStartDate && stayEndDate <= filterEndDate) ||
        (stayStartDate <= filterStartDate && stayEndDate >= filterEndDate)
      )
    })

    if (minPrice !== undefined && maxPrice !== undefined) {
      stays = stays.filter((stay) => stay.price >= minPrice && stay.price <= maxPrice)
    }
  }

  return stays
}

function getById(stayId) {
  return storageService.get(STORAGE_KEY, stayId)
}

async function remove(stayId) {
  // throw new Error('Nope')
  await storageService.remove(STORAGE_KEY, stayId)
}

async function save(stay) {
  let savedStay
  if (stay._id) {
    const existingStay = await storageService.get(STORAGE_KEY, stay._id)
    if (existingStay) {
      savedStay = await storageService.put(STORAGE_KEY, {
        ...existingStay,
        ...stay,
      })
    } else {
      throw new Error(
        `Update failed, cannot find entity with id: ${stay._id} in: ${STORAGE_KEY}`
      )
    }
  } else {
    const name = stay.name || getRandomElement(names)
    const type = stay.type || getRandomElement(types)
    const loc = stay.loc || getRandomLocation()
    const stayToSave = {
      _id: makeId(),
      name,
      type,
      imgUrls: stay.imgUrls || getRandomImgUrls(imgUrls),
      price: stay.price || Math.floor(Math.random() * 1200) + 100,
      summary: stay.summary || 'Fantastic duplex apartment...',
      capacity: stay.capacity || Math.floor(Math.random() * 10) + 1,
      beds: stay.beds || Math.floor(Math.random() * 6) + 1,
      amenities: stay.amenities || [
        'TV',
        'Wifi',
        'Kitchen',
        'Smoking allowed',
        'Pets allowed',
        'Cooking basics',
      ],
      labels: stay.labels || getRandomLabels(labels),
      loc,
      reviews: stay.reviews || generateRandomReviews(5),
      kilometersAway: stay.kilometersAway || getRandomKilometersAway(),
      dateRange: stay.dateRange || getDateRange(),
      likedByUsers: stay.likedByUsers || ['mini-user'],
      owner: userService.getLoggedinUser(),
    }
    savedStay = await storageService.post(STORAGE_KEY, stayToSave)
  }
  return savedStay
}

function _createStays(num = 20) {
  gStays = loadFromStorage(STORAGE_KEY)
  if (gStays && gStays.length) return

  gStays = []
  for (let i = 0; i < num; i++) {
    gStays.push(_createStay())
  }
  _saveStaysToStorage()
}

function _saveStaysToStorage() {
  saveToStorage(STORAGE_KEY, gStays)
}

function _createStay() {
  const name = names[Math.floor(Math.random() * names.length)]
  const type = types[Math.floor(Math.random() * types.length)]
  const countryObj = countries[Math.floor(Math.random() * countries.length)]
  const country = countryObj.name
  const continent = countryObj.continent
  const city = cities[country]
    ? cities[country][Math.floor(Math.random() * cities[country].length)]
    : 'Unknown city'
  const price = Math.floor(Math.random() * 1200) + 100
  const address = `${Math.floor(Math.random() * 100)} ${[
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
    _id: makeId(),
    name,
    type,
    imgUrls: getRandomImgUrls(imgUrls),
    price,
    summary: makeLorem(40),
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
    host: {
      _id: makeId(),
      fullname: 'Denis Libin',
      imgUrl: 'https://robohash.org/denis',
    },
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
  }
}
