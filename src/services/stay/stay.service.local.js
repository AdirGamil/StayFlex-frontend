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
  gStays.push(
    _createStay(
      'Beach House',
      'House',
      450,
      'https://a0.muscache.com/im/pictures/miso/Hosting-47086741/original/89035847-1f96-4269-af1e-120a19e1cfd7.jpeg?im_w=720',
      {
        country: 'Italy',
        countryCode: 'IT',
        city: 'Naples',
        address: '25 Mare st',
        lat: 40.8518,
        lng: 14.2681,
      }
    )
  )
  gStays.push(
    _createStay(
      'Mountain Cabin',
      'Cabin',
      350,
      'https://a0.muscache.com/im/pictures/d81d8086-bf71-4de9-969c-6d88f7e3cb99.jpg?im_w=720',
      {
        country: 'Switzerland',
        countryCode: 'CH',
        city: 'Zurich',
        address: '12 Berg st',
        lat: 47.3769,
        lng: 8.5417,
      }
    )
  )
  gStays.push(
    _createStay(
      'Urban Flat',
      'Flat',
      600,
      'https://a0.muscache.com/im/pictures/miso/Hosting-578700489517829279/original/8c728f45-a845-4158-907e-697b8997b290.jpeg?im_w=720',
      {
        country: 'Germany',
        countryCode: 'DE',
        city: 'Berlin',
        address: '18 Mitte st',
        lat: 52.52,
        lng: 13.405,
      }
    )
  )
  gStays.push(
    _createStay(
      'Country House',
      'House',
      500,
      'https://a0.muscache.com/im/pictures/miso/Hosting-47086741/original/89035847-1f96-4269-af1e-120a19e1cfd7.jpeg?im_w=720',
      {
        country: 'Netherlands',
        countryCode: 'NL',
        city: 'Amsterdam',
        address: '30 Vondelpark st',
        lat: 52.3676,
        lng: 4.9041,
      }
    )
  )
  gStays.push(
    _createStay(
      'City Loft',
      'Loft',
      700,
      'https://a0.muscache.com/im/pictures/d81d8086-bf71-4de9-969c-6d88f7e3cb99.jpg?im_w=720',
      {
        country: 'United Kingdom',
        countryCode: 'GB',
        city: 'London',
        address: '10 Soho st',
        lat: 51.5074,
        lng: -0.1278,
      }
    )
  )
  gStays.push(
    _createStay(
      'Historic Villa',
      'Villa',
      1100,
      'https://a0.muscache.com/im/pictures/miso/Hosting-578700489517829279/original/8c728f45-a845-4158-907e-697b8997b290.jpeg?im_w=720',
      {
        country: 'Greece',
        countryCode: 'GR',
        city: 'Athens',
        address: '5 Acropolis st',
        lat: 37.9838,
        lng: 23.7275,
      }
    )
  )
  gStays.push(
    _createStay(
      'Modern Studio',
      'Studio',
      400,
      'https://a0.muscache.com/im/pictures/d81d8086-bf71-4de9-969c-6d88f7e3cb99.jpg?im_w=720',
      {
        country: 'Portugal',
        countryCode: 'PT',
        city: 'Porto',
        address: '8 Ribeira st',
        lat: 41.1579,
        lng: -8.6291,
      }
    )
  )
  gStays.push(
    _createStay(
      'Seaside Bungalow',
      'Bungalow',
      550,
      'https://a0.muscache.com/im/pictures/miso/Hosting-47086741/original/89035847-1f96-4269-af1e-120a19e1cfd7.jpeg?im_w=720',
      {
        country: 'Spain',
        countryCode: 'ES',
        city: 'Valencia',
        address: '12 Playa st',
        lat: 39.4699,
        lng: -0.3763,
      }
    )
  )
  gStays.push(
    _createStay(
      'Rustic Barn',
      'Barn',
      300,
      'https://a0.muscache.com/im/pictures/d81d8086-bf71-4de9-969c-6d88f7e3cb99.jpg?im_w=720',
      {
        country: 'France',
        countryCode: 'FR',
        city: 'Marseille',
        address: '15 Vieux-Port st',
        lat: 43.2965,
        lng: 5.3698,
      }
    )
  )
  gStays.push(
    _createStay(
      'Downtown Condo',
      'Condo',
      750,
      'https://a0.muscache.com/im/pictures/miso/Hosting-578700489517829279/original/8c728f45-a845-4158-907e-697b8997b290.jpeg?im_w=720',
      {
        country: 'Italy',
        countryCode: 'IT',
        city: 'Rome',
        address: '28 Colosseum st',
        lat: 41.9028,
        lng: 12.4964,
      }
    )
  )
  gStays.push(
    _createStay(
      'Eco-friendly House',
      'House',
      480,
      'https://a0.muscache.com/im/pictures/miso/Hosting-47086741/original/89035847-1f96-4269-af1e-120a19e1cfd7.jpeg?im_w=720',
      {
        country: 'Switzerland',
        countryCode: 'CH',
        city: 'Geneva',
        address: '22 Lake st',
        lat: 46.2044,
        lng: 6.1432,
      }
    )
  )
  gStays.push(
    _createStay(
      'Penthouse Suite',
      'Penthouse',
      1300,
      'https://a0.muscache.com/im/pictures/d81d8086-bf71-4de9-969c-6d88f7e3cb99.jpg?im_w=720',
      {
        country: 'Germany',
        countryCode: 'DE',
        city: 'Munich',
        address: '33 Marienplatz st',
        lat: 48.1351,
        lng: 11.582,
      }
    )
  )
  gStays.push(
    _createStay(
      'Suburban Home',
      'Home',
      650,
      'https://a0.muscache.com/im/pictures/miso/Hosting-578700489517829279/original/8c728f45-a845-4158-907e-697b8997b290.jpeg?im_w=720',
      {
        country: 'Netherlands',
        countryCode: 'NL',
        city: 'Rotterdam',
        address: '44 Erasmus st',
        lat: 51.9225,
        lng: 4.47917,
      }
    )
  )
  gStays.push(
    _createStay(
      'Countryside Villa',
      'Villa',
      900,
      'https://a0.muscache.com/im/pictures/d81d8086-bf71-4de9-969c-6d88f7e3cb99.jpg?im_w=720',
      {
        country: 'United Kingdom',
        countryCode: 'GB',
        city: 'Edinburgh',
        address: '55 Royal st',
        lat: 55.9533,
        lng: -3.1883,
      }
    )
  )
  gStays.push(
    _createStay(
      'Lake Cabin',
      'Cabin',
      500,
      'https://a0.muscache.com/im/pictures/miso/Hosting-47086741/original/89035847-1f96-4269-af1e-120a19e1cfd7.jpeg?im_w=720',
      {
        country: 'Italy',
        countryCode: 'IT',
        city: 'Milan',
        address: '66 Lake Como st',
        lat: 45.4642,
        lng: 9.19,
      }
    )
  )
  gStays.push(
    _createStay(
      'Ski Lodge',
      'Lodge',
      700,
      'https://a0.muscache.com/im/pictures/d81d8086-bf71-4de9-969c-6d88f7e3cb99.jpg?im_w=720',
      {
        country: 'Switzerland',
        countryCode: 'CH',
        city: 'Zermatt',
        address: '77 Matterhorn st',
        lat: 46.0207,
        lng: 7.7491,
      }
    )
  )
  gStays.push(
    _createStay(
      'City Center Apartment',
      'Apartment',
      800,
      'https://a0.muscache.com/im/pictures/miso/Hosting-578700489517829279/original/8c728f45-a845-4158-907e-697b8997b290.jpeg?im_w=720',
      {
        country: 'France',
        countryCode: 'FR',
        city: 'Nice',
        address: '88 Promenade st',
        lat: 43.7102,
        lng: 7.262,
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
    const endDate = new Date(2023, 7, 9) // August 9, 2023
    const options = { month: 'short', day: 'numeric' }
    const startFormatted = new Intl.DateTimeFormat('en-US', options).format(
      startDate
    )
    const endFormatted = new Intl.DateTimeFormat('en-US', options).format(
      endDate
    )
    return `${startFormatted} - ${endFormatted}`
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
