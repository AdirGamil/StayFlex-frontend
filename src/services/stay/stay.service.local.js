import { storageService } from '../async-storage.service'
import { userService } from '../user'


import {
  makeId,
  getRandomLabels,
  getRandomImgUrls,
  getRandomKilometersAway,
  getDateRange,
  loadFromStorage,
  saveToStorage,
  generateRandomReviews
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
_createStays(24)

export const stayService = {
  query,
  getById,
  save,
  remove,
}
window.cs = stayService

async function query(
  filterBy = { txt: '', label: '', startDate: '', endDate: '' }
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
  var savedStay
  if (stay._id) {
    savedStay = await storageService.put(STORAGE_KEY, stay)
  } else {
    savedStay = await storageService.post(STORAGE_KEY, stay)
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
// main.js

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
    // reviews: [
    //   {
    //     id: makeId(),
    //     txt: 'Very helpful hosts. Cooked traditional...',
    //     rate: 4,
    //     by: {
    //       _id: makeId(),
    //       fullname: 'user2',
    //       imgUrl: '/img/img2.jpg',
    //     },
    //   },
    // ],
    kilometersAway: getRandomKilometersAway(),
    dateRange: getDateRange(),
    likedByUsers: ['mini-user'],
  }
}
