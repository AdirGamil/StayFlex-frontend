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
      (stay) => regex.test(stay.name) || regex.test(stay.description)
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

  // If no stays in storage - generate demo data
  gStays = []
  gStays.push(_createStay('House 1', 'Apartment', 500))
  gStays.push(_createStay('House 2', 'Villa', 1000))
  gStays.push(_createStay('House 3', 'Penthouse', 1200))
  _saveStaysToStorage()
}

function _saveStaysToStorage() {
  saveToStorage(STORAGE_KEY, gStays)
}

function _createStay(name, type, price) {
  console.log('Creating stay with price:', price) // הוספת לוג כדי לבדוק את הערך של price

  return {
    _id: makeId(),
    name,
    type,
    imgUrls: [
      'https://a0.muscache.com/im/pictures/miso/Hosting-578700489517829279/original/8c728f45-a845-4158-907e-697b8997b290.jpeg?im_w=720',
    ],
    price,
    summary: 'Fantastic duplex apartment...',
    capacity: 8,
    amenities: [
      'TV',
      'Wifi',
      'Kitchen',
      'Smoking allowed',
      'Pets allowed',
      'Cooking basics',
    ],
    labels: ['Top of the world', 'Trending', 'Play', 'Tropical'],
    host: {
      _id: makeId(),
      fullname: 'Davit Pok',
      imgUrl:
        'https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
    },
    loc: {
      country: 'Portugal',
      countryCode: 'PT',
      city: 'Lisbon',
      address: '17 Kombo st',
      lat: -8.61308,
      lng: 41.1413,
    },
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
    likedByUsers: ['mini-user'],
  }
}
