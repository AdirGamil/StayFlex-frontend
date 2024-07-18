import { storageService } from '../async-storage.service'
import { makeId, loadFromStorage, saveToStorage } from '../util.service'
import { userService } from '../user'

const STORAGE_KEY = 'stayDB'
var gStays
_createStays()

export const stayService = {
  query,
  getById,
  save,
  remove,
}
window.cs = stayService

async function query(filterBy = { txt: '' }) {
  var stays = await storageService.query(STORAGE_KEY)
  const { txt } = filterBy

  if (txt) {
    const regex = new RegExp(filterBy.txt, 'i')
    stays = stays.filter(
        (stay) => regex.test(stay.loc.city) || regex.test(stay.loc.country)
    )
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
    const stayToSave = {
      _id: stay._id,
      name: stay.name,
      type: stay.type,
      imgUrls: stay.imgUrls,
      price: stay.price,
      summary: stay.summary,
      capacity: stay.capacity,
      amenities: stay.amenities,
      labels: stay.labels,
      host: stay.host,
      loc: stay.loc,
      reviews: stay.reviews,
      likedByUsers: stay.likedByUsers,
    }
    savedStay = await storageService.put(STORAGE_KEY, stayToSave)
  } else {
    const stayToSave = {
      name: stay.name,
      type: stay.type,
      imgUrls: stay.imgUrls,
      price: stay.price,
      summary: stay.summary,
      capacity: stay.capacity,
      amenities: stay.amenities,
      labels: stay.labels,
      host: stay.host,
      loc: stay.loc,
      reviews: stay.reviews,
      likedByUsers: stay.likedByUsers,
      // Later, owner is set by the backend
      // owner: userService.getLoggedinUser(),
      // msgs: []
    }
    savedStay = await storageService.post(STORAGE_KEY, stayToSave)
  }
  return savedStay
}
function _createStays() {
  gStays = loadFromStorage(STORAGE_KEY)
  if (gStays && gStays.length) return

  gStays = []
  gStays.push(
    _createStay(
      'Cozy Cottage',
      'Cottage',
      300,
      'https://a0.muscache.com/im/pictures/miso/Hosting-47086741/original/89035847-1f96-4269-af1e-120a19e1cfd7.jpeg?im_w=720',
      {
        country: 'Portugal',
        countryCode: 'PT',
        city: 'Lisbon',
        address: '17 Kombo st',
        lat: -8.61308,
        lng: 41.1413,
      }
    )
  )
  gStays.push(
    _createStay(
      'Luxury Villa',
      'Villa',
      1200,
      'https://a0.muscache.com/im/pictures/d81d8086-bf71-4de9-969c-6d88f7e3cb99.jpg?im_w=720',
      {
        country: 'Spain',
        countryCode: 'ES',
        city: 'Barcelona',
        address: '22 Rambla st',
        lat: 41.3851,
        lng: 2.1734,
      }
    )
  )
  gStays.push(
    _createStay(
      'Modern Apartment',
      'Apartment',
      800,
      'https://a0.muscache.com/im/pictures/miso/Hosting-578700489517829279/original/8c728f45-a845-4158-907e-697b8997b290.jpeg?im_w=720',
      {
        country: 'France',
        countryCode: 'FR',
        city: 'Paris',
        address: '10 Rue de Rivoli',
        lat: 48.8566,
        lng: 2.3522,
      }
    )
  )
  _saveStaysToStorage()
}

function _saveStaysToStorage() {
  saveToStorage(STORAGE_KEY, gStays)
}

function _createStay(name, type, price, imageUrl, loc) {
  const getRandomKilometersAway = () => Math.floor(Math.random() * 100) + 1

  const getDateRange = () => {
    const startDate = new Date(2023, 7, 4) // August 4, 2023
    const endDate = new Date(2023, 7, 7) // August 7, 2023
    const monthOptions = { month: 'short' }
    const dayOptions = { day: 'numeric' }
    const monthFormatted = new Intl.DateTimeFormat(
      'en-US',
      monthOptions
    ).format(startDate)
    const startDayFormatted = new Intl.DateTimeFormat(
      'en-US',
      dayOptions
    ).format(startDate)
    const endDayFormatted = new Intl.DateTimeFormat('en-US', dayOptions).format(
      endDate
    )
    return `${monthFormatted} ${startDayFormatted} - ${endDayFormatted}`
  }

  return {
    _id: makeId(),
    name,
    type,
    imgUrls: [imageUrl],
    price,
    loc,
    reviews: [
      {
        id: makeId(),
        txt: 'Very helpful hosts. Cooked traditional...',
        rate: 4,
        by: {
          _id: makeId(),
          fullname: 'user2',
          imgUrl: '/img/img2.jpg',
        },
      },
    ],
    kilometersAway: getRandomKilometersAway(),
    dateRange: getDateRange(),
  }
}
