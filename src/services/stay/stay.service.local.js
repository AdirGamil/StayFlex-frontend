import { storageService } from '../async-storage.service'
import { makeId, loadFromStorage, saveToStorage } from '../util.service'
import { userService } from '../user'

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

async function query(filterBy = { txt: '', label: '', startDate: '', endDate: '' }) {
  var stays = await storageService.query(STORAGE_KEY)
  const { txt, label, startDate, endDate } = filterBy

  if (txt) {
    const regex = new RegExp(txt, 'i')
    stays = stays.filter(stay => regex.test(stay.loc.city) || regex.test(stay.loc.country))
  }

  if (label) {
    stays = stays.filter(stay => stay.labels.includes(label))
  }

  if (startDate && endDate) {
    const filterStartDate = new Date(startDate)
    const filterEndDate = new Date(endDate)

    stays = stays.filter(stay => {
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
function _createStay() {
  const names = ['Cozy Cottage', 'Luxury Villa', 'Modern Apartment', 'Beach House', 'Mountain Cabin', 'Urban Flat', 'Country House', 'City Loft', 'Historic Villa', 'Modern Studio', 'Seaside Bungalow', 'Rustic Barn', 'Downtown Condo', 'Eco-friendly House', 'Penthouse Suite', 'Suburban Home', 'Countryside Villa', 'Lake Cabin', 'Ski Lodge', 'City Center Apartment']
  const types = ['Cottage', 'Villa', 'Apartment', 'House', 'Cabin', 'Flat', 'Loft', 'Studio', 'Bungalow', 'Barn', 'Condo', 'Penthouse', 'Home', 'Lodge']
  const countries = ['Portugal', 'Spain', 'France', 'Italy', 'Switzerland', 'Germany', 'Netherlands', 'United Kingdom', 'Greece']
  const cities = {
    'Portugal': ['Lisbon', 'Porto'],
    'Spain': ['Barcelona', 'Valencia'],
    'France': ['Paris', 'Marseille', 'Nice'],
    'Italy': ['Naples', 'Rome', 'Milan'],
    'Switzerland': ['Zurich', 'Geneva', 'Zermatt'],
    'Germany': ['Berlin', 'Munich'],
    'Netherlands': ['Amsterdam', 'Rotterdam'],
    'United Kingdom': ['London', 'Edinburgh'],
    'Greece': ['Athens']
  }
  
  const labels = [
    'Top of the world',
    'Trending',
    'Play',
    'Tropical',
    'Beach',
    'Beachfront',
    'Vineyards',
    'Mansions',
    'Lake',
    'Treehouses',
    'Farms',
    'Skiing',
    'Amazing pools',
    'Earth homes',
    'Amazing views',
    'Desert',
    'Lakefront',
    'Islands',
    'Camping',
    'Surfing',
    'Bed & breakfasts',
    'Luxe',
    'Ski-in/out'
  ]
  

  const getRandomLabels = () => {
    const numLabels = Math.floor(Math.random() * labels.length) + 1
    const shuffled = labels.sort(() => 0.5 - Math.random())
    return shuffled.slice(0, numLabels)
  }

  const name = names[Math.floor(Math.random() * names.length)]
  const type = types[Math.floor(Math.random() * types.length)]
  const country = countries[Math.floor(Math.random() * countries.length)]
  const city = cities[country][Math.floor(Math.random() * cities[country].length)]
  const price = Math.floor(Math.random() * 1200) + 100
  const address = `${Math.floor(Math.random() * 100)} ${['Main', 'Broad', 'Market', 'Elm', 'Maple', 'Oak', 'Pine', 'Cedar', 'Birch', 'Spruce', 'Willow'][Math.floor(Math.random() * 11)]} st`
  const lat = parseFloat((Math.random() * 180 - 90).toFixed(5))
  const lng = parseFloat((Math.random() * 360 - 180).toFixed(5))
  const imgUrls = [
    'https://a0.muscache.com/im/pictures/miso/Hosting-47086741/original/89035847-1f96-4269-af1e-120a19e1cfd7.jpeg?im_w=720',
    'https://a0.muscache.com/im/pictures/d81d8086-bf71-4de9-969c-6d88f7e3cb99.jpg?im_w=720',
    'https://a0.muscache.com/im/pictures/miso/Hosting-578700489517829279/original/8c728f45-a845-4158-907e-697b8997b290.jpeg?im_w=720',
    'https://a0.muscache.com/im/pictures/miso/Hosting-578700489517829279/original/8c728f45-a845-4158-907e-697b8997b290.jpeg?im_w=720'
  ]

  const getRandomKilometersAway = () => Math.floor(Math.random() * 100) + 1

  const getDateRange = () => {
    const getRandomDate = (start, end) => {
      const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
      return date;
    }
  
    const start = new Date();
    const end = new Date();
    end.setFullYear(start.getFullYear() + 1);
  
    const startDate = getRandomDate(start, end);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + Math.floor(Math.random() * 5) + 1); // Random end date within 1-5 days from start date
  
    const options = { month: 'short', day: 'numeric' };
    const startFormatted = new Intl.DateTimeFormat('en-US', options).format(startDate);
    const endFormatted = new Intl.DateTimeFormat('en-US', options).format(endDate);
  
    return `${startFormatted} - ${endFormatted}`;
  }
  

  return {
    _id: makeId(),
    name,
    type,
    imgUrls,
    price,
    summary: 'Fantastic duplex apartment...',
    capacity: Math.floor(Math.random() * 10) + 1,
    amenities: ['TV', 'Wifi', 'Kitchen', 'Smoking allowed', 'Pets allowed', 'Cooking basics'],
    labels: getRandomLabels(),
    host: {
      _id: makeId(),
      fullname: 'Davit Pok',
      imgUrl: 'https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
    },
    loc: {
      country,
      countryCode: country.substring(0, 2).toUpperCase(),
      city,
      address,
      lat,
      lng,
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
    kilometersAway: getRandomKilometersAway(),
    dateRange: getDateRange(),
    likedByUsers: ['mini-user'],
  }
}

